# `Copy` pseudoclass

Copies are the entities that interact with each other on the screen and what drives the game's logic. They derive from various Pixi.js classes depending on the base class you select.

::: tip
To create and find copies in a running game, see the [`ct.templates` reference](ct.templates.html).
:::

## Base Classes

Ct.js uses a graphics library called Pixi.js, and ct.js' copies inherit lots of properties and methods from pixi.js' classes. Usually you will be using fields documented by ct.js, but there is much more you can do with pixi.js API.

Depending on what base class you choose in a template editor, your copy will be based on one of pixi.js classes. The class determines which properties and methods copies have, and you can find docs for them there:

| Ct.js class     | Common use cases | Pixi.js parent class                                                             |
| --------------- | ---------------- | -------------------------------------------------------------------------------- |
| Animated Sprite | Characters, items, and other entities that have a texture and have a frame-by-frame animation. | [PIXI.AnimatedSprite](https://pixijs.download/dev/docs/PIXI.AnimatedSprite.html) |
| Text            | User interface. Copies made of Text templates can be tweaked in a room editor and through code. | [PIXI.Text](https://pixijs.download/dev/docs/PIXI.Text.html)                     |
| Panel           | Keeps corners of a texture intact — useful for UI buttons, panels, and stretching gameplay elements. | [PIXI.NineSlicePlane](https://pixijs.download/dev/docs/PIXI.NineSlicePlane.html) |
| Container       | Custom-made stuff that can be moved and transformed as one with its child items. | [PIXI.Container](https://pixijs.download/dev/docs/PIXI.Container.html)           |

::: warning INSTANCEOF and ct.js copies
Ct.js' base classes do not form child classes, but rather a class with a mixin applied to its instances. You cannot do `copy instanceof CopyPanel`, as `CopyPanel` is not a constructor but a type combined of a class and ct.js' Copy interface.

If you do need to use something like `instanceof` in your code, you should test against Pixi.js' parent classes to differ ct.js classes *and* use `templates.isTemplate()` to determine whether you are working with a ct.js Copy.
:::

## Moving Copies Around

Each Copy has these parameters for movement:

| Property           | Type     | Description                                                           |
| ------------------ | -------- | --------------------------------------------------------------------- |
| `x`, `y`           | `number` | Copy's location, by X and Y axes (horizontal and vertical axes).      |
| `xprev`, `yprev`   | `number` | The location of a Copy in a previous frame.                           |
| `xstart`, `ystart` | `number` | The coordinates at which a copy was created.                          |
| `speed`            | `number` | Movement speed (or the length of vector `[hspeed; vspeed]`).          |
| `hspeed`, `vspeed` | `number` | Horizontal and vertical speed.                                        |
| `direction`        | `number` | Movement direction (from 0 to 360, from right side going clock-wise). |
| `gravity`          | `number` | Gravity force, as an amount of `speed` added at each frame.           |
| `gravityDir`       | `number` | Gravity direction (from 0 to 360, default is 90).                     |

You can also call `this.addSpeed` to add speed vector to a Copy in a given direction.

::: code-tabs#tutorial
@tab JavaScript
```js
this.addSpeed(speed, dir);
```
@tab CoffeeScript
```coffee
@addSpeed speed, dir
```
:::

To actually move a copy, you should call `this.move();` in your copy's OnStep code (it is included in each Type by default). Default movement system already takes `ct.delta` into account, so it will move with the same speed at every frame rate.

## Manipulating Copies' look

There are a number of parameters that can be changed:

| Property    | Type                          | Description                                                                                                                                                                                                                                              |
| ----------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alpha`     | `number`                      | The opacity of the copy. 0 makes a copy invisible, 1 is the default (fully opaque) mode. All in between will make a gradual transparency change.                                                                                                         |
| `blendMode` | `PIXI.BLEND_MODES` (`number`) | How to mix the copy with the rest of the world. Defaults to `PIXI.BLEND_MODES.NORMAL`. Can be one of: <ul><li>`PIXI.BLEND_MODES.NORMAL`</li> <li>`PIXI.BLEND_MODES.ADD`</li> <li>`PIXI.BLEND_MODES.MULTIPLY`</li><li>`PIXI.BLEND_MODES.SCREEN`</li></ul> |
| `zIndex`    | `number`                      | The drawing layer. Copies with higher value will be drawn on top of others.                                                                                                                                                                              |
| `angle`     | `number`                      | The rotation of the copy in degrees ranging from 0 to 360, starting from right side and going clock-wise.                                                                                                                                                |
| `scale`     | `PIXI.ObservablePoint`        | The scale factor of the object. You can either assign a simple value (`this.scale = 0.5;`) for uniform scaling or access its `x` and `y` compounds (`this.scale.x = 0.5;`).                                                                              |
| `tex`       | `string`                      | The name of a ct.js texture to use. Setting `this.tex = 'NewTexture';` will change the displayed texture and reset animation.                                                                                                                            |
| `tint`      | `number`                      | The tint applied to the sprite. This is a hex value. A value of `0xFFFFFF` will remove any tint effect. The colors are the same as in CSS but with `0x` instead of `#`, e.g. `0xFF0000` is red, `0x00FFFF` is cyan, ect.                                 |
| `visible`   | `number`                      | The visibility of the object (`true` or `false`).                                                                                                                                                                                                        |

::: warning
Not all properties are supported for each base class:

* `blendMode` has no effect when you use it on a Container copy;
* `tex` property is not available on Container and Text templates.
:::

## Animation

These properties and methods are available only for Animated Sprite templates:

| Property         | Type     | Description                                                                                                 |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `animationSpeed` | `number` | Animation speed. Higher is faster, lower is slower.                                                         |
| `currentFrame`   | `number` | **Read-only**. Current drawing frame index. You should change it with `gotoAndPlay`, `gotoAndStop` methods. |
| `totalFrames`    | `number` | **Read-only**. The total number of frames in the Copy.                                                      |

Methods:

### `copy.gotoAndPlay(frameIndex)`

Goes to a specific frame and begins playing the animation.

### `copy.gotoAndStop(frameIndex)`

Stops the animation and goes to a specific frame.

### `copy.play()`

Plays the animation.

### `copy.stop()`

Stops the animation.

## Text

There are several additional properties for Text templates:

| Property    | Type                                  | Description |
| ----------- | ------------------------------------- | ----------- |
| `text`      | `string`                              | The text to display. You can change it to replace the shown text label. |
| `textStyle` | `PIXI.ITextStyle` or `PIXI.TextStyle` | The text style that defines the appearance of the text. You can get a ct.js and assign it to your label programmatically with `this.textStyle = styles.get('StyleName')` |

## Deleting Copies (`this.kill` property)

To delete a Copy, simply set its `kill` parameter to `true`.

**Example:** delete a Copy, if its health is depleted

::: code-tabs#tutorial
@tab JavaScript
```js
if (this.health <= 0) {
    this.kill = true;
}
```
@tab CoffeeScript
```coffee
if @health <= 0
    @kill = yes
```
:::

::: tip Note
OnStep code [will still be executed](ct.html#Event-sequence) to its end. Copies get logically deleted between OnStep and Draw calls.
:::

## Misc

### `copy.getRoom()`

Returns the room that owns the current copy. This is useful when working with different rooms in a stage. Returns an instance of `Room` class.

### `copy.template`

The name of the template from which a Copy was created (a `string`).

### `copy.addChild(anotherCopy)`

When using Containers, you can add other copies (or pixi.js objects) to a container, and they will be moved and transformed together. You will then position the copies inside the container relative to its x, y coordinates, not relative to the 0;0 point of the room.

Note that collision catmods usually work only if copies are placed directly in a room, so you should generally use containers for UI elements only, or for cosmetic stuff.