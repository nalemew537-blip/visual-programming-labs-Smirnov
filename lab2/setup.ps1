# Run in PowerShell from lab2 directory after Docker Desktop starts.
$ErrorActionPreference = "Stop"
$group = Read-Host "Enter your actual study group"
if ([string]::IsNullOrWhiteSpace($group)) { throw "Study group is required" }
$env:STUDENT_GROUP = $group
New-Item -ItemType Directory -Path data -Force | Out-Null
docker compose up -d
if ($LASTEXITCODE -ne 0) { throw "Docker start failed" }
docker exec smirnov-node-red node -v
docker exec smirnov-node-red node-red --version
docker exec -w /data smirnov-node-red npm install node-red-dashboard node-red-contrib-telegrambot
if ($LASTEXITCODE -ne 0) { throw "Node installation failed" }
docker compose restart
Write-Host "Open http://localhost:1880 and import the 12 JSON files using Menu > Import > select a file. Deploy."
