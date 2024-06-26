# Базовые концепции

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

**Ct.js** — это модульная библиотека, написанная на JavaScript, с визуальным редактором. Редактор также называют **ct.IDE**. Игры в ct.js пишутся на JavaScript: это язык программирования веба, гибкий, простой в освоении и бесконечно глубокий. Вы также можете использовать CoffeeScript для написания кода игры, и он будет автоматически скомпилирован в JavaScript.

Любая игра в ct.js состоит из **текстур**, **копий**, **шаблонов** и **комнат**.

* Текстура — это изображение, которое само по себе не делает ничего особенного, но используется копиями и может быть нарисована с помощью кода. Этот актив также называют спрайтом, но он также может быть набором плиток, фоном и т. д.
* Копия — это логический элемент в вашей игре, который может взаимодействовать с вводами пользователя и другими копиями. Враги, деревья, пули, драгоценности, бонусы, кошки — все это копии. Копии часто называют *"объектами"*, *"акторами"* или *"инстансами"* в других игровых движках.
* Каждая копия соответствует конкретному **шаблону**. Шаблон — это шаблон для новых копий с общими настройками и поведением. Его могут называть *"классом"* или *"объектом"* в других игровых движках.
* Комната — это двумерное пространство в вашей игре, где вы размещаете копии. Комнаты могут иметь собственное дополнительное поведение (скрипты уровня). Комнаты также часто называют *уровнями* или *картами*. Внимание: в ct.js комнаты не имеют предопределенного размера, в отличие от других 2D-движков.

Существует дополнительные ресурсы, которые помогают сделать игры более насыщенными, интересными, веселыми и легкими в разработке:

* [**Действия**](./actions.md) объединяют различные методы ввода в один API, поэтому вы можете кодировать один раз для клавиатур, игровых контроллеров, виртуальных джойстиков и другого.
* [**Поведения**](./behaviors.md) используются для добавления общей логики в комнаты или шаблоны. Это редактировать так же, как и шаблоны, но с ними вы также можете определять дополнительные параметры для шаблонов помимо только событий, а затем добавлять эти поведения в любые шаблоны или комнаты.
* **Модули Catmods** — это дополнительные модули, которые хакуют в основную библиотеку и добавляют новые инструменты для программирования и новые функции в движок.
* [**Типы контента и таблицы контента**](./content-subsystem.md) — это как местная база данных для статических данных вашей игры.
* **Семейства шрифтов** позволяют использовать файлы .ttf в ваших играх, так что ваша игра будет хорошо выглядеть на любом браузере или ПК.
* **Тандем испыляющих пар**, или просто системы частиц, — это гибкие визуальные эффекты, созданные с помощью текстур. Взрывы, магические эффекты, дождь, снег и многие другие специальные эффекты могут быть созданы таким образом.
* **Скрипты** могут использоваться для создания функций, на которые можно ссылаться в шаблонах, комнатах, типах контента или вызывать напрямую с помощью `scripts.scriptName()`.
* [**Звуки**](./sounds.md) — это аудиоресурсы, которые воспроизводятся по коду.
* **Стиль** — это шаблоны для рисования меток, используемые при создании пользовательского интерфейса.

