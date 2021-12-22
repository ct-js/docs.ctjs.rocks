# `Copy` class

Copies are the entities that interact with each other on the screen and what drives the game's logic. They derive from Pixi's `AnimatedSprite` class, so you can find [much more parameters](https://pixijs.download/release/docs/PIXI.AnimatedSprite.html) at their docs site.

::: tip
To create and find copies, see the [`ct.types` reference](ct.types.html).
:::

## Moving Copies Around

Each Copy has these parameters for movement:

Property | Type | Description
-|-|-
`x`, `y` | `number` | Copy's location, by X and Y axes (horizontal and vertical axes).
`xprev`, `yprev` | `number` | The location of a Copy in a previous frame.
`xstart`, `ystart` | `number` | The coordinates at which a copy was created.
`speed` | `number` | Movement speed (or the length of vector `[hspeed; vspeed]`).
`hspeed`, `vspeed` | `number` | Horizontal and vertical speed.
`direction` | `number` | Movement direction (from 0 to 360, from right side going clock-wise).
`gravity` | `number` | Gravity force, as an amount of `speed` added at each frame.
`gravityDir` | `number` | Gravity direction (from 0 to 360, default is 90).

You can also call `this.addSpeed` to add speed vector to a Copy in a given direction.

```js
this.addSpeed(speed, dir);
```

To actually move a copy, you should call `this.move();` in your copy's OnStep code (it is included in each Type by default). Default movement system already takes `ct.delta` into account, so it will move with the same speed at every frame rate.

## Manipulating Copies' look

There are a number of parameters that can be changed:

|Property | Type | Description|
|-|-|-|
|`alpha` | `number` | The opacity of the copy. 0 makes a copy invisible, 1 is the default (fully opaque) mode. All in between will make a gradual transparency change.|
|`blendMode` | `PIXI.BLEND_MODES` (`number`) | How to mix the copy with the rest of the world. Defaults to `PIXI.BLEND_MODES.NORMAL`. Can be one of: <ul><li>`PIXI.BLEND_MODES.NORMAL`</li> <li>`PIXI.BLEND_MODES.ADD`</li> <li>`PIXI.BLEND_MODES.MULTIPLY`</li><li>`PIXI.BLEND_MODES.SCREEN`</li></ul>|
|`depth` | `number` | The drawing layer.|
|`angle` | `number` | The rotation of the copy in degrees ranging from 0 to 360, starting from right side and going clock-wise.|
|`scale` | `PIXI.ObservablePoint` | The scale factor of the object. You can either assign a simple value (`this.scale = 0.5;`) for uniform scaling or access its `x` and `y` compounds (`this.scale.x = 0.5;`).|
|`tex` | `string` | The name of a ct.js texture to use. Setting `this.tex = 'NewTexture';` will change the displayed texture and reset animation. |
|`tint` | `number` | The tint applied to the sprite. This is a hex value. A value of `0xFFFFFF` will remove any tint effect. The colors are the same as in CSS but with `0x` instead of `#`, e.g. `0xFF0000` is red, `0x00FFFF` is cyan, ect.|
|`visible` | `number` | The visibility of the object (`true` or `false`).|

## Animation

|Property | Type | Description|
|-|-|-|
|`animationSpeed` | `number` | Animation speed. Higher is faster, lower is slower.|
|`currentFrame` | `number` | **Read-only**. Current drawing frame index. You should change it with `gotoAndPlay`, `gotoAndStop` methods.|
|`totalFrames` | `number` | **Read-only**. The total number of frames in the Copy.|

Methods:

### `copy.gotoAndPlay(frameIndex)`

Goes to a specific frame and begins playing the animation.

### `copy.gotoAndStop(frameIndex)`

Stops the animation and goes to a specific frame.

### `copy.play()`

Plays the animation.

### `copy.stop()`

Stops the animation.


## Deleting Copies (`this.kill` property)

To delete a Copy, simply set its `kill` parameter to `true`.

**Example:** delete a Copy, if its health is depleted

```js
if (this.health <= 0) {
    this.kill = true;
}
```

::: tip Note
OnStep code [will still be executed](ct.html#Event-sequence) to its end. Copies get logically deleted between OnStep and Draw calls.
:::

## Misc

### `copy.getRoom()`

Returns the room that owns the current copy. This is useful when working with different rooms in a stage. Returns an instance of `Room` class.

### `copy.type`

The name of the Type from which a Copy was created (a `string`).