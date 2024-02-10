# Polishing the JettyCat

::: tip Hey,
This tutorial assumes that you have finished the tutorial [Making Games: Jetty Cat](./making-games-jettycat.md). You should complete it first.
:::

The game is complete mechanic-wise, but there are a lot of ways to improve it aesthetically and gameplay-wise!

[[toc]]

## Transition between rooms

Ct.js has a module called `transition`. It allows you to easily create nice transitions between levels. The idea is that you start the first half of a transition on a button press or some other event, then switch to another room and call the second half of a transition in its Room start code.

Enable the module `transition` in the Catmods tab. It signals that it depends on the `tween` catmod, so enable it as well.

Now, modify the `Button_Play` Pointer click event code so that it shows a blue circled transition when clicked:

::: code-tabs#tutorial
@tab JavaScript
```js
if (!this.pressed) {
    this.pressed = true;
    transition.circleOut(1000, 0x446ADB)
    .then(() => {
        rooms.switch('InGame');
    });
}
```
@tab CoffeeScript
```coffee
if not @pressed
    @pressed = yes
    transition.circleOut 1000, 0x446ADB
    .then =>
        rooms.switch 'InGame'
```
:::

`this.pressed` is our custom variable that remembers that a button was pressed. It will help us prevent occasional double clicking, that may have negative effects on the game's logic.

The first argument in `transition.circleOut(1000, 0x446ADB)` is the duration of the effect (1000 milliseconds = 1 second), and the second one is the color of the transition. It is like the hex color, but with `0x` instead of `#` in the beginning.

::: tip
There are many more methods and examples in the module's "Info" and "Reference" tabs.
:::

The transition itself is an asynchronous action! We use `.then(() => {…})` to switch to the next room right when the transition ends.

That was the first part of the transition. The second one will go to the `InGame` Room start code. Open the room, and put this line:

::: code-tabs#tutorial
@tab JavaScript
```js
transition.circleIn(500, 0x446ADB);
```
@tab CoffeeScript
```coffee
transition.circleIn 500, 0x446ADB
```
:::

We can also show up our UI layers (the pause menu and the score screen) by making them transparent but slowly turning them opaque. We will use `tween` there — that's one catmod that is used by `transition`.

Most entities in ct.js have the same parameters that allow you to tweak their look and feel. We've been using `this.scale.x` and `this.scale.y` to set a copy's scale, but we can also apply it to rooms, text labels, special effects, and so on. Besides scaling, there are parameters `this.angle`, `this.alpha` and `this.tint` that rotate an object, set its opacity and color correspondingly.

We will change the property `this.alpha` through time. It is a number between 0 and 1. When set to 1 — its initial value — a copy or a room will be fully opaque. When set to 0, it will be invisible. Any numbers in-between will make an object partially transparent. The module `tween` will help create a smooth transition of it.

So, to fade in a UI layer, we need to put this code in the Room start event of rooms `UI_OhNo` and `UI_Paused`:

::: code-tabs#tutorial
@tab JavaScript
```js
this.alpha = 0;

tween.add({
    obj: this,
    fields: {
        alpha: 1
    },
    duration: 500,
    isUi: true
});
```
@tab CoffeeScript
```coffee
@alpha = 0

tween.add
    obj: this
    fields:
        alpha: 1
    duration: 500
    isUi: true
```
:::

Firstly, we make a room fully transparent by setting its `alpha` to 0. Then, we call `tween.add` to start a smooth transition. `obj` points to an object that should be animated, and `fields` lists all the properties and values we want to change. The `duration` key sets the length of the effect, in milliseconds. Finally, the `isUi` key tells that animation should run in UI time scale, ignoring our "paused" game state.

We can fade out a UI layer, too. Let's gradually hide the pause menu when the player hits the "continue" button. Open the template `Button_Continue`, and modify its Pointer click event code:

