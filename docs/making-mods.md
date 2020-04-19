# Making your own modules

Any module is a directory with a following structure:

* `includes`
  * (files to be copied to a resulting game)
* `injects`
  * (injects go here)
* `CHANGELOG.md`
* `DOCS.md`
* `index.js`
* `LICENSE` (plain text, strongly recommended)
* `module.json` **(required)**
* `README.md` (strongly recommended to include)

`index.js` usually represents the main code of your module, and is bundled with all the remaining code of compiled game. A rule of thumb is to pack all your dependencies in one file or, if your dependency is an another ct module, to explicitly state it in README.md.

`module.json` allows your module to be discoverable by ct.IDE, and contains basic info, list of authors and description of module settings.

`README.md` is a markdown file with general info, examples, special notes, etc. It is showed on the 'Info' tab in ct.IDE's modules section.

`DOCS.md` is shown on the 'Documentation' tab in ct.IDE's modules section and is a markdown file too.

`CHANGELOG.md` should contain a history of changes, if any.

## Structure of `module.json`

`module.json` is the only required file for your modules. It has the following format:

```json
{
    "main": {
        "name": "Module's name",
        "version": "1.0.0",
        "authors": [{
            "name": "Cosmo Myzrail Gorynych",
            "mail": "admin@nersta.ru"
        }, {
            ...
        }]
    },
    "fields": [{
        "name": "Field's name",
        "key": "field",
        "id": "field",
        "desc": "Field's description",
        "default": "default value",
        "type": "text"
    }, {
        ...
    }],
    "typeExtends": [{
        "name": "Field's name",
        "type": "text",
        "default": "default value",
        "key": "ctype"
    }],
    "dependencies": ["tween", ...],
    "optionalDependencies": ["place", ...]
}
```

## Listing dependencies <badge>new in v1.3</badge>

Currently, catmods may express their dependency in other module with fields `dependencies` and `optionalDependencies` inside `module.json`. It allows ct.IDE to warn users about missing (disabled) modules. Please write info about getting custom modules in the "readme" section.

```json {9,10}
{
    "main": {
        "name": "An example module json with dependencies",
        "version": "1.0.0",
        "authors": [
            ...
        ]
    },
    "dependencies": ["tween"],
    "optionalDependencies": ["place"]
}
```

## Adding injections

Injects are a powerful instrument to extend functionality of ct.js framework beyond adding methods or properties. It allows you to add logic to a game loop, load resources, create bundled Types, etc.

The `injects` folder contains files which code should be injected while exporting a game. All of them are optional, and here is a list of all the possible injections:

**General events**:

* `load.js` – fired once when a game's code has loaded, but nothing still happened, e.g. no resources were loaded;
* `start.js` – fired once when all the game's resources have been loaded. No game logic have been run yet.
* `switch.js` – fired each time when a room is switched, but before any other code. Here, a `room` variable is a name of the new room.

**Room-specific events**:

* `beforeroomoncreate.js` — fired before a room is created, but a camera and renderer are set.
* `roomoncreate.js` – fired after entering a new room. This code is evaluated *after* user-defined OnCreate code, when all the copies were created. Here, `this` equals to a new room.
* `roomonleave.js` – fired before leaving a room, but *before* any user's script.  Copies still exist here.
* `beforeroomdraw.js`
* `afterroomdraw.js`
* `beforeroomstep.js`
* `afterroomstep.js`

**Copy-specific events**:

* `oncreate.js` – applied to a newly created Copy, right *after* its own OnCreate event.
* `ondestroy.js` – applied to a Copy before it gets deleted. This code is called *before* a Copy's OnDestroy event.
* `beforedraw.js`
* `beforestep.js`
* `afterdraw.js`
* `afterstep.js`

**Templating and utils**:

* `css.css` – injects CSS into an exported game.
* `res.js` – called once while parsing loaded images.
* `resload.js` – called once after all the resources were loaded.
* `types.js` – here you can place your own Types.
* `styles.js` – here you can place your own drawing styles.
* `htmltop.html` – this code is placed right before the drawing canvas.
* `htmlbottom.html` – this code is placed right after the drawing canvas.

### Adding fields

Adding fields allows users configure your mods from inside ct.IDE, on a 'Settings' tab of your mod. You can have any numbers of fields and use them inside your main code or injects.

Fields are described in `module.json`, and can be one of these types:

* `input` – a simple text input for short strings;
* `textfield` – a large textarea for a long input;
* `number` – an input field for integers;
* `checkbox` – a checkbox for Boolean variables;
* `radio` – a list of predefined values to choose from.

A field's `id` must be unique for a module. A `key` determines which parts of code should be replaced  with the field's value. If you have a field with a key `'enabled'`, then all matches with `/*%enabled%*/` or `%enabled%` will be replaced by a field's value. There can also be a `help` field, that will be shown below the input field and can contain some hints or an expanded explanation of what your field does.

