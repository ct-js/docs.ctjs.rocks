# Аннотация блоков для языка Catnip

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Ct.js проверяет два типа файлов при добавлении блоков для вашего catmod:

* `types.d.ts` — тот же файл, используемый для автодополнения и проверки типов для файлов JavaScript/TypeScript.
* `blocks.js` — файл, в котором должен быть экспортирован (с помощью `module.exports = ...`) массив определений блоков.

Обе записи необязательны. Вы можете использовать одну или обе, чтобы создать блоки для Catnip.

Все обнаруженные блоки будут помещены в категорию, специальную для вашего catmod, но некоторые блоки могут быть дополнительно добавлены в встроенные категории по имени (поддерживается только в файле `blocks.js` на данный момент).

## Добавление аннотаций `@catnip` в файл `types.d.ts`

Вы можете добавить несколько аннотаций `@catnip`, чтобы помочь ct.js лучше преобразовать ваш файл объявлений в пригодные для использования блоки catnip. Они добавляются как специальные теги в комментарии JSDoc. Например:

```ts {4,12}
/**
 * Создает новую копию заданной шаблонной карты внутри конкретной комнаты.
 * @param template Имя используемой шаблонной карты.
 * @catnipAsset template:template
 * @param [x] X-координата новой копии. По умолчанию 0.
 * @param [y] Y-координата новой копии. По умолчанию 0.
 * @param [room] Комната, в которую добавляется копия.
 * По умолчанию текущая комната.
 * @param [params] Необязательный объект, параметры которого будут применены
 * к копии перед событием OnCreate.
 * @returns Созданную копию.
 * @catnipSaveReturn
 */
function copyIntoRoom(template: string, x = 0, y = 0, room?: Room, params?: Record<string, unknown>): BasicCopy;
```

Свойства автоматически преобразуются в блоки вычислений. (Тот, что в форме колбасы.) По умолчанию функции, которые не возвращают значения, преобразуются в блоки команд (в прямоугольной форме), а те, которые возвращают значения, преобразуются в блоки вычислений. Однако вы можете изменить это поведение — см. ниже.

Ct.js распознает следующие теги:

- `@catnipIgnore` — указывает ct.js игнорировать этот метод и не создавать для него блок.
- `@catnipLabel` — задает отображаемое имя блока. Если не задано, по умолчанию используется `@catnipName`.
- `@catnipName` — задает имя, используемое при поиске. Если не задано, имя формируется на основе имени метода и catmoda.
- `@catnipIcon` — задает иконку для этого блока. Список иконок с их именами можно найти в ct.IDE — главное меню — Meta — Открыть список иконок.
- `@catnipAsset` — указывает, что строковый аргумент должен быть меню выбора актива. Например, `@catnipAsset name:template` указывает, что аргумент `name` должен быть не простым строковым вводом, а чипом "🔍 Выбрать...", который открывает браузер активов для выбора шаблона.
- `@catnipDefault` — задает значение по умолчанию для аргумента, если он не заполнен. Например, `@catnipDefault target:this` установит аргумент `target` в ключевое слово `this`, если он не был установлен. Тег поддерживает числа, `true`, `false`, `this` и рассматривает все остальное как обычные строки.
- `@catnipList` — специальный тег для словарей, таких как `templates.list` или `rooms.templates`, чтобы рассматривать их как карты, сопоставляющие имена активов с чем-то. Тег также должен иметь значение типа активов, чтобы добавить чип "🔍 Выбрать...". Например, `@catnipList template` указывает, что задокументированное свойство является картой с именами шаблонов в качестве ключей.
- `@catnipSaveReturn` — принудительно устанавливает функцию как блок команды. Блок команды будет иметь необязательное боковое слот для переменной, которая получит возвращаемое значение. Например, вызов `templates.copy('TemplateName')` возвращает копию, но нам не всегда нужно возвращаемое значение, кроме того, этот метод более семантически подходит для команды (императивной действия, скажем), чем для получения значения. Для этого метода используется тег `@catnipSaveReturn`. **Не добавляйте этот тег в блоки, которые возвращают JS-обещания**, используйте теги ниже.
- `@catnipPromise` — принудительно устанавливает функцию как блок команды и добавляет одну или две области блоков для добавления обратных вызовов `then` и `catch` возвращаемых обещаний. Вы можете использовать `@catnipPromise both`, чтобы добавить оба поля `then` и `catch`, `@catnipPromise catch`, чтобы добавить только поле для отказа от обещания, и `@catnipPromise then`, чтобы добавить только поле для разрешения обещания. Любое другое значение или использование `@catnipPromise` как есть будет вести себя как `@catnipPromise both`.
- `@catnipPromiseSave` — добавляет боковое слот для использования аргумента в блоке `then` обещания.

## Добавление блоков через файл `blocks.js`

Файл `blocks.js` должен быть модулем CommonJS (то есть он должен возвращать значение с помощью `module.exports`). Файл должен возвращать массив блоков, которые вы хотите добавить в библиотеку Catnip.

Вот пример файла `blocks.js` из catmod "place":

