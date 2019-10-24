# Guia de Migração

A versão 1.0 é levemente diferente da versão 0.5.2 e das versões anteriores do ct.js. Essas mudanças incluem movimento e em sua grande maioria na parte de desenho. Aqui vai algumas dicas de como migrar da versão 0.x do seu projeto para 1.x.

## Alterações gerais

### Movimento

O movimento de forma geral é o mesmo, como você deve ter notado, o que mudou foi que agora algumas variáveis foram renomeadas, e suas variantes agora são desapreciadas por funcionarem de uma forma um pouco mais lenta:

* `dir` agora é `direction`;
* `spd` → `speed`;
* `grav` → `gravity`;
* `dravdir` → `gravityDir`.

Da mesma forma como `speed`, `gravity` ainda representa uma quantidade de pixels adicionado a cada frame, mas como a taxa de frames agora é 60, você deve dividir ao meio se você for usar 30 FPS.

Adicionalmente, duas novas variáveis foram introduzidas: `hspeed` e `vspeed`. E você pode tanto lê como assinar valores para elas.

Por debaixo dos panos, o sistema de movimento padrão agora é baseado nas velocidades verticais e horizontais, não na velocidade geral e de direção. Algumas inconsistências podem surgir, especialmente com a ordem de execução:

```js
this.speed = 4;
this.direction = 90;
```

Tudo bem até aqui, `this.vspeed` agora é -4.

```js
this.direction = 90;
this.speed = 4;
```

`this.direction = 90` não tem sentido nisso, porque `this.vspeed` e `this.hspeed` ainda são iguais a zero e essa rotação não tem efeito.

Quando fizer o incremento de movimento sem as variáveis padrões, ou quando adicionar uma aceleração, você deve multiplicar os seus números por `ct.delta`. Então em vez de escrever isso:

```js
this.speed += 0.5;
this.x -= 10;
```

Você deve escrever isso aqui:

```js
this.speed += 0.5 * ct.delta;
this.x -= 10 * ct.delta;
```

Isso não é necessário, mas fortemente recomendado, já que ajuda a manter o movimento consistente, independente de qual seja a taxa de frames por segundo. 

`this.move();` utiliza `ct.delta`, então o sistema de movimentos por padrão será consistente a cada frame independente da sua taxa de frames, seja ela 30 ou 60 FPS, não importa.

### Transformações (`Não é possível criar a propriedade '_parentID' com um booleano 'true'`)

Escrever `this.transform = true;` fará com que o seu jogo não funcione, porque `transform` agora é um objeto.

Em vez de escrever isso:

```js
this.transform = true;
this.tx = 0.5;
this.ty = -1;
this.tr = 45;
this.ta = 0.5;
```

Você deve escrever isso aqui:

```js
this.scale.x = 0.5;
this.scale.y = 0.5;
this.rotation = 45;
this.alpha = 0.5;
```

### Limites da View

Em vez de usar `ct.room.width` e `ct.room.height`, use apenas `ct.viewWidth` e `ct.viewHeight`. Existe um conceito diferente agora, e `ct.room.width` e `ct.room.height` muda a todo instante.

### Temporizadores

Em vez de:

```js
this.shootTimer--;
```

É melhor escrever:

```js
this.shootTimer -= ct.delta;
```

## Desenhando

Primeiramente: agora você não pode mais desenhar no evento `Draw`. Em vez disso, você deve criar um objeto de desenho (por exemplo, no evento `OnCreate`), e adicionar o mesmo para a sua room ou anexá-lo para um objeto, formando assim algum tipo de widget.

### Desenhando etiquetas de texto

Em vez de:

```js
ct.styles.set('ScoreText');
ct.draw.text('Score: ' + this.score, 20, 20);
ct.styles.reset();
```

Você deve escrever isso em seu evento `OnCreate`:

```js
this.scoreLabel = new PIXI.Text('Score: ' + this.score, ct.styles.get('ScoreText'));
this.scoreLabel.x = this.scoreLabel.y = 20;
this.addChild(this.scoreLabel);
```

