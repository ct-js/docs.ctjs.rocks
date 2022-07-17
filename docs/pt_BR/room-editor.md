# Usando o editor de salas(room)

As Salas(Rooms) são os espaços onde á mágica real do seu acontece. Uma room pode representar uma fase, um menu, um widget de UI e é um espaço onde você coloca as suas copies (instâncias dos seus templates), backgrounds e tiles. Saber como usá-lo ao máximo tornará processo de level design muito mais fácil.

O editor de room tem quatro abas que define o seu stado. Essas abas estão localizadas do lado esquerdo do editor de room, embaixo do botão "Room events".

* A aba Copies é para a adição de novas e para a minupalçao das copies existentes.
* Aba Backgrounds para adição e ajuste de backgrounds.
* Aba Tiles para a adição de novos tiles e gerenciamento dos já adicionados.
* Aba Properties com as definições da room e da câmera.

![A quatros abas que define o estado do editor de room](../images/roomEditor_fourTabs.png)

## Navegando pelas room

Movendo por aí:

* Matenha pressionado o botão do meio do mouse (a roda) e mova o cursor para mover a câmera.
* Segurar o botão esquerdo e mover o mouse também funciona enquanto as abas de Backgrounds ou Properties estão abertas.
* Quando a aba Copies estiver aberta, clicando em  "Select and move" também permitirá que você se mova com o botão esquerdo do mouse. Isso é feito principalmente para touchpads, pois raramente há um botão do meio.

Para aumentar e diminuir o zoom, use a roda do mouse ou o slider de zoom no canto superior direito do editor de room.

## Gerenciando copies

O gerencioamento das copies apenas é possível enquanto a aba "Copies" do lado esquerdo estiver aberta. Enquanto ela estiver aberta, você pode várias coisas:

* Quando um template é selecionado do lado esquerdo, você pode clicar no visualizador da room para adicionar uma nova copy.
  * Mantenha a tecla `Shift` pressionada enquanto move o cursor para criar múltiplas copies (semelhante ao pintar com um pincel).
  * Pressionando a tecla `Alt` fará com que a grid seja ignorada ao adicionar as copies.
  * Pressionando a tecla `Ctrl` ativará o modo apagar, onde você pode remover as copies simplesmente arrastando o círculo vermelho pela room.
* Clicando com o botão direito em qualquer lugar encontrará a copy mais próxima e automaticamente a selecionará mostrando um popup com algumas opções:
  * Apagar a copy selecionada;
  * Mover, rotacionar ou redimensionar;
  * Adicionar ou alterar as propriedades personalizadas. Elas então estarão disponíveis como `this.yourPropertyName` através das abas de eventos do templates.
* Enquanto a opção "Select and Move" estiver ativa e matendo a tecla `Shift` pressionada enquanto move o cursor permitirá que você selecione várias copies de uma vez.
  * As copies selecionadas poden ser movidas juntas enquanto você as arrastar por aí com o mouse.
  * Quando várias copies estão selecionadas de uma vez, um popup aparecerá quando clicar nas mesmas com o botão direito do mouse. Isso permite alterá-las por um valor definido e apagá-las.
* Clicando com uma tecla de `Shift` pressionada também funcionará; será selecionada a copy mais próxima. Um popup exibido onde você pode ver e alterar a rotação, posição e a escala da copy.

## Adicionando backgrounds

Backgrounds são adicionadas na segunda aba a esquerda do editor de room. Dentro dela, existe um botão "Add a Background" que abre um seletor de textura. Existem várias coisas que você deve levar em considerção quando usar backgrounds:

* Um textrura deve ser marcada como um background; caso contrário, haverá lacunas nela, um efeito desagradável que você não quer em seu jogo. Uma mensagem de alerta será exibida se você tentar utilizar usa uma textura regular (uma textura que não foi marcada como um background).
* Backgrounds com vários frames não são suportados, pelo menos por enquanto.

Você pode alterar a textura do background clicando  na textura atual. Outras propriedades estão ocultas no painel que você pode abrir clicando no ícone engrenagem ⚙.

![Abrir as definições de background clicando no ícone engrenagem](../images/roomEditor_backgroundSettings.png)

* Depth altera a ordem de renderização relativa as copies, tiles e outros backgrounds. Definindo um valor maior causará que ela seja renderizada acima das outras com valores inferiores.
* O campo Shift posiciona o seu background na room.
* O campo Scaling estica o seu background. Valores menores que 1 a fará menor, enquanto que valores maiores que 1 a fará maior. Usar valores negativos inverterá (flip) o background.
* Movement é a velocidade permite os backgrounds se mover. Isso pode ser usado criar efeitos de chuva caindo ou de nuvens se movendo pelo céu.
* Parallax altera como o background se move em relação a câmera. Você pode definir valores menores que 1 para criar um sensação de profundidade. Valores maiores que 1 são normalmente usados para foregrounds.
* A caixa "Repeat" deixa você escolher como o background será alocado:
  * `repeat` significa que o background será alocado lado a lado em ambas direções, verticalmente e horizontalmente.
  * `repeat-x` alocará o background lado a lado horizontalmente.
  * `repeat-y` alocará o background lado a lado verticalmente.
  * `no-repeat` não colocará o background lado a lado.

