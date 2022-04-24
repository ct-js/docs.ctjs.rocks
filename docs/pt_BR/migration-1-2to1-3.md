# Migrando da v1.2 para a v1.3

Na versão 1.3 do ct.js, um conceito de câmera foi implementado. Antigamente, o viewport era movido pela alteração dos parâmetros `ct.room.x` e `ct.room.y`. Agora eles são apenas de leitura, e o movimento do viewport é feito pela alteração dos parâmetros em `ct.camera`.

A câmera possui recursos adicionais como redimensionamento, rotação do viewport e adição do efeito de tremer a tela.

Também foi implementado o conceitode coordenadas de jogo e de coordenadas de UI. Em poucas palavras, "coordenadas de jogo" são as que você já usava antes — elas são para as coisas adicionadas no mundo do jogo —, enquanto que as "coordenadas de UI" são exclusivamente para as camadas de UI. Mais sobre isso pode ser encontrando [aqui](./game-and-ui-coordinates.html).

Então,

- em vez de `ct.room.x`, use `0` para UI e `ct.camera.getTopLeftCorner()[0]` para as coordenadas de jogo;
- em vez de `ct.room.y`, use `0` para UI e `ct.camera.getTopLeftCorner()[1]` para as coordenadas de jogo;
- em vez de `ct.viewWidth`, use `ct.camera.width` para UI e `ct.camera.getBoundingBox().width` para as coordenadas de jogo;
- em vez de `ct.viewHeight`, use `ct.camera.heght` para UI e `ct.camera.getBoundingBox().heght` para as coordenadas de jogo.

Para combinações, como `ct.room.x + ct.viewWidth`, é melhor usa better as funções e parâmetros especiais da câmera. Por exemplo, `ct.room.x + ct.viewWidth` é `ct.camera.width` em coordenadas de UI e `ct.camera.left` em coordenadas de jogo (embora você precise usar `ct.camera.getTopLeftCorner` e `ct.camera.getBottomLeftCorner` quando estiver trabalhando com câmeras rotacionadas).

::: warning Alerta
Se você estiver fazendo UI, é melhor usar o alinhamento automático e camadas de UI, as quais são descritas [aqui](./viewport-management.html), pois elas são ferramentas mais poderosas quando operando com as coordenadas de tela.
:::

::: tip Dica
Você deve considerar usar `ct.camera.moveTo` e `ct.camera.teleportTo` para mover a câmera. [Leia sobre os efeitos aqui](./viewport-management.html#moving-and-teleporting).
:::

::: tip Dica
`ct.viewWidth` e `ct.viewHeight` ainda funcionam, mas estão obsoletos e refletem os valores de `ct.camera.width` e `ct.camera.height`. `ct.view*` será removido na próxima versão principal.
:::


Além disso,

- use `ct.camera.follow` em vez de `ct.room.follow`;
- use `ct.camera.shiftX` e `ct.camera.shiftY` em vez de `ct.room.followShiftX` e `ct.room.followShiftY`;
- use `ct.camera.drift` em vez de `ct.room.followDrift`;
- use `ct.camera.borderX` e `ct.camera.borderY` em vez de `ct.room.borderX` e `ct.camera.borderY`;
- use `ct.camera.borderX = ct.camera.borderY = null;` em vez de `ct.room.center = true;`.

## Alterações nos módulos internos

`ct.mouse` e `ct.touch` agora tem métodos e parâmetros auxiliares, por exemplo, `ct.mouse.xui` e `ct.mouse.yui`, `ct.touch.hoversUi`. Consulte a documentação deles para uma lista completa de novos parâmetros.