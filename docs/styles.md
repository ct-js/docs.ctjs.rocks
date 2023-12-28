# styles

This object allows you to create, store, and use predefined styles for drawing text. These styles conform to Pixi's [TextStyle class](https://pixijs.download/release/docs/PIXI.TextStyle.html) properties.

## Using styles

### `styles.get(name: String)`

Returns the specified style.

### `styles.get(name: String, true)`

Returns a copy of the specified style. This copy then may be edited and used safely.

::: code-tabs#tutorial
@tab JavaScript
```js
var multiline = styles.get('Label', true);
multiline.wordWrap = true;
multiline.wordWrapWidth = 320;
this.details = new PIXI.Text(this.info, multiline);
```
@tab CoffeeScript
```coffee
multiline = styles.get 'Label', yes
multiline.wordWrap = yes
multiline.wordWrapWidth = 320
@details = new PIXI.Text @info, multiline
```
:::

### `styles.get(name: String, opts: Object)`

Creates a copy of the specified style, then extends it with a given object. This copy then may be edited and used safely.

::: code-tabs#tutorial
@tab JavaScript
```js
var multiline = styles.get('Label', {
    wordWrap: true,
    wordWrapWidth: 320
});
this.details = new PIXI.Text(this.info, multiline);
```
@tab CoffeeScript
```coffee
additionalOpts =
    wordWrap: true
    wordWrapWidth: 320
multiline = styles.get 'Label', additionalOpts
@details = new PIXI.Text @info, multiline
```
:::

## Creating styles programmatically

### `styles.new(name, options)`

Creates a new style with a given name. Options are the same as if you were [creating a TextStyle](https://pixijs.download/release/docs/PIXI.TextStyle.html).
