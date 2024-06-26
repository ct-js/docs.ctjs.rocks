# Руководство по миграции для ct.js v5.0.

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Переход от v4 к v5 должен быть довольно простым: единственное ломающее изменение связано с преобразованием шрифтовых ассетов в семейства шрифтов.

## Переход от шрифтов к семействам шрифтов

* При открытии проекта v4 в ct.js v5 ваши шрифты (ассеты) будет автоматически преобразованы в семейства шрифтов. Семейство шрифтов — это коллекция файлов шрифтов, которую можно напрямую подключить в стили.
* Если вы использовали собственные шрифты в ассетах стилей, перейдите к этим стилям и выберите нужное семейство в новом поле во вкладке «Шрифты» в редакторах стилей.
* Если вы создавали текстовые метки с помощью кода, шрифт этой метки должен совпадать с именем выбранного семейства шрифта. Убедитесь также, что вы используете правильный вес шрифта.

Если вам нужна помощь в переходе на v5, задайте вопрос в нашем [Discord-сервере](https://comigo.games/rudiscord).

