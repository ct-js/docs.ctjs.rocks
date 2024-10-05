# `Copy` pseudoclass

Copies are the entities that interact with each other on the screen and what drives the game's logic. They derive from various Pixi.js classes depending on the base class you select.

::: tip
To create and find copies in a running game, see the [`ct.templates` reference](ct.templates.html).
:::

## Base Classes

Ct.js uses a graphics library called Pixi.js, and ct.js' copies inherit lots of properties and methods from pixi.js' classes. Usually you will be using fields documented by ct.js, but there is much more you can do with pixi.js API.

Depending on what base class you choose in a template editor, your copy will be based on one of pixi.js classes. The class determines which properties and methods copies have, and you can find docs for them there:

| Ct.js class | Common use cases | Pixi.js parent class |
| ----------- | ---------------- | -------------------- |
| **Animated Sprite** | Characters, items, and other entities that have a texture and have a frame-by-frame animation. | [PIXI.AnimatedSprite](https://pixijs.download/dev/docs/PIXI.AnimatedSprite.html) |
| **Button** | UI buttons! Oh wow! | [PIXI.Container](https://pixijs.download/dev/docs/PIXI.Container.html) |
| **Container**| Custom-made stuff that can be moved and transformed as one with its child items. | [PIXI.Container](https://pixijs.download/dev/docs/PIXI.Container.html)    |
| **Panel** | Keeps corners of a texture intact — useful for UI buttons, panels, and stretching gameplay elements. | [PIXI.NineSlicePlane](https://pixijs.download/dev/docs/PIXI.NineSlicePlane.html) |
| **Text** | User interface. Copies made of Text templates can be tweaked in a room editor and through code. | [PIXI.Text](https://pixijs.download/dev/docs/PIXI.Text.html)|
| **TextBox** | A field that can accept keyboard input. | [PIXI.Container](https://pixijs.download/dev/docs/PIXI.Container.html)|
| **Repeating texture** | A texture that can tile and scroll in both directions without distortions. | [PIXI.TilingSprite](https://pixijs.download/dev/docs/PIXI.TilingSprite.html) |
| **Sprited counter** | Displays several sprites in a row depending on its `count` property. | [PIXI.TilingSprite](https://pixijs.download/dev/docs/PIXI.TilingSprite.html) |

::: warning INSTANCEOF and ct.js copies
Ct.js' base classes do not form child classes, but rather a class with a mixin applied to its instances. You cannot do `copy instanceof CopyPanel`, as `CopyPanel` is not a constructor but a type combined of a class and ct.js' Copy interface.

If you do need to use something like `instanceof` in your code, you should test against Pixi.js' parent classes to differ ct.js classes *and* use `templates.isCopy()` to determine whether you are working with a ct.js Copy.

You may also read `copy.name` to get the name of the used ct.js template.
:::

## Moving Copies Around

Each Copy has these parameters for movement:

| Property    | Type | Description   |
| ----------- | ---- | ------------- |
| `x`, `y`    | `number` | Copy's location, by X and Y axes (horizontal and vertical axes).  |
| `xprev`, `yprev`   | `number` | The location of a Copy in a previous frame.  |
| `xstart`, `ystart` | `number` | The coordinates at which a copy was created. |
| `speed` | `number` | Movement speed (or the length of vector `[hspeed; vspeed]`).   |
| `hspeed`, `vspeed` | `number` | Horizontal and vertical speed. |
| `direction` | `number` | Movement direction (from 0 to 360, from right side going clock-wise). |
| `gravity`   | `number` | Gravity force, as an amount of `speed` added at each frame.    |
| `gravityDir`| `number` | Gravity direction (from 0 to 360, default is 90).|

All the speed and gravity values are measured in pixels per second.

You can also call `this.addSpeed` to add speed vector to a Copy in a given direction.

::: code-tabs#reference
@tab JavaScript
```js
this.addSpeed(speed, dir);
```
@tab Civet
```coffee
@addSpeed speed, dir
```
:::

To actually move a copy, you should call `this.move();` in your copy's OnStep code (it is included in each Type by default). Default movement system already takes `ct.delta` into account, so it will move with the same speed at every frame rate.

## Manipulating Copies' look

There are a number of parameters that can be changed:

| Property    | Type | Description  |
| ----------- | ---- | ------------ |
| `alpha` | `number` | The opacity of the copy. 0 makes a copy invisible, 1 is the default (fully opaque) mode. All in between will make a gradual transparency change.  |
| `blendMode` | `PIXI.BLEND_MODES` (`number`) | How to graphically mix the copy with the rest of the world. Defaults to `PIXI.BLEND_MODES.NORMAL`. Can be one of: <ul><li>`PIXI.BLEND_MODES.NORMAL`</li> <li>`PIXI.BLEND_MODES.ADD`</li> <li>`PIXI.BLEND_MODES.MULTIPLY`</li><li>`PIXI.BLEND_MODES.SCREEN`</li></ul> |
| `zIndex`    | `number`| The drawing layer. Copies with higher value will be drawn on top of others.    |
| `angle` | `number` | The rotation of the copy in degrees ranging from 0 to 360, starting from right side and going clock-wise.  |
| `scale` | `PIXI.ObservablePoint` | The scale factor of the object. You can either assign a simple value (`this.scale = 0.5;`) for uniform scaling or access its `x` and `y` compounds (`this.scale.x = 0.5;`).|
| `tex`| `string` | The name of a ct.js texture to use. Setting `this.tex = 'NewTexture';` will change the displayed texture and reset animation.    |
| `tint`  | `number` | The tint applied to the sprite. This is a hex value. A value of `0xFFFFFF` will remove any tint effect. The colors are the same as in CSS but with `0x` instead of `#`, e.g. `0xFF0000` is red, `0x00FFFF` is cyan, ect. |
| `visible`   | `number` | The visibility of the object (`true` or `false`).  |

::: warning
Not all properties are supported for each base class:

* `blendMode` has no effect when you use it on a Container copy;
* `tex` property is not available on Container and Text templates.
:::

## Deleting Copies (`this.kill` property)

To delete a Copy, simply set its `kill` parameter to `true`.

**Example:** delete a Copy, if its health is depleted

::: code-tabs#reference
@tab JavaScript
```js
if (this.health <= 0) {
    this.kill = true;
}
```
@tab Civet
```coffee
if @health <= 0
    @kill = yes
```
:::

::: tip Note
OnStep code [will still be executed](ct.html#Event-sequence) to its end. Copies get logically deleted between OnStep and Draw calls.
:::

## Base classes' additional methods and properties

### Animated Sprite

These properties and methods are available only for Animated Sprite templates:

| Property  | Type | Description |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `animationSpeed` | `number` | Animation speed. Higher is faster, lower is slower. |
| `currentFrame`   | `number` | **Read-only**. Current drawing frame index. You should change it with `gotoAndPlay`, `gotoAndStop` methods. |
| `totalFrames`    | `number` | **Read-only**. The total number of frames in the Copy. |

Methods:

#### `copy.gotoAndPlay(frameIndex)`

Goes to a specific frame and begins playing the animation.

#### `copy.gotoAndStop(frameIndex)`

Stops the animation and goes to a specific frame.

#### `copy.play()`

Plays the animation.

#### `copy.stop()`

Stops the animation.

### Text

There are several additional properties for Text templates:

| Property    | Type  | Description |
| ----------- | ------------------------------------- | ----------- |
| `text`  | `string`  | The text to display. You can change it to replace the shown text label. |
| `textStyle` | `PIXI.ITextStyle` or `PIXI.TextStyle` | The text style that defines the appearance of the text. You can get a ct.js and assign it to your label programmatically with `this.textStyle = styles.get('StyleName')` |

### Container

Containers can't display anything on their own, but you can add additional elements and even copies to them, and then move, scale, and rotate these components as one group by transforming the container alone.

While the containers cannot display anything by themselves, they can mask its contents and add shaders (filters) to them. See examples in the [official pixi.js documentation](https://pixijs.download/dev/docs/PIXI.Container.html).

#### `copy.addChild(childElement)`

Adds a new child to the container. It can be a pixi.js display object or a ct.js copy.

##### Example: adding a copy as a child to a container (`this`)

::: code-tabs#reference
@tab JavaScript
```js
var healthbar = templates.copy('HealthBar');
healthbar.x = 0;
healthbar.y = -50; // Place the healthbar above the center of the container.

var sprite = new PIXI.Sprite(res.getTexture('Enemy', 0));

// Same as this.addChild(healthbar); this.addChild(sprite);
this.addChild(healthbar, sprite);
```
@tab Civet
```coffee
healthbar = templates.copy 'HealthBar'
healthbar.x = 0
healthbar.y = -50 # Place the healthbar above the center of the container.

texture = res.getTexture 'Enemy', 0
sprite = new PIXI.Sprite texture

# Same as:
#   @addChild healthbar
#   @addChild sprite
@addChild healthbar, sprite
```
:::

#### `copy.removeChild(childElement)`

Removes the specified child element from the container.

#### `copy.removeChildAt(index)`

Removes the specified child element at the specified index, starting from 0.

#### `copy.children`

An array of all the child elements of the container.

#### `copy.setChildIndex(childElement, newIndex)`

Finds a specified child element and places it to a new index, with 0 being the first element.

#### `copy.sortChildren()`

Resorts child elements by their `zIndex`.

#### `copy.getBounds(updateTransforms)`

Returns an object with `x`, `y`, `width`, `height`, and also `top`, `bottom`, `left`, and `right` properties, describing the boundaries of the container, including all its children.

If `updateTransforms` is set to `true`, an additional check is made to update copies' positions in the game world. You usualy don't need to set it to `true`.

### Button

Buttons are containers that automatically create and manage a text and a nine-slice plane inside them. They have the same methods and properties as Container copies do, plus these properties:

* `text` — The text label that is displayed in the button.
* `panel` — The nine-slice plane inside the button.
* `disabled` — A `boolean` value that enables or disables the button. This affects whether a user can trigger click events on the button and also changes its texture to a disabled state (if you set a texture for it in the template's Appearance panel).

#### Example: Changing a button's text label

::: code-tabs#reference
@tab JavaScript
```js
this.text.text = 'New label!';
```
@tab Civet
```coffee
@text.text = 'New label!'
```
:::

#### Example: Disabling a button when a player doesn't have enough money

This can be placed in a Frame End event.

::: code-tabs#reference
@tab JavaScript
```js
if (rooms.current.money >= 50) {
    this.disabled = false;
} else {
    this.disabled = true;
}

// A shorter way to do the same thing:
this.disabled = rooms.current.money < 50;
```
@tab Civet
```coffee
if rooms.current.money >= 50
    @disabled = no
else
    @disabled = yes

# A shorter way to do the same thing:
@disabled = rooms.current.money < 50
```
:::

### Textboxes

This base class makes input fields you and your players can use to input custom text. The field has options to support numeric inputs, regular strings, and masked passwords.

Copies that use this base class have two additional events to xlisten for text change, and in these events you can use a variable called `value` to get the text. Alternatively, you can use these properties:

* `text` — the text value of this field.
* `fieldType` — can be one of `'text'`, `'password'`, `'email'`, `'number'`.
* `maxLength` – the maximum length of the text that can be written.

#### Example: send a login request to a server by reading login and password from two textboxes

::: code-tabs#reference
@tab JavaScript
```js
var login = templates.list['LoginField'][0].text,
    password = templates.list['PasswordField'][0].text;
// Usually authentication is more complicated than this simplified example
fetch('https://yourServer.com', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        login,
        password
    })
}).then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Login failed');
}).then(json => {
    if (json.ok) {
        rooms.switch('InGame');
    }
}).catch(error => {
    console.error(error);
    rooms.switch('Login_NetworkError');
});
```
@tab Civet
```coffee
login = templates.list['LoginField'][0].text
password = templates.list['PasswordField'][0].text

payload =
    login: login
    password: password

# Usually authentication is more complicated than this simplified example
fetch 'https://yourServer.com',
    method: 'POST'
    headers:
      'Accept': 'application/json'
      'Content-Type': 'application/json'
    body: JSON.stringify payload
.then (response) =>
    if response.ok
        return response.json()
    throw new Error 'Login failed'
.then (json) =>
    if json.ok
        rooms.switch 'InGame'
.catch (error) =>
    console.error error
    rooms.switch 'Login_NetworkError'
```
:::

### Repeating texture

This base class allows you to create animated (or static) rectangles of arbitrary size with a tiling texture. The copies of this base class have these additional properties:

* `scrollX` and `scrollY` — movement speed by X and Y, measured in pixels per second;
* `tileScale.x` and `tileScale.y` can be used to stretch the texture inside the rectangle. `scale.x` and `scale.y` expand the rectangle without changing texture's scale.
* `tilePosition.x` and `tilePosition.y` can be used to manually position the texture inside the rectangle.

#### Example: Make a wavy animation of a repeating texture

::: code-tabs#reference
@tab JavaScript
```js
// In Creation event
this.wavePhase = 0;

// In Frame End event
// 0.5 slows the frequency of movement by two.
this.wavePhase += u.time * 0.5;
// 32 is the amplitude of the movement.
this.tilePosition.x = Math.sin(this.wavePhase) * 32;
```
@tab Civet
```coffee
# In Creation event
@wavePhase = 0

# In Frame End event
# 0.5 slows the frequency of movement by two.
@wavePhase += u.time * 0.5
# 32 is the amplitude of the movement.
@tilePosition.x = Math.sin(@wavePhase) * 32
```
:::


### Sprited counter

This template base class can be used to create healthbars and other UI elements that display several sprites in a row. This base class doesn't introduce many special properties except for `count`:

#### Example: Change the number of sprites show depending on lives remaining

::: code-tabs#reference
@tab JavaScript
```js
this.count = rooms.current.lives;
```
@tab Civet
```coffee
@count = rooms.current.lives
```
:::

## Misc

### `copy.getRoom()`

Returns the room that owns the current copy. This is useful when working with different rooms in a stage. Returns an instance of `Room` class.

### `copy.template`

The name of the template from which a Copy was created (a `string`).

### `copy.addChild(anotherCopy)`

When using Containers, you can add other copies (or pixi.js objects) to a container, and they will be moved and transformed together. You will then position the copies inside the container relative to its x, y coordinates, not relative to the 0;0 point of the room.

Note that collision catmods usually work only if copies are placed directly in a room, so you should generally use containers for UI elements only, or for cosmetic stuff.