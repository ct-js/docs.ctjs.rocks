# Pausing a game

If you want to pause a game and to create a pause menu, you should freeze all the movement and gameplay processes and leave UI untouched. If you have been using `ct.delta` all the time, you're all set and need to add a couple of lines! Some things are tricky though:

* Make sure all your timers are based on `ct.delta`. It can be as simple as `this.timer -= ct.delta;`, but it can't be `this.timer--;`.
* Your UI elements should use `ct.deltaUi`, so they stay responsive when the game freezes.
* Watch out for `ct.tween` inside your gameplay-related code, as `ct.tween` does not use `ct.delta` by default.

`ct.delta` is a value available globally, and it shows how long a frame lasted relative to an ideal one at 60 FPS. It makes your game run uniformly smooth on any devices, but it can also be scaled, making the game running slower or faster, e.g. for making epic slo-mo scenes. We can freeze the game as well:

```js
ct.pixiApp.ticker.speed = 0;
```

And that's the code you need to pause a game. Put it in any Action-based event, e.g. add this to your room's OnStep code:

```js
if (ct.actions.Pause.pressed) {
    ct.pixiApp.ticker.speed = 0;
}
```

Don't forget to create an actual Action in your project's settings! Bind it so users on different platforms can pause a game.

When this code executes, `ct.delta` will turn to 0 everywhere, effectively stopping the gameplay, including the standard motion system that uses this.speed and other variables.

## Unpausing it back

You now need to create a way to resume a game, e.g. by modifying the code above so that the same button unpauses the game. We will also add bits of code to make it more practical.

```js
if (ct.actions.Pause.pressed) {
    if (!ct.room.paused) {
        // This can be used by UI and gameplay elements to stop any gameplay actions that are not tied to ct.delta
        ct.room.paused = true;

        ct.pixiApp.ticker.speed = 0;

        // This template can simply be a texture that aligns itself to the view
        // and tells to press a device-specific button to unpause (e.g. "Press Escape to unpause" for desktop keyboards).
        this.unpauseHint = ct.templates.copy('PauseHint', ct.room.x + ct.viewWidth / 2, ct.room.y + ct.viewHeight / 2);
        // Coordinates are set so the copy is placed exactly in the middle of a player's screen.
        // See "Working with Viewport" in other tips & tricks.
    } else {
        ct.room.paused = false;

        ct.pixiApp.ticker.speed = 1; // `1` is the normal speed

        this.unpauseHint.kill = true; // Remove the copy
    }
}
```

This code can also be split into two parts and moved to UI buttons. UI animations can run on `ct.tween`, or be manually animated through time at each frame.