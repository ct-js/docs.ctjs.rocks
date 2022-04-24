# Movendo personagens e objetos no in ct.js

O movimento normalmente é uma das coisas mais importantes de qualquer jogo, e é essencial saber como ele funciona no ct.js. Existem inúmeras abordagens para codificar o movimento que discutiremos aqui.

## O básico sobre movimento

### Posição

Cada posição do objeto é defino pelos parâmetros `this.x` e `this.y`. `this.x` é incrementado da esquerda para a direita, enquanto `this.y` é incrementado de cima para baixo. ele é um ponto no eixo da copy — o ponto pelo qual a copy é rotacionada e redimensionada.

### Velocidade (Speed)

As alterações nas propriedades de `this.x` e `this.y` define a *velocidade (speed)* do objeto. Se você tem `this.speed` igual a 5, isso significa que a copy se moverá 5 pixels a cada frame. A velocidade de um objeto também tem direção, a qual é definida pela propriedade `this.direction`.

A velocidade e direção de um objeto é decomposta em componentes verticais e horizontais. Em ct.js, elas são definidas como `this.vspeed` e `this.hspeed`. Quando você altera `this.vspeed` ou `this.hspeed`, `this.speed` e `this.direction` são atualizadas automaticamente e vice-versa.

### Gravidade e aceleração

As Copies podem ser aceleradas pela gravidade com os prâmetros `this.gravity` e `this.gravityDir`. A gravidade alterará a velocidade da copy a cada frame, ampliando-a pela propriedade `this.gravity` a cada frame na direção fornecida.

---

Por si só, apenas `this.x` e `this.y` afetam a posição visual dos objetos. Para fazer as outras propriedades funcionarem, ct.js tem o método `this.move()` e `ct.place` que nos fornece `this.moveContinuous(cgroup)` e `this.moveContinuousByAxes(cgroup)`. (O módulo `ct.place` é ativado por padrão em todos os novos projetos.) Você também pode não precisar deles. Devido a isso, existem várias maneiras de programar o movimento das copies.

## `this.move()`

`this.move()` pode ser chamado no código On Step de qualquer template para fazer uma copy se mover de acordo com os parâmetros `this.speed` e `this.direction`. Ele não verifica colisões por conta própria, então você precisará programar sua lógica de manipulação de colisões com ele ou usar outros métodos. (Veja abaixo.) Mas pode ser a única coisa que você precisa para, digamos, um jogo de nave. É também a maneira de mover balas e outras coisas que são destruídas na colisão.

### Exemplo: Define a velocidade de uma copy de acordo com a entrada de um jogador e a move.

Código em On Step:

```js
this.hspeed = ct.actions.MoveHorizontally.value * 5;
this.vspeed = ct.actions.MoveVertically.value * 5;
this.move();
```

### Exemplo: Define a velocidade e direção de uma copy e a move.

Código em On Create:

```js
this.speed = 15;
this.direction = 90;
```

Código em On Step:

```js
this.move();
```

### Exemplo: Segue uma copy de um template chamado "Character"

Código em On Step:

```js
var character = ct.templates.list['Character'][0];
// Verifica se o `character` existe.
if (ct.templates.exists(character)) {
    this.speed = 5;
    // Calcula a direção da localização atual até a posição do personagem.
    this.direction = ct.u.pointDirection(this.x, this.y, character.x, character.y);
} else {
    // Para o movimento se o personagem não existe.
    this.speed = 0;
}
```

## `this.moveContinuous(cgroup)`

`this.moveContinuous(cgroup)` é um método do ct.place que verifica colisões ao mover as copies, e pode ser chamado a partir do código On Step em cada frame para precisamente mover as copies com alta velocidade.

Se você, por exemplo, tem pequenos projéteis de movimento rápido que voam através de paredes consideravelmente estreitas, os projéteis podem voar através dessas paredes. Isso acontece porque as balas saltam sobre as paredes em um frame, não causando colisões.

![](../images/movement/noMoveContinuous.png)

Para evitar isso, você pode usar `this.moveContinuous(cgroup)` para mover os projéteis em passos, realizando várias verificações de colisão em cada frame.

![](../images/movement/moveContinuous.png)

`cgroup` é um grupo de colisão. Existe também uma forma do método `this.moveContinuous(cgroup, precision)`, onde `precision` é o tamanho de cada passo em pixels. É definido como 1 por padrão. No entanto, para projéteis de movimento rápido, você normalmente o definirá para um valor entre o raio e o diâmetro desse projétil.

:::warning Alerta
Note que você deve usar `this.moveContinuous(cgroup)` com moderação, definindo sua precisão também, já que muitas balas usando ele produzirão tantas verificações de colisão que podem deixar seu jogo mais lento.
:::

Chamar `this.moveContinuous(cgroup)` não permite que a copy passe por objetos sólidos — ele irá parar bem próximo ao obstáculo a menos que este obstáculo se encaixe em sua copy ou esta copy seja transformada.

Para verificar se a sua copy contactou um obstáculo, você pode verificar com um resultado retornado de `this.moveContinuous(cgroup)`. Será 'false' quando não houver contato, 'true' se houver contato com um bloco e uma copy se tiver sido contactada.

