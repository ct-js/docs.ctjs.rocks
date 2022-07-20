# Guia de migração para o ct.js v2.0.

## Alteração na propriedade `rotation` das copies ou "Minhas copies  giram como hélices"

Antigamente, a `rotation` fazia proxy do parâmetro de mesmo nome do pixi.js', o qual era medido em radianos. Ele foi feito para preservar a compatibilidade com projetos mais antigos, aqueles que foram criados antes do surgimento da v1. Eleminamos esse proxy para uma melhor adequação ao comportamento do pixi.js e para remover incosistências inesperadas ao trabalhar com entidades ct.js e pixi.js.

Pixi.js tem uma propriedade `angle` interna que é medida em graus, então:

* Em vez de usar `this.rotation`, use `this.angle`.
* `this.angle` é sentido horário quando comparada com anterior, `this.rotation`, que era no sentido anti-horário, então `this.angle = 90;` apara para baixo, 180 — para a esquerda, 270 — para cima, 360 e 0 — para a direita.

## Os Types agora são chamados de "Templates"

Sim.

É algo que eu, o criador do ct.js, queria alterar por uns impressionantes cinco anos. A maioria dos nomes em ct.js foram criados com um conhecimento pobre da língua ingles, e ao contrário das propriedades internas e coisas como "code injects" (os quais devem ser chamados "code injections"), "types" sãos coisas que cada usuário ct.js escreve diariamente.

Templates é uma palavra melhor para as entidades das quais as copies do ct.js são criadas, especialmente quando traduzindo o ct.js para outros idiomas, e também são mais neutras em termos de linguagem. Afinal, existem apenas seis typos em ct.js, e nenhum deles é um tipo antigo de ct.js.

"Templates" farão mais sentido quando o ct.js suportar templates baseados em classes diferentes de sprites animados simples: a ideia é permitir fazer botões, templates de painel e utilizar coisas legais como terreno com estrias. Embora tudo isso venha mais tarde, é melhor fazer pequenas transições agora – para facilitar migrações futuras.

**Como isso afeta você e os seus projetos:**

* Você agora terá que escrever `ct.templates...` em vez de `ct.types...`;
* Ct.IDE substituirá `ct.types` por `ct.templates` uma vez que você abra um projeto que foi criado em uma versão mais antiga do ct.js, mas ainda existem alterações na API de `ct.templates` que estão listada abaixo.

## `ct.templates.exists`

* `ct.templates.exists(copy)` foi renomeado para `ct.templates.valid(copy)`
* `ct.templates.exists(typeName)` agora verifica se uma existem copies com um nome específico na room (ou nas rooms anexada/prefixada).

## `ct.templates.make`, `ct.templates.copy`.

`ct.templates.make` foi removida porque ninguém realmente a usava.

Agoroa existem dois métodos separadas para a criação de copies, são eles:

* [`ct.templates.copyIntoRoom(type, x, y, container, exts)`](), e
* [`ct.templates.copy(type, x, y, exts)`]()

Perceba que os parâmetros se diferenciam um pouco em `ct.templates.copyIntoRoom(type, x, y, container, exts)` comparado com o método anterior `ct.templates.copy`.

`ct.templates.copyIntoRoom` lançará um erro se `container` não for definido. A separação em dois métodos é para fazer a criação da copy mais segura, à prova de falhas, e excluir situações como quando você passa `ct.rooms.list['NonExistentRoomName'][0]` como um container e então você obtém uma copy dentro da room principal sem qualquer alerta.

## `ct.u.rotate`, `ct.u.rotateRad`, `ct.u.uiToGameCoord`, `ct.u.gameToUiCoord` agora retorna um `PIXI.Point` em vez de arrays

`PIXI.Point` são objetos com duas propriedades, `x` e `y` e com mais alguns métodos úteis, tanto para copiá-los como manipular vetores, como a operação ponto por exemplo.

`ct.camera.uiToGameCoord`, `ct.camera.gameToUiCoord`, e todos os `ct.camera.get(XY)Corner` fazem o mesmo assim como eles são dependentes desses métodos.

:::tip Observação
Os métodos `ct.camera` com sufixo **Corner** internamente são dependentes de `ct.camera.uiToGameCoord`
:::

## `ct.place` foi alterado para ser mais eficiente e fácil de usar

1. `ct.place.occupied`, `ct.place.free` agora funciona com copies e tiles, então você precisa apenas deles em de adicionar uma verificação adicional com `ct.place.tile`. Além disso, todas as funções rastreamento agora funcionam com tiles também.
2. O parâmetro `multiple` foi removido de `ct.place.meet` e de `ct.place.occupied`. Agora existem os métodos `ct.place.meetMultiple` e `ct.place.occupiedMultiple`, para tornar o código mais lefível. Você pode precisar reescrever algum código para fazê-lo funcionar com múltiplas copies outra vez.
3. `ct.place.tile` foi renomeado para `ct.place.tiles`, e é acompanhado de `ct.place.copies`.
4. Adicionalmente, `ct.place` agora suporta e respeita as máscaras de colisões dos tiles. Atualmente é de pouca utilidade com tilesets grandes, mas agora você pode ter tiles individuais com máscaras circulares e outras!

Veja a nova documentação sobre o ct.place em seu painel lateral do ct.js.

## O `ct.sound` padrão agora é um catmod (módulo cat)

Normalmente não causará nenhum problema, mas caso você tenha algum erro do ct.res sobre nenhum sistema de som, ative um dos catmods de som nas configurações do seu projeto.

## `ct.mouse` e `ct.touch` agora são obsoletos em benefício de `ct.pointer`

Não causará nenhum problema imediato, mas consider usar o módulo `ct.pointer` em seus projetos futuros. Ele cobre as funcionalidades de `ct.mouse` e `ct.touch` com uma API familiar, assim como suporta recursos adiconais como lendo a propriedade pressure que permite medir a pressão do toque, a posição da caneta e uma abstração sobre a API Pointer Lock.
