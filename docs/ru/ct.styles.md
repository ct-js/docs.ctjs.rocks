# ct.styles

Этот объект позволяет создавать, хранить и использовать предопределённые стили для рисования текста. Эти стили соответствуют свойствам [класса TextStyle из Pixi](https://pixijs.download/release/docs/PIXI.TextStyle.html).

## Использование стилей

### `ct.styles.get(name: String)`

Возвращает указанный стиль.

### `ct.styles.get(name: String, true)`

Возвращает копию указанного стиля. Эта копия затем может быть отредактирована, не затрагивая исходный стиль.

```js
var multiline = ct.styles.get('Label', true);
multiline.wordWrap = true;
multiline.wordWrapWidth = 320;
this.details = new PIXI.Text(this.info, multiline);
```

### `ct.styles.get(name: String, opts: Object)`

Создаёт копию указанного стиля, а затем дополняет её заданным объектом. Эта копия затем может быть отредактирована и использована без изменения исходного стиля.

```js
var multiline = ct.styles.get('Label', {
    wordWrap: true,
    wordWrapWidth: 320
});
this.details = new PIXI.Text(this.info, multiline);
```

## Программное создание новых стилей

### `ct.styles.new(name, options)`

Создаёт новый стиль с заданным именем. Параметры такие же, как если бы вы создавали [TextStyle в Pixi](https://pixijs.download/release/docs/PIXI.TextStyle.html).