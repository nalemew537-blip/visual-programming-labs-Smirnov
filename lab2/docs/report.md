# Лабораторная работа №2. Node-RED

**Цель:** освоить Node-RED как low-code инструмент, изучить базовые и расширенные ноды.

## Установка

Предусмотрен Docker Desktop, образ nodered/node-red:latest, порт 1880 и локальная папка data, подключённая к /data. [Конфигурация](../compose.yaml), [инструкция запуска](../RUN.md).

Фактические версии Node.js и Node-RED будут определены при запуске контейнера; в среде подготовки Docker отсутствует.

## Потоки

| № | Исходник | Назначение |
|---|---|---|
| 1 | [flow-01-inject-debug.json](../flows/flow-01-inject-debug.json) | Inject → Debug: фамилия, topic, период 5 с, полный объект |
| 2 | [flow-02-function.json](../flows/flow-02-function.json) | Inject → Function → Debug: массив, цикл, объект, if/else |
| 3 | [flow-03-switch.json](../flows/flow-03-switch.json) | Inject → Function → Switch → два Debug: high и low |
| 4 | [flow-04-change.json](../flows/flow-04-change.json) | Inject → Change → Debug: topic, timestamp, payload |
| 5 | [flow-05-template.json](../flows/flow-05-template.json) | Inject → Template → Debug: Mustache, три поля |
| 6 | [flow-06-http-request.json](../flows/flow-06-http-request.json) | Inject → HTTP Request → Debug: публичный API, GET, JSON |
| 7 | [flow-07-mqtt.json](../flows/flow-07-mqtt.json) | Публикация случайной температуры и подписка на тот же MQTT topic |
| 8 | [flow-08-endpoints.json](../flows/flow-08-endpoints.json) | Три GET-эндпоинта, HTTP In и HTTP Response |
| 9 | [flow-09-dashboard.json](../flows/flow-09-dashboard.json) | Датчик температуры, Gauge и Chart |
| 10 | [flow-10-telegram.json](../flows/flow-10-telegram.json) | Telegram Receiver → Function → Sender: /start, /info и echo |
| 11 | [flow-11-files.json](../flows/flow-11-files.json) | Запись и чтение JSON в /data |
| 12 | [flow-12-context.json](../flows/flow-12-context.json) | Счётчик с flow.get и flow.set |

[Документация API](api.md).

## Примеры AI-промптов

- Создать Function node с массивом, циклом for, условием if/else и объектом.
- Составить Mustache-шаблон для трёх полей.
- Разработать GET-эндпоинты с валидацией query-параметра и статусами 400/404.
- Подготовить импортируемые JSON-файлы Node-RED.

## Проверка

Статически проверены 12 JSON-файлов, 68 элементов (включая вкладки и конфигурационные ноды), уникальность идентификаторов и корректность ссылок соединений. Реальный запуск, внешние запросы, MQTT, Dashboard, Telegram и сохранение файла после перезапуска ещё не проверены.

[Перечень необходимых скриншотов](../screenshots/README.md). Снимки будут добавлены после реального запуска. Токен бота необходимо ввести локально; он не публикуется. Номер учебной группы требуется уточнить и указать в потоках.

## Вывод

При подготовке потоков рассмотрены способы передачи и преобразования сообщений, ветвления, работы с HTTP, MQTT и контекстом. Разделение потоков на JSON-файлы упрощает импорт и отслеживание изменений в Git. Практические результаты следует дополнить после запуска.
