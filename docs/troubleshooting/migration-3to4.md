# Migration guide for ct.js v4.0.

## Ct.js lost its `ct.`! 🙀

All the `ct.something` lines are now just `something`, with few exceptions:

* `ct.sound` is now `sounds`, in plural form.
    * `ct.sound.spawn` is now `sounds.play`
    * Some options and methods may be different; see the new [sounds](../sounds.md) docs.
* `ct.delta` is now `u.delta`, `ct.deltaUi` is `u.deltaUi`.
* `ct.room` is now `rooms.current`.
* `ct.pixiApp` is now just `pixiApp`.
* `ct.roomWidth` and `ct.roomHeight` are now `rooms.current.viewWidth` and `rooms.current.viewHeight`.
* `ct.speed` is now `settings.targetFps`.

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

## New values for tracking time and changes in `this.move()` and backgrounds

Aside from `u.delta` and `u.deltaUi`, ct.js now also has `u.time` and `u.timeUi`, which are computed in secods and show the time passed between the last frame and the current one. It is recommended that you use these values for velocity and other time-dependent variables instead of `u.delta` and `u.deltaUi`, as the latter two won't provide smooth movement if you change the framerate cap in-game.

* Due to that, `this.move()` method now uses these values as well, and you will need to multiply your speed values by your Max FPS number you've defined in project's rendering settings. (Defaults to 60.)

* This also affects `place.moveSmart` and `place.moveBullet`, as well as backgrounds' movement speed.

* With acceleration values like those in `this.gravity` and `this.addSpeed`, you will need to multiply these with your max framerate **twice** (which is 3600 with default framerate), because physics.

* `u.delta` and `u.deltaUi` are now deprecated, though still available for use.

## FitToScreen catmod is now a part of ct.js core library

Viewport settings are moved to project's render settings. Moreover, you can change viewport settings on the fly in the game with the new [settings API](/settings.md#settings-viewmode)!

## Skeletal animations are no longer supported

Ct.js updated its underlying graphics library pixi.js, and though it brought various benefits for development and rendering performance, the DragonBones runtime is no longer supported by it, thus the skeletal animations are no longer supported in ct.js. Ct.js will probably add support for another runtime if its license is MIT-compatible.

## Pixi.js was updated from v5.3 to v7.1

This includes some breaking changes and deprecations from the underlying graphics library. Unless you are using pixi.js API directly, this should not affect your projects.

## Catmods

The `/*!%start%*/` injection was removed. Instead, write code in the `index.js` file.