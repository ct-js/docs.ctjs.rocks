# Migrating from v1.2 to v1.3

In ct.js v1.3, a concept of a camera was introduced. Previously, the viewport was moved by changing parameters `ct.room.x` and `ct.room.y`. These are now read-only, and moving the viewport is made by changing `ct.camera` parameters.

The camera has additional features like scaling, rotating the viewport, and adding screen shake effect.

It also introduced the concepts of game coordinates and UI coordinates. Shortly, "game coordinates" are those you were using before — they are for stuff placed in game's world —, and "UI coordinates" are exclusively for UI layers.

So,

- use `ct.room.x` instead of `ct.camera.getTopLeftCorner().x`;
- use `ct.room.y` instead of `ct.camera.getTopLeftCorner().y`;
- use `ct.viewWidth` instead of `ct.camera.width` for UI and `ct.camera.getBoundingBox().width` for game coordinates;
- use `ct.viewHeight` instead of `ct.camera.heght` for UI and `ct.camera.getBoundingBox().heght` for game coordinates;

For their combinations, like `ct.room.x + ct.viewWidth`, better use camera's special functions and parameters. For example, `ct.room.x + ct.viewWidth` is `ct.camera.width` in UI coordinates and `ct.camera.left` in game coordinates (though you will need to use `ct.camera.getTopRightCorner` and `ct.camera.getBottomLeftCorner` while working with rotated cameras).