```json Example from default akatemplate module
{
    "main": {
        "name": "Basic Template",
        "version": "1.0.0",
        "authors": [{
            "name": "Cosmo Myzrail Gorynych",
            "mail": "admin@nersta.ru"
        }]
    },
    "fields": [
        {
            "name": "HTML top",
            "key": "toptop",
            "id": "toptop",
            "default": " ",
            "type": "textfield"
        },
        {
            "name": "HTML bottom",
            "key": "botbot",
            "id": "botbot",
            "default": " ",
            "type": "textfield"
        },
        {
            "name": "CSS",
            "key": "csscss",
            "id": "csscss",
            "default": " ",
            "type": "textfield"
        }
    ]
}
```

#### Adding radio inputs (example)

```json
{
    "main": {
        ...
    },
    "fields": [{
        "name": "List name",
        "type": "radio",
        "key": "variable",
        "id": "variable",
        "default": "value1",
        "options": [{
            "value": "value1",
            "name": "First value",
            "help": "A little hint that will go right after the first variant"
        }, {
            "value": "value2",
            "name": "Second value",
            "help": "A little hint that will go right after the second variant"
        }, {
            ...
        }]
    }]
}
```

## Adding extensions to the type editor

You can define additional fields that will be available in the type editor. They will be displayed in the left column:

![](./images/modsFields.png)

That's how you define them inside the `module.json`:

```json
{
    "main": {
        ...
    },
    "typeExtends": [{
        "name": "Field name in the UI",
        "type": "text",
        "key": "varName"
    }]
}
```

For now, supported values are:

* `text` that will yield `String`s;
* `number` that will yield `Number`s;
* `checkbox` that will yield `Boolean`s.

## Adding new input methods

Since `v1.0.0-next-3`, ct.js now uses Actions system for managing inputs from mouse, keyboard, gamepads, etc. If you are making a module with a new input method, you should do a couple of things:

### Provide a list of available input signals (aka input methods)

This is done to allow users to select your new input methods in ct.IDE, with an Action editor. To do so, you should add a new entry `inputMethods` to your `module.json`:

```json
{
    "main": {
        "name": "A catmod for a new input method",
        "version": "0.0.0",
        "authors": [{/*...*/}]
    },
    "inputMethods": {
        "Code1": "The name of the first button, axis, etc.",
        "Code2": "The name of the second button, axis, etc.",
        "Code3": "The name of the third button, axis, etc."
    }
}
```

Next, you should write your module so that it updates the `ct.inputs.registry`. It is a map-like object with keys equal to your module name + signal code, e.g. `keyboard.KeyW` or `mouse.Left`, and `Number` values from `-1` to `1`. Here, `0` means that there is no signal (e.g. a button is not pressed or a gamepad's thumb is in its resting position). Analog sticks will use a full range of `(-1, 1)`, when buttons will usually alternate between `0` and `1`.

```js
ct.inputs.registry['keyboard.keyW'] = 1;
ct.inputs.registry['gamepad.LeftThumbX'] = 0.2;
```

## Adding type definitions and code completions

From version 1.2., ct.js now supports adding type definitions for catmods. With these, you can provide live type checks, code completion, and rich documentation when users hover over your method names.

Ct.js will look for a file `types.d.ts` inside the root of your module's directory. For example, `ct.place`, `ct.mouse`, and `ct.sound.howler` have them. `types.d.ts` is a [TypeScript declaration file](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html), a special manifest-like file that tells what methods and variables your module is providing. Please see the [TypeScript documentation](https://www.typescriptlang.org/docs/home.html) for more information.

By itself, a declaration file can only provide type checks and a list of completions. With [JSDoc-styled annotations](https://jsdoc.app/) and markdown comments, you can get rich documentation right in the editor.

### In practice

A `types.d.ts` file for an imaginary module called `sosiska` would look as the following:

```typescript
declare namespace ct {
    /**
     * A module for roasting flexible sausages inside your game.
     */
    namespace sosiska {
        /* Here all the methods and properties go */

        /**
         * Roasts your copy, adding a crispy crust
         * @param {Copy} me The copy that needs to be roasted
         */
        function roast(me: Copy): void;

        /**
         * Covers your copy in ketchup. Consumes `ct.sosiska.ketchup`.
         * @param {Copy} me The copy to cover in ketchup
         * @param {boolean} tonsOfKetchup If set to `true`, it will spend a LOT of ketchup on this particular copy
         */
        function addKetchup(me: Copy, tonsOfKetchup?: boolean): void;

        /**
         * Amount of ketchup left
         */
        var ketchup: number;
    }
}
```

### Built-in classes

Ct.js has a number of classes that represent in-game entities:

* `Copy`,
* `Background`,
* `Tileset`,
* `Room`,
* [All the pixi.js' classes](https://pixijs.download/release/docs/index.html).