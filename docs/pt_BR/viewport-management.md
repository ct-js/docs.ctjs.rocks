# Trablahando com Viewport(Janela de Visualização)

Desde a versaõ 1.3 que o ct.js tem um objeto Camera que manipula o viewport(janela de visualização). Ele suporta o redimensionamento e rotação e pode seguir uma copy, além de poder criar efeitos de tremer a tela.

## Movendo a câmera por aí

Para mover a câmera por aí, você pode:

* usar `ct.camera.teleportTo`, `ct.camera.moveTo`;
* usas as variáveis internas para seguir coisas pela tela;
* alterar os parâmetros da câmera você mesmo.

### Movendo e teletransportando <badge>novo na v1.3</badge>

`ct.camera.moveTo(x, y)` e `ct.camera.teleportTo(x, y)` movem a câmera para uma nova posição. Existem diferenças, embora:

* `ct.camera.moveTo(x, y)` é útil para cutscenes e transições suaves entre objetos, pois funcionam com `ct.camera.drift`;
* `ct.camera.teleportTo(x, y)` não faz transições e reinicia os efeitos de tremer a tela.  É útil para alterações em momentos específicos e instantâneos, por exemplo, quando mover a câmera para um local distante.

### Seguindo uma copy

Uma simples linha com a instrução de código`ct.camera.follow = this;` dentro da aba "On Create" do seu personagem cprincipal definirá um movimento de câmera automático e mágico ✨

`ct.camera.borderX` e `ct.camera.borderY` defina a área na qual a câmera se desloca quando a copy seguida entra nessas bordas. Esses valores são em coordenadas de UI(Interface do Usuário).

```js Exemplo: seguindo uma copy com limites
// Adicione este código, por exemplo, na aba `OnCreate` do seu herói.
ct.camera.follow = this;

// Segue o herói até que ele não possa está mais perto que 300px de qualquer lado da tela
ct.camera.borderX = 300;
ct.camera.borderY = 300;
```

Você também pode desativar a lógica de seguir para um dos eixos. Definindo `ct.camera.followX` para `false` desativará o movimento horizontal, e definindo `ct.camera.followY` para `false` desativará o movimento vertical. Isso ainda permite que você mova a câmera com os métodos `teleportTo` e `moveTo`. <badge>novo na v1.3</badge>

### Posicionamento manual

Se você achar que os métodos acima não são suficientes para você, use estes parâmetros:

* `ct.camera.x`,
* `ct.camera.y`,
* `ct.camera.targetX`,
* `ct.camera.targetY`.

`x` e `y` represneta a posição atual da câmera sem o tremer da tela e os efeitos `shiftX` e `shiftY`.
`targetX` e `targetY` será diferente se `ct.camera.drift` é maior que 0 e você deve primeiro editar esses valores.

## Zoom e rotação <badge>novo na v1.3</badge>

Para redimensionar a viewport use `ct.camera.scale.x` e `ct.camera.scale.y`, semelhante ao redimensionamento de copies. Esse não é um nível de zoom, mas um fator de redimensionamento de um retângulo de captura: ao usar valores maiores que 1, você verá uma porção maior da room.

Para rotacionar a viewport use `ct.camera.rotation` (em graus). Mais uma vez, você rotaciona um retângulo de captura, para que as coisas na tela girem no sentido horário.

::: warning Uma pequena observação
Você não deve alterar os valores da câmera no evento "On Draw", uma vez que a atualização da câmera acontece depois do evento "On Step" antes do evento "On Draw". Se você o fizer, você notará algumas inconsistências ao converter as coordenadas de UI para as de jogo. Isso porque `ct.u.uiToGameCoord` e outros usarão novos valores, muito embora a room ainda não tenha sido reposicionada ainda.
:::

## Modificadores e transições suaves

* `ct.camera.drift` é um valor entre [0; 1] que define o quão rápido a câmera reage ao movimento. O padrão é `0` (sem drift). Tente definir `ct.camera.drift` para `0.9` criar uma transição suave.
* `ct.camera.shiftX` e `ct.camera.shiftY` permite colocar a câmera mais acima/mais abaixo/etc que o objeto alvo. Isso é especialmente útil ao seguir uma copy: você pode precisar mostrar mais coisas à esquerda quando um personagem do jogo olhar pra lá, ou para baixo quando ele estiver agachado e etc.

`ct.camera.shiftX` e `ct.camera.shiftY` são interpolados em uma passagem separada que outros movimentos de câmera mas ainda usa `ct.camera.drift`.

::: tip Dica
Para um redimensionamento e rotação suave, altere os valores de `ct.camera.angle`, `ct.camera.scale.x`, `ct.camera.scale.y` continuamente com `ct.delta` ou use o módulo `ct.tween`.

