# Estendendo os eventos ct.js' com injeções

Injeções são um poderoso intrumento para estender as funcionalidade do framework ct.js além de adicionar métodos e propriedades. Permitindo que você adicione lógica para um loop de jogo, carregue recursos. crie templates agrupados e etc.

A pasta `injections` dentro do diretório do seu módulo aceita arquivos com código que serão injetados quando exportar um jogo. Todos eles são opcionais, e aqui está uma lista com todas as injeções possíveis:

**Eventos gerais**:

* `load.js` – acionado uma vez quando o código do jogo foi carregado, mas nada aconteceu ainda, por exemplo, nenhuma recurso foi carregado;
* `start.js` – acionado uma vez quando todos os recursos do jogo foram carregados. Nenhuma lógica do jogo executou ainda.
* `switch.js` – acionado toda vez que uma room é trocada, mas antes que qualquer outro código. Aqui, uma varável `room` é o nome da nova room.

**Eventos específicos da Room**:

* `beforeroomoncreate.js` — acionado antes que uma room seja criada, mas depois que uma câmera e um renderer são definidos.
* `roomoncreate.js` – acionado depois de entrar em uma nova room. Esse código é avaliado *depois* do código definido pelo usuário em OnCreate, quando todas as copies foram criadas. Aqui, `this` é igual a nova room.
* `roomonleave.js` – Acionado antes de sair da room, mas *antes* que qualquer script do usuário.  As copies ainda existem aqui.
* `beforeroomdraw.js`
* `afterroomdraw.js`
* `beforeroomstep.js`
* `afterroomstep.js`

**Eventos específicos da Copy**:

* `onbeforecreate.js` — aplicado a Copy recém-criada, antes do seu evento OnCreate, mas depois que a sua informação de tipo foi aplicada. Funciona com Copies simples (copies sem template) também.
* `oncreate.js` – aplicado a Copy recém-criada, logo *após* o seu próprio evento OnCreate.
* `ondestroy.js` – aplicada a Copy antes dela ser deletada. Esse código é chamado *antes* do evento OnDestroy da Copy.
* `beforedraw.js`
* `beforestep.js`
* `afterdraw.js`
* `afterstep.js`

**Templating e utilitários**:

* `css.css` – injeta CSS dentro de um jogo exportado.
* `res.js` – chamado uma vez ao analisar as imagens carregadas.
* `resload.js` – chamado uma vez depois que todos recursos foram carregados.
* `templates.js` – aqui você pode pôr os seus próprios Templates.
* `styles.js` – aqui você pode pôr os seus próprios estilos de renderização.
* `htmltop.html` – esse código é colocado antes da renderização do canvas.
* `htmlbottom.html` – esse código é colocado depois da renderização do canvas.

veja também [Ordem de execução com a injeção dos módulos](./event-order.html#call-order-with-mod-s-injections) para uma imagem mais completa da ordem de execução.

## Templating

Cada injeção pode substituir um rótulo especial por um [valor das suas configurações](./modding-settings-and-extensions.html). Se você definiu um campo de configuração com uma chave `enableSockets`, então todas as correspondências com `/*%enableSockets%*/` em arquivos js, css, e html serão substituídas pelo valor escolhido pelo usuário.

Tenha cuidado, porque um campo pode retornar um valor vazio. Em JavaScript, você pode usar esse wrapper para ler com segurança uma variável sem quebrar a sintaxe: `[/*%enableSockets%*/][0]`. Isso retornará um valor dedinido ou `undefined`.

:::tip Dica
Templating também é compatível com o seu arquivo `index.js`.
:::