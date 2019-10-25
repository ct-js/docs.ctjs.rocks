# Pausando o jogo

Se você quer pausar o jogo e criar um menu de pause, você precisa congelar todos os processos de movimentos e de jogabilidade e deixar a UI intacta. Se você estiver usando o `ct.delta` o tempo todo, você já está pronto e precisará adicionar apenas umas poucas linhas de código! Algumas coisas são complicadas:

* Esteja certo que todos os seus temporizadores são baseados em `ct.delta`. Isso é tão simples como `this.timer -= ct.delta;`, mas ele não pode ser `this.timer--;`.
* Seus elementos de UI provavelmente não deve usar o `ct.delta`, porque assim eles permanecem responsivos quando o jogo estiver congelado.
* Tenha cuidado com o `ct.tween` dentro do seu código relacionado com a jogabilidade, porque o `ct.tween` não usa o `ct.delta` por padrão.

`ct.delta` é um valor acessível globalmente, e ele mostra o tempo decorrido desde o último frame em um ideal relativo de 60 FPS. Ele faz com que o seu jogo execute de forma unirforme e suave em qualquer dispositivo, mas ele também pode ser escalonado, fazendo com que o seu jogo execute de forma lenta ou rápida, por exemplo, criando cenas épicas de câmera lenta. Nós também podemos congelar o jogo:

```js
PIXI.ticker.shared.speed = 0;
ct.pixiApp.ticker.speed = 0;
```

E isso é tudo o que você precisa para pausar um jogo. Colocando-o em qualquer evento baseado em ação, por exemplo, adicione isso ao código de OnStep da sua room:

```js
if (ct.actions.Pause.pressed) {
    PIXI.ticker.shared.speed = 0;
    ct.pixiApp.ticker.speed = 0;
}
```

Não esqueça de criar uma ação real nas configurações do seu projeto! Para que usuários em plataformas diferentes possam pausar o seu jogo.

Quando esse código executa, `ct.delta` será configurado para 0 em todo lugar, efetivamente parando a jogabilidade, incluindo o sistemas de movimentação padrão que usa `this.speed` e outras variáveis.

## Tirando o jogo de pausa

Você agora precisa criar uma forma de retomar o jogo, por exemplo, modificando o código acima em que o mesmo botão tira o jogo da pausa. Também precisaremos adicionar um pouco mais de código para deixá-lo mais prático.

```js
if (ct.actions.Pause.pressed) {
    if (!ct.room.paused) {
        // This can be used by UI and gameplay elements to stop any gameplay actions that are not tied to ct.delta
        ct.room.paused = true;

        PIXI.ticker.shared.speed = 0;
        ct.pixiApp.ticker.speed = 0;

        // This type can simply be a texture that aligns itself to the view
        // and tells to press a device-specific button to unpause (e.g. "Press Escape to unpause" for desktop keyboards).
        this.unpauseHint = ct.types.copy('PauseHint', ct.room.x + ct.viewWidth / 2, ct.room.y + ct.viewHeight / 2);
        // Coordinates are set so the copy is placed exactly in the middle of a player's screen.
        // See "Working with Viewport" in other tips & tricks.
    } else {
        ct.room.paused = false;

        PIXI.ticker.shared.speed = 1; // `1` is the normal speed
        ct.pixiApp.ticker.speed = 1;

        this.unpauseHint.kill = true; // Remove the copy
    }
}
```

Esse código pode também ser dividido em duas partes e movido para os botões de UI. Animações de UI podem ser executadas através de `ct.tween` ou ser manualmente animadas a cada frame.
