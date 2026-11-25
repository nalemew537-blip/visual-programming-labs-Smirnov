# Реализация API в Xano

| Method | Path (в группе API) | Inputs / Function Stack | Ответ |
|---|---|---|---|
| GET | /smirnov_241_bookings | optional status enum; Query All Records, фильтр по status только если задан | 200: status=ok, data=list |
| GET | /smirnov_241_bookings/{id} | id integer (path); Get Record by id; Precondition существования | 200 или 404 |
| POST | /smirnov_241_bookings | поля из CreateBooking; проверить duration_hours > 0 и существование двух references; Add Record | 201 (или 200 по настройке Xano) |
| PATCH | /smirnov_241_bookings/{id} | id path; Get Record; проверить существование; Edit Record только переданных полей; проверить изменённые references | 200 / 400 / 404 |
| DELETE | /smirnov_241_bookings/{id} | id path; Get Record; проверить существование; Delete Record | 200: status=ok, data={id,deleted:true} |

Проверки: для отсутствующей записи настроить Precondition/ошибку Not Found; для некорректного ввода — Bad Request. Не принимать пустое название. Никакие реальные личные данные не используются. API учебный, без авторизации по базовым требованиям; не применять для production.

Контракт: [openapi.json](openapi.json) — спецификация проектирования, не автоматически сгенерированная документация Xano. При реализации проверить фактические коды и формат ошибок и привести этот файл в соответствие с Xano Swagger.

## Сценарии проверки

1. GET списка → 10 исходных броней; GET ?status=planned → 4 записи.
2. GET /1 → запись «Интервью для студсовета».
3. POST с title «Тестовая бронь», studio_id 1, equipment_id 1, start_at 1795683600000, duration_hours 1, status planned, paid false → получить новый id.
4. PATCH /{новый id} с status confirmed → изменённая запись.
5. DELETE /{новый id} → deleted=true; GET /{новый id} → 404.
6. GET /999999 → 404; POST с duration_hours=0 → 400.

Это ожидаемые результаты, не результаты реальных запросов.