### Exemplo: Define a velocidade e a direção de uma copy e a move continuamente.

Código em On Create:

```js
this.speed = 15;
this.direction = 90;
```

Código em On Step:

```js
this.moveContinuous('Solid');
```

### Exemplo: Destrói uma copy e o obstáculo quando a copy entra em contato com o obstáculo a partir do grupo de colisão "Enemy"

Código em On Createe:

```js
this.speed = 15;
this.direction = 90;
```

Código em On Step:

```js
var obstacle = this.moveContinuous('Solid');
// `obstacle` pode retorna `true` se houve contato com um tile.
// Você provalvemente nuca terá um tile com um grupo de colisão "Enemy",
// mas vamos fazer uma verficação adicional :)
// vamos ter a certeza que temos um osbtáculo e que ele é uma copy.
if (obstacle && ct.templates.isCopy(obstacle)) {
    // Bingo!
    // O obstáculo é uma copy e podemos escrever diramente nele..
    obstacle.kill = true;
    this.kill = true;
}
```

## `this.moveContinuousByAxes(cgroup)`

`this.moveContinuousByAxes` funciona principalmente da mesma forma que `this.moveContinuous`, pois realiza várias verificações de colisão enquanto se move em uma determinada direção. A diferença é que `this.moveContinuousByAxes` calcula colisões nos eixos X e Y separadamente, daí o nome. Pode parecer uma pequena mudança, mas no resultado temos um movimento "deslizante" que ajuda a evitar os obstáculos que surgem pelo caminho.

Sem `this.moveContinuousByAxes(cgroup)`, uma copy ficará presa no obstáculo mais próximo:

![](../images/movement/noMoveContinuousByAxes.png)

Com `this.moveContinuousByAxes(cgroup)`, ele deslizará ao longo do obstáculo e então continuará seu caminho na direção inicial quando não houver mais obstáculos:

![](../images/movement/moveContinuousByAxes.png)

Devido a isso, `moveContinuousByAxes` é uma solução frequente para mover personagens - e até mobs - em um jogo. Além disso, funciona tanto com plataformas quanto com visualizações de cima para baixo! Para plataformas, você só precisa resetar `this.vspeed` se houver um obstáculo embaixo. Caso contrário, uma copy colidirá com a plataforma mais próxima na primeira velocidade cósmica devido à gravidade acumulada, assim que escorregar de uma borda. Resetá-lo quando houver um obstáculo acima também evitará a aderência ao teto :)

`this.moveContinuousByAxes()` também retorna valores sobre colisões bem-sucedidas. Como uma copy ainda pode se mover por um eixo enquanto está bloqueada no outro, o método retorna um dos seguintes:

* `false` se não houver contato com os obstáculos.
* **Um objeto** com as propriedades `x` e `y` se houver pelo menos um contato em cada lado. Cada propriedade pode ser igual a `false` (não houve colisão neste eixo), `true` (houve contato com um tile), ou com alguma copy.

### Exemplo: Movimento para um jogo top-down com colisões contra um grupo chamado "Solid"

Assumindo que você tenha Ações chamada de MoveX e MoveY.

Código em On Step:

```js
this.vspeed = ct.actions.MoveY.value * 10;
this.hspeed = ct.actions.MoveX.value * 10;
this.moveContinuousByAxes('Solid');
```

### Exemplo: Movimento para um jogo de plataforma

Assumindo que tenha as Ações chamadas MoveX e Jump.

Código em On Create:

```js
this.gravity = 0.5;
this.gravityDir = 270;
```

Código em On Step:

```js
this.hspeed = ct.actions.MoveX.value * 10;

// Estamos sobre o solo?
if (ct.place.occupied(this, this.x, this.y + 1, 'Solid')) {
    // Verifique se o player quer pular.
    if (ct.actions.Jump.down) {
        this.vspeed = -15;
    }
}

// Move a copy
const collided = this.moveContinuousByAxes('Solid');

// Verifica se tem uma colisão e se a mesma foi no eixo Y.
if (collided && collided.y) {
    // Reseta a velocidade vertical
    this.vspeed = 0;
}
```

## Movimento baseado em grade

Para mover copy com precisão em grades, geralmente você precisa usar métodos diferentes dos descritos acima. Esses três métodos são adaptados para movimento livre em tempo real e não se encaixam perfeitamente no pixel da grade devido à compensação de atraso e `ct.delta`.

Atualmente, existem duas maneiras relativamente fáceis de mover cópias com ajuste de grade: alterando os valores `x` e `y` manualmente ou usando o módulo `ct.tween`.

### Exemplo: Mover uma copy em 64 pixels ao pressionar a tecla

Supondo que você tenha as Ações MoveX e MoveY.

Código em On Step:

