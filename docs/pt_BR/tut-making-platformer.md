# Criando Jogos: Plataforma

Nesse tutorial criaremos um pequeno jogo de plataforma com diamantes, pontos de salvamento, plataformas que se movem e armadilhas! Você aprenderá como detectar colisões, e usar a mesma para criar uma visão de movimento lateral, além de manipular sprites e mover o jogador entre os níveis.

![Criando um novo projeto](./../images/tutPlatformer_endResult.png)

## Criando um Projeto

Abra o ct.js e crie um projeto chamado "Platformer".

![Criando um novo projeto](./../images/tutPlatformer_01.png)

## Importando Texturas

Nós precisaremos de alguns assets que podem ser encontrados em [pacote simplificado de plataforma por Kenney](https://www.kenney.nl/assets/simplified-platformer-pack). Você pode encontrar também os assets que precisamos na pasta `ctjs/examples/Platformer_assets/`.

![Os assets que precisamos](./../images/tutPlatformer_02.png)

Abra a aba "Textures", e pressione o botão "Import", navegue até a pasta `ctjs/examples/Platformer_assets/` e selecione todas as imagens. Elas aparecerão no painel de texturas.

A primeira coisa que nós precisamos notar é que a animação `Robot_Walking` é representada apenas por uma única imagem e, não com dois frames separados. Click no asset `Robot_Walking`.

![Editing an animation stripe](./../images/tutPlatformer_03.png)

A imagem é uma pequena faixa horizontal. Ela tem uma linha e duas colunas. Então podemos dizer ao ct.js para dividir a imagem especificando os campos `Columns`, `Rows` e ajustando o campo `Width`.

A imagem inteira tem 192 pixels então um frame será 192 : 2 = 96 pixels. Então cada frame do robô agora deve ser de 96 pixels.

![Editando uma textura](./../images/tutPlatformer_04.png)

Vamos agora editar a máscara de colisão. Ela determina qual área de uma imagem deve ser tratada como sólida e qual não é, a máscara é mostrada em forma de um retângulo amarelo sobre o sprite.

Primeiramente, vamos mudar os eixos para o ponto médio do lado inferior.

::: tip Explicação
Como temos uma imagem de 96x96, nós precisamos de 48pixel na horizontal e de 96 na vertical. Os pixels são calculados do canto superior esquerdo, sendo o primeiro valor do ponto, um valor que representa a componente horizontal, x, e a segunda sendo a componente vertical, y.
:::

O robô tem um formato retangular, então ele pode ser marcado como `Rectangle`. Tenha certeza de escolher essa opção, em seguida click no botão 'Fill' e por fim ajuste as dimensões para cobrir o corpo do robô com o retângulo amarelo representando a máscara de colisão.

![Editando uma textura](./../images/tutPlatformer_05.png)

Você pode cobrir tanto as mãos como o corpo do robô ou apenas cobrir o corpo.

Click no botão no "Save" no canto esquerdo inferior.

Precisamos agora definir a máscara de colisão para o `Robot_Idle` e `Robot_Jump`. Esteja certo de que você mudou os eixos para 48x96 e que ajustou as máscaras de colisão deles também.

::: tip
É uma boa fazer com que a máscara de colisão seja a mesma para os três sprites, assim o robô não ficará surfando quando alternar entre as animações por causa das máscaras de colisão estarem diferentes.
:::

Agora vamos definir a máscara de colisão para os nossos cristais e para o coração bônus. Esses podem ser definidos como um círculo. Abra o `GreenCrystal` e, defina a sua máscara de colisão como um "Circle", então click no botão chamado "Image's center" para que os eixos se ajustem de forma automática para os valores necessários, e em seguida ajuste o raio da máscara de colisão.

Faça o mesmo para o asset `Heart`.

![Editando diamantes](./../images/tutPlatformer_06.png)
![Editando coração](./../images/tutPlatformer_07.png)

O último asset que precisamos modificar é o `Spikes`. Não precisamos mudar os seus eixos, porque senão ficariam desalinhados no mapa, mas ainda precisamos definir a sua máscara de colisão. Defina o lado superior com um valor negativo para que a parte superior não seja preenchida com o amarelo da máscara de colisão.

![Editando spikes](./../images/tutPlatformer_08.png)

Salve o seu asset. Se você observar as outras texturas, você verá que todas elas têm uma forma retangular que preenche toda a imagem. Portanto vamos deixar as mesmas do jeito que estão por enquanto.

## Criando o Personagem Robô e o Chão

Abra a aba "Types" e crie um novo tipo. Chame-o de "Robot", defina o sprite para `Robot_Idle`, e o salve.

![Editando um type](./../images/tutPlatformer_09.png)

::: tip
Os Types (Tipos) são como modelos, a partir dos quais as copies são criadas. Nós preenchemos nossos níveis (frequentemente chamadas de rooms em ct.js) com copies, e eles são as coisas que interagem uma com a outra na tela, mas cada copy foi criada a partir de um certo type (tipo).
:::

Crie tipos adicionais do mesmo modo:

* Rocks;
* Rocks_Top;
* Rocks_Platform.

### Adicionando uma Room

Click na aba "Rooms" no topo e crie uma nova room. Chame essa room de "Level_01". Defina o tamanho para 1024x576.

![Editando uma room](./../images/tutPlatformer_10.png)

Em seguida desenhe o nível clicando em um tipo a esquerda e com o seu mouse click na grande área a direita. Segure o `Shift` para adicionar várias copies de uma só vez. Não esqueça o nosso robô!

Você pode expandir o seu nível em qualquer direção, e as copies não precisam está dentro do quadro azul. Esse quadro é definido pelas dimensões `View width` e `View height` localizadas no canto superior esquerdo, e serve apenas para determinar a parte visível inicial do seu nível.

Aqui está um nível básico, você é livre para desenhar o seu, até porque o nosso objetivo nesse momento é o de ensinar a movimentar, pular e coletar itens. Por enquanto faça algo assim, bem simples, porque depois vamos adicionar alguns cristais e como mudar para uma outra room.

![Comigo's platformer level](./../images/tutPlatformer_11.png)

Vamos adicionar uma imagem de plano de fundo. Click na aba "Backgrounds" no lado esquerdo e em seguida click em "Add a Background", por fim, escolha o asset `BG`. Agora click na engrenagem em nosso plano de fundo e altere `Depth` para `-10`. Dessa forma diremos ao ct.js que o nosso plano de fundo deve ser desenhado 10 camadas abaixo da camada padrão, que é a camada 0 (zero).

![](./../images/tutPlatformer_27.png)

Se salvarmos o nosso projeto agora e clicarmos no botão "Play" localizado no top, seremos capazes de vermos parte do nosso nível na janela de debugger. Não existe nenhuma interação, mas já é um bom começo!

![Debug window with placed copies and background](./../images/tutPlatformer_12.png)

### Adicionando Colisões e o Módulo de Teclado (Keyboard)

Precisamos ouvir por eventos de teclado e detectar as colisões entre o Robô e o chão. Para ter esse poder, precisamos do Catmods! Click na aba "Catmods" e selecione `keyboard` na coluna da esquerda. Em seguida click no grande botão vermelho para habilitar esse módulo, caso esteja em verde, o mesmo já estará habilitado. Depois faça o mesmo para o módulo `place`.

![Enabling a module in ct.js](./../images/tutPlatformer_13.png)

::: tip DICA TOP ✨
Habilite o módulo chamado `fittoscreen`, em seguida click na aba "settings" e habilite a opção chamada "Fast scale with letterboxing" para um modo tela cheia.
:::

Cada módulo tem a sua própria documentação na aba "Reference". Destacaremos algumas de suas partes depois.

### Adicionando Actions (Ações) para Eventos de Keyboard (Teclado)

Ações permite ouvir por eventos de teclado, mouse, gamepad e etc. Você pode lê mais sobre elas [aqui](/actions.html). Com elas, nós criamos ouvintes para as teclas WASD e para as setas de navegação.

Vá para o painel "Settings", em seguida click no botão "Edit actions".

![](./../images/tutPlatformer_24.png)

Então crie um esquema de entrada como na imagem abaixo. Para fazer isso, primeiro click no botão "Add an action", dê um nome pra ela, e então adicione um método de entrada na coluna da direita. Você pode usar o campo de pesquisa para encontrar o método de entrada que você precisa e assim agilizar o processo.

![Input mappings for a simple platformer in ct.js](./../images/tutPlatformer_25.png)

::: tip
Para tornar esse tutorial simples, temos duas ações (veja [exemplos na página de ações](/actions.html#examples)), uma para o movimento de ir para a esquerda e outra para ir para a direita, além de termos uma terceira ação, a de pulo.
:::

### Codificando o Movimentação e a Detecção de Colisão

Agora vá para a aba "Types" localizada no topo da tela e abra o tipo `Rocks`. Na coluna da esquerda preencha o campo chamado "Collision group" com o nome `Solid`:

![Adicionando um grupo de colisão para um type](./../images/tutPlatformer_26.png)

Isso diz ao catmod `ct.place` que esse tipo específico pertence ao grupo de colisões chamdo "Solid". O nome desse grupo pode ser qualquer um, e o número de grupos é ilimitado. Por hora, um grupo apenas está bom.

Faça a mesma coisa para os tipos `Rocks_Top` e `Rocks_Platform`.

Agora o tipo `Robot`. Se você leu o tutorial "Space Shooter" primeiro, você deve lembrar que o movimento é feito usuando os parâmetros de uma copy ou através de suas variáveis internas como `this.speed` e `this.direction` de forma direta. Mas no caso desse tutorial de plataforma, precisamos escrever algo um pouco mais elaborado. Esteja pronto e que a força esteja com você! 😃

A ideia de um movimento de visão lateral (side-view) é que nós teremos um valor pelo qual é feito o movimento e então checamos se existe uma colisão ou não, essa verificação é feita pixel por pixel.

Vamos definir algumas variáveis na aba "On Create":

```js
this.jumpSpeed = -9;
this.gravity = 0.5;

this.hspd = 0; // Horizontal speed
this.vspd = 0; // Vertical speed
```

::: tip
`this` é a copy que está executando o código escrito. E nesse caso, a copy é o nosso `Robot`.
:::

Agora vá para a aba "On Step" e adicione esse código:

```js
this.speed = 4 * ct.delta; // Max horizontal speed

if (ct.actions.MoveLeft.down) {
    // If the A key or left arrow on a keyboard is down, then move to left
    this.hspd = -this.speed;
} else if (ct.actions.MoveRight.down) {
    // If the D key or right arrow on a keyboard is down, then move to right
    this.hspd = this.speed; 
} else {
    // Don't move horizontally if no input
    this.hspd = 0;
}

// If there is ground underneath the Robot…
if (ct.place.occupied(this, this.x, this.y + 1, 'Solid')) {
    // …and the W key or the spacebar is down…
    if (ct.actions.Jump.down) {
        // …then jump!
        this.vspd = this.jumpSpeed;
    } else {
        // Reset our vspeed. We don't want to be buried underground!
        this.vspd = 0;
    }
} else {
    // If there is no ground  
    this.vspd += this.gravity * ct.delta;
}
```

::: tip
O código em "On Step" é executado a cada frame para cada copy. A lógica de movimento e outras lógicas do jogo normalmente vão aqui.
:::

::: tip
`ct.actions.YourAction.down` verifica se qualquer tecla que você esteja ouvindo nessa ação foi pressionada. Existe também `ct.actions.YourAction.pressed` e `ct.actions.YourAction.released`.

`ct.place.occupied(copy, x, y, group)` verifica se a copy fornecida está colidindo nas coordenada x,y passadas com o grupo específico fornecido. Você pode omitir o grupo caso você não precise dele. Esse método retorna `false` no caso de não haver colisão ou a copy que colidiu primeiro.
:::

::: tip
`ct.delta` retorna o tempo decorrido desde o último frame. Se tudo estiver ok e o jogo executar a uma taxa de frames suave, o valor dele será igual a `1`, e esse valor será maior se o jogo não conseguir executar a uma taxa de frames suave.

Multiplicar o valor por `ct.delta` nos garante que tudo se mova de forma uniforme, independente de qual seja a taxa de frames por segundo.
:::

Isso definirá as variáveis `hspd` e `vspd`, mas elas ainda não fazem nada. Precisamos adicionar mais um pouco de código para pode mover o Robô:

```js
// Move by horizontal axis, pixel by pixel
for (var i = 0; i < Math.abs(this.hspd); i++) {
    if (ct.place.free(this, this.x + Math.sign(this.hspd), this.y, 'Solid')) {
        this.x += Math.sign(this.hspd);
    } else {
        break;
    }
}
// Do the same for vertical speed
for (var i = 0; i < Math.abs(this.vspd); i++) {
    if (ct.place.free(this, this.x, this.y + Math.sign(this.vspd), 'Solid')) {
        this.y += Math.sign(this.vspd);
    } else {
        break;
    }
}
```

::: tip
`ct.place.free` faz o mesmo que `ct.place.occupied`, só que em vez de verificar se existe algo no caminho, ele faz justamente o contrário, verifica se o caminho está livre. Ele tem os mesmos parâmetros e também retorna `true` ou `false`.

`Math.abs` retorna o valor absoluto do número fornecido, em outras palavras, se o número for negativo, retorna positivo, e se for positivo, retorna positivo mesmo. `Math.sign` retorna -1 se o número fornecido é negativo, 1 se for positivo, e 0 se ele for 0 (zero). Juntando tudo, eles criam um loop `for` que funciona em ambas as direções e verifica se existe colisão pixel por pixel.
:::

Agora nós podemos mover o nosso Robô por aí!

::: warning
O personagem pode apresentar falhas de colisão, caso isso aconteça você precisa ajustar a máscara de colisão, talvez a tornando mais estreita.
:::

### Fazendo a Câmera Seguir o Robô

Se você executar o jogo agora, você verá que agora podemos mover o nosso Robô. Mas existe um problema: a câmera não se mexe!

Isso não é um problema difícil. Se a gente for na documentação do ct.js e lermos a seção *ct.rooms*, notaremos a existência das propriedades `ct.rooms.current.follow`, `ct.rooms.current.borderX` e `ct.rooms.current.borderY` que é exatamente para seguir uma copy.

Abra o tipo `Robot` e no código em "On Create" adicione o código abaixo ao final:

```js
ct.room.follow = this;
ct.room.borderX = 450;
ct.room.borderY = 200;
```

Agora a câmera seguirá o Robô.

## Adicionando Armadilhas e Ponto de Salvamento

Agora vamos adicionar armadilhas mortais, fossos de água e pontos de salvamento para que o jagador reinicie a partir daí em caso de morte e não do início da fase.

Crie novos tipos de assets para `Water`, `Water_Top`, `Spikes` e `Checkpoint`.

Crie também uma nova room chamada de `Level_02`. Defina o tamanho dela para 1024x576 e adicione uma imagem de plano de fundo. Crie uma fase perigosa com espinhos (spikes) e lagos (lakes).

Coloque os pontos de salvamento antes e/ou depois dos lugares perigosos. Não tenha medo de pôr um monte deles, até porque, punir o jogador pelos seus erros nunca é uma boa ideia! 😉

![Comigo's second level](./../images/tutPlatformer_16.png)

Aqui o final da fase proposta está na plataforma média superior. Também foram colocados algumas outras plataformas fora da imagem capturada para adição de cristais futuros.

Vamos agora até o tipo `Checkpoint` e editar o seu código em "On Step".

Vamos checar por uma colisão com o nosso Robô, e quando isso acontecer, nos armazenaremos as coordenadas de salvamento dentro da copy `Robot`. Remova a linha `this.move();` e adicione essa:

```js
var robot = ct.place.meet(this, this.x, this.y, 'Robot');
if (robot) {
    robot.savedX = this.x + 32;
    robot.savedY = this.y + 32;
}
```

::: tip
A linha `this.move();` é responsável por mover as copies que usam as variáveis ct padrão. Sendo que nesse caso, o ponto de salvamento não deve se mover. 😉

`ct.place.meet` faz o mesmos que `ct.place.occupied`, mas em vez de verificar colisões contra um grupo, ela verifica a existência de uma colisão contra uma copy.
:::

Nós também adicionamos 32 pixels as coordenadas de salvamento, porque o eixo do ponto de salvamento está localizado no canto superior esquerdo,  mas o eixo do nosso Robô está localizado no ponto médio inferior. Por causa disso, o Robô iria reaparecer um pouco a esquerda e acima do ponto central desejado.

Vá para a aba "On Create" de `Checkpoint` e adicione a linha `this.visible = false;`. Isso fará com que o `Checkpoint` fique invisível durante a execução do jogo.

Agora vá para o tipo `Spikes` e o defina como uma colisão "Deadly":

```js
this.ctype = 'Deadly';
```

Faça o mesmo com `Water` e `Water_Top`.

Agora abra o tipo `Robot` novamente e adicione esse código no topo de `On Step`:

```js
if (ct.place.occupied(this, this.x, this.y, 'Deadly')) {
    this.x = this.savedX;
    this.y = this.savedY;
    this.hspd = 0;
    this.vspd = 0;
    return;
}
```

::: tip
Aqui a instrução `return;` para a execução da função. Não precisamos de movimento e de outras verificações quando o Robô reaparecer em uma outra posição.
:::

Também precisamos escrever o código abaixo na aba "On Create" de `Robot` para o caso dele morrer antes de chegar em um ponto de salvamento:

```js
this.savedX = this.x;
this.savedY = this.y;
```

Para testar um room específica, abra a aba "Rooms" localizada na parte superior e click com o botão direito do mouse sobre a room desejada e selecione a opção "Set as starting room". Note que se você estiver com uma room aberta, você precisará fechar a room aberta clicando no botão "Done" localizado no canto inferior esquerdo.

## Transformando e Animando o Robô

Nesse ponto, já é hora de adicionar uma animação ao nosso robô. Como você pode se lembrar, temos três diferentes assets chamados de `Robot_Idle`, `Robot_Jump`, e `Robot_Walking`.

Adicione essa linha de código ao tipo `Robot` na sua aba "On Create":

```js
this.animationSpeed = 0.2;
```

`0.2` determina que queremos que a animação execute a 0.2×60 (o qual é 12) frames por segundo. Para um valor mais confiável, poderíamos escrever também `12/60`.

Abra o tipo `Robot` e em sua aba "On Step" modifique o código na seção de movimentação alterando a textura a ser desenhada de acordo com a entrada do usuário e da posição do robô no espaço:

```js{4,5,6,7,8,9,13,14,15,16,17,18,22,38,39}
if (ct.actions.MoveLeft.down) {
    // If the A key on keyboard is down, then move to left
    this.hspd = -this.speed;
    // Set the walking animation and transform the robot to the left
    if (this.tex !== 'Robot_Walking') {
        this.tex = 'Robot_Walking';
        this.play();
    }
    this.scale.x = -1;
} else if (ct.actions.MoveRight.down) {
    // If the D key on keyboard is down, then move to right
    this.hspd = this.speed;
    // Set the walking animation and transform the robot to the right
    if (this.tex !== 'Robot_Walking') {
        this.tex = 'Robot_Walking';
        this.play();
    }
    this.scale.x = 1;
} else {
    // Don't move horizontally if no input
    this.hspd = 0;
    this.tex = 'Robot_Idle';
}

// If there is ground underneath the Robot…
if (ct.place.occupied(this, this.x, this.y + 1, 'Solid')) {
    // …and the W key or the spacebar is down…
    if (ct.actions.Jump.down) {
        // …then jump!
        this.vspd = this.jumpSpeed;
    } else {
        // Reset our vspeed. We don't want to be buried underground!
        this.vspd = 0;
    }
} else {
    // If there is no ground  
    this.vspd += this.gravity;
    // Set jumping animation!
    this.tex = 'Robot_Jump';
}
```

Como o nosso movimento vertical não depende do movimento horizontal, a animação é substituída para a animação de estado pulando se o robô não estiver no chão.

O robô agora terá a sua direção atual transformada e a sua textura alterada dependendo do movimento, por exemplo, se ele for para esquerda, então sua textura será transforma para a esquerda e o robô irá olhar para essa direção. Veja o nosso garoto em ação!

![Animated Robot](./../images/tutPlatformer_Animating.gif)

## Fazendo a Transição Entre as Fases

Aqui está a ideia:

* Cada room armazenará o nome da próxima room em uma variável.
* Haverá uma saída da fase na qual o Robô irá colidir com ela.
* Quando houver a colisão, então a saída irá lê a variável da room atual que aponta para a próxima room.

Crie uma novo tipo chamado `Exit`. Depois defina a textura. Então abra a aba "On Step" e escreve o código abaixo:

```js
// Are there next rooms defined?
if (ct.room.nextRoom) {
    // Do we collide with the Robot?
    if (ct.place.meet(this, this.x, this.y, 'Robot')) {
        // Switch to the next room
        ct.rooms.switch(ct.room.nextRoom);
    }
}
```

::: tip
Aqui `ct.room` aponta para a room atual. `ct.rooms.switch` sai da room atual e vai para a room fornecida por `ct.room.nextRoom`.
:::

Vamos agora para a aba "Rooms" localizada no topo e abra a room `Level_01`, click no botão chamado "Room's events" e escreva o seguinte código na aba "On Create":

```js
this.nextRoom = 'Level_02';
```

Agora resta apenas você pôr a saída na room, faça isso.

Em seguida salve a room, e click no botão "Done", depois click com o botão direito do mouse sobre a room de nome `Level_01` e selecione a opção "Set as starting room" e teste a transição.

::: tip Faça você mesmo!
Crie saídas adicionais levando a subfases secretas e libere todo o seu poder criativo. Obtenha [mais assets aqui](https://www.kenney.nl/assets/simplified-platformer-pack), se você precisar.
:::

## Colecionáveis: Contando e Desenhando

### Adicionando Cristais

Crie um novo tipo chamado `GreenCrystal` e defina a sua textura. Em seguida escreva esse código na aba "On Step":

```js
if (ct.place.meet(this, this.x, this.y, 'Robot')) {
    ct.room.crystals ++;
    this.kill = true;
}
```

::: tip
`this.kill = true;` determina que a copy atual deve ser removida da room atual. Isso acontecerá depois de todos os eventos "On Step" mas antes do evento "Draw".
:::

Como você deve ter notado, o número de cristais coletados serão armazenados na room.

Mas se continuarmos a adicionar mais características para uma room específica, cairemos na armadilha de acabar esquecendo de copiar e colar algum código em outras rooms. De qualquer forma, é um trabalho entediante ter que fazer a mesma coisa para mais de uma room. (E com certeza teremos mais de uma room!)

Então agora precisamos criar uma função reutilizável. Isso pode parecer estranho, mas na verdade não é difícil.

Vá para a aba "Settings" localizada no topo da tela e pressione o botão "Add a New Script" no canto inferior direito:

![Creating a reusable script](./../images/tutPlatformer_20.png)

Chame o novo script de `inGameRoomStart`. E escreva o seguinte código:

```js
var inGameRoomStart = function (room) {
    room.crystals = 0;
    room.crystalsTotal = ct.types.list['GreenCrystal'].length;
    ct.types.copy('CrystalsWidget', 0, 0);
};
```

::: tip
`ct.types.list['TypeName']` retorna uma lista de todas as copies do tipo definido na room. `length` retorna o tamanho da lista.
:::

![Creating a reusable script](./../images/tutPlatformer_21.png)

Agora em cada aba "On Create" de cada room adicione a seguinte linha de código:

```js
inGameRoomStart(this);
```

Hmmm… Isso parece familiar! Como em `ct.place.free(this, this.x, this.y)`! Na verdade, é dessa forma como a maioria dos métodos em ct.js funcionam: Você tem um método, e você define que esse método deve fazer alguma coisa com uma copy ou com uma room.

Quando `inGameRoomStart(this);` é invocado, ele mesmo definirá as propriedades `crystals` e `crystalsTotal`, sem a necessidade de escrever o código diretamente na room.

Então, é dessa forma que coletamos e contamos os cristais, mas precisamos desenhar a contagem deles e devemos fazer isso em grande *estilo*. ✨

Felizmente, existe uma ferramenta para desenhar texto estilosos dentro do próprio ct.js. Abra a aba "UI" localizada no topo da tela e crie um novo estilo. Chame-o de `CrystalCounter`.

Então na seção "Font", defina o tamanho da fonte para 24 e a sua espessura para 600. Alinhe à esquerda.

![Setting a style's font](./../images/tutPlatformer_17.png)

Depois abra a aba "Fill", ative a mesma e defina o tipo de preenchimento como "Diffuse", em seguida determine a cor como sendo verde. Eu escolhi `#00A847`. Outras boas escolhas incluem as cores principais dos cristais como `#2ECC71` e `#28B463`.

![Setting a style's fill color](./../images/tutPlatformer_18.png)

Podemos adicionar também uma linha grossa branca para o nosso texto. Abra a aba "Stroke", ative a mesma, e então defina uma cor branca e uma largura de linha 5. Se não conseguir ver o resultado a direita, tente alternar para o tema escuro clicando no ícone de menu em forma de hamburger localizado no topo da janela.

![Setting a style's line style](./../images/tutPlatformer_23.png)

Devemos agora criar um novo tipo que exibirá um ícone de cristal, você deve chamar esse novo tipo de `CrystalsWidget`, defina a textura `GreenCrystal` e em seguida escreva o seguinte código em sua aba "On Create":

```js
this.text = new PIXI.Text('0 / ' + ct.room.crystalsTotal, ct.styles.get('CrystalCounter'));
this.text.x = 32;
this.text.anchor.y = 0.5;

this.addChild(this.text);
```

Criamos uma nova etiqueta de texto e aplicamos o estilo `CrystalCounter`. `this.text.x = 32;` põe a nossa etiqueta de texto na posição horizontal de 32 pixels, como o nosso ícone de cristal tem 32 pixel de largura, a etiqueta ficará a direita desse ícone. `this.text.anchor.y = 0.5;` define que o eixo vertical da nossa etiqueta deve ser alinhado no meio do nosso ícone. `this.addChild(this.text);` adiciona a nossa etiqueta de texto ao nosso widget `CrystalsWidget`.

Abra a aba "Draw" e adicione o código abaixo:

```js
this.x = ct.room.x + 24;
this.y = ct.room.y + 24;

this.text.text = ct.room.crystals + ' / ' + ct.room.crystalsTotal;
```

Aqui mantemos o nosso widget preso no canto superior esquerdo e atualizamos o texto da nossa etiqueta.

Agora temos uma contador de cristais no canto superior esquerdo de nossa tela.

![A crystal counter](./../images/tutPlatformer_19.png)

### Adicionando Vidas e Corações Extras

Isso é semelhante a coleta de cristais, embora haja algumas mudanças:

* Começamos com 3 vidas.
* Não teremos mais de 3 vidas por vez.
* Se perdemos a última vida, a fase será reiniciada.

::: tip Faça você mesmo!
Tente fazer tudo sozinho, se você se perder, apenas siga as instruções abaixo. Agora pare de enrolação e mãos à obra! 😃
:::

Crie um novo tipo chamado `Heart` e defina a sua textura. Adicione o seguinte código na aba "On Step":

```js
if (ct.place.meet(this, this.x, this.y, 'Robot')) {
    if (ct.room.lives < 3) {
        ct.room.lives++;
        this.kill = true;
    }
}
```

Em seguida vá para a aba "Settings" e modifique o script `inGameRoomStart`:

```js{6,7}
var inGameRoomStart = function (room) {
    room.crystals = 0;
    room.crystalsTotal = ct.types.list['GreenCrystal'].length;
    ct.types.copy('CrystalsWidget', 0, 0);
    ct.types.copy('HeartsWidget', 0, 0);
    room.lives = 3;
};
```

Não esqueça de pôr corações extras em sua fase!

Precisamos de um contador de vidas estiloso. O processo de criação é o mesmo que o anterior, apenas escolha essa cor `#E85017` em vez de verde. Podemos até duplicar o estilo anterior para agilizar o processo de criação, para isso, vá até a aba "UI" novamente, caso o estilo anterior esteja aberto, feche clicando no botão "Apply" e em seguida click com o botão direito do mouse sobre o estilo criado anteriormente e selecione a opção "duplicate", depois defina o nome como sendo `HeartCounter` e click em "Ok", pronto, agora é só editar o estilo. :-)

Precisaremis de um outro widget para a nossa barra de vidas. Crie um novo tipo chamado `HeartsWidget` e defina a sua textura para `Heart`, na sua aba "On Create" escreva o seguinte código:

```js
this.text = new PIXI.Text(ct.room.lives, ct.styles.get('HeartCounter'));
this.text.x = -32;
this.text.anchor.y = 0.5;
this.text.anchor.x = 1;

this.addChild(this.text);
```

Adicione o código abaixo na aba "Draw":

```js
this.x = ct.room.x + ct.viewWidth - 24;
this.y = ct.room.y + 24;

this.text.text = ct.room.lives;
```

Note que nós usamos a propriedade `room.viewWidth` para posicionar o widget no lado direito da tela.

Agora modifique o código responsável pela morte do nosso robô, vá para aba "Types" e abra o tipo `Robot`, então adicione o código que faz o robô perder um coração a cada vez que ele morrer:

```js
if (ct.place.occupied(this, this.x, this.y, 'Deadly')) {
    this.x = this.savedX;
    this.y = this.savedY;
    this.hspd = 0;
    this.vspd = 0;
    // remove one life
    ct.room.lives --;
    if (ct.room.lives <= 0) {
        // Restart a room: switch to the room of its own name
        ct.rooms.switch(ct.room.name);
    }
    return;
}
```

É isso aí! Agora é hora de testar. Execute o jogo.

## Adicionando Plataformas Móveis

Crie um tipo chamado `Platform` e selecione a textura correspondente. Crie uma nova fase chamada `Level_03` com características de fossos mais compridos, armadilhas mais longas e com plataformas que se movimentam.

![Comigo's third level](./../images/tutPlatformer_22.png)

A movimentação das plataformas será dessa forma:

* Elas se movem horizontalmente, iniciando o movimento, digamos, indo para a direita.
* Se uma plataforma detectar que ela colidiu com um objeto `Solid` no próximo frame, então ela mudará de direção.
* As plataformas também moverá o nosso robô quando ele estiver sobre a plaforma.

Vamos abrir o tipo `Platform` em sua aba "On Create" defina a sua velocidade e o seu grupo de colisão com código abaixo:

```js
this.speed = 2;
this.ctype = 'Solid';
```

Agora vá para a aba "On Step" e adicione o código abaixo que moverá o nosso Robô quando ele estiver sobre a plataforma:

```js
var robot = ct.place.meet(this, this.x, this.y - 1, 'Robot');
if (robot) {
    robot.x += this.speed;
}
```

Adicione também esta lógica de momimento para quando a plataforma colidir com um objeto sólido:

```js
if (ct.place.occupied(this, this.x + this.speed * ct.delta, this.y, 'Solid')) {
    // Flip direction
    this.direction += 180;
}
this.move();
```

Veja como é simples, simples até demais. E aqui temos um problema: Se o Robô encostar no lado direito ou esquerdo da plataforma ele ficará preso lá. Precisamos fazer com que as platoformas sejam sólidas apenas no caso do Robô está sobre elas.

![An issue with platforms](./../images/tutPlatformer_PlatformIssues.gif)

Aqui vai um código melhor:

```js
var robot = ct.place.meet(this, this.x, this.y, 'Robot');
if (robot) {
    this.ctype = undefined;
} else {
    this.ctype = 'Solid';
    robot = ct.place.meet(this, this.x, this.y - 1, 'Robot');
    if (robot) {
        robot.x += ct.u.ldx(this.speed, this.direction);
    }
}

if (ct.place.occupied(this, this.x + this.speed * ct.delta, this.y, 'Solid')) {
    // Flip direction
    this.direction += 180;
}
this.move();
```

::: tip Faça você mesmo!
Adicione plataformas de movimento vertical! E verifique se elas não vão esmagar o nosso robô. 😉 
:::

## É isso aí pessoal!

Ufa! Esse foi um tutorial bastante longo. Mas ainda existem muitas melhorias que podem ser adicionadas.

Aqui vai uma lista de algumas delas que você pode implementar:

* Adicionar inimigos e motoserras mortais! Você pode obter esses sprites e muito mais [aqui](https://www.kenney.nl/assets/platformer-art-deluxe).
* Crie uma história e conte através de NPCs, seja por placas de madeira ou via legendas!
* Melhore o processo de reaparecer após a morte do Robô. Esteja certo de o Robô não caia em alguma armadilha ao reaparecer. Isso pode ser feito bloqueando por alguns instantes a entrada do usuário ou certificando-se que o ponto de salvamento está em uma área segura.
* Adicione sons! Nada como uma boa trilha e efeitos sonoros para dá vida e uma boa qualidade ao jogo.
* Esteja certo de que o Robô reapareça caso ele caia fora da fase.
* Apenas adicione mais fases. 😉 Decorando elas com plantas e criando mundo de cores diferentes.

::: tip Uma observação à parte
Note como as novas características em seu código aparecem de forma gradual nas fases! Essa é uma ótima maneira de introduzir novos recursos ao jogador. Ofereça ao jogador um conceito novo de cada vez, mas preserve o que já foi adicionado aumentando o grau de dificuldade aos poucos. *Essa foi uma dica profissional de level design do Comigo* 😎
:::

**Feliz Codificação!**  
Comigo
