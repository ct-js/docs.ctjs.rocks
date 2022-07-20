# A classe `Room`

As salas(rooms) são entidades que contém todas as copies, planos de fundo(backgrounds), tile layers(camadas de tile), e entidades avançadas também. Elas também são chamadas de mapas e níveis.

As salas(rooms) são derivadas da classe [PIXI.Container](https://pixijs.download/release/docs/PIXI.Container.html), e herda todos os seus métodos e propriedades.

## A sala(room) atual, `ct.room`.

`ct.room` sempre aponta para a sala(room) atual. Se você tem várias salas(rooms) em camadas umas sobre as outras, o `ct.room` apontará para a sala(room) inicial que foi criada no início do jogo, ou apontará para a sala(room) definida após a chamada do método [`ct.rooms.switch`](ct.rooms.html#ct-rooms-switch-newroomname).

Para obter as salas(rooms) que estão em camdas, você pode usar [`ct.rooms.list`](ct.rooms.html#ct-rooms-list-roomname), ou [`this.getRoom`](Copy.html#copy-getroom) de dentro dos eventos das copies.

## Salas(rooms) de UI e de Jogo

As salas(rooms) ponde ser colocadas no espaço de coordenadas de UI ou no espaço de coordenadas de jogo. As salas(rooms) de jogo são gerenciadas por `ct.camera` e não podem ser movidas manualmente. Mas as salas(rooms) de UI podem: por exemplo, para mover pequenos widgets pela viewport(janela de visualização).

::: tip Dica
Mais sobre esse conceito em [Coordenadas de Jogo e de UI](game-and-ui-coordinates.html). Para saber como gerenciar a viewport(janela de visualização), veja [Trabalhando com a Viewport(Janela de Visualização)](viewport-management.html).
:::

## Propriedades notáveis

|Propriedade | Tipo | Descrição|
|-|-|-|
|`alpha` | `number` | Um valor de 0 até 1 que define a opacidade da sala(room). Você pode usar os mesmo para, por exemplo, criar um efeito de aparecimento e desaparecimento das camadas de UI. `0` significa completamente transparente e `1` significa completamente opaco.|
|`isUi` | `boolean` | Se definido como `true`, a sala(room) não será afetada pelo redimensionamento, movimento e rotação da câmera. Veja mais em [Coordenadas de Jogo e de UI](game-and-ui-coordinates.html).|
|`x`, `y` | `number` | A posição da sala(room). Se a sala(room) estiver no sistema de coordenadas de jogo, que é quando se define a propriedade `isUi` para `false`, qualquer alteração nessas coordenadas não terão efeito.|