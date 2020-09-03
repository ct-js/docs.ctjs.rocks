# Moving characters and objects in ct.js

Movement is often the core of any game, and it is essential to know how it works in ct.js. There are numerous approaches to code movement that we will discuss here.

## The basics of movement

Each object's position is defined by `this.x` and `this.y` parameters. `this.x` increases going from left to right, and `this.y` increases from top to bottom. The change of these properties define the *speed* of objects. If you have `this.speed` equal to 5, it means that a copy will move by 5 pixels at each frame. The speed of an object also has direction, which is set by `this.direction` property.

The speed and its direction of an object can be decomposed into vertical and horizontal components, and they are defined as `this.vspeed` and `this.hspeed`. When you change `this.vspeed` or `this.hspeed`, `this.speed` and `this.direction` get updated automatically, and the other way around.

Copies can also have gravity applied, by setting `this.gravity` and `this.gravityDir`. Gravity will change a copy's speed at each frame, enlarging it by `this.gravity` at each frame in the given direction.

By themselves, only `this.x` and `this.y` have effect on the visual position of objects. To make the other properties work, ct.js has `this.move()` method, and `ct.place` provides two other methods too. (This module is enabled by default in all new projects.) You also may not use them at all. Due to that, there are several ways to program copies' movement.

## `this.move()`

`this.move()` can be called at the On Step code at any type so it moves according to `this.speed` and `this.direction` parameters. It doesn't check for collisions on its own, so you will need to program your own collision handling logic with it. But it may be the only thing you need for, say, arcade space shooters. It is also the way to move bullets and other things that get destroyed on collision.

### Example: Set speed of a copy according to player's input and move it.

On Step code:

```js
this.hspeed = ct.actions.MoveHorizontally.value * 5;
this.vspeed = ct.actions.MoveVertically.value * 5;
this.move();
```

### Example: set speed and direction of a copy and move it.

On Create code:

```js
this.speed = 15;
this.direction = 90;
```

On Step code:

```js
this.move();
```

### Example: Follow a copy of a type "Character"

On Step code:

```js
var character = ct.types.list['Character'][0];
// Check whether the character exists.
if (ct.types.exists(character)) {
    this.speed = 5;
    // Compute direction from current location to character's position.
    this.direction = ct.u.pointDirection(this.x, this.y, character.x, character.y);
} else {
    // Stop moving if the character doesn't exist.
    this.speed = 0;
}
```

### `this.moveContinuous(cgroup)`

`this.moveContinuous(cgroup)` is a method from ct.place, and it can be called from On Step code at each frame to precisely move copies with high speed.

If you, for example, have small fast moving projectiles that fly through some really narrow walls, these projectiles will fly through the walls as they jump over it in one frame, not causing collisions. To prevent it, you can use `this.moveContinuous(cgroup)` to move the projectiles in steps, performing several collision checks at each frame.

`cgroup` is a collision group. There is also a form of the method `this.moveContinuous(cgroup, precision)`, where `precision` is the length of each step, in pixels. It is set to 1 by default but for fast-moving projectiles, you will often want to set it to a value somewhere between the half and the whole diameter of this projectile.