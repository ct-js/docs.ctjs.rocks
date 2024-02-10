# emitters

The module `emitters` allows you to fire particle effects, attach them to copies, or make them follow one.

Internally, it is based on the [`particle-emitter` module](https://github.com/pixijs/particle-emitter).

::: warning Note:
If you don't have any emitter tandems in your project, then `emitters` won't be available. It is bundled only if you have particle systems in your project to make the browser builds smaller.
:::

## Creating effects

There are three methods with different logic, each suitable for particular situations:

* `emitters.fire('NameOfTheTandem', x, y)` spawns an effect in a specified location, and that's all. It is useful for creating effects that shouldn't follow anything or move, e.g. for explosions, sparkle bursts, or impact effects.
* `emitters.follow(parentCopy, 'NameOfTheTandem')` are good for long effects that should be attached to a copy. They leave particles behind if moved. It is suitable for a smoke effect, a trail, bubbles, and so on.
* `emitters.append(parentCopy, 'NameOfTheTandem')` is similar to `follow`, but old particles are moved with an emitter. It is useful while making magic shield bubbles, or for particles that should stay *inside* a copy (think of a movable flask with boiling liquid and bubbles in it).

Let's see them all in action (note how the trail reacts to the robot's movement):

`emitters.fire` | `emitters.follow` | `emitters.append`
-|-|-
![](./images/emittersFire.gif) | ![](./images/emittersFollow.gif) | ![](./images/emittersAppend.gif)

::: code-tabs#tutorial
@tab JavaScript
```js
// The code from the "fire" example
emitters.fire('HeartTrail', this.x, this.y - 70);
```
@tab CoffeeScript
```coffee
# The code from the "fire" example
emitters.fire 'HeartTrail', @x, @y - 70
```
:::

::: code-tabs#tutorial
@tab JavaScript
```js
// The "follow" example
emitters.follow(this, 'HeartTrail', {
    position: {
        x: 0,
        y: -70
    }
});
```
@tab CoffeeScript
```coffee
# The "follow" example
followSettings =
    position:
        x: 0
        y: -70
emitters.follow this, 'HeartTrail', followSettings
```
:::

::: code-tabs#tutorial
@tab JavaScript
```js
// The "append" example
emitters.append(this, 'HeartTrail', {
    position: {
        x: 0,
        y: -70
    }
});
```
@tab CoffeeScript
```coffee
# The "append" example
appendSettings =
    position:
        x: 0
        y: -70
emitters.append this, 'HeartTrail', appendSettings
```
:::

## Additional options

You may have noticed that these three methods accept an additional argument (e.g. `emitters.fire('NameOfAnEffect', x, y, options);`). It is an object, and has properties for tweaking an effect's look and behavior:

* `scale` — scaling object with `x` and `y` parameters.
* `position` — set this to additionally shift the emitter tandem relative to the copy it was attached to, or relative to the copy it follows. This does not work with `emitter.fire`.
* `prewarmDelay` — if less than 0, it will prewarm the emitter tandem, meaning that it will simulate a given number of seconds before showing particles in the world. If greater than 0, it will postpone the effect for the specified number of seconds.
* `tint` — a color applied to the whole effect, e.g. 0xff0000 to make it red.
* `alpha` — opacity set to the whole effect, from 0 (invisible) to 1 (fully opaque, like in ct.IDE).
* `rotation` — rotation in degrees.
* `isUi` — if set to true, will use the time scale of UI layers. This affects how an effect is simulated during slow-mo effects and game pause.
* `depth` — the depth of the tandem. Defaults to `Infinity` (will overlay everything).
* `room` — the room to attach the effect to. Defaults to the current main room (`rooms.current`). It has no effect with `emitters.attach`, as you already specify an effect's parent in the first argument.

Each property is optional. An example: if we would like to create a smaller reddish effect above a copy that stays at the same depth as the copy, we would write:

::: code-tabs#tutorial
@tab JavaScript
```js
emitters.follow(this, 'Debuff', {
    scale: {
        x: 0.75,
        y: 0.75
    },
    position: {
        x: 0,
        y: -80
    },
    tint: 0xff9999,
    depth: this.zIndex
});
```
@tab CoffeeScript
```coffee
followSettings =
    scale:
        x: 0.75
        y: 0.75
    position:
        x: 0
        y: -80
    tint: 0xff9999
    depth: @depth
emitters.follow this, 'Debuff', followSettings
```
:::

## Manipulating emitters

By themselves, created effects will behave well: they will stop automatically when their time is up, or when their owner was destroyed, leaving a nice trail of particles. But sometimes we need to fully clean up the effect, or pause it and resume later, or stop it completely earlier than usual.

Each of the `emitters.fire`, `emitters.append` and `emitters.follow` return a reference to the created effect which we can use:

::: code-tabs#tutorial
@tab JavaScript
```js
// Let's create a shield bubble!
this.shield = emitters.append(this, 'BubbleEffect');

// Later, when we no longer need the shield:
this.shield.stop();
this.shield = null; // Forget about the effect to free memory
```
@tab CoffeeScript
```coffee
# Let's create a shield bubble!
@shield = emitters.append this, 'BubbleEffect'

# Later, when we no longer need the shield:
@shield.stop()
@shield = null # Forget about the effect to free memory
```
:::

There is a number of properties we can use in such way:

* `emitter.stop();` prevents spawning new particles. When previous particles disappear, the emitter tandem will destroy itself.
* `emitter.clear();` instantly clears all the particles.
* `emitter.kill` is a property similar to copies' `kill` property: setting it to `true` will instantly destroy the effect with all its particles.
* `emitter.frozen` stops updating the effect if set to `true`.
* `emitter.pause()` stops spawning new particles, but the remaining particles are still animated. You can resume the spawning back with `emitter.resume();`.
