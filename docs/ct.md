# ct

`ct` represents the game engine itself, extended with modules and core libraries. The core lib contains of:

* [ct.backgrounds](ct.backgrounds.html) for, well, managing backgrounds;
* [ct.camera](ct.camera.html) for viewport management;
* [ct.emitters](ct.emitters.html) for particle systems;
* [ct.inputs](ct.inputs.html) and [ct.actions](ct.actions.html) for handling user input;
* [ct.res](ct.res.html) for loading resources;
* [ct.rooms](ct.rooms.html) for switching and stacking multiple rooms (for UI, lighting, and gameplay, for example);
* [ct.sound](ct.sound.html) for playing and tweaking sound effects;
* [ct.styles](ct.styles.html) for reusing UI styles;
* [ct.tilemaps](ct.tilemaps.html) for dynamically generating levels made of tiles;
* [ct.timer](ct.timer.html) for asynchronous events;
* [ct.templates](ct.templates.html) for creating, finding and managing templates and copies;
* [ct.u](ct.u.html) for vector functions, among other utilities.

You will usually use the API above, as well as those APIs provided by ct.js modules.

By itself, ct.js is based on [Pixi.js](https://www.pixijs.com/), an HTML5 graphics library. You can use its API if you feel ct.js' one is not enough.

## Methods and properties

### `ct.pixiApp`

The [Pixi.js application](https://pixijs.download/release/docs/PIXI.Application.html) of the game.

### `ct.stage`

The game's root [stage](https://pixijs.download/release/docs/PIXI.Application.html#stage).

### `ct.meta`

Returns the metadata that you supplied inside the ct.js editor, such as `author`, `site`, `version` and `name`.

### `ct.delta`

A multiplier that shows how much a current frame differs from the target FPS. It will change depending on game's performance. For example, it will be `2` at 30 FPS, as a target one is 60 FPS, and it will be `1` at completely smooth target framerate.

You can use this delta while designing movement, so things move uniformly at any framerate, e.g.:

::: code-tabs#tutorial
@tab JavaScript
```js
this.x += 10 * ct.delta;
```
@tab CoffeeScript
```coffee
@x += 10 * ct.delta
```
:::

But this delta is mostly useful while designing complex or logic-driven movement, as [the default movement system](ct.templates.html#moving-copies-around) already takes `ct.delta` into account.

### `ct.deltaUi`

`ct.deltaUi` is similar to `ct.delta`, but it ignores time scaling factors that can happen during slow-mo effects or game pause (see ["Pausing a game"](tips-n-tricks/game-pause.html) for examples).
