# Start Docker Desktop before running.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$group = "СДП УИР 241"
$env:STUDENT_GROUP = $group
New-Item -ItemType Directory -Path data -Force | Out-Null
if (-not (Test-Path "data/flows.json")) {
  $nodes = @(Get-ChildItem flows/flow-*.json | Sort-Object Name | ForEach-Object { Get-Content $_.FullName -Raw -Encoding UTF8 | ConvertFrom-Json })
  $json = ConvertTo-Json -InputObject $nodes -Depth 100
  [System.IO.File]::WriteAllText((Join-Path (Get-Location) "data/flows.json"), $json, (New-Object System.Text.UTF8Encoding($false)))
}
docker compose up -d
if ($LASTEXITCODE -ne 0) { throw "Docker start failed" }
docker exec -w /data smirnov-node-red npm install node-red-dashboard node-red-contrib-telegrambot
if ($LASTEXITCODE -ne 0) { throw "Node installation failed" }
docker compose restart
if ($LASTEXITCODE -ne 0) { throw "Docker restart failed" }
docker exec smirnov-node-red node -v
docker logs --tail 60 smirnov-node-red
Start-Process "http://localhost:1880"
