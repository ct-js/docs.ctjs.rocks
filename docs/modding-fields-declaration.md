# Fields reference for module settings and additional fields

Both [module settings](modding-settings-and-extensions.html) and extensions for built-in types are implemented by writing a declaration of editable fields in `module.json`. A declaration is an array of objects, with each object being one editable field. Let's take a look at `ct.place` module and its `module.json` (look at the `fields` array):

```json
{
    "main": {
        "name": "ct.place",
        "version": "3.1.0",
        "authors": [{
            "name": "Cosmo Myzrail Gorynych",
            "mail": "admin@nersta.ru"
        }]
    },
    "fields": [{
        "name": "Partitioning",
        "type": "h2"
    }, {
        "name": "Grid size X",
        "help": "Tells ct.place how to spacially group copies. This should be at least as large as the horizontal side of the biggest colliding sprite of your game.",
        "key": "gridX",
        "default": 512,
        "type": "number"
    }, {
        "name": "Grid size Y",
        "help": "Tells ct.place how to spacially group copies. This should be at least as large as the vertical size of the biggest colliding sprite of your game.",
        "key": "gridY",
        "default": 512,
        "type": "number"
    }, {
        "name": "Debug mode",
        "type": "h2"
    }, {
        "name": "Enable",
        "help": "Displays collision shapes, collision groups and partitions. It will also write additional keys to most colliding objects. Doesn't work on hidden objects.",
        "key": "debugMode",
        "default": false,
        "type": "checkbox"
    }, {
        "name": "Debug text size",
        "key": "debugText",
        "default": 16,
        "type": "number"
    }]
    /* ... */
}
```

So a field is an object with this interface:

```ts
declare interface IExtensionField {
    name: string, // The displayed name.
    type: string, // The type of a field
    key?: string, // The name of a JSON key to write into the `opts.entity`. Not needed for hN types, but required otherwise
    default?: any, // The default value; it is not written to the `opts.entity`, but is shown in inputs.
    help?: string, // A text label describing the purpose of a field
    options?: Array<{ // Used with type === 'radio'.
        value: any,
        name: string,
        help?: string
    }>
}
```

Here we mark optional fields in form of `key?: type`. The required fields are `name` and `type`. The former is a text label that is shown before an input field; the latter is a string that defines input method displayed for a user. It can be one of these strings:

* `input` – a simple text input for short strings;
* `textfield` – a large textarea for a long input;
* `number` – an input field for integers;
* `checkbox` – a checkbox for Boolean variables;
* `radio` – a list of predefined values to choose from. This type also requires an `options` array to be set;
* `texture` – a link to an asset in a project; <badge>new in v1.4</badge>
* `type` – same as `texture`, but for types; <badge>new in v1.4</badge>
* `point2D` — displays a pair of number inputs with X and Y labels. Stores values as an array of two numbers; <badge>new in v1.4</badge>
* `h1`, `h2`, `h3` and `h4`. These are not really for any input, but display a heading to categorize fields in catmod's settings tab. Such fields require `type` and `name` only. <badge>new in v1.4</badge>

For settings, field's `key` must be unique for a module. For extended fields of types and other assets, it should be unique all across a user's codebase, so naming a key in form of `mymodMyfieldname` is a good idea.

## Adding radio inputs

You can present a number of choices for your user in a group, and allow them to pick one in it. This can be done with `radio` input type, and it requires an `options` array that describes possible values and their labels:

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

## Unwrapping UIDs of types and textures

When you define a field with type `texture` or `type` and a user selects an asset for this field, a UID of a resource is stored. To tell ct.js to turn this UID into a name of a particular asset, you should add a postfix `@@assetType` at the end, writing the correct asset type:

* `yourVarName@@type` for types;
* `yourVarName@@texture` for textures.

The exported value will then be the name of an asset, as it is displayed in IDE and is usually used in code.

This works both for injections and extensions for types. For injections, if you have a `key` in form of `yourVarName@@assetType`, matches with `/*%yourVarName%*/` or `%yourVarName%` will be replaced.