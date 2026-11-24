# План реализации CRUD

Страница reading_log. Repeating Group RG ReadingLog: Type of content ReadingLog, Data source Do a search for ReadingLogs, сортировка по reading_date descending. В каждой ячейке — Current cell's ReadingLog's title, reading_date:formatted as и finished.

| Событие (отдельный workflow) | Действие |
|---|---|
| Button Добавить is clicked | Data → Create a new thing → ReadingLog; title = Input Title's value, reading_date = Date Picker's value, finished = Checkbox Finished is checked. Reset relevant inputs. Only when title и дата заполнены. |
| Button Показать записи is clicked | Element actions → Show RG ReadingLog (источник данных — Do a search for ReadingLogs; скрыть RG при загрузке, если требуется отдельный Read). |
| Button Изменить is clicked | Display data in Popup Edit = Current cell's ReadingLog, затем Show Popup Edit. |
| Button Сохранить is clicked | Data → Make changes to a thing → Popup Edit's ReadingLog; поля из формы редактирования; Hide Popup Edit. |
| Button Удалить is clicked | Data → Delete a thing → Current cell's ReadingLog. |

Popup Edit: Type of content ReadingLog. Начальные значения полей — Parent group's/Popup Edit's ReadingLog. Данные показывать из динамических выражений, не из захардкоженного текста.

## Проверка в Preview

1. Открыть reading_log в dev-версии. Нажать «Показать записи»: три записи из App Data.
2. Создать временную запись «Тестовая книга», выбрать дату, finished=no. Убедиться, что появилась четвёртая запись.
3. Изменить название на «Тестовая книга (изменена)» и статус на yes, проверить обновление списка.
4. Удалить временную запись, убедиться, что осталось три записи.
5. Сделать снимки редактора workflows и Preview.

Подтверждение пока отсутствует: план необходимо выполнить в Bubble.