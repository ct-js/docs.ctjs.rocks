# Migrating from v1.2 to v1.3

In ct.js v1.3, a concept of a camera was introduced. Previously, the viewport was moved by changing parameters `ct.room.x` and `ct.room.y`. These are now read-only, and moving the viewport is made by changing `ct.camera` parameters.

The camera has additional features like scaling, rotating the viewport, and adding the screen shake effect.

It also introduced the concepts of game coordinates and UI coordinates. Shortly, "game coordinates" are those you were using before — they are for stuff placed in a game's world —, and "UI coordinates" are exclusively for UI layers. More on this [here](../tips-n-tricks/game-and-ui-coordinates.md).

So,

- instead of `ct.room.x`, use `0` for UI and `ct.camera.getTopLeftCorner()[0]` for game coordinates;
- instead of `ct.room.y`, use `0` for UI and `ct.camera.getTopLeftCorner()[1]` for game coordinates;
- instead of `ct.viewWidth`, use `ct.camera.width` for UI and `ct.camera.getBoundingBox().width` for game coordinates;
- instead of `ct.viewHeight`, use  `ct.camera.heght` for UI and `ct.camera.getBoundingBox().heght` for game coordinates.

For their combinations, like `ct.room.x + ct.viewWidth`, better use camera's special functions and parameters. For example, `ct.room.x + ct.viewWidth` is `ct.camera.width` in UI coordinates and `ct.camera.left` in game coordinates (though you will need to use `ct.camera.getTopLeftCorner` and `ct.camera.getBottomLeftCorner` while working with rotated cameras).

::: warning
If you are making UI, better use automatic alignment and UI layers, which are described [here](../tips-n-tricks/viewport-management.md), as they are more powerful tools when working with screen coordinates.
:::

::: tip
You should also consider using `ct.camera.moveTo` and `ct.camera.teleportTo` to move the camera. [Read about their effects here](../tips-n-tricks/viewport-management.md#moving-and-teleporting).
:::

::: tip
`ct.viewWidth` and `ct.viewHeight` are still working, but are deprecated and reflect `ct.camera.width` and `ct.camera.height` values. `ct.view*` will be removed in the next major version.
:::


Besides that,

- use `ct.camera.follow` instead of `ct.room.follow`;
- use `ct.camera.shiftX` and `ct.camera.shiftY` instead of `ct.room.followShiftX` and `ct.room.followShiftY`;
- use `ct.camera.drift` instead of `ct.room.followDrift`;
- use `ct.camera.borderX` and `ct.camera.borderY` instead of `ct.room.borderX` and `ct.camera.borderY`;
- use `ct.camera.borderX = ct.camera.borderY = null;` instead of `ct.room.center = true;`.

## Changes in built-in modules

`ct.mouse` and `ct.touch` now have additional methods and parameters, e.g. `ct.mouse.xui` and `ct.mouse.yui`, `ct.touch.hoversUi`. See their docs for the full list of new parameters.