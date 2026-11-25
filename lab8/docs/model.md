# Модель данных: бронирование учебной медиастудии

Workspace: lab8-smirnov-api. API group: Smirnov / СДП УИР 241. Все названия таблиц имеют префикс smirnov_241.

| Таблица | Поле | Тип |
|---|---|---|
| smirnov_241_studios | id | integer (primary key, auto) |
| | name | text |
| | capacity | integer |
| | available | boolean |
| | location | text |
| smirnov_241_equipment | id | integer (primary key, auto) |
| | name | text |
| | category | enum: camera, audio, support, light |
| | hourly_rate | decimal |
| | available | boolean |
| smirnov_241_bookings | id | integer (primary key, auto) |
| | title | text |
| | studio_id | table reference → smirnov_241_studios |
| | equipment_id | table reference → smirnov_241_equipment |
| | start_at | timestamp (Unix milliseconds) |
| | duration_hours | integer |
| | status | enum: planned, confirmed, completed |
| | paid | boolean |

Обе связи — many-to-one: одна бронь относится к одной студии и одному предмету оборудования; каждое из них может иметь несколько броней. Это учебный реестр, а не система разрешения конфликтов бронирования. Значения вымышленные.

В Xano создать три таблицы, reference выбирать именно как Table Reference, не как integer. Сначала импортировать студии и оборудование, затем брони. Если Xano сгенерирует другие id, сопоставить записи по name и обновить reference перед импортом. Поле id не нужно добавлять второй раз, если оно создано автоматически.
