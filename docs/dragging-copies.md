# Dragging Copies Around

Dragging is a crucial part of modern, interactive and user friendly ui design in games, websites and software. It also opens up new possibilities for interactive and original game design. The premise of dragging is simple, it is just like how you pick up and move objects in real life but it is inside of your computer screen. So let's take a look at how we can do a drag and drop implementation for copies in ct.js!

For this tutorial, we have a block type that we are going to drag around. Let's start by declaring a boolean variable in our type's `On Create` tab.

```js
this.dragging = false;
```

This boolean will be true if the copy is currently getting dragged, false otherwise. So let's head over to the `On Step` tab and do that. We need the dragging action to start when the user presses the mouse button while hovering the copy. We can check this with `ct.mouse` functions and an `if` statement.

```js
if (ct.mouse.hovers(this) && ct.mouse.pressed) {
    this.dragging = true;
}
```

We also want the dragging action to end when the user releases the mouse button while dragging the copy. Letting go of it basically.

```js
if (this.dragging && ct.mouse.released) {
    this.dragging = false;
}
```

Now that we marked the start and end of the drag action, let's make the actual action. While dragging the copy, we want it's location varibles (`this.x` and `this.y`) to be the same as the mouse cursor's location (`ct.mouse.x` and `ct.mouse.y`).

```js
if (this.dragging) {
    this.x = ct.mouse.x;
    this.y = ct.mouse.y;
}
```

Perfect! Now we can test our drag action by launching our game.

![Dragging the block](./images/draggingCopies_01.png)

It works! it was this simple to set it up.

## Adding Offsets

We successfully implemented dragging in ct.js but there is still one thing we need to do. Try clicking on the bottom right corner of the copy. You will see that the top left corner of the copy teleports to the mouse cursor. We can fix this by using two variables. One for the x offset and one for the y offset of the mouse according to the copy's location when it gets picked up.  So let's go to the 'On Create` tab and declare them.

```js
this.xOffset = 0;
this.yOffset = 0;
```

Now we want to change these variables when the copy is picked up. So let's head back to the `On Step` tab and change them inside the if statement where the drag action begins (the copy gets picked up).

```js
if (ct.mouse.hovers(this) && ct.mouse.pressed) {
    this.dragging = true;
    this.xOffset = ct.mouse.x - this.x;
    this.yOffset = ct.mouse.y - this.y;
}
```

Now we want to actually use these variables to determine the location of our copy when it is getting dragged. Let's navigate to the if statement where our drag action happens and change the two lines inside.

```js
if (this.dragging) {
    this.x = ct.mouse.x - this.xOffset;
    this.y = ct.mouse.y - this.yOffset;
}
```

We can now relaunch our game to test it.

![Dragging the block](./images/draggingCopies_02.png)

Great! It works perfectly. Now when we pick up our block, it won't teleport to our cursor and get picked up like a real object.