E atualizar a sua etiqueta no evento `Draw`:

```js
this.scoreLabel.text = 'Score: ' + this.score;
```

### Desenhos geométricos

Para isso use [PIXI.Graphics](https://pixijs.download/release/docs/PIXI.Graphics.html). É uma API semenlhante a API do HTMLCanvas, e um objeto PIXI.Graphics pode conter mais de uma forma.

Exemplo (Evento `OnCreate`):

```js
var overlay = new PIXI.Graphics();
overlay.beginFill(0x5FCDE4);
overlay.drawRect(0, 0, 59, 48);
overlay.endFill();
overlay.alpha = 0.65;

this.addChild(overlay);
```

### Desenhando Barras de vida, Barra de Mana e etc.

Para isso, considere usar o [escalonamento de 9 fatias](https://en.wikipedia.org/wiki/9-slice_scaling). Você deve utilizar uma imagem que pode ser esticada verticalmente e/ou horizontalmente, como essa aqui:

![](./../images/migrationBarSource.png)

Adicione isso em seu código `OnCreate`:

```js
this.healthBar = new PIXI.mesh.NineSlicePlane(
    ct.res.getTexture('Healthbar', 0),
    8, 8, 8, 16); /* this can be also written in one line */
this.addChild(this.healthBar);
this.healthBar.x = this.healthBar.y = 32; /* where to place this bar */
this.healthBar.height = 64;
this.healthBar.width = ct.game.health * 2; // Assuming that the max health is 100 and you want 100×2 = 200px wide bar
```

E atualize o mesmo a cada momento com esse código:	

```js
this.healthBar.width = ct.game.health * 2;
```

![](./../images/migrationBars.gif)

As constantes `8, 8, 8, 16` dizem quais áreas não devem ser esticadas, nessa ordem: o lado esquerdo, o topo, o lado direito, e a parte inferior.

Planos de fundo para essas barras podem ser feitas do mesmo jeito.

### Desenhando Imagens Estáticas

Existe duas formas de fazer isso:

1. Criar um novo tipo que exibirá a imagem;
2. Ou criar um objeto PIXI.Sprite e adicionar o mesmo em sua room ou para um objeto.

A segunda forma pode ser feita dessa forma aqui:

```js
this.coinIcon = new PIXI.Sprite(ct.res.getTexture('coinGold', 0));
this.coinIcon.x = 20;
this.coinIcon.y = this.y + 35;
this.addChild(this.coinIcon);
```

## Alterações de 1.0.0-next-1 para 1.0.0-next-2

Para trabalhar com difrentes resoluções, você agora deve uar `ct.viewWidth` e `ct.viewHeight` em vez de `ct.width` e `ct.height`. os últimos significam agora o tamanho do canvas, o que não necessariamente significa que seja o tamanho da sua tela de visualização, especialmente quando estiver usando o novo modo de tamanho `ct.fittoscreen`.

## Alterações em 1.0.0-next-3

### Suporte para teclado e mouse

ct.js agora usa Actions para mapear as entradas do usuário com os eventos do jogo. Você pode lê sobre Actions [aqui](/actions.html). Por causa disso, `ct.mouse` foi removido do núcleo da ferramenta para o catmod.

Todos os projetos antigos automaticamente vão funcionar com o `ct.mouse.legacy` e, se necessário, `ct.keyboard.legacy`. Eles representam o comportamento anterior desse módulos e não devem causar problemas de compatibilidade.

O novo `ct.keyboard` não tem um `ct.keyboard.pressed`, `ct.keyboard.down` e `ct.keyboard.released`. Em vez disso, eles são completamente dependentes do novo sistemas de Ações (Actions).

### Gráficos -> Texturas

Gráficos, assets gráficos, etc. agora são chamados de "Texturas" ("Textures").

Agora em vez de escrever `this.graph = 'Sosiska';` em seu código para alterar uma textura, você deve esccrever `this.tex = 'Sosiska;`.
