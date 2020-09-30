# ct.types

This object allows you to create new Copies and manipulate them.

### `ct.types.copy(type: String, x, y)` and `ct.types.make(type: String, x, y)`

Creates a Copy of a given Type. If x or y is omitted, they are set to 0.

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