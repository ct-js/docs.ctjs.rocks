# `Room` class

Rooms are the entities that contain all the copies, backgrounds, tile layers, and advanced entities, too. They are also referred to as maps and levels.

Rooms derive from [PIXI.Container](https://pixijs.download/release/docs/PIXI.Container.html) class, and inherit all its methods and properties.

## UI and Gameplay rooms

Rooms can be put either into UI coordinate space or gameplay coordinate space. Gameplay rooms are managed by `ct.camera`, and cannot be moved manually. But UI rooms can be: for example, to move smaller widgets around the viewport.

::: tip
More about this concept at [Game and UI Coordinates](game-and-ui-coordinates.html). For viewport management, see [Working with Viewport](viewport-management.html).
:::

## Notable properties

|Property | Type | Description|
|-|-|-|
|`alpha` | `number` | A value from 0 to 1 that sets room's opacity. You can use it, for example, to gradually fade in/fade out UI layers. `0` means fully transparent, and `1` means fully opaque.|
|`isUi` | `boolean` | If set to `true`, the room will be unaffected by camera scaling, movement, and rotation. See more at [Game and UI Coordinates](game-and-ui-coordinates.html).|
|`x`, `y` | `number` | The location of a room. Changing these have no effect if the room is in gameplay coordinates (if its `isUi` property is `false`)|