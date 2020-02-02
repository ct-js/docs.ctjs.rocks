# ct.rooms

This object manages your rooms and current view (camera).

## Methods and properties

### `ct.rooms.switch('NewRoomName')`

Calls the latest room's `onleave` event and moves to a new room.

### `ct.rooms.clear()`

Destroys all the existing copies in the room.

### `ct.room`

The current room's object.

### `ct.rooms.templates`

Existing rooms to switch to.

### `ct.rooms.append('NameOfTheRoom', ext)` and `ct.rooms.prepend('NameOfTheRoom', ext)`

Adds a new room to the current stage and puts it above or behind all the copies in your room. With these methods, you can reuse UI, backgrounds and environment effects. Note that these layers will have a different draw stack than in your main room and won't sort together. For that behaviour, use `ct.rooms.merge` instead (see below).

The `ext` parameter can be used to apply additional parameters to a new room. For example, if you call `ct.rooms.append('Background', {color: 0x446ADB})`, then the room "Background" will have `this.color` available in its "On Create" and other events.

To create a [UI layer](/game-and-ui-coordinates.html), use this code:

```js
ct.rooms.append('YourUiRoom', {
    isUi: true
});
```

### `ct.rooms.merge('NameOfTheRoom')`

This method puts all the entities of the given room into the current one. This is useful for prefabs and procedular generation. Note that the room's "On Create" event, as well as others, are **not called**. This method returns an object with three properties `copies`, `tileLayers`, and `backgrounds`. You can loop over them to position them properly, for example:

```js
var spawnX = 100,
    spawnY = 500;
var merged = ct.rooms.merge('AssasinsSet');

// Suppose that we don't need any backgrounds and tile layers from it
for (const copy of merged.copies) {
    copy.xstart += spawnX;
    copy.x += spawnX;
    copy.ystart += spawnY;
    copy.y += spawnY;
}
```

::: warning Warning:
The result of the function is not updated and is meant for initial setup only. It should not be stored as a parameter of an object to avoid memory leaks. Use the `var` keyword, as shown above.
:::

## Managing current viewport

Since v1.3, viewport is managed by a special object [ct.camera](/ct.camera.html).