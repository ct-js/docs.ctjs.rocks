# settings

This object provides rendering options that you can tweak in-game, usually to provide your players graphics settings.

## settings.targetFps

The target framerate for the game. You can use it to cap the framerate to preserve battery life or to provide smoother but lower FPS than the maximum a player's screen can support.

### Example: Setting a framerate cap to 30fps

```js
settings.targetFps = 30
```

## settings.viewMode

The viewport mode you usually set in project's render options. You may need to change it, for example, to provide a user a choice between fast and quality scaling, or to toggle letterboxing.

The property can be set to one of these values:

* `'asIs'` — disables any viewport management; the rendered canvas
will be placed as is in the top-left corner.
* `'fastScale'` — the viewport will proportionally fill the screen
without changing the resolution.
* `'fastScaleInteger'` — the viewport will be positioned at the middle
of the screen, and will be scaled by whole numbers (x2, x3, x4 and so on).
* `'expand'` — the viewport will fill the whole screen. The camera will
expand to accommodate the new area.
* `'scaleFit'` — the viewport will proportionally fill the screen, leaving letterboxes
around the base viewport. The resolution is changed to match the screen.
* `'scaleFill'` — the viewport fills the screen, expanding the camera to avoid letterboxing.
The resolution is changed to match the screen.

### Example: switching between fast and quality scaling

::: code-tabs#reference
@tab JavaScript
```js
if (settings.viewMode === 'fastScale') {
    settings.viewMode = 'scaleFit';
} else {
    settings.viewMode = 'fastScale';
}
```
@tab CoffeeScript
```coffee
if settings.viewMode is 'fastScale'
    settings.viewMode = 'scaleFit'
else
    settings.viewMode = 'fastScale'
```
:::

## settings.highDensity

A boolean property that can be set to `true` to enable high-DPI support in the game. Defaults to the value you set in the ct.js IDE, in the project's render settings.

High-DPI support is only visible if your screen is high-DPI one. If it is, a player will get a higher resolution that matches the actual pixel density of the screen. You may want to toggle it off or provide a choice for players to ease the load on mobile devices, as they usually have hight-DPI screens.

### Example: Toggling high pixel density support

```js
settings.highDensity = !settings.highDensity
```

## settings.fullscreen

A boolean property that can be changed to exit or enter fullscreen mode. It always defaults to `false` as web games cannot enter fullscreen voluntarily — only through user interaction. Desktop and mobile builds work differently, with mobile builds being always in fullscreen mode and desktop builds having an option in your project's render settings.

::: warning
Always add a way to exit fullscreen mode, or you risk getting your players stuck in a window they can't escape!
:::