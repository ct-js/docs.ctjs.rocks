# Working with Viewport

Ct.js has a Camera object (`camera` in code and console) that manipulates the viewport. It supports scaling and rotation, and can also follow a copy and create screen shake effects.

## Moving the camera around

To move the camera around, you can:

* use `camera.teleportTo`, `camera.moveTo`;
* use the built-in variables to follow things on the screen;
* change the camera's parameters by yourself.

### Moving and teleporting

`camera.moveTo(x, y)` and `camera.teleportTo(x, y)` both move the camera to a new position. There are differences, though:

* `camera.moveTo(x, y)` is useful for cutscenes and smooth transitions between objects, as it works with `camera.drift`;
* `camera.teleportTo(x, y)` does not cause transitions and reset screen shake effects. It is useful for instant precise changes, e.g. when moving a camera to a distant location

### Following a copy

A simple line `camera.follow = this` inside the On Create code of your main character will set up automagical camera movement ✨ You can also set a template to automatically follow in your room's settings.

`camera.borderX` and `camera.borderY` define the area at which the camera shifts when the followed copy enters these borders. These values are in UI coordinates.

::: code-tabs#tutorial
@tab JavaScript
```js Example: following a copy with borders
// Place this code, e.g, to your hero's `OnCreate` code
camera.follow = this;

// Follow the hero so it cannot be closer than 300 px to any side of the screen
camera.borderX = 300;
camera.borderY = 300;
```
@tab CoffeeScript
```coffee Example: following a copy with borders
# Place this code, e.g, to your hero's `OnCreate` code
camera.follow = this

# Follow the hero so it cannot be closer than 300 px to any side of the screen
camera.borderX = 300
camera.borderY = 300
```
:::

You can also disable following logic for one axis. Setting `camera.followX` to `false` will disable horizontal movement, and setting `camera.followY` will disable vertical movement. This still allows you to move the camera with `teleportTo` and `moveTo` methods.

### Manual positioning

If you ever find that above methods are not enough for you, use these parameters:

* `camera.x`,
* `camera.y`,
* `camera.targetX`,
* `camera.targetY`.

`x` and `y` are the current position of the camera without screen shake and effects of `shiftX` and `shiftY`.
`targetX` and `targetY` will be different if `camera.drift` is larger than 0, and you should firstly edit these values.

## Zooming and rotation

To scale the viewport, use `camera.scale.x` and `camera.scale.y`, similarly to scaling copies. This is not a zoom level, but a scaling factor of a capturing rectangle: when using values larger than 1, you will see a larger portion of a room.

To rotate the viewport, use `camera.rotation` (in degrees). Again, you rotate a capturing rectangle, so the stuff on the screen will rotate clockwise.

::: warning A little caveat
You should not change the camera's values in the "On Draw" event, as the camera updates after the "On Step" event and before "On Draw" event. If you do, you will notice some inconsistencies when converting UI coordinates to game ones. That's because `u.uiToGameCoord` and others will use new values though the room is not yet repositioned.
:::

## Modifiers and smooth transition

* `camera.drift` is a value between [0; 1] that defines how fast the camera reacts to movement. The default is `0` (no drift). Try setting `camera.drift` to `0.9` to create a smooth transition.
* `camera.shiftX` and `camera.shiftY` allow placing the camera higher/lower/etc than the target. This is especially useful while following a copy: you may need to show more stuff on the left when a game character looks there, or below when it crouches, etc.

`camera.shiftX` and `camera.shiftY` are interpolated in a separate pass than other camera movements but still use `camera.drift`.

::: tip
For smooth scaling and rotation, change values `camera.angle`, `camera.scale.x`, `camera.scale.y` continuously with `u.time`, or use `tween` module.

For example, to zoom in, you could use this code:

::: code-tabs#tutorial
@tab JavaScript
```js
tween.add({
    obj: camera.scale,
    duration: 500,
    fields: {
        x: 0.5,
        y: 0.5
    }
});
```
@tab CoffeeScript
```coffee
tween.add
    obj: camera.scale
    duration: 500
    fields:
        x: 0.5
        y: 0.5
```
:::

::: tip
Or you could manipulate camera angle by user input (in "On Step" event):

::: code-tabs#tutorial
@tab JavaScript
```js
camera.angle += actions.CameraRotate.value * u.time * 300;
```
@tab CoffeeScript
```coffee
camera.angle += actions.CameraRotate.value * u.time * 300
```
:::

## Screen shake effects

Yes, there is a built-in feature for that 😅 Its design is as follows:

* a screen shakes by two blended harmonious functions on each axis, with their phases unsynced;
* the power of a screen shake is set by `camera.shake` and represents the largest possible amplitude of the effect. A value of `10` is 10% of the viewport size;
* the effect gradually decays through time — this can be tweaked by `camera.shakeDecay` parameter, or disabled by setting it to `0`.

::: warning DISCLAIMER
* **Do remember** that there are lots of people (e.g. me, the creator of ct.js) that quickly get dizzy because of screen wobble and shaking. There are also people with epilepsy.
* **Do provide controls** for screen shake/wobble and don't overuse the effect.
* **Put warnings** about screen shake/wobbling at the start of your game and inside your game's description.
:::

There are many parameters [described here](/camera.html) to control its feel, but default values are good as well. Here are the examples:

::: code-tabs#tutorial
@tab JavaScript
```js
// Add an impulse that will accumulate on repetitive calls
camera.shake += 1;
```
@tab CoffeeScript
```coffee
# Add an impulse that will accumulate on repetitive calls
camera.shake += 1
```
:::

::: code-tabs#tutorial
@tab JavaScript
```js
// Make a constant, slow camera wobble
camera.shakeFrequency = 1;
camera.shakeDecay = 0;
camera.shake = 2;
```
@tab CoffeeScript
```coffee
# Make a constant, slow camera wobble
camera.shakeFrequency = 1
camera.shakeDecay = 0
camera.shake = 2
```
:::

## Making an adaptive UI

Contemporary devices all have various resolutions, and thus your app should adapt to them and still give the best quality.

The first step is going select the "Settings" tab and selecting a scaling mode that suits your game project more:

* Fast scaling with letterboxing is suitable for purely **pixelart games**, or when performance is vital;
* Expansion works well when the more player sees on the screen, the better (e.g. RTS or games like Factorio);
* Scaling with letterboxing works for **any type of projects**, and can also give nice transforms to your pixelart games. This will remain your designed aspect ratio.
* Scaling without letterboxing ensures both the best quality and use of a full screen. It is often preferable over scaling with letterboxing.

If you are making a pixelart game, make sure you disable image smoothing at the "Project" tab -> "Render Options" on the left side.

In general, you should follow these rules:

* design UI in a separate room, and then import it with `rooms.append('NameOfTheRoom', {isUi: true})`;
* use `camera.width` and `camera.height` to position UI elements;
* use `camera.realign(this)` in "On Draw" of the UI layer to quickly get decent results;
* update the position of UI elements regularly, as any resolution change may crop your elements. This can be caused by resizing a windowed version, at random unplug of an external monitor, etc;
* when using "Scaling with/without letterboxing", start designing your rooms, graphic assets, and UI at a relatively big view size at rooms' settings, e.g. at 1920x1080px, so it will scale down on other resolutions nicely.

Don't forget to test your UI on different screen sizes and devices!
