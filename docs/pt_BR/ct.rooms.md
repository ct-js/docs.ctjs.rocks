# ct.rooms

Esse objeto gerencia todas as suas rooms e o view atual (câmera).

## Métodos e propriedades

### `ct.room`

O objeto room atual.

### `ct.rooms.switch('NewRoomName')`

Chama o evento `onleave` da última room e vai para a nova room.

### `ct.rooms.clear()`

Destrói todas as copies existentes na room.

### `ct.rooms.templates`

As rooms existentes para alternância.

### `ct.rooms.list['RoomName']`

Semelhante ao `ct.templates.list`, esse objeto contém um array de rooms da fase atual. Isso pode ser útil quando você tem um monte de widgets de UI na tela e precisa gerenciá-los.

### `ct.rooms.remove(room)`

Esse método seguramente remove da fase a room anexada ou prefixada anteriormente. Ele disparará o evento "On Leave" para a room e "On Destroy" para todas as copies da room removida. A room também terá `this.kill` definido para `true` em seu evento. Esse método não pode remover o `ct.room`, a room principal. O parâmetro `room` deve ser uma referência para uma room criada anteriormente, por exemplo:

```js Criando um menu de pausa usando uma room de UI
if (ct.actions.TogglePause.released) {
    if (!this.pauseMenu) { // se um parâmetro `pauseMenu` não foi definido
        this.pauseMenu = ct.rooms.append('UI_Pause'); // cria uma room e define o parâmetro `pauseMenu`
    } else {
        ct.rooms.remove(this.pauseMenu);
    }
}
```

Como uma copy sabe que o seu evento "On Destroy" foi disparado ao remover a room que não era a principal? Bem, cada copy tem um método `getRoom()`, e você pode usá-lo com a propriedade `room.kill`:

```js
// Vamos supor que temos um nível modular e que algumas partes devem ser carregadas/descarregadas dinamicamente,
// e essa copy específica é uma bomba que não deve ser acionada se a sua parte for descarregada.
if (this.getRoom().kill) {
    return; // efetivamente para a execução do próximo código
}
ct.sound.spawn('Explosion');
this.killEverythingNearby();
```

### `ct.rooms.append('NameOfTheRoom', ext)` e `ct.rooms.prepend('NameOfTheRoom', ext)`

Adiciona uma nova room a fase atual e a coloca depois ou antes de todas as copies da sua room. Com esses métodos, você pode reutilizar a UI, backgrounds e efeitos de ambiente. Note que essas camadas terão uma pilha de renderização diferente da sua room principa e não serão organizadas juntas. Para ter esse tipo de comportamento, use em vez disso, `ct.rooms.merge` (veja abaixo).

O parâmetro `ext` pode ser usado aplicar prâmetros adicionais a nova room. Por exemplo, se você chamar `ct.rooms.append('Background', {color: 0x446ADB})`, então a room "Background" terá a propriedade `this.color` disponível em seu evento "On Create" e nos  outros também.

Para criar uma [camada de UI](/game-and-ui-coordinates.html), use este código:

```js
ct.rooms.append('YourUiRoom', {
    isUi: true
});
```

### `ct.rooms.merge('NameOfTheRoom')`

Esse método coloca todas as entidades da room passada como parâmetro dentro da room atual. Isso é útil para a geração processual e pré-fabricadas. Note que o evento "On Create" da room, bem como os outros, **não são chamados**. Esse método retorna um objeto três propriedades, `copies`, `tileLayers`, e `backgrounds`. Você pode interagir sobre elas para ajustar a posição das mesmas, por exemplo:

```js
var spawnX = 100,
    spawnY = 500;
var merged = ct.rooms.merge('AssasinsSet');

// Suponha que não vamos precisar de nenhum backgroud ou camadas de tile
for (const copy of merged.copies) {
    copy.xstart += spawnX;
    copy.x += spawnX;
    copy.ystart += spawnY;
    copy.y += spawnY;
}
```

::: warning Alerta:
O resultado dessa função não é atualizada e deve ser usada apenas durante o processo de criação inicial. Ela não deve ser armazenada como uma propriedade de um objeto para evitar o vazamento de memoria. Use a palavra reservada `var`, como mostrado acima. Você também pode usar `let` ou `const`.
:::

## Gerenciando o viewport atual

Desde a versão 1.3, que viewport é gerenciado pelo objeto especial [ct.camera](/ct.camera.html).