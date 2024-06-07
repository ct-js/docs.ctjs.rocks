# Pausing a game

If you want to pause a game and to create a pause menu, you should freeze all the movement and gameplay processes and leave UI untouched. If you have been using `u.time` all the time, you're all set and need to add a couple of lines! Some things are tricky though:

* Make sure all your timers use built-in events or are based on `u.time`. It can be as simple as `this.timer -= u.time;`, but it can't be `this.timer--;`.
* Your UI elements should use `u.timeUi`, so they stay responsive when the game freezes.
* Watch out for `tween` inside your gameplay-related code, as `tween` uses `u.time` by default.

`u.time` is a value available globally, and it shows how long a previous frame lasted. Using it makes your game run uniformly smooth on any devices, but it can also be scaled, making the game running slower or faster, e.g. for making epic slo-mo scenes. We can freeze the game as well:

```js
pixiApp.ticker.speed = 0;
```

And that's the code you need to pause a game. Put it in any Action-based event, e.g. add this to your room's OnStep code:

```js
if (actions.Pause.pressed) {
    pixiApp.ticker.speed = 0;
}
```

Don't forget to create an actual Action in your project's settings! Bind it so users on different platforms can pause a game.

When this code executes, `u.time` will turn to 0 everywhere, effectively stopping the gameplay, including the standard motion system that uses this.speed and other variables.

## Unpausing it back

You now need to create a way to resume a game, e.g. by modifying the code above so that the same button unpauses the game. We will also add bits of code to make it more practical.

```js
if (actions.Pause.pressed) {
    if (!rooms.current.paused) {
        // This can be used by UI and gameplay elements to stop any gameplay actions that are not tied to u.time
        rooms.current.paused = true;

        pixiApp.ticker.speed = 0;

        // This template can simply be a texture that aligns itself to the view
        // and tells to press a device-specific button to unpause (e.g. "Press Escape to unpause" for desktop keyboards).
        this.unpauseHint = templates.copy('PauseHint', rooms.current.x + camera.width / 2, rooms.current.y + camera.height / 2);
        // Coordinates are set so the copy is placed exactly in the middle of a player's screen.
        // See "Working with Viewport" in other tips & tricks.
    } else {
        rooms.current.paused = false;

        pixiApp.ticker.speed = 1; // `1` is the normal speed

        this.unpauseHint.kill = true; // Remove the copy
    }
}
```

This code can also be split into two parts and moved to UI buttons. UI animations can run on the `tween` catmod, or be manually animated through time at each frame.