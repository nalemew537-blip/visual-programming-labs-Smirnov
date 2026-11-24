# Лабораторная работа №2. Node-RED

**Цель:** освоить Node-RED как low-code инструмент, изучить базовые и расширенные ноды.

## Установка

Предусмотрен Docker Desktop, образ nodered/node-red:latest, порт 1880 и локальная папка data, подключённая к /data. [Конфигурация](../compose.yaml), [инструкция запуска](../RUN.md).

Контейнер успешно запущен в GitHub Actions. Фактические версии по журналу запуска: Node.js v24.22.3, Node-RED v5.0.10, Dashboard 3.6.6, node-red-contrib-telegrambot v19.0.5. [Журнал запуска](../evidence/startup.log), [состояние Docker](../evidence/docker-ps.txt), [запуск GitHub Actions](https://github.com/nalemew537-blip/visual-programming-labs-Smirnov/actions/runs/45508555489).

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

Статически проверены 12 JSON-файлов и 68 элементов; 14 проверок JavaScript-функций пройдены. В работающем Node-RED получены 12 успешных вызовов Inject (HTTP 200), подтверждены пять HTTP-запросов с ожидаемыми статусами 200, 400 и 404. Журнал подтверждает подключение MQTT к HiveMQ и запуск Dashboard. [Результаты браузерной проверки](../evidence/browser-results.json), [журнал работы](../evidence/runtime.log).

### Скриншоты

- [Поток 1](../evidence/editor-01-inject-debug.png)
- [Поток 2](../evidence/editor-02-function.png)
- [Поток 3](../evidence/editor-03-switch.png)
- [Поток 4](../evidence/editor-04-change.png)
- [Поток 5](../evidence/editor-05-template.png)
- [Поток 6](../evidence/editor-06-http-request.png)
- [Поток 7](../evidence/editor-07-mqtt.png)
- [Поток 8](../evidence/editor-08-endpoints.png)
- [Поток 9](../evidence/editor-09-dashboard.png)
- [Поток 10](../evidence/editor-10-telegram.png)
- [Поток 11](../evidence/editor-11-files.png)
- [Поток 12](../evidence/editor-12-context.png)
- [Dashboard](../evidence/dashboard.png)
- [API text](../evidence/api-text.png), [API info](../evidence/api-info.png), [API items](../evidence/api-items.png), [400](../evidence/api-invalid.png), [404](../evidence/api-missing.png).

Скриншоты получены из запущенного редактора и браузера. Регистрация Telegram-бота и проверка реальной переписки не выполнены: отсутствует токен. Проверка сохранения файла после перезапуска и содержимого всех результатов Debug отдельно не подтверждена. Номер учебной группы не указан.

## Вывод

При подготовке потоков рассмотрены способы передачи и преобразования сообщений, ветвления, работы с HTTP, MQTT и контекстом. Разделение потоков на JSON-файлы упрощает импорт и отслеживание изменений в Git. Запуск контейнера и проверка HTTP-запросов подтвердили работоспособность соответствующих частей проекта. Проверка Telegram требует регистрации бота.
