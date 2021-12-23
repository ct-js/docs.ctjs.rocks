# ct.u

This object contains a number of handy utility functions to ease the development process.

## Geometry

### `ct.u.ldx(length, direction)` and `ct.u.lengthDirX(length, direction)`

Gets the horizontal part of a vector.

### `ct.u.ldy(length, direction)` and `ct.u.lengthDirY(length, direction)`

Gets the vertical part of a vector.

### `ct.u.pdn(x1, y1, x2, y2)` and `ct.u.pointDirection(x1, y1, x2, y2)`

Gets the direction of vector which is pointing from (x1;y1) to (x2;y2).

### `ct.u.pdc(x1, y1, x2, y2)` and `ct.u.pointDistance(x1, y1, x2, y2)`

Gets the distance between points (x1;y1) and (x2;y2).

### `ct.u.rotate(x, y, deg)`

Rotates a given vector by a given angle. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

### `ct.u.rotateRad(x, y, rad)`

The same as `ct.u.rotate`, but the angle is given in radians. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

### `ct.u.degToRad(deg)`

Converts degrees into radians.

### `ct.u.radToDeg(rad)`

Converts radians into degrees.

### `ct.u.deltaDir(dir1, dir2)`

Returns a difference between two directions, in degrees.

## Gameplay and UI Coordinates

### `ct.u.uiToGameCoord(x, y)`

Converts from UI coordinates to game coordinates. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

### `ct.u.gameToUiCoord(x, y)`

Converts from game coordinates to ui coordinates. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

## Math

### `ct.u.clamp(min, val, max)`

Returns a clamped value `val`.

### `ct.u.lerp(a, b, alpha)`

Linearly interpolates a value from `a` to `b`, returning `a` if `alpha` = 0 and `b` if `alpha` = 1.

### `ct.u.unlerp(a, b, val)`

An opposite of `ct.u.lerp`. Returns a position of `val` inside a range from `a` to `b`. If `val` is inside this range, this method will return a value between 0 and 1.

### `ct.u.map(val, inMin, inMax, outMin, outMax)`

Re-maps the given `val` from one number range (`inMin` - `inMax`) to another (`outMin` - `outMax`).

## Built-in collision checks

### `ct.u.prect(x1, y1, arg: Array|Copy)` and `ct.u.pointRectangle(x1, y1, arg: Array|Copy)`

Checks if a given point (x1;y1) is inside a rectangle. `arg` can be either an array of coordinates ([x1, y1, x2, y2]) or a Copy with a rectangular shape.

### `ct.u.pcircle(x1, y1, arg: Array|Copy)` and `ct.u.pointCircle(x1, y1, arg: Array|Copy)`

Checks if a given point is inside a circle. `arg` can be either an array of [x1, y1, radius], or a Copy with a cirular shape.

## Miscellaneous

### `ct.u.hexToPixi(hex: string)`

Converts a hex string to a Pixi color.

#### Example: Set copy's tint color from a CSS color

```js
this.tint = ct.u.hexToPixi('#0dfac3');
```

### `ct.u.pixiToHex(pixi: number)`

Converts a Pixi color to a hex-encoded color code.

#### Example: Set page's background color from a Pixi color

```js
document.body.style.backgroundColor = ct.u.pixiToHex(0x0dfac3);
```

### `ct.u.wait(time)`

Returns a Promise. Waits `time` milliseconds, then resolves without any data. Rejects if a new room was loaded before the Promise was resolved. Example:

```js
var enemy = whatever;
enemy.state = 'Disappear';
ct.u.wait(1000)
.then(() => {
    if (!enemy.kill) { // this will happen a second after the code above was called.
        enemy.kill = true;
    }
});
```

### `ct.u.load(url: String, callback: Function)`

Loads the specified script and calls the callback when it was loaded.

### `ct.u.ext(o1, o2[, arr: Array[String]])`

Transfers objects' properties from `o2` to `o1`. You can specify an array of properties' names you want to transfer; otherwise everything is transferred.

::: warning
This doesn't create [a deep copy](https://we-are.bookmyshow.com/understanding-deep-and-shallow-copy-in-javascript-13438bad941c).
:::
