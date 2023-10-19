# ct.emitters

O módulo `ct.emitters` permite que você dispare efeitos de partículas, anexando as copies ou fazendo seguir uma.

Internamente, ele tem como base o [módulo `pixi-particles` criado por CloudKid](https://github.com/pixijs/pixi-particles).

::: warning Alerta:
Se você não tiver nenhum emissor de partículas em seu projeto, então o `ct.emitters` não estará disponível. Ele é empacotado apenas se você tiver um sistema emissor de partículas em seu projeto para tornar as compilações do navegador menores.
:::

## Criando efeitos

Existem três métodos com lógica diferente, cada um para uma situação específica:

* `ct.emitters.fire('NameOfTheTandem', x, y)` cria um efeito em uma posição específica, e isso é tudo. É útil para criar efeitos que não deve seguir alguma coisa ou se mover, como por exemplo, explosões, rajadas de luz ou efeitos de impacto/colisões.
* `ct.emitters.follow(parentCopy, 'NameOfTheTandem')` são bons para um efeito de longa duração que deve ser anexado em uma copy. As partículas são deixadas para trás ao se mover. É adequado para situações de efeitos de fumaça, trilha, bolhas e por aí vai.
* `ct.emitters.append(parentCopy, 'NameOfTheTandem')` é semelhante ao `follow`, mas partículas antigas são movidas com o emissor. É útil ao fazer bolhas de escudo mágicos ou para partículas que devem ficar dentro da copy (pense em recipiente móvel com líquido fervente e bolhas nele).

Agora veremos todos eles em ação (observe como a trilha reage ao movimento do robô):

`ct.emitters.fire` | `ct.emitters.follow` | `ct.emitters.append`
-|-|-
![](../images/emittersFire.gif) | ![](../images/emittersFollow.gif) | ![](../images/emittersAppend.gif)

```js
//  O código do exemplo "fire"
ct.emitters.fire('HeartTrail', this.x, this.y - 70);
```

```js
// O exemplo "follow"
ct.emitters.follow(this, 'HeartTrail', {
    position: {
        x: 0,
        y: -70
    }
});
```

```js
// O exemplo "append"
ct.emitters.append(this, 'HeartTrail', {
    position: {
        x: 0,
        y: -70
    }
});
```

## Opções adicionais

Você pode ter notado que esses três métodos aceitam um parâmetro adicional (por exemplo, `ct.emitters.fire('NameOfAnEffect', x, y, options);`). Ele é um objeto e possui propriedades para ajustar a aparência e o comportamento de um efeito:

* `scale` — dimensiona o objeto com os parâmetros `x` e `y`.
* `position` — defina isso para adicionar uma mudança no emissor de partículas relativo a copy na qual ele foi anexado ou relativo a copy que ele está seguindo. Não funciona com `ct.emitter.fire`.
* `prewarmDelay` — se menor que 0, ele pré-aquecerá o emissor de partículas, o que significa que ele irá simular um determinado número de segundos antes de mostrar as partículas no mundo. Se maior que 0, o efeito será postergado pelo número de segundos especificado.
* `tint` — uma cor aplicada ao efeito, por exemplo, 0xff0000 o fará vermelho.
* `alpha` — a opacidade ou transparência do efeito, um valor entre 0 (invisível) até 1 (completamente opaco, como em ct.IDE).
* `rotation` — rotação em graus.
* `isUi` — se definida como `true`, será usado a unidade de tempo das camadas de UI. Isso afeta como os efeitos são simulados durante o efeito de câmera lenta e de pausa do jogo.
* `depth` — a profundidade do emissor, pense em `depth` como o ordem de renderização no eixo z, o z-index. O padrão é `Infinity` (então ele vai ficar acima de qualquer coisa).
* `room` — a room na qual o efeito será anexcado. O padrão é a room principal e atual de (ct.room). Isso não tem nenhum efeito com `ct.emitters.attach`, pois o pai ou dono do efeito já foi definido no primeiro parâmetro.

Cada propriedade é opcional. Um exemplo: se a gente quiser criar um pequeno efeito avermelhado acima de uma copy e que fique na mesma profundidade que a copy, poderíamos escrever o seguinte:

```js
ct.emitters.follow(this, 'Debuff', {
    scale: {
        x: 0.75,
        y: 0.75
    },
    position: {
        x: 0,
        y: -80
    },
    tint: 0xff9999,
    depth: this.zIndex
});
```

## Manipulando os emissores

Por si só, os efeitos criados se comportarão bem: eles pararão automaticamente quando o tempo acabar ou quando o dono deles forem destruídos, deixando um belo rastro de partículas. Mas as vezes precisamos limpar completamente o efeito ou pausá-lo e reiniciar depois ou quem sabe ainda, pará-lo complemente antes de seu término normal.

Cada um dos métodos `ct.emitters.fire`, `ct.emitters.append` e `ct.emitters.follow` retorna uma referência para o efeito criado, o qual nós podemos usar:

```js
// vamos criar um escudo de bolhas!
this.shied = ct.emitters.append(this, 'BubbleEffect');

// Depois que não precisarmos mais dele:
this.shield.stop();
this.shield = null; // Atribua o valor null para liberar a memória
```

Existe um número de propriedades que podemos utilizar dessa forma:

* `emitter.stop();` previne a criação de novas partículas. Quando a última partícula desaparecer, o emissor se autodestruirá.
* `emitter.clear();` limpa instantaneamente todas as partículas.
* `emitter.kill` é semelhante a propriedade `kill` das copies: definindo para o seu valor para `true` destruirá instantaneamente o efeito com todas as suas partículas.
* `emitter.frozen` se definido o valor `true`, fará com que efeito pare de ser atualizado.
* `emitter.pause()` pausa a criação de novas partículas, mas as partículas restante ainda serão animadas. Você pode retomar a criação das partículas com `emitter.resume();`.
