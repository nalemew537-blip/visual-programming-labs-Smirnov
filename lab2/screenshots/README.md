# Необходимые скриншоты

Снимки получены после запуска Node-RED через Docker в GitHub Actions. Проверка реальной переписки с ботом подтверждена журналом; [Снимок чата](telegram-chat.webp) добавлен в виде обрезанной и сжатой копии оригинала. Токен не публикуется.

| Файл | Содержание |
|---|---|
| 00-versions.png | Логи Docker: версии Node.js и Node-RED |
| 01-inject-debug.png | Inject → Debug: фамилия, topic, период 5 с, полный объект |
| 02-function.png | Inject → Function → Debug: массив, цикл, объект, if/else |
| 03-switch.png | Inject → Function → Switch → два Debug: high и low |
| 04-change.png | Inject → Change → Debug: topic, timestamp, payload |
| 05-template.png | Inject → Template → Debug: Mustache, три поля |
| 06-http-request.png | Inject → HTTP Request → Debug: публичный API, GET, JSON |
| 07-mqtt.png | Публикация случайной температуры и подписка на тот же MQTT topic |
| 08-endpoints.png | Три GET-эндпоинта, HTTP In и HTTP Response |
| 09-dashboard.png | Датчик температуры, Gauge и Chart |
| 10-telegram.png | Telegram Receiver → Function → Sender: /start, /info и echo |
| 11-files.png | Запись и чтение JSON в /data |
| 12-context.png | Счётчик с flow.get и flow.set |
| 08-endpoints-text.png | /api/text |
| 08-endpoints-info.png | /api/info |
| 08-endpoints-items-ok.png | /api/items?id=1 |
| 08-endpoints-items-error.png | /api/items?id=abc (400) или id=99 (404) |

Для 11 показать чтение сохранённых данных после перезапуска контейнера; для 12 — несколько последовательных значений счётчика.

[Переписка Telegram: /start, /info и echo](telegram-chat.webp).
