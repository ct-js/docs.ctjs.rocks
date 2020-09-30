# `Background` class

Here you will find properties that allow changing speed, position, repeat pattern and parallax effect of backgrounds in-game, among other properties like `tint` and `alpha`.

### Positioning and movement

Each background has these properties that set how background is positioned in the viewport:

Property | Type | Description
-|-|-
`shiftX` | `number` | How much to shift the texture horizontally, in pixels.
`shiftY` | `number` | How much to shift the texture vertically, in pixels.
`movementX`, `movementY` | `number` | <p>The speed at which the background's texture moves by X and Y axes, wrapping around its area.</p><p>The value is measured in pixels per frame. It also takes `ct.delta` into account.</p>
`parallaxX`, `parallaxY` | `number` | <p>A value that makes background move faster or slower relative to other objects. It is often used to create an effect of depth.<p><p>`1` means regular movement, values smaller than 1 will make it move slower and make an effect that a background is placed farther away from camera; values larger than 1 will do the opposite, making the background appear closer than the rest of object.</p>
`isUi` | `boolean` | Set it to `true` for backgrounds that are added to UI layers. It is needed for proper alignment of background layers.
`repeat` | `string` | One of `'repeat'`, `'repeat-x'`, `'repeat-y'`, or `'no-repeat'`.

### Removing a background

Similar to types, a background can be removed with `bg.kill = true;`, where `bg` is the backgrond that needs to be removed.

### Other interesting properties

Backgrounds inherit lots of properties and methods of [`PIXI.TilingSprite`](https://pixijs.download/release/docs/PIXI.TilingSprite.html), and there are some you can find useful:

Property | Type | Description
-|-|-
`alpha` | `number` | Opacity of the layer between 0 and 1. `0` is fully transparent, `1` is fully opaque (default).
`tint` | `number` (hex value) | The color of the background. `0xffffff` is white (default), `0xff0000` will make it red.
`blendMode` | `PIXI.BLEND_MODES` (`number`) | How to mix the background with the rest of the world. Defaults to `PIXI.BLEND_MODES.NORMAL`. Can be one of: <ul><li>`PIXI.BLEND_MODES.NORMAL`</li> <li>`PIXI.BLEND_MODES.ADD`</li> <li>`PIXI.BLEND_MODES.MULTIPLY`</li><li>`PIXI.BLEND_MODES.SCREEN`</li></ul>