```js
module.exports = [
    {
        name: 'Переместить эту копию по линии, останавливаясь перед',
        name_Ru: 'Переместить эту копию по линии, останавливаясь перед',
        type: 'command',
        code: 'move template bullet',
        icon: 'move',
        category: 'Movement',
        pieces: [
            {
                type: 'argument',
                key: 'cgroup',
                typeHint: 'string',
                required: true
            },
            {
                type: 'filler'
            },
            {
                type: 'label',
                name: 'store in',
                i18nKey: 'store in'
            },
            {
                type: 'argument',
                key: 'return',
                typeHint: 'wildcard'
            }
        ],
        jsTemplate: (values) => {
            if (values.return !== 'undefined') {
                return `${values.return} = this.moveBullet(${values.cgroup}, ${values.precision || 1});`;
            }
            return `this.moveBullet(${values.cgroup}, ${values.precision || 1});`;
        }
    },
    {
        name: 'Переместить эту копию, останавливаясь перед',
        name_Ru: 'Переместить эту копию, останавливаясь перед',
        type: 'command',
        code: 'move template smart',
        icon: 'move',
        category: 'Movement',
        pieces: [
            {
                type: 'argument',
                key: 'cgroup',
                typeHint: 'string',
                required: true
            },
            {
                type: 'filler'
            },
            {
                type: 'label',
                name: 'store in',
                i18nKey: 'store in'
            },
            {
                type: 'argument',
                key: 'return',
                typeHint: 'wildcard'
            }
        ],
        jsTemplate: (values) => {
            if (values.return !== 'undefined') {
                return `${values.return} = this.moveSmart(${values.cgroup}, ${values.precision || 1});`;
            }
            return `this.moveSmart(${values.cgroup}, ${values.precision || 1});`;
        }
    }
];
```

Поля `name`, `type`, `code`, `jsTemplate` и `pieces` являются обязательными.

* Тип может быть либо `computed`, либо `command`. Использование `computed` также требует поля `typeHint`, которое должно быть либо `"wildcard"`, либо `"string"`, либо `"number"` или `"boolean"`.
* `code` должен быть уникальным и не перекрываться с именами методов и свойств из `.d.ts`. Это то, как ct.IDE различает их (сочетая с именем вашего catmod'а) и может сериализовать блоки.
* `pieces` может быть пустым массивом, если вам не нужны дополнительные элементы.
* Существует поле `icon`, если вы хотите использовать иконку, специфичную для вашего блока, отличную от той, которая установлена в `module.json`.

Любые обнаруженные ошибки будут записаны в консоль разработчика ct.IDE (доступную из головного меню — Отладка), когда вы откроете проект или включите новый catmod.

### Перевод блоков

Вам может быть mogelijk повторно использовать уже использованные ключи. Доступные переводческие ключи можно найти в файле data — i18n — English.json в папке ct.js — объект `catnip`.

* `i18nKey` используется для `name` блока, который будет виден в поиске. Ключи для них хранятся в словаре `catnip.blockNames`.
* `displayI18nKey` используется для метки, отображаемой внутри блока самого. Ключи для них хранятся в словаре `catnip.blockDisplayNames`.
* Метки имеют свой собственный `i18nKey`, ключи для которых хранятся в словаре `catnip.labels`.

Если вы не можете повторно использовать существующие ключи, вы можете добавить переводы для `name` и `displayName`, добавив подобный ключ с подчеркиванием и кодом региона: например, `name_Ru` будет именем, используемым для русского языка.

### Увеличение встроенных категорий

Вы можете добавить поле `category` для блока и указать имя категории, в которую вы хотите добавить этот блок.

Имена встроенных категорий:

- *Свойства и переменные*
- *Перемещение*
- *Внешний вид*
- *Действия*
- *Шаблоны*
- *Комнаты*
- *Поведения*
- *Звуки*
- *Стиль*
- *Фон*
- *Эмиттеры тандемов*
- *Утилиты*
- *Параметры*
- *Камера*
- *Логика*
- *Математика*
- *Строки*
- *Объекты*
- *Массивы*
- *Разное*
- *Консоль

### Добавление дополнительных элементов (иконки, аргументов) в блок

Все, что не является иконкой или названием блока, определяется в массиве `pieces` блока. Каждый элемент может быть одним из следующих интерфейсов:

```ts
declare interface IBlockPieceLabel {
    type: 'label';
    name: string;
    i18nKey?: string;
}
declare interface IBlockPieceIcon {
    type: 'icon';
    icon: string;
}
declare interface IBlockPieceCode {
    type: 'code';
    key: string;
}
declare interface IBlockPieceArgument { // Чип для константного значения или ссылки на ресурс
    type: 'argument';
    key: string;
    typeHint: blockArgumentType;
    defaultConstant?: string;
    required?: boolean;
    assets?: resourceType | 'action';
}
declare interface IBlockPieceTextbox {
    type: 'textbox';
    key: string;
    default?: string;
}
declare interface IBlockPieceBlocks { // Область блока
    type: 'blocks';
    placeholder?: 'ничто не делать';
    key: string;
}
declare interface IBlockPieceBreak { // Полосчатая линия
    type: 'break'
}
declare interface IBlockFiller { // Перемещает следующие блоки вправо
    type: 'filler'
}
declare interface IBlockAsyncMarker { // Добавляет иконку Async
    type: 'asyncMarker'
}
```

`blockArgumentType` может быть `'boolean' | 'number' | 'string' | 'wildcard' | 'void'`, но `'void'` зарезервировано для внутреннего использования и не должно использоваться в пользовательских блоках.

### Вывод кода JavaScript

Каждый блок должен иметь поле `jsTemplate`, которое должно быть функцией. Эта шаблонная функция передается с аргументом `values`, который позволяет читать все аргументы и предварительно скомпилированный код списков блоков. Не нужно экранировать или кавычками оборачивать строки — используйте их так, как они есть, поскольку компилятор уже делает это для вас.

Блоки должны возвращать строку, содержащую действительный сценарий JavaScript или выражение.

Когда аргумент пуст, если не задано `defaultConstant`, то аргумент устанавливается в `"undefined"`. **Обратите внимание, что это строка.** Если список блоков пуст, его значение — пустая строка. (`""`)

## Установка иконки для блока категории

В файл `module.json` можно добавить поле "icon" в раздел `main` и установить его на строку — имя одной из иконок, перечисленных в главном меню ct.js — Метаданные — Список иконок.

