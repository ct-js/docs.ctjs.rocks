# Annotating blocks for Catnip language

Ct.js checks for two things when adding blocks for your catmod:

* the `types.d.ts` file — the same one used for adding autocompletion and type checking support for JavaScript/TypeScript files.
* the `blocks.js` file that must export (with `module.exports = ...`) an array of block definitions.

Both files are optional. You can use one, or both, to create blocks for Catnip.

All the discovered blocks will be put in a category special for your catmod, but some blocks can additionally be put into built-in categories by their names (supported in `blocks.js` file only atm).

## Adding `@catnip` annotations to `types.d.ts`

You can add several catnip annotations to help ct.js better convert your declaration file to usable catnip blocks. They are added as special tags in JSDoc comments. For example:

```ts{4,12}
/**
 * Creates a new copy of a given template inside a specific room.
 * @param template The name of the template to use
 * @catnipAsset template:template
 * @param [x] The x coordinate of a new copy. Defaults to 0.
 * @param [y] The y coordinate of a new copy. Defaults to 0.
 * @param [room] The room to which add the copy.
 * Defaults to the current room.
 * @param [params] An optional object which parameters will be applied
 * to the copy prior to its OnCreate event.
 * @returns The created copy.
 * @catnipSaveReturn
 */
function copyIntoRoom(template: string, x = 0, y = 0, room: Room, params: Record<string, unknown> = {}): BasicCopy;
```

Properties are automatically turned into computed blocks. (The sausage-shaped ones.) By default, functions that do not return a value turn into command blocks (rectangular ones), and those that do return a value turn into computed blocks. But you can overwrite this behavior — see below.

Ct.js recognises these tags:

* `@catnipIgnore` — tells ct.js to not add a block for this method.
* `@catnipLabel` — sets the displayed name of the block. If not set, it fallbacks to `@catnipName`
* `@catnipName` — sets the name used in search. If not set, the name is formed based on the method's and catmod's name.
* `@catnipIcon` — sets the icon for this block. You can get the list of icons with its names in ct.IDE — main menu — Meta — Open the list of icons.
* `@catnipAsset` — tells ct.js that a string argument must be a menu for asset selection. Example: `@catnipAsset name:template` tells that the argument `name` should be not a simple string input but a "🔍 Select…" chip that opens an asset browser to pick a template.
* `@catnipDefault` — sets a default value for an argument when it is not filled. Example: `@catnipDefault target:this` will set argument `target` to keyword `this` if it was not set. The tag supports numbers, `true`, `false`, `this`, and treats everything else like regular strings.
* `@catnipList` — a special tag for dictionaries like `templates.list` or `rooms.templates` to treat them as maps that map asset names to something. The tag must also have a value of the assets' type to add a "🔍 Select…" chip. For example: `@catnipList template` tells that the documented property is a map with template names as its keys.
* `@catnipSaveReturn` — forces the function to be treated as a command block. The command block will get an optional side slot for a variable that will receive the returned value. For example, calling `templates.copy('TemplateName')` returns a copy, but we don't always need the returned value, plus semantically this method is more a command (an imperative action, say), than retrieving a value. For this method, the tag `@catnipSaveReturn` is used. **Do not add this tag to blocks that return JS Promises**, use tags below.
* `@catnipPromise` — forces the function to be treated as a command block and adds one or two block areas to add callbacks for returned promises' `then` and `catch` callbacks. You can use `@catnipPromise both` to add both `then` and `catch` fields, `@catnipPromise catch` to only add a field for when a promise is rejected, and `@catnipPromise then` to add a field only for when the promise resolves. Putting anything else or using `@catnipPromise` as is will behave like `@catnipPromise both`.
* `@catnipPromiseSave` — adds a side slot to use the argument in promise's `then` statement.

## Adding blocks through `blocks.js` file

`blocks.js` must be a CommonJS module (meaning that it must return a value with `module.exports`). The file must return an array of blocks you wish to add to the Catnip library.

For example, here is a blocks.js file from the `place` catmod:

