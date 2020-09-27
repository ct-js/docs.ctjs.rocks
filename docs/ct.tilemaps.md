# ct.tilemaps. Tilemap objects

The `ct.tilemap` object allows making tilemaps in-game. It can also cache your tilemaps, speeding up your game noticeably, but once a tilemap is cached, it cannot be edited.

## Methods of `ct.tilemaps`

### `ct.tilemaps.create(depth)`

Creates and returns a new tilemap. `depth` sets the depth value of this tilemap, positioning it above or behind other objects.

**Returns** a newly created instance of `Tilemap`.

### `ct.tilemaps.addTile(tilemap, textureName, x, y, frame)`

Places a tile in the specified tilemap.
Argument | Type | Description
-|-|-
`tilemap` | `Tilemap` | The tilemap to place a tile into.
`textureName` | `string` | The name of a ct.js texture to draw.
`x` | `number` | The location at which a tile should be placed on the horizontal axis.
`y` | `number` | The location at which a tile should be placed on the vertical axis.
`frame` | `number` | *(optional)* Specifies which frame to draw. Defaults to 0.

**Returns** the created tile, which is a [`PIXI.Sprite`](https://pixijs.download/release/docs/PIXI.Sprite.html).

### `ct.tilemaps.cache(tilemap, chunkSize)`

Caches a tilemap, grouping tiles into large chunks and turning them into several bitmaps. Once it is cached, it can no longer be modified.

Argument | Type | Description
-|-|-
`tilemap` | `Tilemap` | The tilemap to cache.
`chunkSize` | `number` | *(optional)* The minimum size of a chunk. Defaults to 1024.

## Methods of `Tilemap`

`Tilemap` is a subclass of [`PIXI.Container`](https://pixijs.download/release/docs/PIXI.Container.html), and can be tinted, transformed, and moved. The methods below mostly repeat the methods of `ct.tilemaps`, but are in an object-oriented style.

### `tilemap.addTile(textureName, x, y, frame)`

Places a tile in the current tilemap.
Argument | Type | Description
-|-|-
`textureName` | `string` | The name of a ct.js texture to draw.
`x` | `number` | The location at which a tile should be placed on the horizontal axis.
`y` | `number` | The location at which a tile should be placed on the vertical axis.
`frame` | `number` | *(optional)* Specifies which frame to draw. Defaults to 0.

### `tilemap.cache(chunkSize)`

Caches the tilemap, grouping tiles into large chunks and turning them into several bitmaps. Once it is cached, it can no longer be modified.

Argument | Type | Description
-|-|-
`chunkSize` | `number` | *(optional)* The minimum size of a chunk. Defaults to 1024.

## Example: Create a row of tiles with different texture's frames

```js
this.tilemap = ct.tilemaps.create(-100);
for (let i = 0; i < 10; i++) {
    ct.tilemaps.addTile(this.tilemap, 'Tiles', i*64, 0, i);
}
this.tilemap.cache();
```

## Example: Generate a map made of bricks and Perlin noise, and enable collisions

You will need a `ct.noise` module enabled in your project, `ct.place`, and a texture named `RockTile`.

```js
const tilemap = ct.tilemaps.create(-100);
ct.noise.setSeed(); // Randomize the seed on each start

// Assuming you have a texture called 'RockTile' which is 64x64px in size.
for (var x = 0; x < ct.camera.width / 64; x++) {
    for (var y = 0; y < ct.camera.height / 64; y++) {
        var value = ct.noise.simplex2d(x / 7, y / 7); // Returns a value from -1 to 1.
        if (value > 0) {
            const tile = tilemap.addTile('RockTile', x*64, y*64);
            // Tiles are PIXI.Sprites; we can tweak their color and opacity before caching
            tile.alpha = value * 0.5 + 0.5;
        }
    }
}

tilemap.cache();
ct.place.enableTilemapCollisions(tilemap, 'Solid');
```