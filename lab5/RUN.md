# Локальный Typebot (трек C)

Вариант self-hosted, порт 8080 (редактор) и 8081 (viewer), Mailpit 8025 (локальная тестовая почта). Docker Compose запускает PostgreSQL, Redis и Typebot. Установка Docker Desktop нужна только для локальной защиты.

1. В PowerShell в lab5 создать локальный .env:
   ```powershell
   $key=[guid]::NewGuid().ToString("N")
   $relay=[guid]::NewGuid().ToString("N")
   $db=[guid]::NewGuid().ToString("N")
   "ENCRYPTION_SECRET=$key`nWEBHOOK_RELAY_SECRET=$relay`nPOSTGRES_PASSWORD=$db`nADMIN_EMAIL=lab5@example.invalid" | Set-Content -Encoding ascii .env
   docker compose up -d
   ```
2. Открыть http://localhost:8080 и выполнить вход по email lab5@example.invalid. Ссылка для входа приходит в локальный Mailpit (http://localhost:8025). Не публиковать ссылку авторизации.
3. В workspace создать бота через Import a file: exports/flow-01-faq.json. Для сравнения импортировать оригинальный template-before.json.
4. В редакторе проверить блоки, нажать Preview, пройти приветствие, ветку «Другой вопрос» с текстом «расписание» и ветку погоды. Проверить также fallback.
5. Нажать Publish, сохранить адрес viewer; для публичной постоянной ссылки вместо временной локальной среды можно импортировать тот же JSON в личный Typebot Cloud.
6. Экспортировать итоговый bot JSON из редактора и сохранить в exports/. Снять скриншоты.

В .env лежат локальные секреты; файл не отправлять на GitHub. Порты привязаны к localhost. Конфигурация основана на официальном Docker Compose: https://github.com/baptisteArno/typebot.io/blob/main/docker-compose.yml

На момент подготовки реальный импорт/публикация ещё не подтверждены.
