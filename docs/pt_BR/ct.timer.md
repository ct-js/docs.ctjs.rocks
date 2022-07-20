# ct.timer

`ct.timer` permite a criação de temporizadores, opcionalmente executando uma função quando o temporizador chegar em uma certa quantidade de tempo.

Exemplos:

```js
// Adiciona um temporizador
ct.timer.add(1000, 'test');
// Ou:
new CtTimer(1000, 'test');
```

```js
// Cria uma novo temporizador e o armazena em uma variável chamada `timer`
// Registra no console "Done!" quando tiver decorrido 2.5 segundos
var timer = ct.timer.add(2500, 'test');
timer.then(() => {
    // Faz alguma coisa útil
    hero.invincible = false;
    console.log('Done!');
})
// O `catch` é uma parte não necessária. Sem ele, você verá erros no console quando o temporizador for interrompido, 
// manualmente ou quando você trocar de rooms
.catch(e => {
    console.log('Timer removed', e);
    // Você pode adicionar código aqui para que coisas importantes ainda
    // sejam executadas na troca de room:
    hero.invincible = false;
});

// Registra no console a quantidade de tempo que resta
console.log(timer.time);

// Para o temporizador. Note que nesse caso não será chamado o código dentro da instrução `then(() => {})`
timer.reject();

// Aciona o temporizador manualmente
timer.resolve();
```

## métodos ct.timer

### ct.timer.add(timeMs, name) ⇒ <code>void</code>
Cria um novo temporizador que executa na escala de tempo do jogo e é afetado pela aceleração/desaceleração do tempo.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| timeMs | <code>Number</code> | O tempo de espera do temporizador **em milissegundos** |
| [name] | <code>String</code> | O nome do temporizador, o qual pode ser acessado através de `timer.name`. |

### ct.timer.addUi(timeMs, name) ⇒ <code>void</code>
Cria um novo temporizador que executa na escala de tempo de UI.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| timeMs | <code>Number</code> | O tempo de espera do temporizador **em milessegundos** |
| [name] | <code>String</code> | O nome do temporizador, o qual pode ser acessado através de `timer.name`. |

## Propriedades do temporizador

### CtTimer.time ⇒ <code>Number</code>

A quantidade de tempo em que o temporizador ficou ativo, em milissegundos.

### CtTimer.timeLeft ⇒ <code>Number</code>

A quantidade de tempo restante até chegar ao `timeMs`. O valor padrão é `0`.

### CtTimer.name ⇒ <code>String|false</code>

Retorna o nome do temporizador ou `false` se nenhuma nome foi atribuído.

### CtTimer.uiDelta ⇒ <code>Boolean</code>

Se `true`, será usado o `ct.deltaUi` contar o tempo. Se `false`, será usado `ct.delta` para contar o tempo.

### CtTimer.promise ⇒ <code>Promise</code>

A promise usado para executar os callbacks quando o temporizador for finalizado. Você pode usá-lo com outras promises e [métodos `Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) para criar um complexo encadeamento assíncrono.

### CtTimer.resolve ⇒ <code>Function</code>

Aciona de forma instantânea a promise chamando o seu callback.

### CtTimer.reject ⇒ <code>Function</code>

Para o temporizador rejeitando a sua promise interno.

### CtTimer.rejected ⇒ <code>Boolean</code>

Se `true`, significa que o temporizador foi rejeitado.

### CtTimer.done ⇒ <code>Boolean</code>

Se `true`, significa que o temporizador foi resolvido.

### CtTimer.settled ⇒ <code>Boolean</code>

Se `true`, indica que o temporizador foi rejeitado ou resolvido.

## Métodos do temporizador

### CtTimer.then ⇒ <code>void</code>

Um espelho para `CtTimer.promise.then()`.

Anexa o callbacks para a resolução e/ou rejeição da Promise interna.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| onfulfilled | <code>Any</code> | O callback a ser executado quando a Promise é resolvida. |
| [onrejected] | <code>Any</code> | O callback a ser executado quando a Promise é rejeitada. |

### CtTimer.catch ⇒ <code>void</code>

Um espelho para `CtTimer.promise.catch()`.

Anexa o callbacks para a rejeição da Promise interna.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| onfulfilled | <code>Any</code> | O callback a ser executado quando a Promise é resolvida. |
| [onrejected] | <code>Any</code> | O callback a ser executado quando a Promise é rejeitada. |