## Trabalhando com tiles e tilesets

Para trabalhar com tiles, você de uma textura adequada e que esteja definida corretamente — esteja certo que você definiu o tamanho de cada frame corretamente e a quantidade de colunas e linhas em seu tilesets. De qualquer forma, qualquer textura ct.js pode ser usada como um tile, mesmo se ele tiver apenas um único frame. Você pode usá-lo para pôr decorações estáticas dentro das suas rooms.

Aqui está um exemplo de um tileset definido corretamente:

![Um exemplo de um tileset definido corretamente](../images/roomEditor_tilesetSettings.png)

Para começar a trabalhar com os tiles, click na aba "Tiles" do lado esquerdo do editor de room e click no botão "Find a Tileset". Em seguida escolha um tile na textura que você importou e a coloque dentro da room com um click. Você também pode vários tiles de uma vez pressionando e arrastando o mouse pelos frames.

:::tip Dica
Lembre-se de que cada tile é colocado em uma camada tile de uma profundidade específica. Você pode mover os tiles para uma outra camada através do popup e também alterar a profundidade a profundidade de qualquer tile, mas colocar cada tile em um nível de profundidade arbitrário não é possivel.

Criar trocentas camadas também não é recomendado, porque 1) não é inteligente e 2) cada camada de tile armazena os seus contextos em cache para aumentar o desempenho de renderização, então é melhor minimizar a quantidades de camadas de tile que você usa para obter o máximo dela.
:::

:::warning Alerta
Ct.IDE tarna-se estranho quando se tenta usar vários tiles de uma textura que usa margens e deslocamentos (offsets). Funciona perfeitamente no jogo, mas no editor de rooms aparece bugado. Considere refazer a textura para não conter deslocamentos (offsets).

Esse problema será corrigido com um novo editor de room.
:::

O modo tile tem os controles semelhantes à aba copy:

* Clicando com um tile selecionado, faz com que o mesmo seja adicionado dentro da sala.
  * Segurando a tecla `Shift` enquanto arrasta o mouse com o botão esquerdo pressionado, faz com que múltiplos tiles sejam criados.
  * Segurando a tecla `Alt` fará com que seja ignorada a grid ao posicionar os tiles.
  * Seguraando a tecla `Ctrl` habilitará o modo apagar, onde você pode remover os tiles enquanto arrasta o círculo vermelho pela sala.
* Clicando com o botão direito do mouse em qualquer lugar da sala fará com que o tile mais próximo do ponteiro do mouse seja encontrado e um menu seja exibido com a opção de deletar o mesmo.
* Com a opção de selecionar e mover habilitada, segurando a tecla `Shift` enquanto arrasta o ponteiro do mouse pela sala, fará com que múltiplos tiles sejam selecionados.
  * Clicar com a tecla `Shift` pressionada sobre a sala também funcionará; será selecionado o tile mais próximo do ponteiro do mouse.
  * Quando vários tiles são selecionados, um menu será exibido quando for clicado com o botão direito do mouse sobre eles.
    * Um desses itens de menu permite que você delete o tile. Bem simples, né?
    * "Move to layer(Mover para camada)" abre um modal para a entrada de uma nova profundidade para os tiles selecionados. Se não houver nenhuma camada de tile com a profundidade especificada, uma nova será criada.
    * "Shift tiles(Deslocar tiles)" desloca todos os tiles selecionados por uma quantidade de pixels definida

## Propriedades da Room(Sala)

A aba "Properties(Propriedades)" do editor de sala tem opções para ajustes de renderização e de câmera.

* O View width/height define o tamanho inicial da câmera — a área que é mostrada. Como a resolução e o tamanho da tela de renderização são uma coisa elástica no ct.js, graças ao `ct.fittoscreen`, eles não correspondem à resolução da tela - eles apenas definem o quanto sua câmera mostra e qual proporção ela tem. Tudo é feito pelo `ct.fittoscreen` (e você pode alterar essas definições na aba Project(Projeto)).
* A caixa de seleção "Keep camera in a rectangle(Manter a câmera no retângulo)" mostra os controles que limitam o que a câmera pode mostrar. Por padrão, as salas e câmeras em ct.js são infinitas, mas quando habilitado, as bordas da câmera não excederão a região especificada.
* "Background color(Cor de fundo)" define a cor das áreas não coberta pelas copies, tiles e/ou texturas de fundo.
* A caixa de seleção "Is a UI layer(É uma camada de UI" diz como a sala deve ser posicionada se usada dentro de uma outra sala. As camada de UI seguem a câmera e não são afetadas pelo zoom, são perfeitas para os controles de UI.

:::tip Dica
Para saber mais sobre as camada de UI, veja [a referência para os métodos append/prepend](ct.rooms.html#ct-rooms-append-nameoftheroom-ext-and-ct-rooms-prepend-nameoftheroom-ext), ou [veja como é feito no tutorial JettyCat](tut-making-jettycat.html#creating-menus).
:::