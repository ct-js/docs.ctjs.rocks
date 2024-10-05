# styles

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Этот объект позволяет создавать, хранить и использовать заранее определенные стили для отрисовки текста. Эти стили соответствуют свойствам класса Pixi's [TextStyle](https://pixijs.download/release/docs/PIXI.TextStyle.html).

## Использование стилей

### `styles.get(name: string)`

Возвращает указанный стиль.

### `styles.get(name: string, true)`

Возвращает копию указанного стиля. Затем эта копия может быть отредактирована и использована безопасно.

::: code-tabs#tutorial
@tab JavaScript
```js
var multiline = styles.get('Label', true);
multiline.wordWrap = true;
multiline.wordWrapWidth = 320;
this.details = new PIXI.Text(this.info, multiline);
```
@tab Civet
```coffee
multilines = styles.get 'Label', yes
multiline.wordWrap = yes
multiline.wordWrapWidth = 320
@details = new PIXI.Text @info, multiline
```
:::

### `styles.get(name: String, opts: Object)`

Создаёт копию указанного стиля и расширяет её заданным объектом. Затем эту копию можно редактировать и использовать безопасно.

::: code-tabs#tutorial
@tab JavaScript
```js
var multiline = styles.get('Label', {
    wordWrap: true,
    wordWrapWidth: 320
});
this.details = new PIXI.Text(this.info, multiline);
```

@tab Civet
```coffee
additionalOpts = {
    wordWrap: true,
    wordWrapWidth: 320
}
multiline = styles.get('Label', additional opts)
@details = new PIXI.Text(@info, multiline)
```
:::

## Создание стилей программно

### `styles.new(name: string, opts)` 

Создает новый стиль с указанным именем. Опции такие же, как при [создании TextStyle](https://pixijs.download/release/docs/PIXI.TextStyle.html).

