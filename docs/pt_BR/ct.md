# ct

`ct` representa o próprio game engine, estendido com módulos e biblioteca principal. Mas vamos falar um pouco sobre como tudo funciona.

## Sequência de eventos

Estes eventos são sempre executados na seguinte ordem:

1. evento `oncreate` de room, o qual é emitido quando um usuário inicia o jogo ou navega para uma nova room;
1. `oncreate` é aplicado para cada copy;
1. então o game loop principal começa:
    1. o evento `onstep` é emitido para todas as copies na room;
    1. o evento `onstep` para a room atual é invocado;
    1. `ondestroy` é invocado para todas as copies marcadas com `kill`;
    1. todas as copies são reodernadas;
    1. `ondraw` é invocado para todas as copies;
    1. `ondraw` é invocado para uma room;
    1. os eventos de entradas são limpos. Esperando por uma nova interação do game loop.
1. Quando o usuário alterna para uma nova room, um evento `onleave` é invocado para a última room.

## Métodos e propriedades

### `ct.pixiApp`

O [Pixi.js application](https://pixijs.download/release/docs/PIXI.Application.html) do game.

### `ct.stage`

o [estágio](https://pixijs.download/release/docs/PIXI.Application.html#stage) raiz do jogo.

### `ct.meta`

Retorna os metadados que você forneceu dentro do editor ct.js, assim como `autor`, `site`, `versão` e `nome`.

### `ct.delta`

Retorna a diferença entre o frame atual e o último frame. E isso mudará de acordo com desempenho do jogo. Por exemplo, ele será `2` a 30 FPS se o FPS de destino for 60, e será ou estará próximo de 1 a uma taxa FPS suave ou liso.

Você pode usar delta para determinar o movimento, então todas as coisas se moverá uniformemente em qualquer taxa FPS, por exemplo:

```js
this.x += 10 * ct.delta;
```

Mas `ct.delta` é frequentemente utilizado enquanto se projeta movimentos complexos ou controlado logicamente, uma vez que [o sistenas padrão de movimentos](ct.types.html#moving-copies-around) já leva em consideração `ct.delta`.
