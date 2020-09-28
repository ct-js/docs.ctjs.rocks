# Event order in ct.js

These events are always executed in the following order:

1. Core ct.js library runs;
1. Modules get initialized;
1. Custom scripts added at project settings are executed;
1. room's `oncreate` event is called, which is emitted when a user starts a game or navigates to a new room;
1. `oncreate` is applied for each copy;
1. then the main game loop starts:
    1. `onstep` event is emitted for all the copies in the room;
    1. `onstep` event for current room is called;
    1. `ondestroy` is called for all the copies marked to be `kill`ed;
    1. all the copies are reordered then;
    1. `ondraw` is called for all the copies;
    1. `ondraw` is called for a room;
    1. input events are cleared. Waiting for a new game loop iteration.
1. When a user moves to a new room, an `onleave` event is called for the latest room.

## Call order with mod's injections

**At startup:**

1. Core ct.js library runs.
1. `load.js`.
1. Modules get initialized.
1. Custom scripts added at project settings are executed;
1. `resload.js` runs once all the assets have finished loading.
1. `start.js` — called right before a game is started (no room is created yet).
1. The first room gets created.
1. Room's OnCreate is called.
1. `roomoncreate.js`.
1. `switch.js` is called.
1. `ct.camera` is properly positioned.

**At room transition:**

1. Previous room's OnLeave event is called.
1. `roomonleave.js`.
1. New room's OnCreate is called.
1. Copies are created here, with all their events and injections.
1. `roomoncreate.js`
1. `switch.js`
1. `ct.camera` is properly positioned.

**At each frame:**

1. `beforeframe.js` is run in global context.
1. `beforestep.js` with `this` being the current type.
1. Copies' own OnStep is called.
1. `afterstep.js` with `this` being the current type.
1. `beforeroomstep.js` with `this` being a current room (can be different from `ct.room`)
1. Room's own OnStep is called.
1. `afterroomstep.js` with `this` being a current room (can be different from `ct.room`)
1. Copies get destroyed with their OnDestroy event.
1. Camera position is updated
1. `beforedraw.js` with `this` being the current type.
1. Copies' own OnDraw is called.
1. `afterdraw.js` with `this` being the current type.
1. `beforeroomdraw.js` with `this` being a current room (can be different from `ct.room`)
1. Room's own OnDraw is called.
1. `afterroomdraw.js` with `this` being a current room (can be different from `ct.room`)
1. `afterframe.js` is called before moving on to the next frame.

**At copy creation:**

1. `onbeforecreate.js`
1. Copies' own OnCreate is called.
1. `oncreate.js`

**At copy deletion:**

1. `ondestroy.js`
1. Copy's own OnDestroy event is called.