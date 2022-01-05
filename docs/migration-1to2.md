# Migration guide for ct.js v2.0.

## Changes to copies' `rotation` property, or "My copies spin like propellers"

Previously `rotation` was proxying pixi.js' same-named parameter, which was measured in radians. It was made to preserve compatibility with older projects, those which were created before v1 emerged. We dropped this proxy to better conform to pixi.js' behavior and remove unexpected inconsistencies when working both with ct.js and pixi.js entities.

Pixi.js has a built-in `angle` property that is measured in degrees, so:

* Instead of `this.rotation`, use `this.angle`.
* `this.angle` goes clockwise compared to previous `this.rotation`, that winded counter-clockwise, so `this.angle = 90;` points to bottom, 180 — to the left, 270 — upwards, 360 and 0 — to the right.

## Types are now called "Templates"

Yes.

It is something that I, the creator of ct.js, wanted to change for a whopping five years or so. Most names in ct.js were made with poor knowledge of the English language, and contrary to the internal properties and niche things like "code injects" (which are to be named "code injections"), "types" are something that every ct.js user writes daily.

Templates are a better word for the entities from which ct.js' copies are created, especially when translating ct.js to other languages, and are also more language-neutral. After all, there are just six types in ct.js, and none of them is an old ct.js type.

"Templates" will also make more sense when ct.js supports templates based on classes different than simple animated sprites: the idea is to allow making buttons, panel templates, and utilize cool stuff like spline terrain. While all that will come later, it is better to make small transitions now — to ease future migrations.

**How this affects you and your projects:**

* You will now have to write `ct.templates...` instead of `ct.types...`;
* Ct.IDE will replace `ct.types` with `ct.templates` once you open a project that was made in previous versions of ct.js, but there are still changes in `ct.templates` API listed below.

## `ct.templates.exists`

* `ct.templates.exists(copy)` is renamed into `ct.templates.valid(copy)`
* `ct.templates.exists(typeName)` now checks whether there are copies of a particular name in a room (or its appended/prepended rooms).

## `ct.templates.make`, `ct.templates.copy`.

`ct.templates.make` was removed as no one really used it.

There are now two separate methods for spawning copies, though:

* [`ct.templates.copyIntoRoom(type, x, y, container, exts)`](), and
* [`ct.templates.copy(type, x, y, exts)`]()

Note that arguments shifted a bit in `ct.templates.copyIntoRoom(type, x, y, container, exts)` compared to the previous `ct.templates.copy` method.

`ct.templates.copyIntoRoom` will throw an error if `container` is not set. The whole separation into two methods is to make copy creation more failsafe and to exclude situations like when you pass `ct.rooms.list['NonExistentRoomName'][0]` as a container and then get a copy inside the main room without any warnings.

## `ct.u.rotate`, `ct.u.rotateRad`, `ct.u.uiToGameCoord`, `ct.u.gameToUiCoord` now return `PIXI.Point` instead of arrays

`PIXI.Point` are objects with `x`, `y` properties plus a few handy methods for copying them.

`ct.camera.uiToGameCoord`, `ct.camera.gameToUiCoord`, and all `ct.camera.get(XY)Corner` do the same as well as they are dependant on these methods.

## Default `ct.sound` is now a catmod

Usually it won't cause any issues, but in case you have errors from ct.res about no sound systems, turn one of the sound catmods on in your project's settings.

## `ct.mouse` and `ct.touch` are now deprecated in favor of `ct.pointer`

This causes no immediate issues, but consider using `ct.pointer` module in your future projects. It covers functionality of both `ct.mouse` and `ct.touch` with familiar API, as well as supports additional features like pressure reading, pen position, and an abstraction over Pointer Lock API.
