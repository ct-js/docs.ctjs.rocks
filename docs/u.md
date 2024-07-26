# u

This object contains a number of handy utility functions to ease the development process.

## Geometry

### `u.ldx(length, direction)` and `u.lengthDirX(length, direction)`

Gets the horizontal part of a vector.

#### Example: Spawn a bullet relative to the hero sprite

::: code-tabs#tutorial
@tab JavaScript
```js
var dx = u.ldx(40, this.angle),
    dy = u.ldy(40, this.angle);
var bullet = templates.copy('Bullet', this + dx, this + dy);
bullet.direction = this.angle;
```
@tab CoffeeScript
```coffee
dx = u.ldx 40, @angle
dy = u.ldy 40, @angle
bullet = templates.copy 'Bullet', this + dx, this + dy
bullet.direction = @angle
```
:::

### `u.ldy(length, direction)` and `u.lengthDirY(length, direction)`

Gets the vertical part of a vector.

### `u.distance(from, to)`

Returns the distance from one object to another. The objects must have `x` and `y` coordinates. (Copies do have them.)

#### Example: Get the distance between the current copy and the player's character

::: tabs#tutorial
@tab JavaScript
```js
var player = templates.list['Hero'][0];
if (templates.valid(player)) {
    console.log(u.distance(this, player));
}
```
@tab CoffeeScript
```coffee
player = templates.list['Hero'][0]
if templates.valid player
    console.log u.distance(this, player)
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">get array element</span>          <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>           <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>Hero</span></span>     </catnip-block>  <span class="catnip-block-aTextLabel">at</span>                     <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>      </catnip-block>
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>          <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">is valid</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>         <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/terminal.svg" class="feather"><span class="catnip-block-aTextLabel">Log to console</span>          <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">distance between</span>          <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>           <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>

:::

### `u.direction(from, to)`

Returns the direction of a vector that goes from one object to another, in degrees. The objects must have `x` and `y` coordinates. (Copies do have them.)

#### Example: Get the direction from the current copy to the player's character and shoot a projectile

::: tabs#tutorial
@tab JavaScript
```js
var player = templates.list['Hero'][0];
if (templates.valid(player)) {
    var projectile = templates.copy('Laser', this.x, this.y);
    projectile.direction = u.direction(this, player);
}
```
@tab CoffeeScript
```coffee
player = templates.list['Hero'][0]
if templates.valid player
    projectile = templates.copy 'Laser', @x, @y
    projectile.direction = u.direction this, player
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">get array element</span>          <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>           <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>PotatoCat</span></span>     </catnip-block>  <span class="catnip-block-aTextLabel">at</span>                     <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>          <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">is valid</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>         <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Laser</span></span>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>     <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">projectile</span>               </catnip-block>          <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">projectile</span>               </catnip-block>         <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set direction to</span>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">direction</span>          <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>           <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

### `u.pdn(x1, y1, x2, y2)` and `u.pointDirection(x1, y1, x2, y2)`

Gets the direction of vector which is pointing from (x1;y1) to (x2;y2).

### `u.pdc(x1, y1, x2, y2)` and `u.pointDistance(x1, y1, x2, y2)`

Gets the distance between points (x1;y1) and (x2;y2).

### `u.rotate(x, y, deg)`

Rotates a given vector by a given angle. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

### `u.rotateRad(x, y, rad)`

The same as `u.rotate`, but the angle is given in radians. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

### `u.degToRad(deg)`

Converts degrees into radians.

### `u.radToDeg(rad)`

Converts radians into degrees.

### `u.deltaDir(dir1, dir2)`

Returns a difference between two directions, in degrees.

## Gameplay and UI Coordinates

### `u.uiToGameCoord(x, y)`

Converts from UI coordinates to game coordinates. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

### `u.gameToUiCoord(x, y)`

Converts from game coordinates to ui coordinates. Returns an object (`PIXI.Point`) with two properties: `x` and `y` components.

## Math

### `u.clamp(min, val, max)`

Returns a clamped value `val`.

