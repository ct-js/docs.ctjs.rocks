# A classe `Background` 

Aqui você encotrará as propriedades que permitem alterar a velocidade, posição, padrão de repetição e o efeito parallax das imagens de fundo do jogo, entre outras propriedades como `tint` e `alpha`.

### Posição e movimento

Cada imagen de fundo tem essas propriedades que define como as mesmas serão posicionadas na tela de exibição do jogo:

Property | Type | Description
-|-|-
`shiftX` | `number` | O quanto a textura de fundo deve deslocar horizontalmente, em pixels.
`shiftY` | `number` | O quanto a textura de fundo deve deslocar verticalmente, em pixels.
`movementX`, `movementY` | `number` | <p>A velocidade com que a textura de fundo desloca-se pelos eixos X e Y.</p><p>O valor é determinado em pixels por frame. Ele também leva o `ct.delta` em consideração.</p>
`parallaxX`, `parallaxY` | `number` | <p> Um valor que faz o fundo se mover mais rápido ou mais devagar em relação aos outros objetos. Normalmente ele é utilizado para criar um efeito de profundidade.</p><p>`1` significa um movimento normal, um valor menor que `1` fará com que o movimento seja mais lento, dando a imprenssão que a imagem de fundo está mais longe da câmera; valores maiores que `1` fará o oposto disso, fazendo com que a imagem de fundo pareça está mais próxima que o resto do objeto.</p>
`isUi` | `boolean` | Defina o valor `true` para fundos que são adicionadas às camadas de UI. Isso é necessário para um alinhamento apropriado das camadas de fundo.
`repeat` | `string` | Apenas um desses `'repeat'`, `'repeat-x'`, `'repeat-y'`, ou `'no-repeat'`.

### Removendo um fundo

Similiar aos templates, um fundo pode ser removido com `bg.kill = true;`, onde `bg` é o fundo que precisa ser removido.

### Outras propriedades interessantes

A classe `Background` herda um monte de propriedades e métodos de [`PIXI.TilingSprite`](https://pixijs.download/release/docs/PIXI.TilingSprite.html), e aqui apresentamos algumas que você pode achar útil:

Property | Type | Description
-|-|-
`alpha` | `number` | Opacidade da camada entre `0` e `1`. `0` é completamente transparente, enquanto que `1` é completamente opaco (é o valor padrão).
`tint` | `number` (hex value) | A cor de fundo. `0xffffff` é branco (é o valor padrão), `0xff0000` o fará ser vermelho.
`blendMode` | `PIXI.BLEND_MODES` (`number`) | Como misturar o fundo com o resto do mundo. O valor padrão é `PIXI.BLEND_MODES.NORMAL`. Pode ser um desses: <ul><li>`PIXI.BLEND_MODES.NORMAL`</li> <li>`PIXI.BLEND_MODES.ADD`</li> <li>`PIXI.BLEND_MODES.MULTIPLY`</li><li>`PIXI.BLEND_MODES.SCREEN`</li></ul>