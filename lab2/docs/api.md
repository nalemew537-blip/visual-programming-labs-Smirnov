# API — лабораторная №2

Базовый URL: http://localhost:1880. Все маршруты используют GET и отдельные HTTP In и HTTP Response.

| Запрос | HTTP-статус | Ожидаемое тело ответа |
|---|---:|---|
| /api/text | 200 | Hello from Smirnov |
| /api/info | 200 | {"student":"Smirnov","lab":2} |
| /api/items | 200 | [{"id":1,"name":"Book"},{"id":2,"name":"Pen"}] |
| /api/items?id=1 | 200 | {"id":1,"name":"Book"} |
| /api/items?id=abc | 400 | {"error":"id must be a positive integer"} |
| /api/items?id=99 | 404 | {"error":"Item not found"} |

В /api/items необязательный query-параметр id должен быть положительным целым числом. При отсутствии параметра возвращается список. Некорректный формат — 400, отсутствующий элемент — 404.

Проверка: открыть каждый URL в браузере. Для отображения статуса использовать Network в DevTools или команду:

```powershell
curl.exe -i "http://localhost:1880/api/items?id=1"
curl.exe -i "http://localhost:1880/api/items?id=abc"
curl.exe -i "http://localhost:1880/api/items?id=99"
```

Примеры ответов приведены по коду Function. Фактические запросы к работающему контейнеру ещё не выполнены.
