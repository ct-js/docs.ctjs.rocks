# Migration guide for ct.js v2.0.

## Changes to copies' `rotation` property, or "My copies spin like propellers"

Previously `rotation` was proxying pixi.js' same-named parameter, which was measured in radians. It was made to preserve compatibility with older projects, those which were created before v1 emerged. We dropped this proxy to better conform to pixi.js' behavior and remove unexpected inconsistencies when working both with ct.js and pixi.js entities.

Pixi.js has a built-in `angle` property that is measured in degrees, so:

* Instead of `this.rotation`, use `this.angle`.
* `this.angle` goes clockwise compared to previous `this.rotation`, that winded counter-clockwise, so `this.angle = 90;` points to bottom, 180 — to the left, 270 — upwards, 360 and 0 — to the right.

## `ct.types.exists`

* `ct.types.exists(copy)` is renamed into `ct.types.valid(copy)`
* `ct.types.exists(typeName)` now checks whether there are copies of a particular name in a room (or its appended/prepended rooms).

## `ct.types.make`, `ct.types.copy`.

`ct.types.make` was removed as no one really used it.

There are now two separate methods for spawning copies, though:

* [`ct.types.copyIntoRoom(type, x, y, container, exts)`](), and
* [`ct.types.copy(type, x, y, exts)`]()

Note that arguments shifted a bit in `ct.types.copyIntoRoom(type, x, y, container, exts)` compared to the previous `ct.types.copy` method.