::: code-tabs#tutorial
@tab JavaScript
```js
if (!this.pressed) {
    this.pressed = true;
    tween.add({
        obj: this.getRoom(),
        fields: {
            alpha: 0
        },
        duration: 1000,
        isUi: true
    })
    .then(() => {
        pixiApp.ticker.speed = 1;
        rooms.remove(this.getRoom());
    });
}
```
@tab CoffeeScript
```coffee
if not @pressed
    @pressed = yes
    tween.add
        obj: @getRoom()
        fields:
            alpha: 0
        duration: 1000
        isUi: yes
    .then =>
        pixiApp.ticker.speed = 1
        rooms.remove @getRoom()
```
:::

We create a flag `this.pressed` to make sure that the code runs the animation only once. Running it multiple times won't hurt, but this keeps the debugger's log clean as `tween` will warn about interrupted animations otherwise.

Then we start animation for `this.getRoom()`, which will return the room `UI_Paused` that owns this button, and change its alpha value back to 0. After that, we can see that `tween.add` creates an asynchronous event, and we remove the room and unpause the game inside the `.then(() => {…});` clause.

## Smoothly resuming the game after it has been paused

Though the "paused" menu fades out slowly, it is still hard for a player to catch up and prevent the cat from bumping into the ground. To prevent that, we can use `tween` to… animate time! `pixiApp.ticker.speed` can be not just 0 and 1, but also anything in between, and even beyond 1. Large values will make the game run faster, while values close to 0 will slow the game. Thus, we can animate the value `pixiApp.ticker.speed` to make the game transition from paused to fully running state.

Open the template `Button_Continue` again, and modify the script so it fires another `tween.add` after it finishes the first one:

::: code-tabs#tutorial
@tab JavaScript
```js {12,13,14,15,16,17,18,19}
if (!this.pressed) {
    this.pressed = true;
    tween.add({
        obj: this.getRoom(),
        fields: {
            alpha: 0
        },
        duration: 1000,
        isUi: true
    })
    .then(() => {
        tween.add({
            obj: pixiApp.ticker,
            fields: {
                speed: 1
            },
            duration: 1000,
            isUi: true
        });
        rooms.remove(this.getRoom());
    });
}
```
@tab CoffeeScript
```coffee
if not @pressed
    @pressed = yes
    tween.add
        obj: @getRoom()
        fields:
            alpha: 0
        duration: 1000
        isUi: yes
    .then =>
        tween.add
            obj: pixiApp.ticker
            fields:
                speed: 1
            duration: 1000
            isUi: true
        rooms.remove @getRoom()
```
:::

Now players can catch up with the game and save their cat from falling.

## Cat's jet smoke and star particles

From v1.3, ct.js allows you to visually design particle effects and play them in your game. And it's cool! Let's create two effects: one will be a jet smoke for the cat. The other will show a burst of smaller stars when you collect one.

### Making a starburst

Open the "Assets" tab at the top, and create a new emitter tandem through "New Asset". Call it `StarBurst`.

Select its texture in the left top corner, and start tweaking values! There are lots of folding categories that manipulate how particles move, change over time and spawn.

Try making it look like this one:

![An effect with a star burst](./../images/tutorials/tutJettyCat_Stars.gif)

::: tip
You can set a preview texture in the right bottom corner to see how your effect looks compared to a star bonus.
:::

Here are some directions on how to make this effect:

* To make the burst and not an infinite stream, open the "Spawning" section and set emitter's lifetime. This is a fast effect, so you will need small values like 0.1 seconds.
* The "Velocity" section has a "With gravity" button that will make stars falling down after they burst out. You will need the vertical, Y-axis, and pretty large values: I used ~1400 for my effect.
* To make the effect uneven and less artificial, make sure particles have a different lifetime at the "Spawning" category, so they become more random. Tweaking minimum velocity and size also helps.
* A relatively large circular area that covers most of the preview texture will make the effect more like it was a big star breaking down into smaller pieces. You can set the spawn shape and its size under the category "Shape and Positioning". Check the box "Show shape visualizer" to see the shape.

When you're ready, hit the "Apply" button at the bottom of the left column.

To create a burst of stars when a big one is collected, open the template `Star`, add the "Destruction" event and write a line:


