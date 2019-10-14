# ct.rooms

Esse objeto gerencia todas as suas rooms e o view atual (câmera).

## Métodos e propriedades

### `ct.rooms.switch(newRoom: String)`

Invoca o evento `onleave` da última room e vai para a nova room.

### `ct.rooms.clear()`

Destrói todas as copies existentes na room.

### `ct.room`

O objeto room atual.

### `ct.rooms.templates`

As rooms existentes para alternância.

### `ct.rooms.make`

Uma função que é invocada por uma room para criar as suas copies, backgrounds e tiles no carregamento. Ela é meramente uma função interna que não precisar ser utilizada na ct.IDE, mas ainda assim vcoê pode usar esse método para adicionar copies de uma room para uma outra room existente. O método retorna um array com todas as copies criadas, incluindo os tile layers e backgrounds. Exemplo:

```js
this.interfaceCopies = ct.rooms.make.apply(ct.rooms.templates.MainInterface);
```

## Gerenciando o viewport atual

Você pode gerenciar o viewport em qualquer momento editiando as propriedades listadas abaixo do objeto`ct.room`. Você também pode utilizar a palavra reservada `this` nos eventos da room.

### `ct.room.x`, `ct.room.y`

Altera as coordenadas horizontais e verticais do view.

### `ct.room.follow`

Você pode definir uma copy a ser seguida aqui, o que faz com que a câmera a siga automaticamente.

### `ct.room.borderX`, `ct.room.borderY`

Define um limite a partir do canto superior do canvas onde a câmera se move.

```js Example: following a copy
// Place this code, e.g, to your hero's `OnCreate` code
var room = ct.room;
room.follow = this;

// Follow the hero so it is always at the center of the screen
// Define o limite da câmera como sendo o centro da tela,
// o que faz com que o héroi sempre fique no centro da mesma.
room.borderX = ct.viewWidth / 2;
room.borderY = ct.viewHeight / 2;
```

### `ct.room.center`

Quando configurado para `true`, a copy sendo seguida sempre estará no meio do viewport. Esse parâmetro tem uma prioridade maior sobre `ct.room.borderX`, `ct.room.borderY`.

### `ct.room.followDrift`

Um valor entre `0` e `1`. Define o quão rápido a room reage ao movimento da copy sendo seguida. `0` determina o movimento instantâneo da câmera, enquanto que um valor maior representa um movimento mais suave.

### `ct.room.followShiftX`, `ct.room.followShiftY`

Desloca a câmera para que ela fique acima/abaixo/etc da copy sendo seguida.
