# ct.backgrounds

`ct.backgrounds` has some API to work with [`Background`](Background.md) objects.

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

**Returns** the created [`Background`](Background.html) instance.

::: tip
Visit the [`Background` class documentation](Background.html) to learn how to tweak backgrounds' position, look, and movement.
:::

#### Example: Create a background, set its opacity, and make it move horizontally

```js
const bg = ct.backgrounds.add('BG_SkyClouds', 0, -1000);
bg.alpha = 0.5;
bg.movementX = 1;
```