# `Room` class

Rooms are the entities that contain all the copies, backgrounds, tile layers, and advanced entities, too. They are also referred to as maps and levels.

Rooms derive from [PIXI.Container](https://pixijs.download/release/docs/PIXI.Container.html) class, and inherit all its methods and properties.

## The current room, `rooms.current`.

`rooms.current` always points to the current room. If you have multiple rooms layered on top of each other, `rooms.current` will point to the initial room that was created at the start of a game, or after calling [`rooms.switch`](rooms.html#rooms-switch-newroomname).

To get layered rooms, you can use [`rooms.list`](rooms.html#rooms-list-roomname), or [`this.getRoom`](Copy.html#copy-getroom) inside copies' events.

## UI and Gameplay rooms

Rooms can be put either into UI coordinate space or gameplay coordinate space. Gameplay rooms are managed by `ct.camera`, and cannot be moved manually. But UI rooms can be: for example, to move smaller widgets around the viewport.

::: tip
More about this concept at [Game and UI Coordinates](tips-n-tricks/game-and-ui-coordinates.html). For viewport management, see [Working with Viewport](tips-n-tricks/viewport-management.html).
:::

## Notable properties

|Property | Type | Description|
|-|-|-|
|`alpha` | `number` | A value from 0 to 1 that sets the room's opacity. You can use it, for example, to gradually fade in/fade out UI layers. `0` means fully transparent, and `1` means fully opaque.|
|`isUi` | `boolean` | If set to `true`, the room will be unaffected by camera scaling, movement, and rotation. See more at [Game and UI Coordinates](tips-n-tricks/game-and-ui-coordinates.html).|
|`x`, `y` | `number` | The location of a room. Changing these has no effect if the room is in gameplay coordinates (if its `isUi` property is `false`)|

## Adding aligned copies during game's runtime
The `makeCopyAligned` and `makeCopyAlignedRef` methods of rooms align elements in a room based on the camera dimension changes. `makeCopyAligned` assumes you've already positioned your copy relative to the current camera dimensions, and `makeCopyAlignedRef` assumes you are placing a copy relative to room's dimensions as set in ct.IDE.

### Example: Create a copy in a UI room and make it align to the top center point
```js
// In room's Start event:
// Create a copy in the center of the room.
// Use camera.width and camera.height for this.makeCopyAligned.
var copy = templates.copy('BossHealthbar', this.template.width / 2, 0);
this.makeCopyAlignedRef(copy, {
    alignX: 'center',
    alignY: 'start'
});
```

The first argument is the copy you want to align, and the second argument contains an object with these properties:

* `alignX`: how to align the copy horizontally;
* `alignY`: how to align the copy vertically;
* `frame`: the reference frame to position relative to (optional);
* `padding`: borders to add to the reference frame (optional).

The `alignX` and `alignY` properties can have the following values:

* `'start'`: The element is aligned relative to the top/left side of its alignment frame.
* `'end'`: The element is aligned relative to the bottom/right side of its alignment frame.
* `'center'`: The element is aligned relative to the center of its alignment frame.
* `'both'`: The element is stretched to fill alignment frame. Any gaps are maintained to be of fixed size.
* `'scale'`: The element is scaled proportionally to the alignment frame.


The `frame` property is an object that defines the reference frame. It has properties x1, y1 and  x2, y2, and these define coordinates of two points that form the reference frame. Each coordinate is defined as a percentage of viewport's size.

```js
this.makeCopyAlignedRef(copy, { // Make a copy aligned to the left third of the screen
    alignX: 'stretch',
    alignY: 'stretch',
    frame: {
        x1: 0,
        y1: 0,
        x2: 33.3, // Right side of the reference frame will be placed at 1/3 of the screen on the left
        y2: 100
    }
});
```

If frame is not set, it defaults to (0;0) for the top-left corner and (100;100) for the bottom-right corner, meaning that the default reference frame matches camera dimensions.

`padding` is used to add additional fixed gaps inside the reference frame, which is useful when combining elements of fixed and scalable size on the screen. It is an object with `left`, `right`, `top` and `bottom` values:

```js
// Make a copy aligned to the top of the screen, make it scale proportionately
// but leave additional gaps around it
this.makeCopyAlignedRef(copy, {
    alignX: 'stretch',
    alignY: 'start',
    padding: {
        left: 160,
        right: 160,
        top: 0,
        bottom: 0
    }
});
```

If not set, padding defaults to 0 on each side.