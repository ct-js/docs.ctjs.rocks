# Game and UI Coordinates: the Difference

In ct.js, there are two coordinate spaces: for UI elements (UI coordinates) and for gameplay elements that live on a separate coordinate grid. By default, they will match, but once you start moving the camera, rotating and zooming it, they will be different. For example, you can scale viewport and get more stuff shown on a screen, capturing a bigger rectangle in *game space*, but always showing the same rectangle in *UI space*.

![A difference between game and UI coordinates](./images/GameCoordsUICoordsGraphic.png)

By using these coordinates, you can separate UI and gameplay layers, reuse your UI in different rooms and simplify UI development, as UI coordinates are usually constant and you can design your menus and other elements in a room editor.

::: tip
*Layers* are regular rooms added by `ct.rooms.append` and `ct.rooms.prepend`. Together with the main room, they form a *stage*.
:::

## Game Space

Game space was the only space in ct.js until a camera object was introduced. If you transition your project from v1.2 to v1.3, your game is fully in game coordinates. [See the migration guide here](/migration-1.2to1.3.html), if you have problems. Different rooms put in game coordinates do collide with each other.

## Entering the UI Space

Any new rooms appended or prepended to the main one can be put in UI coordinates with `ct.rooms.append('NameOfTheRoom', {isUi: true})` and `ct.rooms.append('NameOfTheRoom', {isUi: true})` (see the corresponding reference for the methods [here](/ct.rooms.html)). This one line is all you need!

::: tip
Technically, ct.js will transform each layer in the stage depending on the camera's position, and UI layers will be left as is. This means that Pixi's world coordinates are actually UI coordinates, which is counter-intuitive, but that's the way the camera object is coded. So, don't use Pixi's world coordinates.

What does it mean for you? Firstly, you can't reposition those rooms that use game coordinates by yourself, as they are managed by `ct.camera` and get overridden. You can manipulate the camera instead — it has some cool features to simplify viewport management. More info on that in the [Viewport management](/viewport-management.md) docs.

Secondly, you can reposition UI layers! This can be used to create widgets that move on the screen, and for slide animations.
:::

## UI Space

UI space is a rectangle from `0` to `ct.camera.width` horizontally and from `0` to `ct.camera.height` vertically. Unless `ct.fittoscreen` with special modes like "Expand" or "Scaling without letterboxing" is used, this will be a rectangle equal to what you define as a view size in your room. Otherwise, it will either match the screen ("Expand" mode) or be taller or wider depending on your screen ("Scaling without letterboxing).

To update the position of your UI elements so that they align nicely on different screens, use `ct.camera.width` and `ct.camera.height`. To align basic interfaces automagically, use `ct.camera.realign(room);`.

## Translating Coordinates from One Space to Another

You will need these methods to convert from one coordinate space to another:

* `ct.u.uiToGameCoord(x, y)`, and
* `ct.u.gameToUiCoord(x, y)`.

These will return an array with two elements, `x` and `y` coordinates. The methods can be used to align UI elements to copies in game space and do other overlapping tasks.

The camera also has a number of functions and variables that return its position in game space:

* `ct.camera.left` — represents the x position of the camera's left edge;
* `ct.camera.right`;
* `ct.camera.top`;
* `ct.camera.bottom`.

These may be used, for example, to determine whether a copy is visible or not.

For rotated viewports, use these methods:

* `ct.camera.getTopLeftCorner();`
* `ct.camera.getTopRightCorner();`
* `ct.camera.getBottomLeftCorner();`
* `ct.camera.getBottomRightCorner();`

They return an array with two elements — `x` and `y` coordinates.