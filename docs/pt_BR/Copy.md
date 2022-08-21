# A classe `Copy`

Copies são entidades que interagem uma com as outras na tela, o que impulsiona a lógica do jogo. Elas são derividas da classe `AnimatedSprite` do Pixi, você pode encontrar [muito mais parâmetros](https://pixijs.download/release/docs/PIXI.AnimatedSprite.html) no site de documentação deles.

::: tip Dica
Para criar e encontrar as copies, veja a [referência em `ct.templates`](ct.templates.html).
:::

## Movendo as Copies

Cada Copy tem esses parâmetros para movimento:

Propriedade | Tipo | Descrição
-|-|-
`x`, `y` | `Number` | Localzação da Copy, pelos eixos X e Y (eixo horizontal and vertical).
`xprev`, `yprev` | `Number` | A localização da Copy no frame anterior.
`xstart`, `ystart` | `Number` | As coordenadas na qual a copy foi criada.
`speed` | `Number` | Velocidade de movimento (ou o tmanaho do vetor `[hspeed; vspeed]`).
`hspeed`, `vspeed` | `Number` | Velocidade horizontal e vertical.
`direction` | `Number` | Direção do movimento (de 0 até 360, indo para a direita no sentido horário).
`gravity` | `Number` | Força da gravidade, como uma quantidade de `speed` adicionada a cada frame.
`gravityDir` | `Number` | Direção da gravidade (de 0 até 360, o padrão é 90).

Você também pode chamar `this.addSpeed` para adicionar velocidade ao vetor de uma Copy em uma dada direção.

```js
this.addSpeed(speed, dir);
```

Para atualmente mover uma copy, você deve chamar `this.move();` no código em OnStep da sua copy (ele é incluído em cada Template por padrão). O sistema padrão de movimento já leva em consideração o `ct.delta` no cálculo, então ele moverá na mesma velocidade a cada taxa de quadros.

## Manipulando a aparência das Copies

Existe um número de parâmetros que podem ser alterados:

|Propriedade | Tipo | Descrição|
|-|-|-|
|`alpha` | `Number` | A opacidade da copy. 0 faz a copy ficar invisível, 1 é o valor padrão (completamente opaco). Qualquer valor que esteja entre esse intervalo fará com que a transparência seja alterada de forma gradual.|
|`blendMode` | `PIXI.BLEND_MODES` (`Number`) | Como misturar a copy com o resto do mundo. O padrão é `PIXI.BLEND_MODES.NORMAL`. Mas pode ser um destes: <ul><li>`PIXI.BLEND_MODES.NORMAL`</li> <li>`PIXI.BLEND_MODES.ADD`</li> <li>`PIXI.BLEND_MODES.MULTIPLY`</li><li>`PIXI.BLEND_MODES.SCREEN`</li></ul>|
|`depth` | `Number` | Define a profundidade da copy na camada de desenho. Por exemplo, uma copy com o valor 1, está acima de outra com o valor 0. O valor padrão é 0.|
|`angle` | `Number` | A rotação da copy em graus no intervalo de 0 até 360, começando da direita e indo no sentido horário.|
|`scale` | `PIXI.ObservablePoint` | O fator de escala do objeto. Você pode atribuir simples valor (`this.scale = 0.5;`) para um redimensionamento uniforme ou acessar as componentes `x` e `y` compounds (`this.scale.x = 0.5;`).|
|`tex` | `String` | O nome de uma textura que deve ser usada pelo ct.js texture. Definindo `this.tex = 'NewTexture';` alterará a textura exibida e resetará a animação. |
|`tint` | `Number` | A tonalidade aplicada ao sprite. Esse é um valor em hexadecimal. Um valor de `0xFFFFFF` removerá qualquer efeito de tonalidade. As cores são as mesmas que no CSS, mas com o `0x` em vez de `#`, por exemplo, `0xFF0000` é vermelho, `0x00FFFF` é cyan, etc.|
|`visible` | `booleana` | A visibilidade do objeto (`true` or `false`).|

## Animação

|Propriedade | Tipo | Descrição|
|-|-|-|
|`animationSpeed` | `Number` | Velocidade da animação. Quanto maior o valor, mais rápido será, e quanto menor o valor, mais lento será.|
|`currentFrame` | `Number` | **Apenas de leitura**. O índice atual do frame sendo renderizado. Você deve alterá-lo com os métodos `gotoAndPlay` e `gotoAndStop`.|
|`totalFrames` | `Number` | **Apenas de leitura**. O número total de frames na Copy.|

Métodos:

### `copy.gotoAndPlay(frameIndex)`

Vai para um frame específico e inicia a animação.

### `copy.gotoAndStop(frameIndex)`

Para a animação e vai para um frame específico.

### `copy.play()`

Inicia a animação.

### `copy.stop()`

Para a animação.


## Deletando Copies (Com a propriedade `this.kill`)

Para deletar uma Copy, simplesmente defina a propriedade `kill` para `true`.

**Exemplo:** deleta uma Copy, se a barra de vida está esgotada

```js
if (this.health <= 0) {
    this.kill = true;
}
```

::: tip Observação
Mesmo que uma copy tenha a sua propriedade definida para `true`, o código em OnStep [ainda será executado](ct.html#Event-sequence) até o fim. As Copies são logicamente deletadas entres as camadas de OnStep e Draw.
:::

## Diversos

### `copy.getRoom()`

Retorna a room que atualmente contém a copy. Isso é útil quando se trabalha com diferentes rooms em uma fase. Retorna uma instância da classe `Room`.

### `copy.template`

O nome do template no qual uma Copy foi criada (o valor retornado é do tipo `string`).