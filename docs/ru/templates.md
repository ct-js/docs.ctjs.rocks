# templates

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Этот объект позволяет создавать новые Копии и манипулировать ими.

### `templates.copy(template, x, y, exts)`

Создает новую копию заданной шаблонной страницы. `template` должен быть строкой — именем шаблона. Если параметры `x` или `y` опущены, они устанавливаются в 0. Функция возвращает созданную копию.

Объект `extensions` можно использовать для добавления параметров, которые будут доступны в событии OnCreate копии.

:::tip Важно:
По умолчанию эта функция помещает новую копию в текущую основную комнату (`rooms.current`). Если вы хотите создать копию в комнате UI, расположенной поверх вашей основной комнаты, например, в комнате интерфейса, см. ниже метод `templates.copyIntoRoom`.
:::

#### Пример: Создать снаряд в текущем положении копии и отправить его в конкретном направлении

::: code-tabs#tutorial
@tab JavaScript
```js
var bullet = templates.copy('Bullet', this.x, this.y);
bullet.direction = this.direction;
```
@tab Civet
```coffee
bullet = templates.copy 'Bullet', @x, @y
bullet.direction = @direction
```
:::

#### Пример: Создание копии под курсором при нажатии мыши

Вам понадобится действие под названием Press, которое реагирует на нажатие основной кнопки указателя. [Читайте о действиях здесь](./actions.md).

::: code-tabs#tutorial
@tab JavaScript
```js
if (actions.Press.down) {
    templates.copy('Fruit', pointer.x, pointer.y);
}
```
@tab Civet
```coffee
if actions.Press.down
    templates.copy 'Fruit', pointer.x, pointer.y
```
:::

### `templates.copyIntoRoom(template, x, y, parentRoom, extensions)`

Данная функция представляет собой расширенную версию функции `templates.copy`, которая позволяет помещать копию шаблона в конкретную родительскую Комнату `parentRoom`. Другие аргументы соответствуют тем, что используются в функции `templates.copy`.

#### Пример: Создайте копию в слое "UI_Layer" с дополнительными параметрами

::: code-tabs#tutorial
@tab JavaScript
```js
var uiLayer = rooms.list['UI_Layer'][0];
if (uiLayer) {
    templates.copyIntoRoom('UI_Message', 35, 65, uiLayer, {
        message: 'Ваши воины вступили в бой с врагами!',
        type: 'alert'
    });
}
```
@tab Civet
```coffee
uiLayer = rooms.list['UI_Layer'][0]
if uiLayer
    opts =
        message: 'Ваши воины вступили в бой с врагами!'
        type: 'alert'
    templates.copyIntoRoom 'UI_Message', 35, 65, uiLayer, opts
```
:::

### `templates.each(func: Function)`

Применяет функцию ко всем активным копиям.

#### Пример: уничтожить все копии в радиусе 150 пикселей

::: code-tabs#tutorial
@tab JavaScript
```js
var me = this;
templates.each(function () {
    if (this !== me) { // не пытаемся ли мы уничтожить самих себя?
        if (u.pdc(this.x, this.y, me.x, me.y) <= 150) {
            this.kill = true;
        }
    }
});
```
@tab Civet
```coffee
me = this
templates.each ->
    if this != me # не пытаемся ли мы уничтожить самих себя?
        if u.pdc(@x, @y, me.x, me.y) <= 150
            @kill = true
```
:::

::: tip
`u.pdc` рассчитывает расстояние между двумя точками. Функции подобного рода можно найти [здесь](./u.md).
:::

### `templates.exists(templateName)`

Проверяет наличие копий шаблона с указанным именем. Выбросит ошибку, если вы передадите недопустимое имя шаблона. Возвращает `true`, если копии существуют по крайней мере в одной комнате; `false` в противном случае.

### `templates.valid(obj)`
Проверяет, существует ли данный объект в игровом мире. Предназначено для применения к копиям, но может использоваться и с другими объектами PIXI. Возвращает `true`, если копия существует и не помечена на удаление; `false` в противном случае.

```javascript
function isCopy(obj) {
    return obj instanceof CtJS.Copy;
}
```

### `templates.list['TemplateName']`

Возвращает массив со всеми существующими копиями указанной шаблона.

#### Пример: Приказать уничтожить все копии шаблона «Бонус»

:::code-tabs#tutorial
@tab JavaScript
```js
for (var bonus of templates.list['Бонус']) {
    bonus.kill = true;
}
```
@tab Civet
```coffee
for bonus in templates.list['Бонус']
    bonus.kill = true
```
:::

### `templates.withCopy(copy: Copy, func: Function)`

Работает как `templates.each`, но только для указанной Копии.

### `templates.withTemplate(template: string, func: Function)`

Работает как `templates.each`, но применяет функцию к каждой копии указанного шаблона.

