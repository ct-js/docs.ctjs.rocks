# ct.types

Esse objeto permite que você crie novas Copies e as manipule. Cada copy é uma instância da classe AnimatedSprite do Pixi, então você encontar [muito mais parâmetros](https://pixijs.download/release/docs/PIXI.AnimatedSprite.html) na documentação do site deles.

## Trabalhando com Copies

### Movendo Copies

Cada Copy tem esses parâmetros para movimento:

- `x`, `y` — é a posição;
- `xprev`, `yprev` — é a posição da Copy no frame anterior;
- `xstart`, `ystart` — as coordenadas na qual a copy foi criada;
- `speed` — velocidade do movimento (ou o tamanho do vetor [hspeed; vspeed]);
- `hspeed` and `vspeed` — velocidade horizontal e vertical respectivamente;
- `direction` — direção do movimento (de 0 até 360);
- `gravity` — força da gravidade;
- `gravityDir` — direção da gravidade (de 0 até 360, o padrão é 270).

Você também pode invocar `this.addSpeed` para adicionar um vetor de velocidade e uma direção fornecida a Copy.

```js
this.addSpeed(speed, dir);
```

Na verdade, para mover uma copy, você deve invocar `this.move();` em seu código `OnStep` da copy, `this.move()` é incluido em `OnStep` de cada Type por padrão. O sistema de movimento padrão já leva em consideração `ct.delta`, o que faz com que o movimento tenha a mesma velocidade em cada frame.

### Manipulando a aprência das Copies

Existe um número de parâmetros que podem ser alterados:

- `animationSpeed` — velocidade da animação. Um valor alto faz ir mais rápido, um valor baixo faz ir mais devagar;
- `depth` — representa uma camada de desenho, por exemplo, o valor 3 representa três camadas acima da camada padrão, enquanto que o valor -3 representa três camadas abaixo da camada padrão;
- `tex` — o nome da textura a ser utilizada;
- `rotation` — a rotação da copy em graus;
- `scale` — o fator de escala do objeto. Você pode usar um valor simples (`this.scale = 0.5;`) para um escalonamento uniforme ou acessar as suas componentes `x` e `y` (`this.scale.x = 0.5;`).
- `tint` — a tonalidade a ser aplicada ao sprite. Esse é uma valor hexadecimal. Um valor de `0xFFFFFF` removerá qualquer efeito de tonalidade. As cores são as mesmas como no CSS, por exemplo, `0xFF0000` é vermelho, `0x00FFFF` é cyan, etc;
- `alpha` — a opacidade da copy. 0 faz a copy invisível, 1 é o modo padrão (completamento opaco). Os valores entre 0 e 1 fará a alteração da transparência de forma gradual;
- `visible` — a visibilidade do objeto (`true` ou `false`).

Variáveis apenas de leitura:

- `currentFrame` — o índice atual do frame na animação . Você deve mudá-lo com os métodos `gotoAndPlay` e `gotoAndStop`;
- `totalFrames` — o número total de frames na animação.

Métodos:

- `gotoAndPlay(frameIndex)` — vai para um frame específico e inicia a animaçãos;
- `gotoAndStop(frameIndex)` — para a animação e vai para um frame específico;
- `play()` — inicia a animação;
- `stop()` — para a animação.

### Diversos

- `type` — o nome do tipo a partir do qual uma Copy foi criada;

### Deletando Copies

Para deletar uma Copy, simplesmente configure o parâmetro `kill` para `true`.

**Exemplo:** deleta uma Copy, se a barra de vida estiver esgotada

```js
if (this.health <= 0) {
    this.kill = true;
}
```

::: tip Observação
O código em OnStep [ainda será executado](ct.html#Event-sequence) até a fase de desenho.
:::

## Métodos e propriedades de ct.types

### `ct.types.copy(type: String, x, y)` and `ct.types.make(type: String, x, y)`

Cria uma Copy a partir do tipo fornecido. Se x ou y é omitido, então eles serão definidos como 0.

### `ct.types.each(func: Function)`

Aplica uma função para todas as copies ativas.

**Exemplo:** Destrói todas as copies em uma de 150px

```js
var me = this;
ct.types.each(function () {
    if (this !== me) { // aren't we trying to destroy ourselves?
        if (ct.u.pdc(this.x, this.y, me.x, me.y) <= 150) {
            this.kill = true;
        }
    }
});
```

> `ct.u.pdc` calcula a distância entre dois pontos. Essa e outras funções semelhantes podem ser encontradas [aqui](ct.u.html).


### `ct.types.with(copy: Copy, func: Function)`

Funciona da mesma forma que `ct.types.each`, mas apenas para a Copy especificada.

### `ct.types.list['TypeName']`

Retorna um array com todas as copies existentes do tipo especificado.

**Exemplo:** Destrói todas as Copies do tipo 'Bonus'

```js
for (var bonus of ct.types.list['Bonus']) {
    bonus.kill = true;
}
```

Também podemos escrever da seguinte forma:

```js
for (var bonus of ct.types.list.Bonus) {
    bonus.kill = true;
}
```

### `ct.types.addSpeed(o: Copy, spd, dir)`

Adiciona um vetor de velocidade para a Copy fornecida. Isso é o mesmo que invocar `o.addSpeed(spd, dir);` de copy.
