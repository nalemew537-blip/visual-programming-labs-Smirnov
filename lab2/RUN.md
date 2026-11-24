# Запуск на Windows

1. Установить и запустить Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Скачать репозиторий через Code → Download ZIP и распаковать. Открыть PowerShell в папке lab2.
3. Выполнить `powershell -ExecutionPolicy Bypass -File .\setup.ps1`. Скрипт объединяет 12 файлов при первом запуске, устанавливает два пакета и запускает контейнер. Существующий flows.json не перезаписывается.
4. Открыть http://localhost:1880. При необходимости импортировать отдельные JSON через Menu → Import. Нажать Deploy.
5. Создать бота через BotFather: tvl_lab2_smirnov_bot (если занят, выбрать доступный username). Открыть конфигурацию Telegram bot и ввести токен локально. Не публиковать токен и credentials.
6. Проверить потоки через Inject и Debug. В 01, 07, 09 установлен интервал 5 секунд. В 03 нажать обе кнопки.
7. Проверить API по [docs/api.md](docs/api.md). Dashboard: http://localhost:1880/ui. В Telegram отправить /start, /info и обычный текст.
8. В 11 записать файл, выполнить `docker compose restart`, дождаться запуска и прочитать данные. В 12 нажать Inject несколько раз.
9. Сделать реальные скриншоты по [списку](screenshots/README.md), записать версии и дополнить отчёт. Группа СДП УИР 241 уже внесена в названия потоков и настройки.

Версии: `docker logs smirnov-node-red` и `docker exec smirnov-node-red node -v`.

Документация: https://nodered.org/docs/getting-started/docker