::: code-tabs#tutorial
@tab JavaScript
```js
emitters.fire('StarBurst', this.x, this.y);
```
@tab CoffeeScript
```coffee
emitters.fire 'StarBurst', @x, @y
```
:::

Ta-da!

::: tip
Here we read the position of the star (`this.x, this.y`) and tell to spawn an effect `StarBurst`.
:::

### Making a jet smoke

First we'll need a smoke-like texture. Go to add a new asset and click on the "Built-in asset gallery" button. This game engine comes with texture packs you can import right into your game! Go into the Jumperpack and import the Smoke texture. Now close out of the gallery and see that the smoke texture is part of your project!

![Importing a gallery texture in ct.js](./../images/tutorials/tutJettyCat_gallery.png)

Create a new emitter tandem. Call it `Jet`.

As a start, go to the texture select and load your Smoke texture. In the right bottom corner, find the button "Set preview texture", and select our cat. After that, feel free to tinker around the editor to make the effect you want. I made a jet of white smoke of different sizes:

![A jet particle effect in ct.js](./../images/tutorials/tutJettyCat_Jet.gif)

Here are some hints:

* Change the background color in the bottom-right corner of the window to better see white smoke;
* Start by changing the Rotation tab » Starting direction fields so the particles flow downwards. A good range is between 90 and 110 degrees.
* The default texture's size will be way too big; tweak its scale in the graph under the folding section called "Scaling", so it is somewhere around `0.3`.
* Tweak the value Scaling » Minimum size to spawn particles of different sizes.
* Precisely position the emitter so that it spawns right from the jet by tweaking the emitter's position, in the section called "Shape and Positioning".
* Change the value Spawning » Time between bursts to change the density of a jet. Smaller values spawn larger amounts of particles.

To add the effect to the cat, open its template and put this code to the end of its Creation code:

::: code-tabs#tutorial
@tab JavaScript
```js
this.jet = emitters.follow(this, 'Jet');
```
@tab CoffeeScript
```coffee
@jet = emitters.follow this, 'Jet'
```
:::

`emitters.follow` tells to create a particle effect and make it follow a copy. It will look attached to the cat. The first argument is the copy we want to attach the effect to (`this` is our cat), the second one — the name of the effect (`'Jet'`).

We also save a reference to this emitter to a parameter `this.jet`. This will allow us to manipulate the emitter later.

::: tip
Read [the docs for `emitters`](./../emitters.md) to learn more about other methods for creating effects and their options.
:::

The cat should now have a jet of smoke running from its jetpack. You may need to tweak the jet's particle size and its speed.

Let's add a bit of dynamics to this jet: we will spawn new particles only when the cat flies up. We have the reference `this.jet`, and we can use it to pause the emitter and unpause it when the player presses or releases the screen.

Create a new Action release event, select the Poof action, and place this piece of code in it:

::: code-tabs#tutorial
@tab JavaScript
```js
this.jet.pause();
```
@tab CoffeeScript
```coffee
@jet.pause()
```
:::

This will pause the effect. To unpause it, go to the On Poof down event and add this line:

::: code-tabs#tutorial
@tab JavaScript
```js
this.jet.resume();
```
@tab CoffeeScript
```coffee
@jet.resume()
```
:::

And that is it for particles; time for some testing!

## Adding subtle animations to the cat and stars

Particles help liven up the game, but it still may feel stiff and static. Let's add little animations to the cat and stars. We will rotate the cat depending on its vertical speed, and the star by time.

### Rotating the cat

Every copy has a parameter `this.angle`, that sets the visual angle of a texture in degrees. Each copy also has `this.speed` and `this.direction` we've used, and they both define additional parameters `this.vspeed` and `this.hspeed` — the vertical and horizontal speed decomposed from speed and direction. These two can be negative values when a copy moves in the opposite direction from how the axis goes. (E.g. the X-axis points to the right, its values grow from left to right. Moving to the right makes positive `hspeed`, moving to the left makes negative `hspeed`.)

We can tie `this.vspeed` and `this.angle` of a cat together so that it rotates when falling or flying up. It is done by simply assigning one value to another in the Frame end event code.

This line will work:

