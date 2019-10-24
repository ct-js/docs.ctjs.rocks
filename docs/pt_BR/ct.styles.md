# ct.styles

Esse objeto permite criar, armazenar e usa estilos predefinidos para o desenho de texto. Em conformidade com as propriedades da [classe TextStyle](https://pixijs.download/release/docs/PIXI.TextStyle.html) do Pixi.

## Usando estilos

### `ct.styles.get(name: String)`

Retorna o estilo especificado.

### `ct.styles.get(name: String, true)`

Retorna uma cópia do estilo especificado. Essa cópia pode então ser editada e usada com segurança.

```js
var multiline = ct.styles.get('Label', true);
multiline.wordWrap = true;
multiline.wordWrapWidth = 320;
this.details = new PIXI.Text(this.info, multiline);
```

### `ct.styles.get(name: String, opts: Object)`

Cria uma cópia do estilo especificado e depois o estende através do objeto passado como argumento. Essa cópia pode ser editada e usada com segurança.

```js
var multiline = ct.styles.get('Label', {
    wordWrap: true,
    wordWrapWidth: 320
});
this.details = new PIXI.Text(this.info, multiline);
```

## Criando estilos programaticamente

### `ct.styles.new(name, options)`

Cria um novo estilo com o nome fornecido em `name`. O `options` são os mesmos que encontrados em [criando um TextStyle](https://pixijs.download/release/docs/PIXI.TextStyle.html) do Pixi.