```js
// Math.sign retorna -1 se o valor é negativo,  e 1 se o valor é positivo.
// ct.actions.ActionName.value retorna valores de -1 até 1, e tudo
// entre eles é usado em um gamepad por exemplo. Assim teremos
// -64 ou 64 em cada dimensão.
// Para uma configuração adequada de ações, consulte a página Ações em Dicas e truques.
if (ct.actions.MoveX.pressed) {
    this.x += Math.sign(ct.actions.MoveX.value) * 64;
}
if (ct.actions.MoveY.pressed) {
    this.y += Math.sign(ct.actions.MoveY.value) * 64;
}
```

### Exemplo: mover uma copy lentamente, mas que pare nas células da grade

Supondo que você tenha as ações MoveX e MoveY.
Certifique-se de que sua copy esteja encaixada na grade no início da fase.

Código em On Step:

```js
// % significa "Obter o resto de uma divisão." Uma grade de 64×64px
// divide cada eixo em 64 pixels.

// Se uma copy é encaixada na grade...
if (this.x % 64 === 0 && this.y % 64 === 0) {
    // Pare o movimento
    this.speed = 0;

    // Mas também, se pressionarmos as teclas de movimento, aplicamos velocidade.
    // Isso acontecerá se formos encaixados na grade também,
    // pois todo o código está dentro da cláusula `if`.
    if (ct.actions.MoveX.pressed) {
        this.vspeed = Math.sign(ct.actions.MoveX.value) * 8;
    }
    if (ct.actions.MoveY.pressed) {
        this.hspeed = Math.sign(ct.actions.MoveY.value) * 8;
    }
}

// Aplique o movimento de acordo com os valores definidos anteriormente
this.x += this.hspeed;
this.y += this.vspeed;
```

### Exemplo: mover uma copy por uma grade com `ct.tween`

`ct.tween` produz valores de animações suaves e pode ser usado para movimento baseado em grade. Essa abordagem pressupõe que você tenha o ct.tween ativado em Project settings -> Catmods e que você tenha ações chamadas MoveX e MoveY.

Código em On Create:

```js
this.moving = false;
```

Código em On Step:

```js
// Se a copy não está se movendo…
if (!this.moving) {
    // Verifique se a tecla foi pressionada
    if (ct.actions.MoveX.down) {
        // Inicia o movimento
        this.moving = true;
        ct.tween.add({
            obj: this,
            fields: {
                x: this.x + Math.sign(ct.actions.MoveX.value) * 64
            }
            duration: 650 // 0.65s
        })
        .then(() => {
            // Quanto a animação acabar, alteramos o valor de this.moving para indicar
            // qua a copy já não mais se move.
            this.moving = false;
        });
    }
    // O mesmo que o de cima, mas só que no eixo Y
    if (ct.actions.MoveY.down) {
        this.moving = true;
        ct.tween.add({
            obj: this,
            fields: {
                y: this.y + Math.sign(ct.actions.MoveY.value) * 64
            }
            duration: 650
        })
        .then(() => {
            this.moving = false;
        });
    }
}
```

## Estratégias para evitar a sobreposição em outros objetos

Digamos que você tenha um personagem do jogo que se move em um mundo top-down e paredes que não devem deixar o personagem passar. Existem duas estratégias para fazer a parte de colisões:

1. Mova o personagem como está, então mova-o para fora de possíveis colisões.
2. Verifique primeiro se há colisões e, em seguida, mova se houver espaço livre.

`this.moveContinuous` e `this.moveContinuousByAxes` seguem a segunda estratégia e geralmente são suficientes para evitar sobreposição. Mas se você não estiver usando esses métodos, você seguirá a primeira estratégia ou você verificará possíveis colisões antes do movimento por conta própria. Aqui está como fazê-lo.

### Saindo de colisões

A maneira mais simples de sair de colisões é pular para as coordenadas anteriores após o movimento. Cada copy tem `this.xprev` e `this.yprev`

#### Exemplo: Saltar para as coordenadas anteriores se houver uma colisão, para evitar sobreposição

Código em On Step:

```js
this.move();
if (ct.place.occupied(this, 'Solid')) {
    this.x = this.xprev;
    this.y = this.yprev;
}
```

#### Exemplo: Repelir de um colisor se uma copy for sobreposta

Às vezes, você inevitavelmente fica preso em obstáculos se seguir a estratégia "primeiro verifique se há colisões e depois se mova". Pode acontecer em diferentes casos:

* Alguma coisa esbarra em sua copy.
* Sua copy é redimensionada ou rotacionada, sobrepondo outros objetos.
* Objetos ao seu redor são rotacionados e redimensionados.

![](../images/movement/transformAndClip.png)

Você pode pegar o obstáculo de `ct.place.occupied` e mover sua copy para longe dele.

Código em On Step:

```js
const obstacle = ct.place.occupied(this, 'Solid');
// Se existe um obstáculo e ele é uma copy…
if (ct.templates.isCopy(obstacle)) {
    // Obtenha a direção do obstáculo para a copy
    const repelDirection = ct.u.pointDirection(obstacle.x, obstacle.y, this.x, this.y);
    // Estas duas linhas moverão a copy em 3 pixels na direção obtida
    this.x += ct.u.ldx(3, repelDirection);
    this.y += ct.u.ldy(3, repelDirection);
} else {
    this.move();
}
```