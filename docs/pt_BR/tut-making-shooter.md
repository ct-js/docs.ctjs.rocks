# Criando Jogos: Space Shooter

Vamos criar um jogo de nave com asteróides, lasers e naves inimigas! Esse tutorial te ensinará a importar assets, manipular entradas de usuário, mover objetos e detectar colisões.

![](./../images/tutorials/tutSpaceShooter_Result.gif)

O que faremos:

[[toc]]

## Importanto Texturas

Abra o ct.js e crie um novo projeto chamado "SpaceShooter".

![](./../images/tutorials/tutSpaceShooter_01.png)

Depois, [baixe o pacote de assets](http://www.kenney.nl/assets/space-shooter-redux) do site Kenney. Ele é gratuito para criar um protótipo, aprender, apenas para teste ou criar um jogo comercial.

Você pode também usar esses assets que estão localizados na pasta `ct.js/examples/SpaceShooter_assets`.

Esses são todos os assets que precisaremos:

![](./../images/tutorials/tutSpaceShooter_02.png)

Agora abra a aba "Textures" localizada no topo da janela do ct,js, em seguida click em "import" e na janela que se abrir, localize os assets que precisamos, depois selecione os mesmos com o mouse, você pode selecionar mais de um asset nessa janela deixando a tecla "control" pressionada enquanto seleciona os arquivos com o mouse. Você pode também arrastar os assets para dentro da janela do ct.IDE.

Um card(cartão) para cada imagem será mostrado.Vamos abrir e configurar a textura `PlayerShip`. A gente pode notar uma forma amarela que define a máscara de colisão. Por hora, ela também cobre os espaços vazios da nave, especialmente a parte superior das asas. Para corrigir isso, preciamos modificar a máscara de colisão na coluna da esquerda.

Primeiramente, pressione o botão "Image's center", isso fará com que os eixos sejam deslocados para o centro da nave.

Depois selecione a opção "**Line Strip / Polygon**" sob "Collision Shape". Adicione alguns pontos adicionais e mova-os com o seu mouse para que o polígono resultante tenha a mesma forma da nave.

![](./../images/tutorials/tutSpaceShooter_03.png)

Pressione o botão "Save" e vá para a próxima textura — "LaserRed". Da mesma forma que fizemos com a nave, vamos definir os eixos para o centro clicando em "Image's Center". Em seguida selecione a máscara de colisão clicanco em **Circle**. Uma máscara de colisão circular amarela é desenhada sobre a textura.

Vamos para a próxima textura, `Laser_Blue`, ela também deve ter os seus eixos no centro, e como a máscara de colisão deve cobrir toda a imagem, podemos apenas clicar no botão "Fill".

![](./../images/tutorials/tutSpaceShooter_04.png)

Ambos os asteróides são melhores definidos como polígonos por causa de sua forma côncava ou com pontas. Defina a máscara de colisão como sendo **Line Strip / Polygon**, e não esqueça de definir os eixos para o centro.

A nave `EnemyShip` pode ser tratada como **Line Strip / Polygon**.

A imagem de plano de fundo pode ser deixada da forma que está, porque ela não irá colidir com outras copies no jogo.

## Criando o Seu Primeiro Template (Modelo)

**Textures** não fazem muito por conta própria, e para exibi-los no jogo, nós precisamos criar **templates** com essas texturas. Templates são usados para criar **Copies**, e as **Copies** são usadas dentro das **Rooms**, em que essas copies interagem entre uma com as outras e respondem as suas entradas.

Click na aba "Templates" no topo da tela, e crie um novo template para o jogador. Depois click no botão "Create", click no gato assustador na coluna da esquerda. Ele mostrará todas as suas texturas. Selecione a nave do player. Ela agora deve aparecer na coluna esquerda do editor.

Agora mude o nome para `PlayerShip` e dessa forma não precisamos saber de todos esses números enquanto codificamos.

![](./../images/tutorials/tutSpaceShooter_06.png)

Crie tipos para todas as outras texturas, menos para a imagem de plano de fundo. Imagem de plano de fundo não se move e não interage com nada, sendo assim, ela não é um template. Adicionaremos uma imagem de plano de fundo depois em uma **Room**.

![](./../images/tutorials/tutSpaceShooter_07.png)

Vamos adicionar agora os templates criados em algum lugar do mapa. Para criar esse mapa ou Room, click na aba "Rooms" localizado no topo da tela, em seguida click no botão "Add new" para criar uma nova room, chame-a de `Main`.

![](./../images/tutorials/tutSpaceShooter_08.png)

Aqui daremos uma pausa para explicar um pouco melhor como usar o editor de Room. Primeiramente, podemos definir um nome e o tamanho do seu viewport(janela de visualização).

Em ct.js, Rooms são infinitas e podem se deslocar em qualquer direção. Você pode tanto colocar os objetos dentro e fora do viewport.

Também temos o botão "Room events". Onde podemos definir a lógica do jogo para essa room. Você pode definir aqui também a interface de usuário e a fase do jogo.

Embaixo desse botão temos um painel com as Copies e Backgrounds. Escolhemos uma Copy em sua aba correspondente e a colocamos no mapa apenas clicando na área à direita. Para desabilitar a adição de novas copies, selecione a opção "Select and Move" no lado esquerdo. E quando essa opção estiver selecionada, você pode deslocar o mapa deixando o botão esquerdo pressionado na área à direita e arrastando a mesma. Você pode alterar o zoom da fase usando os botões no topo ou usando a roda do mouse.

Se você se perder no mapa, pressione o botão "To center" para voltar para as coordenadas (0, 0).

Você pode definir a grade clicando no botão localizado no canto inferior direito. Clicando uma outra vez desabilita a grade.

Por fim, você pode mover todas as copies na room de uma vez, para isso selecione a opção "Select and Move" no lado esquerdo e com a tecla "shift" pressionada, click com o botão esquerdo do mouse para criar uma caixa de seleção, tudo o que estiver dentro dessa caixa será selecionado, quando terminar, basta mover as mesma com o mouse.

Por enquanto, vamos adicionar nave do player, uma nave inimiga e alguns asteróides.

![](./../images/tutorials/tutSpaceShooter_10.png)

Então adicione o plano de fundo. Click na aba "Backgrounds" e pressione o botão "Add a Background", depois selecione a nossa textura `BG`. Isso fará com que a imagem preencha a tela inteira.

![](./../images/tutorials/tutSpaceShooter_09.png)

O plano de fundo é desenhado no mesmo nível de profundidade, `0` por padrão, que as outras copies, então para evitar que o plano de fundo sobreponha as copies, é melhor alterarmos o nível de profundidade dela. Click no ícone de engrenagem localizado na coluna da esquerda sob a aba "Backgrounds" e defina o valor `-5` no campo "Depth". Ao fazer isso, estamos dizendo ao ct.js que a imagem de plano de fundo deve ficar 5 camadas abaixo da camada padrão. A profundidade é representada por três eixos de coordenadas, x,y representa a posição no plano e z representando a profundidade e a posição da camada no espaço.

![](./../images/tutorials/tutSpaceShooter_Depth.png)

Depois disso, salve o projeto e click no botão 'Launch' localizado no topo da tela. Nesse momento, você terá um projeto de jogo com naves e asteróides que não se movem.

![](./../images/tutorials/tutSpaceShooter_11.png)

## Adicionando Movimento ao Player (Jogador)

Manipular entradas de usuário é uma tarefa muito importante. Nessa seção nós faremos a nave azul se mover quando o jogador pressionar as teclas WASD ou as setas de navegação do teclado.

Para poder manipular entradas de teclado, nós precisamos habilitar o módulo keyboard. Click na aba "Project" localizada no topo da tela e em seguida na aba "Catmods" à esquerda, então procure pelo módulo `keyboard` na seção de módulos disponíveis, click nele para habilitá-lo, talvez ele já esteja habilitado por padrão com uma caixa de seleção verde e um círculo giratório indicando que o módulo já está habilitado. Certifique-se que os módulos `mouse`, `random` e `place` estão habilitados, pois precisaremos deles mais tarde também.

![](./../images/tutorials/tutSpaceShooter_12.png)

### Adicionando Ações

Ações em ct.js são entidades que agrupa vários métodos de entradas diferentes em eventos, permitindo assim, que você monitore pelas entradas do jogador via código. Você pode ler mais sobre isso [aqui](./actions.md).

Por enquanto, vamos criar um esquema básico de entrada para a nossa nave. Abra a aba "Project" localizada no topo da tela e em seguida click  na aba "Actions and input methods" à esquerda. Precisaremos definir três ações diferentes: para atirar o laser, para o movimento horizontal e para movimento vertical.

Primeiro click no botão "Add an action". Em seguida defina o nome da primeira ação como "Shoot", em seguida click no botão chamado "Add an input method" para especificar os botões dessa ação. Use o campo de pesquisa para filtrar os métodos de entrada disponíveis.

![](./../images/tutorials/tutSpaceShooter_15.png)

Crie três ações como na imagem acima. Defina o valor do multiplicador como `-1` para os métodos de entrada `keyboard.ArrowUp`, `keyboard.KeyW`, `keyboard.ArrowLeft` e para `keyboard.A`, então essas teclas moverão a nave na direção oposta.

### Codificando o Movimento

Abra a aba "Templates" localizada no topo da tela, depois click na aba `On Step` do template `PlayerShip`.

::: tip Dica
O evento `On Step` ocorre a cada frame e antes do evento `Draw`, o evento `Draw` ocorre depois de todos os eventos `On Step` na room. `On Create` ocorre quando uma nova Copy é criada, e `On Destroy` ocorre antes do evento `Draw` quando uma Copy é removida.
:::

Escreva o código abaixo:

```js
/**
 * Move a nave
 * Veja o painel Project > Actions and input methods e "Actions" na documentação.
 */

this.x += 8 * ct.delta * ct.actions.MoveX.value; // Move pelo eixo X


/**
 * Verifica se a nave saiu da viewport(janela de visualização)
 */
if (this.x < 0) { // A nave saiu dos limites pela esquerda?
    this.x = 0; // Volte para os limites novamente
}
if (this.x > ct.camera.width) { // A nave saiu dos limites pela direita?
    this.x = ct.camera.width; // Volte para os limites novamente
}

this.move();
```

Aqui nós estamos usando as ações criadas. Primeiro, tentamos mover a nave horizontalmente através da definição da sua coordenada `x` na linha 6. `ct.actions.MoveX` retornará `1` se pressionarmos a tecla de navegação para a direita ou se a tecla "D" for pressionada, e retornará `-1` se o player pressionar a tecla de navegação esquerda ou se a tecla "A" for pressionada. Agora, se nada for pressionado, ele retornará `0`, zero, desabilitando assim o movimento horizontal.

`ct.delta` é necessário para compensar os possíveis atrasos e perdas de FPS. Normalmente o valor é igual a `1` e não adiciona muito, mas o movimento acelerará se alguns frames forem perdidos.

Por fim, multiplicamos o valor obtido através `ct.delta * ct.actions.MoveX.value` pelo valor da velocidade que desejamos, `8`.

Depois verificamos se a coordenada X está fora da viewport(janela de visualização). Aqui `0` representa o lado esquerdo da room e `ct.camera.width` representa a largura horizontal do jogo.

::: tip Faça você mesmo!
Adicione um movimento vertical para o player. Depois tente limitar esse movimento para que assim a nave não possa voar acima ou abaixo dos limites da viewport.
:::

## Movendo as Naves Inimigas e Asteróides

Os inimigos também devem se mover. Para esse tutorial, nossas naves inimigas se moverá de cima para baixo, e os asteróides voarão de forma aleatória.

### Naves Inimigas

Abra a aba "Templates" na parte superior da tela, em seguida click em `EnemyShip`. Depois navegue até o evento `On Create` e adicione o código abaixo:

```js
this.speed = 3;
this.direction = 270;
```

Aqui nós usaremos variáveis internas para o movimento. Editar as coordenadas manualmente é bom para manipular entradas de usuário, mas para muitas tarefas é melhor usar essas variáveis para agilizar e automatizar as coisas. Por exemplo, você não preciasa usar `ct.delta` enquanto usa `this.speed` e `this.direction`. Aqui, `this.speed` representa a velocidade da Copy, e `this.direction` representa a sua direção.

::: tip Dica
Em ct.js, a direção é calculada em graus, movendo-se no sentido horário. 0° representa direita, 90° é para baixo, 180° é para esquerda, e 270° é para cima.

![](./../images/tutorials/tutSpaceShooter_Direction.png)
:::

Se navegarmos até o evento `On Step`, nós veremos esse pequeno código:

```js
this.move();
```

Essa linha lê as variáveis internas e move a Copy de acordo com os valores delas. Sem isso, `this.speed` e `this.direction` seria sem sentido.

Há mais variáveis internas, as quais você pode encontrar na [página `ct.templates`](ct.templates.html).

Modificaremos o código em `On Step` para que os inimigos sejam destruídos caso eles saiam da viewport.

```js
this.move();

if (this.y > ct.viewHeight + 80) {
    this.kill = true;
}
```

::: tip Faça você mesmo!
E se as naves inimigas puderem voar na diagonal ou em zig-zag?
:::

### Asteróides

Asteróides conterá o mesmo código `On Step`, mas a sua variável `direction` será definida de forma aleatória.

Abra `Asteroid_Medium` na aba "Templates" localizada no topo da tela, em seguida escreva o trecho de código abaixo em seu `On Create`.

```js On Create event
this.speed = ct.random.range(1, 3);
this.direction = ct.random.range(270 - 30, 270 + 30);
```

O evento `On Step` será o mesmo que em `EnemyShip`.

```js Step event
this.move();

if (this.y > ct.viewHeight + 80) {
    this.kill = true;
}
```

Faça o mesmo para o outro asteróide.

Salve o projeto e click no botão "Launch" no topo da tela. A nave inimiga se move lentamente para baixo, enquato que os asteróides se move de forma mais caótica. Se você atualizar a página, os asteróides se moverão em uma direção diferente.

::: tip Dica
Você obteve erros com `ct.random`? Certifique-se de que você habilitou o módulo `random` na aba Project -> Catmods.
:::

![](./../images/tutorials/tutSpaceShooter_RandomMovement.gif)

## Projéteis & Colisões

Agora é a hora das armas 😎

Abra o aba "Templates" e em `On Step` do template `PlayerShip` adicione o trecho de código abaixo:

```js
if (ct.actions.Shoot.pressed) {
    ct.templates.copy('Laser_Blue', this.x, this.y);
}
```

Essa é a nossa primeira copy que criamos programaticamente. 😮

::: tip Dica
`ct.templates.copy` é uma função muito importante que cria uma nova Copy na room atual. Primeiramente, escrevemos o nome do template da Copy a ser criada entre as aspas simples. Então, definimos as coordenadas da posição em que essa copy será criada. Em que `this.x` representa a coordenada horizontal e `this.y` a coordenada vertical dessa Copy na room atual.
:::

Com todos os dados combinados, criamos um tiro laser disparado sob a nave. Os tiros são disparados toda vez que a tecla de espaço é pressionada.

Agora vamos fazer com que o `Laser_Blue` se mova. Definiremos o movimento com as variáveis padrões. No evento `On Create` de `Laser_Blue` insira o código abaixo:

```js On Create code
this.speed = 18;
this.direction = 90;
```

Depois vamos fazer com que esses tiros laser desapareçam depois que os mesmos saírem da viewport. Como os tiros sempre vão para cima, podemos escrever uma condição que verifique se eles saíram da viewport. Abra o evento `On Step` de `Laser_Blue` e adicione o código abaixo:

```js Step code
if (this.y < -40) {
    this.kill = true;
}

this.move();
```

A proxima coisa a ser manipulada é a colisão. É melhor escrever toda a lógica de colisão nos códigos das naves inimigas e dos asteróides, porque eles responderão de forma difrente, evitando assim, confusão no código do laser.

 Vá o template `EnemyShip` e em sua aba `On Step` adicione o trecho de código abaixo:

``` js
var collided = ct.place.meet(this, this.x, this.y, 'Laser_Blue');
if (collided) {
    collided.kill = true;
    this.kill = true;
}
```

O método `ct.place.meet` verifica se a copy fornecida está colidindo com uma outra copy nas coordenadas x,y fornecidas. Para esse exemplo, precisamos checar se a nossa copy atual (`this`) da nave inimiga na posição atual (`this.x, this.y`) está colidindo com o laser (`'Laser_Blue'`). O método retorna a copy que colidiu ou `false`, então precisamos verificar se ele retornou um valor válido.

::: tip Dica
Existe muito mais métodos no módulo `ct.place`. À direita do ct.IDE existe um painel recolhido com uma seta(<), click nessa seta e em seguida click na aba Module's docs, na coluna à esquerda dessa aba você notará o item ct.place e sob esse item várias opções de documentação sobre o `ct.place`.
:::

![](./../images/tutorials/tutSpaceShooter_modules_docs_1.png)

![](./../images/tutorials/tutSpaceShooter_modules_docs_2.png)

Se uma nave colide com um laser, então ambos devem ser destruídos.

Copie exatamente o mesmo código para `Asteroid_Medium`. Precisaremos desse código em `Asteroid_Big` também, mas faremos esse grande asteróide quebrar em dois asteroídes menores. Abra o evento `On Step` de `Asteroid_Big` e adicione o código abaixo:

``` js
var collided = ct.place.meet(this, this.x, this.y, 'Laser_Blue');
if (collided) {
    collided.kill = true;
    this.kill = true;
    ct.templates.copy('Asteroid_Medium', this.x, this.y);
    ct.templates.copy('Asteroid_Medium', this.x, this.y);
}
```

Se você executar o jogo, você será capaz de destruir as naves inimigas e asteróides. E o asteróide maior vai se quebrar em dois asteróides menores quando o mesmo for atingido pelo laser.

### Tiros Inimigos

A nave inimiga também deve ser capaz de atirar. Adicionoce o código abaixo no evento `On Create` do template `EnemyShip`:

``` js
this.bulletTimer = 60;
```
Desse modo, definimos um temporizador em que a nave inimiga irá atirar em intervalos precisos. Diminuiremos o valor de `this.bulletTimer` a cada frame e o resetaremos depois de cada tiro. `60` representa aguardar por 1 segundo (60 frames) antes de disparar o primeiro tiro.

Adicione o código abaixo no evento `On Step`:

```js
this.bulletTimer -= ct.delta;
if (this.bulletTimer <= 0) {
    this.bulletTimer = 180;
    ct.templates.copy('Laser_Red', this.x, this.y + 32);
}
```

`this.bulletTimer -= ct.delta;` diz que estamos diminuindo o valor de `this.bulletTimer` em `1` frame. `ct.delta` normalmente é igual `1`, mas em uma taxa de frames baixa, ele será um valor maior, para assim equilibrar a velocidade do jogo e fazer com que as coisas se movam de uma forma mais uniforme, independente de qual seja o FPS atual.

Quando a variável temporizadora é menor ou igual a zero, nós definimos um novo valor para `this.bulletTimer` e criamos um tiro laser vermelho. Como você pode ver no código escrito em `this.y + 32`, nós o criamos um pouco mais abaixo da nave.

Vamos agora escrever algum código para o tiro laser vermelho. Adicione esse código na seção `On Create` de `Laser_Red`:

```js
this.speed = 8;
this.direction = 270;

this.angle = ct.random.deg();
```

`this.angle` rotaciona a textura da copy. `ct.random.deg()` retorna um valor aleatório entre 0 e 360, o qual é útil ao definir valores angulares.

::: tip Dica
Existe também `this.scale.x` e `this.scale.y`, o qual define o redimensionamento horizontal e vertical da copy, e `this.alpha` o qual manipula a opacidade, 0 representa transparente e 1 completamente opaco.
:::

O código da seção do evento `On Step` será algo assim:

``` js
if (this.y > ct.viewHeight + 40) {
    this.kill = true;
}

this.move();

this.angle -= 4 * ct.delta;
```

`this.angle += 4 * ct.delta;` diz que nós rotacionamos uma Copy a aproximadamente 4 graus por frame. `ct.delta` irá equilibrar as coisas se o jogo sofrer de FPS inconsistente.

Adicionaremos a lógica para destruir a nave do player depois. Por enquanto, é hora de adicionar inimigos e asteróides dinamicamente durante o execução do jogo.

## Gerando objetos ao longo do tempo

Abra a room `Main` na aba Rooms. Remova as naves inimigas e asteróides existentes clicando neles com o botão direito do mouse, ou os apague com o botão esquerdo do mouse enquanto deixa a tecla `Ctrl` pressionada.

Depois, click no botão `Room events` na coluna da esquerda.

Rooms têm todos os mesmos eventos que as Copies.

* `On Create` é invocado quando você inicia o jogo ou vai para uma outra room programaticamente;
* `On Step` é invocado a cada frame, depois do evento `On Step` das Copies;
* `Draw` é invocado depois desenhar a fase toda. É útil para atualizar UI (Interface de Usuário);
* `On Leave` é invocado antes de ir para uma outra room.

Nós vamos gerar inimigos quase que da mesma forma que os tiros das naves inimigas. Teremos alguns poucos temporizadores e colocaremos as copies acima da visão do jogador, assim daremos a impressão que os objetos inimigos estão surgindo.

Para fazer isso, vamos definir dois temporizadores no evento `On Create` da room `Main`:

```js
this.asteroidTimer = 20;
this.enemyTimer = 180;
```

Então adicione esse código para gerar inimigos com ao longo do tempo:

```js
this.asteroidTimer -= ct.delta;
if (this.asteroidTimer <= 0) {
    this.asteroidTimer = ct.random.range(20, 200);
    ct.templates.copy(ct.random.dice('Asteroid_Big', 'Asteroid_Medium'), ct.random(ct.camera.width), -100);
}

this.enemyTimer -= ct.delta;
if (this.enemyTimer <= 0) {
    this.enemyTimer = ct.random.range(180, 400);
    ct.templates.copy('EnemyShip', ct.random(ct.camera.width), -100);
}
```

Isso é tudo o que você precisa para gerar asteróides e inimigos!

::: tip Dica
`ct.random.dice` retorna um dos valores fornecido. Você pode pôr qualquer valor aqui, incluindo números, strings e objetos complexos. Aqui, existe uma chance de 50% que `'Asteroid_Big'` seja retornado, e 50% de chance que seja retornado `'Asteroid_Medium'`.

`ct.random.range(a, b)` retorna um valor numérico aleatório entre `a` e `b`.

`ct.random(b)` é o mesmo que `ct.random.range(0, b)`.
:::

## Vidas, Pontuação e GUI (Guia de Interface de Usuário)

Vamos adicionar um contador de pontuação para o jogo em reação aos asteróides e naves inimigas pela nave do player.

### Adicionando e desenhando a pontuação

A pontuação é uma variável numérica que é armazenada globalmente. Em nosso caso, é melhor colocá-la dentro da room. Abra a room `Main`, e click no botão 'Room events'. Adicione esse código ao evento `On Create`:

```js
this.score = 0;

this.scoreLabel = new PIXI.Text('Score: ' + this.score);
this.addChild(this.scoreLabel);
this.scoreLabel.x = 30;
this.scoreLabel.y = 30;
this.scoreLabel.depth = 1000;
```

Aqui, criamos uma variável chamada `score`. Então, construímos um rótulo de texto com `new PIXI.Text('Some text')`, e o salvamos em `this.scoreLabel`, em seguida o adicionamos para a room com `this.addChild(this.scoreLabel);`. Depois, o posicionamos no canto superior esquerdo através das coordenadas de 30px para x e y. Também definimos a sua profundidade — esse é mesmo parâmetro que usamos nas definições do template, e esse valor positivo tão alto adicionará o `scoreLabel` acima de todas as outras entidades da nossa room.

Também precisamos deste código em `Draw` para manter o rótulo de texto sempre atualizado:

```js
this.scoreLabel.text = 'Score: ' + this.score;
```

Agora vá para o evento `On Step` de `EnemyShip`, e adicione `ct.room.score += 100;` no trecho de código onde a mesma é destruída, então o código deve ser algo assim:

```js
this.move();

if (this.y > ct.viewHeight + 80) {
    this.kill = true;
}

var collided = ct.place.meet(this, this.x, this.y, 'Laser_Blue');
if (collided) {
    collided.kill = true;
    this.kill = true;
    // aqui incrementamos a pontução em mais 100.
    ct.room.score += 100;
}

this.bulletTimer -= ct.delta;
if (this.bulletTimer <= 0) {
    this.bulletTimer = 180;
    ct.templates.copy('Laser_Red', this.x, this.y + 32);
}
```

::: tip Dica
`ct.room` aponta para o objeto room atual.
:::

Faça o mesmo para os astereóides também. Mude o número da pontuação da forma que você desejar.

Se você executar o jogo, você notará um pequeno número preto no canto superior esquerdo, o qual muda toda vez que uma nave inimiga ou um asteróide é destruído. Mas o visual não está bom, então temos que dedicar um pouco mais de tempo para fazer um estilo melhor.

O texto pode ser desenhado com estilos predefinidos que declara a cor de preenchimento, estilo da linha, configurações de fonte e sombra. Elas são criadas na aba `UI` no topo da tela. Crie uma clicando no botão `Create`. Você verá o editor de estilo, o qual tem uma coluna a esquerda com várias abas para configurar as propriedades e um visualizador de estilos na coluna da direita.

Vamos tornar a fonte maior e mais ousada. Mude o seu tamanho e defina a sua espessura para 800. Em seguida alinhe a mesma para ser desenhada no canto superior esquerdo.

![](./../images/tutorials/tutSpaceShooter_13.png)

Click na aba `Fill` e em seguida em `Active`, depois selecione o tipo de preenchimento "Diffuse". Escolha uma cor apropriada; Eu escolhi alguma coisa similar as cores da nave do player.

![](./../images/tutorials/tutSpaceShooter_14.png)

Adicione sombra, bordas ou ambos! Depois salve as mudanças clicando no botão "Apply" no canto inferior esquerdo.

Chame esse estilo de `ScoreText`. Você pode renomeá-lo clicando com o botão direito do mouse sobre ele na lista de visualização de estilos.

Agora retorne para os eventos da room. Abra a aba `On Create`, e modifique o código para aplicar o estilo criado:

```js{5}
this.asteroidTimer = 20;
this.enemyTimer = 180;

this.score = 0;
this.scoreLabel = new PIXI.Text('Score: ' + this.score, ct.styles.get('ScoreText'));
this.addChild(this.scoreLabel);
this.scoreLabel.x = 30;
this.scoreLabel.y = 30;
```

::: tip Dica
`ct.styles.get('Style');` carrega o estilo fornecido. Você pode usá-lo dentro do construtor PIXI.Text para estilizar o rótulo de texto criado.
:::

Se você executar o jogo, a pontuação será desenhada com o seu estilo criado. 😮

### Desenhando e Gerenciado as Vidas

Gerenciar as vidas é similar ao gerenciamento da pontuação. Adicione esse código ao evento `On Create` da room, ele irá armazenar e desenhar o número de vidas:

```js
this.lives = 3;
this.livesLabel = new PIXI.Text('Lives: ' + this.lives, ct.styles.get('ScoreText'));
this.addChild(this.livesLabel);
this.livesLabel.x = ct.camera.width - 200;
this.livesLabel.y = 30;
this.livesLabel.depth = 1000;
```

::: tip Faça você mesmo!
Crie um novo estilo e aplique no rótulo de texto 'Lives'.
:::

Então nós devemos adiciona uma lógica para remover uma vida da nave do player caso ela seja destruída. Nós podemos usar o `ct.place.meet` como usado nos códigos de asteróides e inimigos para testar por um template em particular, mas vamos agrupá-los em um _grupo de colisão_. Dessa forma, escreveremos menos código e não exigirá nenhuma alteração caso seja adicionado mais inimigos, mísseis ou asteróides de tamanhos diferentes.

Para adicionar copies em grupo de colisão, devemos escrever o nome desse grupo na coluna esquerda do editor de template. Vamos escrever a palavra `Hostile`. Escreva essa palavra para todos os asteróides, para a nave inimiga e para o laser vermelho.

Agora adicione este código ao evento `On Step` da nave do player:

```js
var hostile = ct.place.occupied(this, this.x, this.y, 'Hostile');
if (hostile) {
    hostile.kill = true;
    ct.room.lives --;
    if (ct.room.lives <= 0) {
        this.kill = true;
        setTimeout(function() {
            ct.rooms.switch('Main');
        }, 1000);
    }
}
```

`ct.place.occupied` é semenlhente ao `ct.place.meet`, o qual usamos antes, só que `ct.place.occupied` funciona com _colisões em grupo_, não com templates.

`ct.rooms.switch` alterna da room atual para uma nova. Ao alternar da room atual para ela mesma, estamos apenas reiniciando ela.

`setTimeout` é uma função padrão do browser, que executa uma função depois de passado uma quantidade de tempo em milissegundos. Aqui estamos esperando 1 segundo (1000 milissegundos) e reiniciamos a room.

::: tip Dica
`setTimeout` pode parecer uma forma melhor de trabalhar com eventos de espera, em vez de escrever um temporizador. A diferença é que os temporizadores existe enquanto o dono dele existir, mas `setTimeout` existirá em qualquer circunstância, mesmo que a Copy que o invocou tenha sido removida da room. (Na verdade, existe uma forma de cnacelar um `setTimeout`, mas não é tão útil quando se trabalhar com copies diferentes. Ok, esqueça o que eu disse.)

Em nosso caso, nós queremos que a room seja reiniciada quando não existir nenhuma nave do player na tela, em outras palavras, quando o player perde todas a vidas, e é por isso que usamos um `setTimeout`. Usamos temporizadores para atirar e gerar inimigos, porque não queremos que os tiros apareçam aleatoriamente depois que os inimigos são destruídos.
:::

Salve o seu projeto e teste-o. Agora você tem um pequeno, mas totalmente funcional jogo de nave! Existem muitas maneiras de melhorar ainda mais esse jogo:

* Ajustar os valores existentes, como as velocidades dos inimigos ou a pontuação para uma melhor jogabilidade;
* Adicionar mais inimigos;
* Melhorar os temporizadores de tiros para que você possa apenas apertar a sua barra de espaço e não esmagá-la;
* Adicionar bônus e armas diferentes;
* Elaborar um menu principal e uma tela de vitória;
* Adicionar sons;
* Criar chefões e sentinelas.

Esse é o meu resultado de melhoria para esse projeto: [Catsteroids](https://comigo.itch.io/catsteroids).

Você pode também iniciar um novo projeto se você não estiver interessado em um jogo de nave espacial :D