Por exemplo, para aumentar o zoom, você pode usar o trecho de código abaixo:
```js
ct.tween.add({
  obj: ct.camera.scale,
  duration: 500,
  fields: {
    x: 0.5,
    y: 0.5
  }
});
```

Ou você poderia manipular o ângulo da câmera através de entradas de usuário (no evento "On Step"):

```js
ct.camera.angle += ct.actions.CameraRotate.value * ct.delta * 5;
```

:::

## Efeitos de tremer a tela<badge>novo na v1.3</badge>

Sim, existe tal recurso para isso no ct.js. 😅 O seu design é o seguinte:

* uma tela treme por duas funções harmoniosas combinadas em cada eixo, com suas fases não sincronizadas;
* o poder de um tremor de tela é definido por `ct.camera.shake` e representa a maior amplitude possível do efeito. Um valor de `10` e 10% do tamanho da viewport(janela de visualização);
* o efeito diminue gradualmente com o passar do tempo — isso pode ser ajustado pelo parâmetro `ct.camera.shakeDecay` ou desativando atrabés da definição do seu valor para `0`.

::: warning TERMO DE RESPONSABILIDADE
* **Lembre-se** que há muitas pessoas (inclisuve eu, o criador do ct.js) que rapidamente ficam tontas com as oscilações e tremores de tela. Há também as pessoas com epilepsia.
* **Proporcione controles** para o tremor/osciliação de tela e não abuse do efeito.
* **Adicione alertas** sobre o tremor/oscilação de tela no início do seu jogo e também dentro da descrição do mesmo.
:::

Há muitos parâmetros [descritos aqui](/ct.camera.html) para controlar a sua sensibilidade, mas os valores padrão também são bons. Abaixo segue alguns exemplos:

```js
// Adiciona um impulso que acumulará em repetitivas chamadas
ct.camera.shake += 1;
```

```js
// Cria uma oscilação constante e lenta da câmera
ct.camera.shakeFrequency = 1;
ct.camera.shakeDecay = 0;
ct.camera.shake = 2;
```

## Criando uma UI adaptável

Todos os dispositivos contemporâneos têm várias resoluções e, portanto, seu aplicativo deve se adaptar a elas e ainda oferecer a melhor qualidade.

O primeiro passo que você precisa fazer é habilitar o catmod `ct.fittoscreen`. Em seguida, click na aba "Settings" e escolha o modo de redimensionamento mais adequado ao seu projeto de jogo:

* O redimensionamento rápido com letterboxing é adequado apenas para **jogos em pixelart** ou quando o desempenho é vital;
* A expansão funciona bem quando mais o player vê na tela, o melhor (por exemplo, RTS ou jogos como Factorio);
* O redimensionamento com letterboxing funciona para **qualquer tipo de projeto** e também pode fornecer boas transformações para os seus jogos em pixelart. Isso manterá a proporção de tela projetada.
* O redimensionamento sem o letterboxing garante a melhor qualidade e uso de uma tela cheia. Muitas das vezes ela é preferível em vez do redimensionamento com letterboxing.

Se você estiver criando um jogo em pixelart, certifique-se que desativou a image smoothing, suavização de imagem, na aba "Project" -> "Render Options".

De modo geral, você deve seguir as regras abaixo:

* crie uma UI em uma room separada e a importe com `ct.rooms.append('NameOfTheRoom', {isUi: true})`;
* use `ct.camera.width` e `ct.camera.height` para posicionar os elementos de UI;
* use `ct.camera.realign(this)` <badge>novo na v1.3</badge> em "On Draw" da camada de UI para obter resultados melhores;
* atualize a posição dos elementos de UI regularmente, pois qualquer alteração na resolução pode cortar os seus elementos. Isso pode ser causado pelo redimensionamento de uma versão com janel, pela desconexão aleatória de um monitor externo e etc;
* quando for usar "Scaling with/without letterboxing", comece planejando as suas rooms, assets gráficos e UI em uma definição de tamanho de resolução da room relativamente alto, como por exemplo, 1920x1080px, assim ele reduzirá em outras resoluções de forma agradável.

Não esqueça de testar a sua UI em diferentes tamanhos de tela e dispositivos!

## Redimensionando a viewport(janela de visualização)

Normalmente é melhor usar o `ct.fittoscreen` para que ele gerencie a renderização e a viewport(janela de visualização) para você. Em outros casos, use o `ct.camera.scale.x` e `ct.camera.scale.y`.

Se ainda assim você quiser fazer o redimensionamento da viewport manualmente, use estes parâmetros (isso afeta a renderização!):

* `ct.width`;
* `ct.height`.

Eles ainda podem ser usados com a maioria dos modos do `ct.fittoscreen`, exceto para o modo "expand"(expandir), pois o `ct.fittoscreen` substitui o `ct.width` e o `ct.height`.