# ct.templates

This object allows you to create new Copies and manipulate them.

### `ct.templates.copy(template, x, y, exts)`

Creates a new Copy of a given template. `template` must be a string — the name of the template. If `x` or `y` is omitted, they are set to 0. Returns the newly created copy.

The `extensions` object can be used to add parameters that will be available in a Copy's OnCreate event.

::: tip Note
By default, this method puts the new copy in the current main room (`ct.room`). If you want to create a copy in, say, a UI room that is stacked on top of your main room, see the `ct.templates.copyIntoRoom` method below.
:::

#### Example: Create a bullet at the current copy's position and send it in a particular direction

```js
var bullet = ct.templates.copy('Bullet', this.x, this.y);
bullet.direction = this.direction;
```

#### Example: Spawn a copy under a cursor on mouse click

You will need an action called `Press` that reacts to mouse left button. [Read more about actions here](actions.html).

```js
if (ct.actions.Press.down) {
    ct.templates.copy('Fruit', ct.mouse.x, ct.mouse.y);
}
```

### `ct.templates.copyIntoRoom(template, x, y, parentRoom, extensions)`

An advanced form of `ct.templates.copy` that puts a copy into a particular `parentRoom`. Other arguments match the ones used in `ct.templates.copy`.

#### Example: Create a copy in a layered room "UI_Layer" with additional parameters

```js
var uiLayer = ct.rooms.list['UI_Layer'][0];
if (uiLayer) {
    ct.templates.copy('UI_Message', 35, 65, uiLayer, {
        message: 'Your warriors have engaged the enemy!',
        type: 'alert'
    });
}
```

### `ct.templates.each(func: Function)`

Applies a function to all the active copies.

#### Example: destroy all the copies within a 150px radius

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

::: tip
`ct.u.pdc` computes distance between two points. This and other similar functions can be found [here](ct.u.html).
:::

### `ct.templates.exists(copy)` <badge>new in v1.3</badge>

Checks whether a given argument is a copy that exists in ct.js' world. Falsey variables like undefined ones will return `false`, as well as destroyed copies; the other times, it will return `true`. This method also works with most PIXI entities, e.g. with `PIXI.Text` and `PIXI.Graphics`.

### `ct.templates.isCopy(obj)` <badge>new in v1.5</badge>
Checks whether a given object is a ct.js copy. Returns `true` if the passed object is a copy; `false` otherwise.

### `ct.templates.list['TemplateName']`

Returns an array with all the existing copies of the specified template.

#### Example: make an order to destroy all the 'Bonus' Copies

```js
for (var bonus of ct.templates.list['Bonus']) {
    bonus.kill = true;
}
```

This can be also written as following:

```js
for (var bonus of ct.templates.list.Bonus) {
    bonus.kill = true;
}
```

### `ct.templates.withCopy(copy: Copy, func: Function)`

Works like `ct.templates.each`, but only for the specified Copy.

### `ct.templates.withTemplate(template: string, func: Function)`

Works like `ct.templates.each`, but applies a function to every copy of the specified template.
