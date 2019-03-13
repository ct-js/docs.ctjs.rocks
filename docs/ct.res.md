# ct.res

This object manages all the resources needed for your game, including images and sounds. Usually its methods are not used as all the needed work is done by ct.IDE, though you may find it useful while loading additional or dynamic assets during the game process.

## Methods and properties

### `ct.res.registry`

An object with metadata of loaded textures, including these textures, their axes, collision shapes.

### `ct.res.skelRegistry`

Contains data of all imported skeletal animations of the game.

### `ct.res.sounds`

An object with metadata of all the sounds in the game.

### `ct.res.getTexture(name: String, frame: Number)`

Returns a Pixi texture of a given ct.js texture, that is required for making custom UI elements and other stuff, e.g. for adding [Pixi's Sprites](http://pixijs.download/release/docs/PIXI.Sprite.html).

If `name` is equal to `-1`, then an empty texture is returned.

If `frame` is specified, then a single texture is returned. Otherwise, all the textures in a ct.js animation are returned as an array.

### `ct.res.fetchImage(url: String, callback: Function)`

Loads an image and adds it to the current image collection (`ct.res.registry`). When provided with a callback, it sends a collection of loaded resources.