::: code-tabs#tutorial
@tab JavaScript
```js
this.angle = -this.vspeed;
```
@tab CoffeeScript
```coffee
@angle = -@vspeed
```
:::

Though it will result in a too strong rotation. Adding a division will make it look better:

::: code-tabs#tutorial
@tab JavaScript
```js
this.angle = -this.vspeed / 200;
```
@tab CoffeeScript
```coffee
@angle = -@vspeed / 200
```
:::

### Rotating the stars

With stars, we can't simply tie `this.angle` to some ct.js' value. We can define our own, though, and apply a bit of math to turn numbers into nice wiggles. This all will remind you of spawning timers.

Open the `Star` template, and add this line to its Creation event:

::: code-tabs#tutorial
@tab JavaScript
```js
this.wiggleTime = 0;
```
@tab CoffeeScript
```coffee
@wiggleTime = 0
```
:::

Then, in the Frame end event, add this code:

::: code-tabs#tutorial
@tab JavaScript
```js
this.wiggleTime += u.time * 12;
this.angle = Math.sin(this.wiggleTime) * 5;
```
@tab CoffeeScript
```coffee
@wiggleTime += u.time * 12
@angle = (Math.sin @wiggleTime) * 5
```
:::

Here we change `this.wiggleTime` at each frame by the elapsed time, multiplied by 12 to speed up the animation. Then we use `Math.sin` to get a sinus of the `wiggleTime` — changing the latter at each frame will result in a smooth oscillation between -1 and 1. By multiplying it by 5, we make the effect five times stronger.

![A wiggling, animated star](./../images/tutorials/tutJettyCat_StarWiggle.gif)

## Adding a hint to start tapping

Let's use the same approach to create a visual hint for a user to start tapping! It will be a pulsating hand icon.

Create a new template called `PressHint` with a texture `PressHint`. Make sure the texture has its axis centered.

In the template's Creation code, add a line `this.pulsePhase = 0;`. In its Frame start code, put this snippet:

::: code-tabs#tutorial
@tab JavaScript
```js
this.pulsePhase += u.time * 12;

this.scale.x = this.scale.y = 1 + Math.sin(this.pulsePhase) * 0.1;
```
@tab CoffeeScript
```coffee
@pulsePhase += u.time * 12
@scale.x = @scale.y = 1 + (Math.sin @pulsePhase) * 0.1
```
:::

And in the Action Poof press event, add this: `this.kill = true`

Here we again change the property that is used inside `Math.sin`. We set a copy's horizontal and vertical scale to this sine wave plus add `1` so that the copy is not shrunk into a point. (Without this `1 +`, the sine wave would oscillate around 0, meaning near 0% of a copy's size.)

When a user presses the screen, the Poof press event runs and we remove the copy as the user starts manipulating their cat.

The last step is adding this copy to `UI_InGame`, somewhere in the center of the view.

## Animating background in the main menu + parallax effect

The parallax effect is used in gamedev since ancient times — once console's processors got strong enough to draw backgrounds. The effect is made by moving several background layers at different speeds to create an effect of depth. Though we won't get a strong effect in this tutorial, we will learn how to configure backgrounds in ct.js, and liven up our main menu and overall view.

Go to the room `MainMenu`, and click the "Backgrounds" tool in the left toolbar. Then, click the gear icon next to the background `BG_Sky`. We will need to slowly move the background from left to right so that our clouds get moving. Set the Movement speed to `-30`, `0`. These values tell the background to move against the X-axis half a pixel each second.

![Setting a background's movement speed in ct.js](./../images/tutorials/tutJettyCat_32.png)

Then, go to the room called `InGame`. Open the same settings of the background `BG_Sky`. Set its parallax values to 0.5: it will tell the background to move twice as slow than the rest of the room, creating the effect of depth.

![Setting a background's movement speed in ct.js](./../images/tutorials/tutJettyCat_33.png)

The main menu will now have an animated sky, and the sky at the main game's room will slide noticeably slower than any other object in the room. Neat!

## That's it!

The game is polished and looks juicy, hooray! Time to read other tutorials, or to create a new game from scratch!

Happy coding!
