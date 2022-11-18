# Using bitmap fonts

There are two types of text labels in ct.js: bitmap fonts and canvas-based ones. The first is great for dynamic, moving, changing text, and the second type is great for large amounts of static text. Picking the right type makes your game more optimized. Note that both text labels can be transformed as a whole without any performance impact, e.g. moved, rotated, colored with `this.tint` property.

Besides that, bitmap fonts are much more better for pixelart games, as browsers tend to smear canvas labels and ruin all the tiny details.

## Importing a font and enabling a bitmap font

You will need a font in TTF format. Make sure you have legal right to use it in games.

On the tab "UI", click the button "Import TTF" and locate your file. Then, click on this font to open font viewer.

![](./images/bitmapFonts_01.png)

Enter its proper name, then tick the box with a label "Also generate a bitmap font". A bunch of settings will appear. Here, first of all, you should input font size. Note that most tiny pixel fonts are told to be, say, 7x5 pixels in size, but in reality, they will need larger font size, usually 16px. You might need some fiddling around font size to get perfect results.

![](./images/bitmapFonts_02.png)

Below the font size and line height fields lies a number of checkboxes that allow you to include a subset of characters. Selecting a few instead of using "Draw everything the font supports" will decrease its size, thus making your games load faster.

Unless you need a font to display one word without spaces, you do need to check "Digits and punctuation" — it includes spaces, commas, periods, and other word and sentence delimiters.

After configuring your font, you can grab the name of this font as a bitmap resource which we will use in our code. Click the cpy button next to the resource name, at the bottom of the column.

## Using bitmap fonts in code

The process of creating a bitmap text label is similar to canvas-based one: we create a child element with `new PIXI.BitmapText()` and add it to a parent — a type or a room.

::: code-tabs#tutorial
@tab JavaScript
```js
this.label = new PIXI.BitmapText('Initial text', {
  font: {
    name: 'Void_400',
    size: 16
  },
  align: 'left'
});
this.addChild(this.label);
```
@tab CoffeeScript
```coffee
textSettings =
    font:
        name: 'Void_400'
        size: 16
    align: 'left'
@label = new PIXI.BitmapText 'Initial text', textSettings
@addChild @label
```
:::

The size of the font can be different than set in ct.IDE. When you add a number of fonts with different sizes but with one name, ct.js will take the best fit from them.

We can manipulate the font similarly to copies by tinting, scaling, rotating this label:

::: code-tabs#tutorial
@tab JavaScript
```js
this.label.tint = 0xff0000; // Paint it in red
this.label.rotation = 15; // Tilt it a bit
this.label.scale.y = 1.25; // Make it taller
```
@tab CoffeeScript
```coffee
@label.tint = 0xff0000 # Paint it in red
@label.rotation = 15 # Tilt it a bit
@label.scale.y = 1.25 # Make it taller
```
:::

To change the text, write to `text` parameter:

::: code-tabs#tutorial
@tab JavaScript
```js
this.label.text = 'Score: ' + this.score;
```
@tab CoffeeScript
```coffee
@label.text = 'Score: ' + @score
```
:::

Finally, when you no longer need the label, you can remove it with `destroy()` method:

::: code-tabs#tutorial
@tab JavaScript
```js
this.label.destroy();
```
@tab CoffeeScript
```coffee
@label.destroy()
```
:::
