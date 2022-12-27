# ct.templates

This object allows you to create new Copies and manipulate them.

### `ct.templates.copy(template, x, y, exts)`

Creates a new Copy of a given template. `template` must be a string — the name of the template. If `x` or `y` is omitted, they are set to 0. Returns the newly created copy.

The `extensions` object can be used to add parameters that will be available in a Copy's OnCreate event.

::: tip Note
By default, this method puts the new copy in the current main room (`ct.room`). If you want to create a copy in, say, a UI room that is stacked on top of your main room, see the `ct.templates.copyIntoRoom` method below.
:::

#### Example: Create a bullet at the current copy's position and send it in a particular direction

::: code-tabs#tutorial
@tab JavaScript
```js
var bullet = ct.templates.copy('Bullet', this.x, this.y);
bullet.direction = this.direction;
```
@tab CoffeeScript
```coffee
bullet = ct.templates.copy 'Bullet', @x, @y
bullet.direction = @direction
```
:::

#### Example: Spawn a copy under a cursor on mouse click

You will need an action called `Press` that reacts to pointer's primary button. [Read more about actions here](actions.html).

::: code-tabs#tutorial
@tab JavaScript
```js
if (ct.actions.Press.down) {
    ct.templates.copy('Fruit', ct.pointer.x, ct.pointer.y);
}
```
@tab CoffeeScript
```coffee
if ct.actions.Press.down
  ct.templates.copy 'Fruit', ct.pointer.x, ct.pointer.y
```
:::

### `ct.templates.copyIntoRoom(template, x, y, parentRoom, extensions)`

An advanced form of `ct.templates.copy` that puts a copy into a particular `parentRoom`. Other arguments match the ones used in `ct.templates.copy`.

#### Example: Create a copy in a layered room "UI_Layer" with additional parameters

::: code-tabs#tutorial
@tab JavaScript
```js
var uiLayer = ct.rooms.list['UI_Layer'][0];
if (uiLayer) {
    ct.templates.copyIntoRoom('UI_Message', 35, 65, uiLayer, {
        message: 'Your warriors have engaged the enemy!',
        type: 'alert'
    });
}
```
@tab CoffeeScript
```coffee
uiLayer = ct.rooms.list['UI_Layer'][0]
if uiLayer
    opts =
        message: 'Your warriors have engaged the enemy!'
        type: 'alert'
    ct.templates.copyIntoRoom 'UI_Message', 35, 65, uiLayer, opts
```
:::

### `ct.templates.each(func: Function)`

Applies a function to all the active copies.

#### Example: destroy all the copies within a 150px radius

::: code-tabs#tutorial
@tab JavaScript
```js
var me = this;
ct.templates.each(function () {
    if (this !== me) { // aren't we trying to destroy ourselves?
        if (ct.u.pdc(this.x, this.y, me.x, me.y) <= 150) {
            this.kill = true;
        }
    }
});
```
@tab CoffeeScript
```coffee
me = this
ct.templates.each ->
    if this != me # aren't we trying to destroy ourselves?
        if ct.u.pdc(@x, @y, me.x, me.y) <= 150
            @kill = true
```
:::

::: tip
`ct.u.pdc` computes distance between two points. This and other similar functions can be found [here](ct.u.html).
:::

### `ct.templates.exists(templateName)`

Checks whether there are any copies of this template's name. Will throw an error if you pass an invalid template name. Returns `true` if at least one copy exists in a room; `false` otherwise.

### `ct.templates.valid(obj)`
Checks whether a given object exists in game's world. Intended to be applied to copies, but may be used with other PIXI entities. Returns `true` if a copy exists and is not marked for removal; `false` otherwise.

### `ct.templates.isCopy(obj)`
Checks whether a given object is a ct.js copy. Returns `true` if the passed object is a copy; `false` otherwise.

### `ct.templates.list['TemplateName']`

Returns an array with all the existing copies of the specified template.

#### Example: make an order to destroy all the 'Bonus' Copies

::: code-tabs#tutorial
@tab JavaScript
```js
for (var bonus of ct.templates.list['Bonus']) {
    bonus.kill = true;
}
```
@tab CoffeeScript
```coffee
for bonus in ct.templates.list['Bonus']
    bonus.kill = true
```
:::

### `ct.templates.withCopy(copy: Copy, func: Function)`

Works like `ct.templates.each`, but only for the specified Copy.

### `ct.templates.withTemplate(template: string, func: Function)`

Works like `ct.templates.each`, but applies a function to every copy of the specified template.
