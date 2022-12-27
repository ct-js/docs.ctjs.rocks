# ct.res

This module is responsible for loading resources in your game projects. With this module, you can load additional resources during your play.

## `ct.res.loadScript(url: string): Promise<void>;`

Loads and executes a script by its URL. The URL of the script file can be relative or absolute.

## `ct.res.loadTexture(url: string, name: string, textureOptions: ITextureOptions): Promise<PIXI.Texture[]>;`

Loads an individual image as a named ct.js texture.

* `url` - The path to the source image.
* `name` - The name of the resulting ct.js texture as it will be used in your code.
* `textureOptions` - Information about texture's axis and collision shape:
    * `shape`: see "Creating collision shapes dynamically" for ct.place inside your ct.IDE.
    * `anchor`:
        * `x`: a number from 0 to 1, with 0 being the left side, 0.5 being the center and 1 being the right side.
        * `y`: a number from 0 to 1, with 0 being the top side, 0.5 being the center and 1 being the bottom side.

### Example: loading an additional texture into ct.js

::: code-tabs#tutorial
@tab JavaScript
```js
ct.res.loadTexture('Background_42.png', 'Background_42', {
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
ct.res.loadTexture 'Background_42.png', 'Background_42', textureSettings
.then (textureName) =>
    # Adds a background to the current room at depth -100.
    ct.backgrounds.add textureName, 0, -100
```
:::

## `ct.res.loadDragonBonesSkeleton(ske: string, tex: string, png: string, name: string): void;`

Loads a skeleton made in DragonBones into the game
* `ske` -  the path to the `_ske.json` file that contains the armature and animations.
* `tex` - the path to the `_tex.json` file that describes the atlas with the skeleton's textures.
* `png` - the path to the `_tex.png` atlas that contains all the textures of the skeleton.
* `name` - the name of the skeleton as it will be used in your ct.js game.

## `ct.res.loadAtlas(url: string): Promise<string[]>;`

Loads a Texture Packer compatible .json file with its source image,
adding ct.js textures to the game.

* `url` - The path to the JSON file that describes the atlas' textures.

The method returns a promise that resolves into an array of all the loaded ct.js textures (an array of texture names).

## `ct.res.loadBitmapFont(url: string, name: string): Promise<string>;`

Loads a bitmap font by its XML file.
* `url` - The path to the XML file that describes the bitmap fonts.
* `name` - The name of the font.

Returns a promise that resolves into the font's name (the one you've passed with `name`).

## `ct.res.getTexture(name: string): PIXI.Texture[];`

Gets a pixi.js texture from a ct.js' texture name, so that it can be used in pixi.js objects.

* `name` The name of the ct.js texture. If `-1` (a number) is provided instead of the texture's name, then an empty texture will be returned.

Returns an array with all the frames of this ct.js' texture. There is an expanded form of ct.res.getTexture that returns individual frames below.

## `ct.res.getTexture(name: string, frame: number): PIXI.Texture;`

Gets a pixi.js texture from a ct.js' texture name, so that it can be used in pixi.js objects.
* `name` — The name of the ct.js texture. If `-1` (a number) is provided instead of the texture's name, then an empty texture will be returned.
* `frame` — The frame to extract.

Returns a single PIXI.Texture.

## `ct.res.makeSkeleton(name: string, skin?: string): unknown;`
Creates a DragonBones skeleton, ready to be added to your copies.
* `name` - The name of the skeleton asset.
* `skin` - Optional; allows you to specify the needed skin.

Returns the created skeleton.

See also: [Using Skeletal Animation in ct.js Projects](skeletal-animation)

## ct.res.groups

`ct.res.groups` holds information about how assets were grouped in ct.IDE. This is an object that has the following keys:

* `fonts`;
* `textures`;
* `styles`;
* `rooms`;
* `templates`;
* `sounds`;
* `emitterTandems`.

Each key is an object, too, with group names as its keys, having an array of asset names as its values.

### Example: set a copy's texture to a random texture from a group called "Enemy ships"

::: code-tabs#tutorial
@tab JavaScript
```js
var shipTextures = ct.res.groups.textures['Enemy ships'];
// You will need the ct.random catmod enabled
this.tex = ct.random.from(shipTextures);
```
@tab CoffeeScript
```coffee
shipTextures = ct.res.groups.textures['Enemy ships']
# You will need the ct.random catmod enabled
@tex = ct.random.from shipTextures
```
:::