```js
module.exports = [{
    name: 'Move this copy along a line stopping at',
    name_Ru: 'Переместить эту копию по линии, останавливаясь перед',
    type: 'command',
    code: 'move template bullet',
    icon: 'move',
    category: 'Movement',
    pieces: [{
        type: 'argument',
        key: 'cgroup',
        typeHint: 'string',
        required: true
    }, {
        type: 'filler'
    }, {
        type: 'label',
        name: 'store in',
        i18nKey: 'store in'
    }, {
        type: 'argument',
        key: 'return',
        typeHint: 'wildcard'
    }],
    jsTemplate: (values) => {
        if (values.return !== 'undefined') {
            return `${values.return} = this.moveBullet(${values.cgroup}, ${values.precision || 1});`;
        }
        return `this.moveBullet(${values.cgroup}, ${values.precision || 1});`;
    }
}, {
    name: 'Move this copy stopping at',
    name_Ru: 'Переместить эту копию, останавливаясь перед',
    type: 'command',
    code: 'move template smart',
    icon: 'move',
    category: 'Movement',
    pieces: [{
        type: 'argument',
        key: 'cgroup',
        typeHint: 'string',
        required: true
    }, {
        type: 'filler'
    }, {
        type: 'label',
        name: 'store in',
        i18nKey: 'store in'
    }, {
        type: 'argument',
        key: 'return',
        typeHint: 'wildcard'
    }],
    jsTemplate: (values) => {
        if (values.return !== 'undefined') {
            return `${values.return} = this.moveSmart(${values.cgroup}, ${values.precision || 1});`;
        }
        return `this.moveSmart(${values.cgroup}, ${values.precision || 1});`;
    }
}];
```

Fields `name`, `type`, `code`, `icon`, `jsTemplate`, and `pieces` are required.

* `type` can be either `computed` or `command`. Using `computed` also requires a `typeHint` which must be one of `"wildcard"`, `"string"`, `"number"`, or `"boolean"`.
* `code` must be unique and not overlap with methods' and properties' names from `.d.ts`. That's how ct.IDE differs them (combined with your catmod's name) and is able to serialize blocks.
* `pieces` can be an empty array if you don't need additional elements.

Any detected errors will be logged into ct.IDE's devtools (accessible from Main menu — Troubleshooting) console when you open a project or enable a new catmod.

### Translating blocks

You may be able to reuse already used keys. Available translation keys can be found in ct.js folder — data — i18n — English.json file — `catnip` object.

* `i18nKey` is used for the `name` of the block that will be visible in search. Keys for them are stored in `catnip.blockNames` dictionary.
* `displayI18nKey` is used for the label shown in the block itself. Keys for them are stored in `catnip.blockDisplayNames`
* Labels have their own `i18nKey` which keys are stored in `catnip.labels` dictionary.

If you can't reuse existing keys, you can add translations for `name` and `displayName` by adding a similar key with an underscore and a region code: for example, `name_Ru` will be a name used for Russian language.

### Augmenting built-in categories

You can add a field `category` for a block and write a name of the category you want this block to be added to.

Built-in category names are:

* Properties and variables
* Movement
* Appearance
* Actions
* Templates
* Rooms
* Behaviors
* Sounds
* Styles
* Backgrounds
* Emitter tandems
* Utilities
* Settings
* Camera
* Logic
* Math
* Strings
* Objects
* Arrays
* Miscellaneous
* Console

### Adding more pieces (icons, arguments) to a block

Anything that is not a block's icon or name is defined in `pieces` array of a block. Each piece can be one of these interfaces:

```ts
declare interface IBlockPieceLabel {
    type: 'label';
    name: string;
    i18nKey?: string;
}
declare interface IBlockPieceIcon {
    type: 'icon';
    icon: string;
}
declare interface IBlockPieceCode {
    type: 'code';
    key: string;
}
declare interface IBlockPieceArgument { // A chip for a constant value or a reference to an asset
    type: 'argument';
    key: string;
    typeHint: blockArgumentType;
    defaultConstant?: string;
    required?: boolean;
    assets?: resourceType | 'action';
}
declare interface IBlockPieceTextbox {
    type: 'textbox';
    key: string;
    default?: string;
}
declare interface IBlockPieceBlocks { // A block area.
    type: 'blocks';
    placeholder?: 'do nothing';
    key: string;
}
declare interface IBlockPieceBreak { // A line break
    type: 'break'
}
declare interface IBlockFiller { // Moves next blocks to the right
    type: 'filler'
}
declare interface IBlockAsyncMarker { // Adds an Async icon
    type: 'asyncMarker'
}
```

`blockArgumentType` is `'boolean' | 'number' | 'string' | 'wildcard' | 'void'`, but `'void'` is reserved for internal use and should not be used in custom blocks.

### Emitting JS code

Each block must have a field `jsTemplate` that must be a function. This template is passed with a `values` argument that lets you read all the arguments and precompiled code of block lists. You do not need to escape or quote strings — use them as is as compiler already does that for you.

Blocks must return a string that contains a valid JS script or expression.

When an argument is empty, unless a `defaultConstant` is set, the argument is set to `"undefined"`. **Note that this is a string.** When a block list is empty, its value is an empty string. (`""`)