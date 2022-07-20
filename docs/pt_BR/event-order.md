# Ordem de eventos em ct.js

Esses eventos são sempre executados na seguinte ordem:

1. A biblioteca principal do ct.js é executada;
1. Os módulos são inicializados;
1. Os scripts personalizados adicionados nas configurações do projeto são executados;
1. O evento `oncreate` da room é invocado, o qual é emitido quando um usuário inicia um jogo ou alterna para uma nova room;
1. `oncreate` é invocado para cada;
1. Então o loop principal do jogo começa:
    1. O evento `onstep` é invocado para todas as copies na room;
    1. O evento `onstep` da room atual é invocado;
    1. `ondestroy` é invocado para todas as copies que foram marcadas para morrer com a propriedade `kill`;
    1. Todas as copies são reorganizadas;
    1. `ondraw` é invocado para todas as copies;
    1. `ondraw` é invocado para um room;
    1. Os eventos de entrada são apagados. Aguardando por uma nova interação do loop de jogo.
1. Quando o usuário alternar para uma nova room, um evento `onleave` é invocado para a room anterior.

## Ordem de execução com a injeção dos módulos

**Na inicialização:**

1. A biblioteca principal do ct.js é executada.
1. `load.js`.
1. Os módulos são inicializados.
1. Os scripts personalizados adicionados nas configurações do projeto são executados;
1. `resload.js` é executado quando todos os assets foram carregados.
1. `start.js` — Invocado logo antes do game ser iniciado (nenhuma room foi criada ainda).
1. A primeira room é criada.
1. O OnCreate da room é invocado.
1. `roomoncreate.js`.
1. `switch.js` é invocado.
1. `ct.camera` é devidamente posicionada.

**Na transição de uma room para outra:**

1. O evento OnLeave da room anterior é invocado.
1. `roomonleave.js`.
1. OnCreate da nova room é invocado.
1. As copies são criadas aqui, com todos os seus  eventos e injeções.
1. `roomoncreate.js`
1. `switch.js`
1. `ct.camera` é devidamente posicionada.

**A cada frame:**

1. `beforeframe.js` é executado em contexto global.
1. `beforestep.js` with `this` being the current type.
1. Copies' own OnStep is called.
1. `afterstep.js` com `this` sendo o tipo atual.
1. `beforeroomstep.js` com `this` sendo uma room atual (pode ser diferente de `ct.room`)
1. O OnStep da room que o contém é invocado.
1. `afterroomstep.js` com `this` sendo uma room atual (pode ser diferente de `ct.room`)
1. As copies são destruídas com com os seus eventos OnDestroy.
1. A posição da camera é atualizada.
1. `beforedraw.js` com `this` sendo o tipo atual.
1. O OnDraw das copies que o contém é invocado.
1. `afterdraw.js` com `this` sendo o tipo atual.
1. `beforeroomdraw.js` com `this` sendo uma room atual (pode ser diferente de `ct.room`)
1. OnDraw da room que o contém é invocado.
1. `afterroomdraw.js` com `this` sendo uma room atual (pode ser diferente de `ct.room`)
1. `afterframe.js` é invocado ante de irmos para o próximo frame.

**Na criação da copy:**

1. `onbeforecreate.js`
1. OnCreate das copies que o contém é invocado.
1. `oncreate.js`

**Na exclusão da copy:**

1. `ondestroy.js`
1. O evento OnDestroy das copies que o contém é invocado.