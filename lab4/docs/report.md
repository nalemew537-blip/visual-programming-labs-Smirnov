# Лабораторная работа №4. n8n

**Студент:** Смирнов Арсений, СДП УИР 241.

## Цель

Изучить автоматизацию с помощью n8n, базовые ноды, HTTP и Redis.

## Установка

Docker Compose: образ n8nio/n8n, порт 5678, два bind volume (`/home/node/.n8n` и `/data`), Redis 7, порт 6379, часовой пояс Europe/Minsk. В браузере открыть http://localhost:5678 и зарегистрировать локального владельца. Для запуска: `docker compose up -d` в lab4. Локальные каталоги state и data создать до запуска. После запуска импортировать отдельные JSON через меню Import from File. Создать Redis credentials и выбрать их в двух Redis workflow; в Compose host = redis, port = 6379.

## Workflow

| Файл | Назначение |
|---|---|
| [01 Manual Set](../flows/flow-01-manual-set.json) | Manual Trigger → Edit Fields → Code, фамилия и topic |
| [02 Code](../flows/flow-02-code.json) | массив, цикл, if/else, объект, NoOp |
| [03 IF](../flows/flow-03-if.json) | два элемента для обеих веток IF |
| [04 Set](../flows/flow-04-set.json) | topic, текущее время и payload |
| [05 HTTP](../flows/flow-05-http.json) | GET catfact.ninja, JSON |
| [06 Schedule](../flows/flow-06-schedule.json) | каждую минуту, текущее время; для регулярного запуска опубликовать/активировать |
| [09 Redis](../flows/flow-09-redis.json) | SET → GET |
| [10 Redis](../flows/flow-10-redis.json) | DELETE → GET → проверка отсутствия |

[Redis](redis.md). Встроенная Redis node не имеет отдельной операции Exists; проверка выполнена через GET/null, а в проверке контейнера предусмотрен redis-cli EXISTS.

## AI-промпты

- Подготовить JavaScript Code node с массивом, циклом, условием и объектом.
- Собрать IF workflow с двумя ветками.
- Подготовить Redis SET/GET и DELETE с проверкой отсутствия ключа.

## Проверка и скриншоты

Исходники подготовлены в формате импорта n8n. Запущен сценарий реальной проверки через GitHub Actions; результаты пока не подтверждены. Скриншоты и фактические версии будут проверены по результатам запуска. Не выдавать план за выполненную проверку.

## Вывод

После запуска требуется подтвердить результаты работы нод. Ачивки не выполнялись.
