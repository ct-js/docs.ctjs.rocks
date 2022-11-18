# ct.rooms

This object manages your rooms and current view (camera).

## Methods and properties

### `ct.room`

The current room's object.

### `ct.rooms.switch('NewRoomName')`

Calls the latest room's `onleave` event and moves to a new room.

### `ct.rooms.restart()`

Calls this room's `onleave` event and restarts it.

### `ct.rooms.clear()`

Destroys all the existing copies in the room.

### `ct.rooms.templates`

Existing rooms to switch to.

### `ct.rooms.list['RoomName']`

Similar to `ct.templates.list`, this object contains arrays of rooms on the current stage. These may be useful when you have a lot of UI widgets on the screen and need to manage them.

### `ct.rooms.remove(room)`

This method safely removes a previously appended/prepended room from the stage. It will trigger "On Leave" for a room and "On Destroy" event for all the copies of the removed room. The room will also have `this.kill` set to `true` in its event, if it comes in handy. This method cannot remove `ct.room`, the main room. The `room` argument must be a reference to the previously created room, for example:

::: code-tabs#tutorial
@tab JavaScript
```js Creating a pause menu by using a UI room
if (ct.actions.TogglePause.released) {
    if (!this.pauseMenu) { // if a parameter `pauseMenu` is not set
        this.pauseMenu = ct.rooms.append('UI_Pause'); // create a room, and set it to a parameter `pauseMenu`
    } else {
        ct.rooms.remove(this.pauseMenu);
    }
}
```
@tab CoffeeScript
```coffee
if ct.actions.TogglePause.released
    if not @pauseMenu # if a parameter `pauseMenu` is not set
        @pauseMenu = ct.rooms.append 'UI_Pause'
        # create a room, and set it to a parameter `pauseMenu`
    else
        ct.rooms.remove @pauseMenu
```
:::

How does a copy know that its "On Destroy" event is triggered from a removed room, that it was not the main one? Well, each copy has a method `getRoom()`, and you can use it with `room.kill` property:

::: code-tabs#tutorial
@tab JavaScript
```js
// Let's suppose that we have a modular level and some chunks shoud be loaded/unloaded dynamically,
// and this particular copy is a bomb that shouldn't trigger if its chunk is unloaded.
if (this.getRoom().kill) {
    return; // effectively breaks the execution of the next code
}
ct.sound.spawn('Explosion');
this.killEverythingNearby();
```
@tab CoffeeScript
```coffee
# Let's suppose that we have a modular level and some chunks shoud be loaded/unloaded dynamically,
# and this particular copy is a bomb that shouldn't trigger if its chunk is unloaded.
if @getRoom().kill
  return # effectively breaks the execution of the next code

ct.sound.spawn 'Explosion'
@killEverythingNearby()
```
:::

### `ct.rooms.append('NameOfTheRoom', ext)` and `ct.rooms.prepend('NameOfTheRoom', ext)`

Adds a new room to the current stage and puts it above or behind all the copies in your room. With these methods, you can reuse UI, backgrounds and environment effects. Note that these layers will have a different draw stack than in your main room and won't sort together. For that behaviour, use `ct.rooms.merge` instead (see below).

The `ext` parameter can be used to apply additional parameters to a new room. For example, if you call `ct.rooms.append('Background', {color: 0x446ADB})`, then the room "Background" will have `this.color` available in its "On Create" and other events.

To create a [UI layer](/tips-n-tricks/game-and-uiks/game-and-ui-coordinates.html), use this code:

::: code-tabs#tutorial
@tab JavaScript
```js
ct.rooms.append('YourUiRoom', {
    isUi: true
});
```
@tab CoffeeScript
```coffee
roomSettings =
    isUi: true
ct.rooms.append 'YourUiRoom', roomSettings
```
:::

### `ct.rooms.merge('NameOfTheRoom')`

This method puts all the entities of the given room into the current one. This is useful for prefabs and procedular generation. Note that the room's "On Create" event, as well as others, are **not called**. This method returns an object with three properties `copies`, `tileLayers`, and `backgrounds`. You can loop over them to position them properly, for example:

::: code-tabs#tutorial
@tab JavaScript
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
@tab CoffeeScript
```coffee
spawnX = 100
spawnY = 500
merged = ct.rooms.merge 'AssasinsSet'

# Suppose that we don't need any backgrounds and tile layers from it
for copy in merged.copies
    copy.xstart += spawnX
    copy.x += spawnX
    copy.ystart += spawnY
    copy.y += spawnY
```
:::

::: warning Warning:
The result of the function is not updated and is meant for initial setup only. It should not be stored as a parameter of an object to avoid memory leaks. Use the `var` keyword, as shown above.
:::

## Managing current viewport

Since v1.3, viewport is managed by a special object [ct.camera](/ct.camera.html).