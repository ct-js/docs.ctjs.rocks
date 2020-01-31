# Working with Viewport

Since v1.3, ct.js has a Camera object that manipulates the viewport. It supports scaling, rotation, and other features like following a copy and creating screen shake effects.

## Moving the camera around

To move the camera around, you can either modify `ct.camera.x` and `ct.camera.y` by yourself, or use the built-in variables for following things on the screen. The latter approach requires the `ct.camera.follow` variable to be set (see below).

To scale the viewport, use `ct.camera.scale.x` and `ct.camera.scale.y`, similarly to scaling copies. This is not a zoom level, but a scaling factor of a capturing rectangle: when using values larger than 1, you will see a larger portion of a room.

To rotate the viewport, use `ct.camera.angle` (in degrees) and `ct.camera.rotation` (in radians). Again, you rotate a capturing rectangle, so the stuff on the screen will rotate clockwise.

## Following a copy

A simple line `ct.camera.follow = this;` inside the On Create code of your main character is enough to set up automagical camera movement ✨

You can alter the camera's behaviour by these variables:

* `ct.camera.borderX` and `ct.camera.borderY` define the area at which the camera shifts if the followed copy enters these borders. These values are represented in pixels, relative to a room's designed size;
* `ct.camera.center` may be set to `true` to automatially set borders so that the followed copy always stays at the center of the screen. It has a higher priority over `ct.camera.borderX` and `ct.camera.borderY`;
* `ct.camera.shifttX` and `ct.camera.shifttY` allow to place the camera higher/lower/etc than the target copy's axis;
* `ct.camera.followDrift` is a value between [0; 1] that defines how fast the camera reacts to a copy's movement. The default is `0` (no drift). For casual games and puzzles, settings `ct.camera.followDrift` to `0.9` may be a good choice to create a smooth camera.

## Screenshake effects

// TODO

## Making an adaptive UI

Contemporary devices all have various resolutions, and thus your app should adapt to them and still give the maximum quality.

The first step you need to do is to enable the `ct.fittoscreen` catmod. Then, select the "Settings" tab and select a scaling mode that suits your game project more:

* Fast scaling with letterboxing is suitable for purely **pixelart games**, or when performance is vital;
* Expansion works good when the more player sees on the screen, the better (e.g. RTS or games like Factorio);
* Expansion + viewport management is usually *preferable* over regular expansion as it helps you with keeping important things in focus;
* Scaling with letterboxing works for **any types of projects**, and can also give nice transforms to your pixelart games. This will remain your designed aspect ratio.
* Scaling without letterboxing ensures both best quality and use of full screen. It is often prerable over scaling with letterboxing.

If you are making a pixelart game, make sure you disable image smoothing at the "Settings" tab.

In general, you should follow these rules:

* use `ct.viewWidth` and `ct.viewHeight` to position things relative to a screen;
* update position of UI elements regularly, as it will be required on resolution change, resizing a windowed version, at random unplug of external monitor, etc;
* when using "Scaling with/without letterboxing", start designing your rooms, graphic assets and UI at a relatively big view size at rooms' settings, e.g. at 1920x1080px, so it will scale down on other resolutions nicely.

Don't forget to test your UI on different screen sizes and devices!

## Resizing the viewport

Usually, it is best to use `ct.fittoscreen` so that it manages the renderer and viewport for you. In other cases, use `ct.camera.scale.x` and `ct.camera.scale.y`.

If you still want to resize the viewport manually, use these parameters (this affects the renderer!):

* `ct.width`;
* `ct.height`.

These can still be used with most of `ct.fittoscreen`'s  modes, except for "expand" mode, as the use of `ct.width` and `ct.height` makes no sense here, because `ct.fittoscreen` overrides them.