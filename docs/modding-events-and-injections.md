# Extending ct.js' gameplay loop with injections

Injections are a powerful instrument to extend functionality of ct.js framework beyond adding methods or properties. It allows you to add logic to a game loop, load resources, create bundled Templates, etc.

The `injects` folder inside your module's directory accepts files with code that will be injected while exporting a game. All of them are optional, and here is a list of all the possible injections:

**General events**:

* `load.js` – fired once when a game's code has loaded, but nothing still happened, e.g. no resources were loaded;
* `start.js` – fired once when all the game's resources have been loaded. No game logic have been run yet.
* `switch.js` – fired each time when a room is switched, but before any other code. Here, a `room` variable is a name of the new room.

**Room-specific events**:

* `beforeroomoncreate.js` — fired before a room is created, but after a camera and renderer are set.
* `roomoncreate.js` – fired after entering a new room. This code is evaluated *after* user-defined OnCreate code, when all the copies were created. Here, `this` equals to a new room.
* `roomonleave.js` – fired before leaving a room, but *before* any user's script.  Copies still exist here.
* `beforeroomdraw.js`
* `afterroomdraw.js`
* `beforeroomstep.js`
* `afterroomstep.js`

**Copy-specific events**:

* `onbeforecreate.js` — applied to a newly created Copy, before its OnCreate event, but after its type information was applied. Works with bare Copies (copies of no template) as well.
* `oncreate.js` – applied to a newly created Copy, right *after* its own OnCreate event.
* `ondestroy.js` – applied to a Copy before it gets deleted. This code is called *before* a Copy's OnDestroy event.
* `beforedraw.js`
* `beforestep.js`
* `afterdraw.js`
* `afterstep.js`

**Templating and utilities**:

* `css.css` – injects CSS into an exported game.
* `res.js` – called once while parsing loaded images.
* `resload.js` – called once after all the resources were loaded.
* `templates.js` – here you can place your own Templates.
* `styles.js` – here you can place your own drawing styles.
* `htmltop.html` – this code is placed right before the drawing canvas.
* `htmlbottom.html` – this code is placed right after the drawing canvas.

Also see [Call order with mod's injections](event-order.html#call-order-with-mod-s-injections) for a more complete picture of call order.

## Templating

Each injection can substitute a special label with a [value from your settings](modding-settings-and-extensions.html). If you defined a setting field with a key `enableSockets`, then all matches with `/*%enableSockets%*/` in js, css, and html files will be replaced with user's chosen value.

Be wary, as a field may return an empty value. In JavaScript, you may use this wrapper to safely read a variable without breaking syntax: `[/*%enableSockets%*/][0]`. This will return either the defined value or `undefined`.

:::tip
Templating is also supported in your `index.js` file.
:::