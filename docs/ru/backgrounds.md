# backgrounds

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

У `backgrounds` есть API для работы с объектами `[Background](background.md)`.

## Методы и свойства

### `backgrounds.list['TextureName']`

Содержит массив всех фонов текущей текстуры в комнате. Массив для имени этой текстуры может отсутствовать, если таких фонов еще не было, поэтому вам может потребоваться проверить существование массива перед извлечением его элементов.

Фоны, которые не использовали имя текстуры ct.js при создании, будут помещены в массив `backgrounds.list.OTHER`.

#### Пример: получить первый фон с текстурой `BG_Sand` и сделать его темнее

::: code-tabs#tutorial
@tab JavaScript
```js
if (backgrounds.list['BG_Sand']) {
    const bg = backgrounds.list['BG_Sand'][0];
    bg.tint = 0x999999;
}
```
@tab CoffeeScript
```coffee
if backgrounds.list['BG_Sand']
    bg = backgrounds.list['BG_Sand'][0]
    bg.tint = 0x999999
```
:::

### `backgrounds.add(texName, frame, depth, container)`

Аргумент | Тип | Описание
- |-|
`texName` | `строка` | Имя текстуры, которая будет использоваться в качестве фона
`frame` | `число` | *(необязательно)* Индекс кадра, который нужно использовать. По умолчанию равен `0`.
`depth` | `число` | *(необязательно)* Глубина, на которой нужно разместить фон. По умолчанию равен `0`.
`container` | `PIXI.Container` | *(необязательно)* Где разместить фон. По умолчанию равен `ct.room`, но может быть установлен в любой другой room или действительный контейнер Pixi.

**Возвращает** созданный экземпляр [`Background`](Background.html).

::: tip
Посетите страницу документации по [`Background` классу](Background.html), чтобы узнать, как настроить положение, внешний вид и движение фонов.
:::

#### Пример: Создание фона, установка непрозрачности и горизонтальное движение

::: code-tabs#tutorial
@tab JavaScript
```js
const bg = backgrounds.add('BG_SkyClouds', 0, -1000);
bg.alpha = 0.5;
bg.movementX = 1;
```
@tab CoffeeScript
```coffee
bg = backgrounds.add 'BG_SkyClouds', 0, -1000
bg.alpha = 0.5
bg.movementX = 1
```
:::

