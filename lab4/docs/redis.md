# Redis

Redis 7, порт 6379. В сети Docker Compose адрес сервиса `redis`, порт 6379; для отдельного контейнера по методичке — `host.docker.internal` (порт хоста должен быть доступен из контейнера). Credentials типа Redis: Lab4 Redis Smirnov, database 0, без пароля только в изолированной учебной сети.

`flow-09-redis.json`: Manual Trigger → Redis Set (`smirnov`, `Smirnov / СДП УИР 241`) → Redis Get. `flow-10-redis.json`: Manual Trigger → Redis Delete → Redis Get → Code (Exists check). Встроенная Redis node не предоставляет отдельную операцию EXISTS, поэтому после удаления проверяем GET == null; отдельно в тесте используем `redis-cli EXISTS smirnov` (0 означает отсутствие ключа).

Источник параметров: https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Redis/Redis.node.ts

Docker Redis 7.4.12 запущен. Импорт и выполнение подтверждены. GET вернул Smirnov / СДП УИР 241; после DELETE команда EXISTS вернула 0. См. ../evidence/results.json.
