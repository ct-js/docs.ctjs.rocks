# res

This module is responsible for loading resources in your game projects. With this module, you can load additional resources during your play.

## Getting existing resources

### `res.getTexture(name: string): PIXI.Texture[];`

Gets a pixi.js texture from a ct.js' texture name, so that it can be used in pixi.js objects.

* `name` The name of the ct.js texture. If `-1` (a number) is provided instead of the texture's name, then an empty texture will be returned.

Returns an array with all the frames of this ct.js' texture. There is an expanded form of res.getTexture that returns individual frames below.

### `res.getTexture(name: string, frame: number): PIXI.Texture;`

Gets a pixi.js texture from a ct.js' texture name, so that it can be used in pixi.js objects.
* `name` — The name of the ct.js texture. If `-1` (a number) is provided instead of the texture's name, then an empty texture will be returned.
* `frame` — The frame to extract.

Returns a single PIXI.Texture.

## Browsing the asset tree

Since version 4.0 of ct.js, it can export a partial structure of your project as `res.tree` field. You can use it to, say, load a list of playable maps dynamically so you don't need to update your UI manually, or to create randomized entities based on how assets are organized in folders.

**This is an opt-in feature** as it adds a bit to the weight of exported projects and also might pose privacy issues as it shows the used assets in a clean and browsable manner.

To enable this feature, you need to go to your project's settings (the "Project" tab at the top of the screen) and enable the feature in the Export tab. You can also specify which assets must be present in the asset tree.

### `res.tree`

This is an array of the top-level assets and folders of your project, as it is in IDE. Each entry has `name` and `type` fields, with `type` being one of:

* `'template'`
* `'room'`
* `'sound'`
* `'style'`
* `'texture'`
* `'tandem'`
* `'font'`
* `'behavior'`
* `'folder'`

Folders also have an `entries` array, which contains the same types of objects as `res.tree`.

### `res.getChildren(path?: string)`

Gets direct children of a folder.

The `path` argument is a filepath-like string. For example, if you have a folder structure `Root > Core > Player`, then the path for the folder `Player` will be `/Core/Player`.

You can also write `\` instead of `/`, if you properly escape it in your code's strings, and the first and last `/` are optional. So, these paths are equivalent:

* `/Player/Core`
* `Player/Core/`
* `\Player\Core\`
* `Player/Core`

If the `path` argument is falsy, or is not specified, or is `/`, then the project's root's entries will be returned.

**Returns** `ExportedAsset[]` — An array of all the assets in the folder. The subfolders are not included in the array.

### `res.getOfType(type: AssetType | 'folder', path?: string)`

Gets direct children of a folder, filtered by asset type. The `path` argument behaves exactly as in [`res.getChildren`](#res-getchildren-path-string).

**Returns** `(ExportedAsset | ExportedFolder)[]` — An array of all the selected entries in the folder.

#### Example: set a copy's texture to a random texture from a folder called "Enemy ships"

::: code-tabs#tutorial
@tab JavaScript
```js
var shipTextures = res.getOfType('textures', 'Enemies/Enemy ships');
// You will need the `random` catmod enabled
this.tex = random.from(shipTextures).name;
```
@tab CoffeeScript
```coffee
shipTextures = res.getOfType 'textures', 'Enemies/Enemy ships'
# You will need the ct.random catmod enabled
randomTexture = random.from shipTextures
@tex = randomTexture.name
```
:::

### `res.getAll(path?: string)`

Gets all the assets inside of a folder, including in subfolders. The `path` argument behaves exactly as in [`res.getChildren`](#res-getchildren-path-string).

**Returns** `ExportedAsset[]` — All the assets in the folder and its subfolders. The folders themselves are not included in the array.

### `res.getAllOfType(type: AssetType | 'folder', path?: string)`

Get all the assets inside of a folder, including in subfolders, filtered by type. The `path` argument behaves exactly as in [`res.getChildren`](#res-getchildren-path-string).

**Returns** `(ExportedAsset | ExportedFolder)[]` — All the entries in the folder.

## Loading and unloading new assets and scripts into your game

### `res.loadScript(url: string): Promise<void>;`

Loads and executes a script by its URL. The URL of the script file can be relative or absolute.

### `res.loadTexture(url: string, name: string, textureOptions: ITextureOptions): Promise<PIXI.Texture[]>;`

Loads an individual image as a named ct.js texture.

* `url` - The path to the source image.
* `name` - The name of the resulting ct.js texture as it will be used in your code.
* `textureOptions` - Information about texture's axis and collision shape:
    * `shape`: see "Creating collision shapes dynamically" for ct.place inside your ct.IDE.
    * `anchor`:
        * `x`: a number from 0 to 1, with 0 being the left side, 0.5 being the center and 1 being the right side.
        * `y`: a number from 0 to 1, with 0 being the top side, 0.5 being the center and 1 being the bottom side.

#### Example: loading an additional texture into ct.js

::: code-tabs#tutorial
@tab JavaScript
```js
res.loadTexture('Background_42.png', 'Background_42', {
    anchor: {
        x: 0,
        y: 0
    }
})
.then(textureName => {
    // Adds a background to the current room at depth -100.
    ct.backgrounds.add(textureName, 0, -100);
});
```
@tab CoffeeScript
```coffee
textureSettings =
    anchor:
        x: 0,
        y: 0
res.loadTexture 'Background_42.png', 'Background_42', textureSettings
.then (textureName) =>
    # Adds a background to the current room at depth -100.
    ct.backgrounds.add textureName, 0, -100
```
:::

### `res.loadAtlas(url: string): Promise<string[]>;`

Loads a Texture Packer compatible .json file with its source image,
adding ct.js textures to the game.

* `url` - The path to the JSON file that describes the atlas' textures.

The method returns a promise that resolves into an array of all the loaded ct.js textures (an array of texture names).

### `res.unloadAtlas(url: string): Promise<void>;`

Unloads a previously loaded atlas by its URL, removing any linked textures from the game.

* `url` - The path to the JSON file that describes the atlas' textures.

The method returns a promise that resolves into an empty value.

### `res.loadBitmapFont(url: string): Promise<string>;`

Loads a bitmap font by its XML file.

* `url` - The path to the XML file that describes the bitmap fonts.

Returns a promise that resolves into the loaded bitmap font asset.

### `res.unloadBitmapFont(url: string): Promise<void`

Removes a previously loaded bitmap font from the game.
