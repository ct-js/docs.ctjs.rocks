# ct.types

This object allows you to create new Copies and manipulate them.

### `ct.types.copy(type, x, y)` and `ct.types.make(type, x, y)`

Creates a new Copy of a given type. `type` must be a string — the name of the type. If `x` or `y` is omitted, they are set to 0. Returns the newly created copy.

::: tip Note
By default, this method puts the new copy in the current main room (`ct.room`). If you want to create a copy in, say, a UI room that is stacked on top of your main room, see the advanced form of this method below.
:::

#### Example: Create a bullet at the current copy's position and send it in a particular direction

```js
var bullet = ct.types.copy('Bullet', this.x, this.y);
bullet.direction = this.direction;
```

#### Example: Spawn a copy under a cursor on mouse click

You will need an action called `Press` that reacts to mouse left button. [Read more about actions here](actions.html).

```js
if (ct.actions.Press.down) {
    ct.types.copy('Fruit', ct.mouse.x, ct.mouse.y);
}
```

### `ct.types.copy(type, x, y, extensions, parentRoom)` and  `ct.types.make(type, x, y, extensions, parentRoom)`

An advanced form of `ct.types.copy` that adds parameters visible at a copy's On Create event, and also allows putting this copy into a particular room.

If `x` or `y` is omitted, they are set to 0. If `parentRoom` is set, the method will create a Copy inside the specified room. This argument is optional. The `extensions` object can be used to add parameters that will be available in a Copy's OnCreate event.

**Example:** Create a copy in a layered room "UI_Layer" with additional parameters

```js
var uiLayer = ct.rooms.list['UI_Layer'][0];
if (uiLayer) {
    ct.types.copy('UI_Message', 35, 65, {
        message: 'Your warriors have engaged the enemy!',
        type: 'alert'
    }, uiLayer);
}
```

### `ct.types.each(func: Function)`

Applies a function to all the active copies.

**Example:** destroy all the copies within a 150px radius

```js
var me = this;
ct.types.each(function () {
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

### `ct.types.exists(copy)` <badge>new in v1.3</badge>

Checks whether a given argument is a copy that exists in ct.js' world. Falsey variables like undefined ones will return `false`, as well as destroyed copies; the other times, it will return `true`. This method also works with most PIXI entities, e.g. with `PIXI.Text` and `PIXI.Graphics`.

### `ct.types.list['TypeName']`

Returns an array with all the existing copies of the specified type.

**Example:** make an order to destroy all the 'Bonus' Copies

```js
for (var bonus of ct.types.list['Bonus']) {
    bonus.kill = true;
}
```

This can be also written as following:

```js
for (var bonus of ct.types.list.Bonus) {
    bonus.kill = true;
}
```

### `ct.types.with(copy: Copy, func: Function)`

Works like `ct.types.each`, but only for the specified Copy.

### `ct.types.addSpeed(o: Copy, spd, dir)`

Adds a speed vector to a given Copy. This is the same as calling `o.addSpeed(spd, dir);` on that copy.

::: warning DEPRECATED
This method will soon be removed; instead of it, use `this.addSpeed(spd, dir)` inside your copies' code.
:::