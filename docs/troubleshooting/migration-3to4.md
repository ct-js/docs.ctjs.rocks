# Migration guide for ct.js v4.0.

## Ct.js lost its `ct.`! 🙀

All the `ct.something` lines are now just `something`, with few exceptions:

* `ct.sound` is now `sounds`, in plural form.
    * `ct.sound.spawn` is now `sounds.play`
* `ct.delta` is now `u.delta`, `ct.deltaUi` is `u.deltaUi`.
* `ct.room` is now `rooms.current`.
* `ct.pixiApp` is now just `pixiApp`.
* `ct.roomWidth` and `ct.roomHeight` are now `rooms.current.viewWidth` and `rooms.current.viewHeight`.

**Example.** Old code:

```js
// A snippet from the catsteroids demo
this.targetx = ct.random.range(75, ct.camera.width - 75);
this.targety = ct.random.range(75, 300);
ct.tween.add({
    obj: this,
    fields: {
        x: this.targetx,
        y: this.targety
    },
    duration: 1500
});
```

New code:

```js
// A snippet from the catsteroids demo
this.targetx = random.range(75, camera.width - 75);
this.targety = random.range(75, 300);
tween.add({
    obj: this,
    fields: {
        x: this.targetx,
        y: this.targety
    },
    duration: 1500
});
```

### `camera` is not writable now

You can't assign a new camera to the `camera` variable.

## FitToScreen catmod is now a part of ct.js core library

Viewport settings are moved to project's render settings. Moreover, you can change viewport settings on the fly in the game with the new [settings API](/settings.md#settings-viewmode)!

## Skeletal animations are no longer supported

Ct.js updated its underlying graphics library pixi.js, and though it brought various benefits for development and rendering performance, the DragonBones runtime is no longer supported by it, thus the skeletal animations are no longer supported in ct.js. Ct.js will probably add support for another runtime if its license is MIT-compatible.

## Pixi.js was updated from v5.3 to v7.1

This includes some breaking changes and deprecations from the underlying graphics library. Unless you are using pixi.js API directly, this should not affect your projects.

## Catmods

The `/*!%start%*/` injection was removed. Instead, write code in the `index.js` file.