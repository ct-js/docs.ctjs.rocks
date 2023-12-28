# templates

This object allows you to create new Copies and manipulate them.

### `templates.copy(template, x, y, exts)`

Creates a new Copy of a given template. `template` must be a string — the name of the template. If `x` or `y` is omitted, they are set to 0. Returns the newly created copy.

The `extensions` object can be used to add parameters that will be available in a Copy's OnCreate event.

::: tip Note
By default, this method puts the new copy in the current main room (`rooms.current`). If you want to create a copy in, say, a UI room that is stacked on top of your main room, see the `templates.copyIntoRoom` method below.
:::

#### Example: Create a bullet at the current copy's position and send it in a particular direction

::: code-tabs#tutorial
@tab JavaScript
```js
var bullet = templates.copy('Bullet', this.x, this.y);
bullet.direction = this.direction;
```
@tab CoffeeScript
```coffee
bullet = templates.copy 'Bullet', @x, @y
bullet.direction = @direction
```
:::

#### Example: Spawn a copy under a cursor on mouse click

You will need an action called `Press` that reacts to pointer's primary button. [Read more about actions here](actions.html).

::: code-tabs#tutorial
@tab JavaScript
```js
if (actions.Press.down) {
    templates.copy('Fruit', pointer.x, pointer.y);
}
```
@tab CoffeeScript
```coffee
if actions.Press.down
  templates.copy 'Fruit', pointer.x, pointer.y
```
:::

### `templates.copyIntoRoom(template, x, y, parentRoom, extensions)`

An advanced form of `templates.copy` that puts a copy into a particular `parentRoom`. Other arguments match the ones used in `templates.copy`.

#### Example: Create a copy in a layered room "UI_Layer" with additional parameters

::: code-tabs#tutorial
@tab JavaScript
```js
var uiLayer = rooms.list['UI_Layer'][0];
if (uiLayer) {
    templates.copyIntoRoom('UI_Message', 35, 65, uiLayer, {
        message: 'Your warriors have engaged the enemy!',
        type: 'alert'
    });
}
```
@tab CoffeeScript
```coffee
uiLayer = rooms.list['UI_Layer'][0]
if uiLayer
    opts =
        message: 'Your warriors have engaged the enemy!'
        type: 'alert'
    templates.copyIntoRoom 'UI_Message', 35, 65, uiLayer, opts
```
:::

### `templates.each(func: Function)`

Applies a function to all the active copies.

#### Example: destroy all the copies within a 150px radius

::: code-tabs#tutorial
@tab JavaScript
```js
var me = this;
templates.each(function () {
    if (this !== me) { // aren't we trying to destroy ourselves?
        if (u.pdc(this.x, this.y, me.x, me.y) <= 150) {
            this.kill = true;
        }
    }
});
```
@tab CoffeeScript
```coffee
me = this
templates.each ->
    if this != me # aren't we trying to destroy ourselves?
        if u.pdc(@x, @y, me.x, me.y) <= 150
            @kill = true
```
:::

::: tip
`u.pdc` computes distance between two points. This and other similar functions can be found [here](u.html).
:::

### `templates.exists(templateName)`

Checks whether there are any copies of this template's name. Will throw an error if you pass an invalid template name. Returns `true` if at least one copy exists in a room; `false` otherwise.

### `templates.valid(obj)`
Checks whether a given object exists in game's world. Intended to be applied to copies, but may be used with other PIXI entities. Returns `true` if a copy exists and is not marked for removal; `false` otherwise.

### `templates.isCopy(obj)`
Checks whether a given object is a ct.js copy. Returns `true` if the passed object is a copy; `false` otherwise.

### `templates.list['TemplateName']`

Returns an array with all the existing copies of the specified template.

#### Example: make an order to destroy all the 'Bonus' Copies

::: code-tabs#tutorial
@tab JavaScript
```js
for (var bonus of templates.list['Bonus']) {
    bonus.kill = true;
}
```
@tab CoffeeScript
```coffee
for bonus in templates.list['Bonus']
    bonus.kill = true
```
:::

### `templates.withCopy(copy: Copy, func: Function)`

Works like `templates.each`, but only for the specified Copy.

### `templates.withTemplate(template: string, func: Function)`

Works like `templates.each`, but applies a function to every copy of the specified template.
