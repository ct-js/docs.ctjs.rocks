# ct

`ct` representa o próprio game engine, estendido com módulos e biblioteca principal. A biblioteca principal contém:

* [ct.backgrounds](ct.backgrounds.html) gerencia os backgrounds;
* [ct.camera](ct.camera.html) gerencia o viewport ou janela de exibição;
* [ct.emitters](ct.emitters.html) sistema de partículas;
* [ct.inputs](ct.inputs.html) e [ct.actions](ct.actions.html) para manipular entradas do usuário;
* [ct.res](ct.res.html) para carregar os recursos;
* [ct.rooms](ct.rooms.html) para altenar e empilhar varias rooms (por exemplo, para UI, iluminação, e gameplay);
* [ct.sound](ct.sound.html) para tocar e ajustar os efeitos sonoros;
* [ct.styles](ct.styles.html) para reutilizar os estilos de UI;
* [ct.tilemaps](ct.tilemaps.html) para a geração dinâmica de fases feitas de tiles;
* [ct.timer](ct.timer.html) para eventos assíncronos;
* [ct.templates](ct.templates.html) para a criação, localização e gerenciamento de templates e copies;
* [ct.u](ct.u.html) para funções vetoriais e outras coisas úteis.

Normalmente você usará a API acima, bem como as APIs fornecidas pelos módulos do ct.js.

Por si só, o ct.js é baseado no [Pixi.js](https://www.pixijs.com/), uma biblioteca gráfica HTML5. Você pode usar a própria API do pixijs no ct.js se achar que o mesmo não é suficiente.

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

Mas `ct.delta` é frequentemente utilizado enquanto se projeta movimentos complexos ou controlado logicamente, uma vez que [o sistema padrão de movimentos](ct.types.html#moving-copies-around) já leva em consideração `ct.delta`.

### `ct.deltaUi`

`ct.deltaUi` é semelhante ao `ct.delta`, mas ele ignora os fatores de escala de tempo que podem acontecer durante um efeito de câmera lenta ou de pausa do jogo (veja ["Pausando um jogo"](game-pause.html) para exemplos).