### `u.lerp(a, b, alpha)`

Linearly interpolates a value from `a` to `b`, returning `a` if `alpha` = 0 and `b` if `alpha` = 1.

### `u.unlerp(a, b, val)`

An opposite of `u.lerp`. Returns a position of `val` inside a range from `a` to `b`. If `val` is inside this range, this method will return a value between 0 and 1.

### `u.map(val, inMin, inMax, outMin, outMax)`

Re-maps the given `val` from one number range (`inMin` - `inMax`) to another (`outMin` - `outMax`).

## Built-in collision checks

### `u.prect(x1, y1, arg: Array|Copy)` and `u.pointRectangle(x1, y1, arg: Array|Copy)`

Checks if a given point (x1;y1) is inside a rectangle. `arg` can be either an array of coordinates ([x1, y1, x2, y2]) or a Copy with a rectangular shape.

### `u.pcircle(x1, y1, arg: Array|Copy)` and `u.pointCircle(x1, y1, arg: Array|Copy)`

Checks if a given point is inside a circle. `arg` can be either an array of [x1, y1, radius], or a Copy with a cirular shape.

## Time values

### `u.time`

A measure of how long the previous frame took time to draw, in seconds.
You can use it by multiplying it with your copies' speed and other values with velocity to get the same speed with different framerate, regardless of lags or max framerate cap.

If you plan on changing your game's target framerate, you should use `u.time` instead of `u.delta`.

**A minimal example:**
```js
this.x += this.windSpeed * u.time;
```

Note that `this.move()` already uses this value, so there is no need to premultiply `this.speed` with it.

### `u.timeUi`

Similarly to `u.time`, this property also measures the time between the previous and current frames, in seconds, but this value ignores the effects of slow-mo and game pause. (See about pausing the game and changing game speed [here](/tips-n-tricks/game-pause.md).)

### `u.delta`

A measure of how long the previous frame took time to draw, usually equal to 1 and larger on lags.
For example, if it is equal to 2, it means that the previous frame took twice as much time compared to expected FPS rate.

:::warning This is a deprecated property.
Use `u.time` instead.
:::

### `u.deltaUi`

Similar to `u.delta`, this property also measures the time between the previous and current frames, but this value ignores the effects of slow-mo and game pause. (See about pausing the game and changing game speed [here](/tips-n-tricks/game-pause.md).)

:::warning This is a deprecated property.
Use `u.timeUi` instead.
:::

## Miscellaneous

### `u.hexToPixi(hex: string)`

Converts a hex string to a Pixi color.

#### Example: Set copy's tint color from a CSS color

::: code-tabs#tutorial
@tab JavaScript
```js
this.tint = u.hexToPixi('#0dfac3');
```
@tab CoffeeScript
```coffee
@tint = u.hexToPixi '#0dfac3'
```
:::

### `u.pixiToHex(pixi: number)`

Converts a Pixi color to a hex-encoded color code.

#### Example: Set page's background color from a Pixi color

::: code-tabs#tutorial
@tab JavaScript
```js
document.body.style.backgroundColor = u.pixiToHex(0x0dfac3);
```
@tab CoffeeScript
```coffee
document.body.style.backgroundColor = u.pixiToHex 0x0dfac3
```
:::

### `u.wait(time)`

Returns a Promise. Waits `time` milliseconds, then resolves without any data. Rejects if a new room was loaded before the Promise was resolved. Example:

::: code-tabs#tutorial
@tab JavaScript
```js
var enemy = whatever;
enemy.state = 'Disappear';
u.wait(1000)
.then(() => {
    if (!enemy.kill) { // this will happen a second after the code above was called.
        enemy.kill = true;
    }
});
```
@tab CoffeeScript
```coffee
enemy = whatever
enemy.state = 'Disappear'
u.wait 1000
.then =>
    if not enemy.kill
        # this will happen a second after the code above was called.
        enemy.kill = yes
```
:::

### `u.load(url: String, callback: Function)`

Loads the specified script and calls the callback when it was loaded.
