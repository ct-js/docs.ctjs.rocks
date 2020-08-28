# ct.types

This object allows you to create new Copies and manipulate them. Each copy is an instance of Pixi's AnimatedSprite class, so you can find [much more parameters](https://pixijs.download/release/docs/PIXI.AnimatedSprite.html) at their docs site.

## Working with Copies

### Moving Copies Around

Each Copy has these parameters for movement:

- `x`, `y` — its location;
- `xprev`, `yprev` — location of a Copy in a previous frame;
- `xstart`, `ystart` — coordinates at which a copy was created;
- `speed` — movement speed (or the length of vector [hspeed; vspeed]);
- `hspeed` and `vspeed` — horizontal and vertical speed;
- `direction` — movement direction (from 0 to 360);
- `gravity` — gravity force;
- `gravityDir` — gravity direction (from 0 to 360, default is 270).

You can also call `this.addSpeed` to add speed vector to a Copy in a given direction.

```js
this.addSpeed(speed, dir);
```

To actually move a copy, you should call `this.move();` in your copy's OnStep code (it is included in each Type by default). Default movement system already takes `ct.delta` into account, so it will move with the same speed at every frame rate.

### Manipulating Copies' look

There are a number of parameters that can be changed:

- `animationSpeed` — animation speed. Higher is faster, lower is slower;
- `depth` — the drawing layer;
- `tex` — the name of a texture to use;
- `rotation` — the rotation of the copy in degrees;
- `scale` — the scale factor of the object. You can either assign a simple value (`this.scale = 0.5;`) for uniform scaling or access its `x` and `y` compounds (`this.scale.x = 0.5;`).
- `tint` — the tint applied to the sprite. This is a hex value. A value of `0xFFFFFF` will remove any tint effect. The colors are the same as in CSS, e.g. `0xFF0000` is red, `0x00FFFF` is cyan, ect;
- `alpha` — the opacity of the copy. 0 makes a copy invisible, 1 is the default (fully opaque) mode. All in between will make a gradual transparency change;
- `visible` — the visibility of the object (`true` or `false`).

Read-only variables:

- `currentFrame` — current drawing frame index. You should change it with `gotoAndPlay`, `gotoAndStop` methods;
- `totalFrames` — the total number of frames in the Copy.

Methods:

- `gotoAndPlay(frameIndex)` — goes to a specific frame and begins playing the animation;
- `gotoAndStop(frameIndex)` — stops the animation and goes to a specific frame;
- `play()` — plays the animation;
- `stop()` — stops the animation.

### Misc

- `type` — the name of the Type from which a Copy was created;
- `getRoom()` — returns the room that owns the current copy. This is useful when working with different rooms in a stage.

### Deleting Copies

To delete a Copy, simply set its `kill` parameter to `true`.

**Example:** delete a Copy, if its health is depleted

```js
if (this.health <= 0) {
    this.kill = true;
}
```

::: tip Note
OnStep code [will still be executed](ct.html#Event-sequence) until the drawing phase.
:::

## Methods and properties of ct.types

### `ct.types.addSpeed(o: Copy, spd, dir)`

Adds a speed vector to a given Copy. This is the same as calling `o.addSpeed(spd, dir);` on that copy.

::: warning DEPRECATED
This method will soon be removed; instead of it, use `this.addSpeed(spd, dir)` inside your copies' code.
:::

### `ct.types.copy(type: String, x, y, {}: onCreate, parentRoom)`

*Alias:* `ct.types.make`

Creates a Copy of a given Type. If x or y is omitted, they are set to 0. Specifying a parent Room will create the Copy within the context of the room; this argument is optional. The `{}` object can be used to add parameters that will be available in a Copy's oncreate.

**Example:** add a copy to a room.

```js
var room = ct.rooms.list['Level_1'][0];
var newEnemy = ct.types.copy('Enemy', 10, 10, {}, room);
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
