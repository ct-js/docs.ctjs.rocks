# ct.backgrounds. Background objects.

`ct.backgrounds` has some API to work with backgrounds.

## Methods and properties

### `ct.backgrounds.list['TextureName']`

Contains an array of all the backgrounds of the current texture in the room. The array for this or that texture name may be absent if there are no such backgrounds yet, so you may need to check if the array itself exists before getting any of its elements.

#### Example: Get the first background with a texture `BG_Sand` and make it darker

```js
if (ct.backgrounds.list['BG_Sand']) {
    const bg = ct.backgrounds.list['BG_Sand'][0];
    bg.tint = 0x999999;
}
```

### `ct.backgrounds.add(texName, frame, depth, container)`

Argument | Type | Description
-|-|-
`texName` | `string` | The name of a texture to be used as a background
`frame` | `number` | *(optional)* The index of a frame to use. Defaults to `0`.
`depth` | `number` | *(optional)* The depth to place the background at. Defaults to `0`.
`container` | `PIXI.Container` | *(optional)* Where to put the background. Defaults to `ct.room`, but can be set to any other room or valid pixi container.

**Returns** the created `Background` instance.

## Properties of backgrounds

Properties allow changing speed, position, repeat pattern and parallax effect of backgrounds in-game, among other properties like `tint` and `alpha`.

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