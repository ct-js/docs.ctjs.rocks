# `Room` class

Rooms are the entities that contain all the copies, backgrounds, tile layers, and advanced entities, too. They are also referred to as maps and levels.

Rooms derive from [PIXI.Container](https://pixijs.download/release/docs/PIXI.Container.html) class, and inherit all its methods and properties.

## The current room, `ct.room`.

`ct.room` always points to the current room. If you have multiple rooms layered on top of each other, `ct.room` will point to the initial room that was created at the start of a game, or after calling [`ct.rooms.switch`](ct.rooms.html#ct-rooms-switch-newroomname).

To get layered rooms, you can use [`ct.rooms.list`](ct.rooms.html#ct-rooms-list-roomname), or [`this.getRoom`](Copy.html#copy-getroom) inside copies' events.

## UI and Gameplay rooms

Rooms can be put either into UI coordinate space or gameplay coordinate space. Gameplay rooms are managed by `ct.camera`, and cannot be moved manually. But UI rooms can be: for example, to move smaller widgets around the viewport.

::: tip
More about this concept at [Game and UI Coordinates](game-and-ui-coordinates.html). For viewport management, see [Working with Viewport](viewport-management.html).
:::

## Notable properties

|Property | Type | Description|
|-|-|-|
|`alpha` | `number` | A value from 0 to 1 that sets the room's opacity. You can use it, for example, to gradually fade in/fade out UI layers. `0` means fully transparent, and `1` means fully opaque.|
|`isUi` | `boolean` | If set to `true`, the room will be unaffected by camera scaling, movement, and rotation. See more at [Game and UI Coordinates](game-and-ui-coordinates.html).|
|`x`, `y` | `number` | The location of a room. Changing these has no effect if the room is in gameplay coordinates (if its `isUi` property is `false`)|
