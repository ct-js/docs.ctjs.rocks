# ct.inputs, ct.actions

Esse módulo (`ct.inputs`) permite manipular [Ações](/actions.html). Você pode criar novas ações durante o jogo, modificando ou deletando as mesmas.

`ct.actions` armazena as ações existentes. Se você criou uma ação `Move`, Então ela estará disponível em `ct.actions.Move`. Cada uma delas é uma instância da classe JS `CtAction`.

Aqui está um exemplo genérico de como usar ações em seu jogo:

```js
/**
 * Move the copy around.
 * See Settings > Edit actions panel
 * and "Actions" in the docs.
 */
this.hspeed = 8 * ct.actions.MoveX.value; // Move by X axis
this.vspeed = 8 * ct.actions.MoveY.value; // Move by Y axis
if (ct.actions.Shoot.pressed) {
    ct.types.copy('Bullet', this.x, this.y);
}
```

## Métodos e propriedades das Ações

### ctAction.value ⇒ <code>Number</code>

Um valor escalar entre -1 e 1. 0(zero) indica que não existe uma entrada para o frame atual, por exemplo, todos os direcionais/alavanca do gamepad estão na posição inicial ou todos os botões foram liberados. Qaundo utilizado com teclado e mouse, os valores das ações se alternará entre 0, 1, e -1 (Se os multiplicadores foram usados). Os direcionais do Gamepad e outros manipuladores podem produzir outros valores.

### ctAction.pressed ⇒ <code>Boolean</code>
Retorna se a ação tornou-se ativa no frame atual, seja por um apertar de um botão ou por usar um escalar de entrada.

**Retorna**: <code>Boolean</code> – `true` por ser pressionado e `false` em caso contrário 

### ctAction.released ⇒ <code>Boolean</code>
Retorna se a ação tornou-se inativa no frame atual,seja por liberar todos os botões ou por resetar todos os escalares de entrada.

**Retorna**: <code>Boolean</code> – `true` por se liberado e `false` em caso contrário 

### ctAction.down ⇒ <code>Boolean</code>
Retorna se a ação está ativa, por exemplo, por um botão pressionado ou por um valor escalar de entrada usado atualmente

**Retorna**: <code>Boolean</code> – `true` por está ativo e `false` em caso contrário 

### ctAction.methodExists(code) ⇒ <code>Boolean</code>
Checa se a ação atual reage ao método de entrada fornecido.
Isso *não* verifica se esse método de entrada é suportado pelo ct.

**Retorna**: <code>Boolean</code> – `true` se ele existe, `false` em caso contrário.  

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| code | <code>String</code> | O código para procurar. |

### ctAction.addMethod(code, [multiplier]) ⇒ <code>void</code>
Adiciona um novo método de entrada a ser ouvido.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| code | <code>String</code> | O código do método de entrada a ser ouvido. Deve ser único por ação. |
| [multiplier] | <code>Number</code> | Um multiplicador opcional, por exemplo, para mudar o seu valor. Frequentemente usado com 2 botões para combiná-los em um valor escalar de entrada idêntico aos do joysticks |

### ctAction.removeMethod(code) ⇒ <code>void</code>
Remove o método de entrada provido por uma ação.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| code | <code>String</code> | O método de entrada a ser removido. |

### ctAction.setMultiplier(code, multiplier) ⇒ <code>void</code>
Muda o multiplicador para um método de entrada com o código fornecido.
Esse método produzirá um alerta se estiver tentando alterar um método de entrada que não esteja sendo ouvido por essa ação.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| code | <code>String</code> | O código do método de entrada a ser alterado |
| multiplier | <code>Number</code> | O valor novo |

### ctAction.update() ⇒ <code>Number</code>
Recalcula o valor digital de uma ação.

**Retorna**: <code>Number</code> – Um valor escalar entre -1 e 1.

## Criando e removendo novas ações programaticamente

### ct.inputs.addAction(name, methods) ⇒ <code>CtAction</code>

Adiciona uma nova ação e a coloca dentro de `ct.actions`.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
name|String|O nome da ação, da forma que ela será usada em `ct.actions`.
methods|Array\<Object\>|Uma lista dos métodos de entrada. Essa lista pode ser alterada depois.

**Retorna:** `CtAction` – A ação criada

**Exemplo:**

```js
ct.inputs.addAction('Move', [{
    code: 'keyboard.ArrowLeft',
    multiplier: -1
}, {
    code: 'keyboard.ArrowRight'
}, {
    code: 'keyboard.KeyA',
    multiplier: -1
}, {
    code: 'keyboard.KeyD'
}]);
```

### ct.inputs.removeAction(name, methods) ⇒ <code>void</code>

Remove uma ação a partir do nome fornecido.


| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
name|String|O nome de uma ação

**Retorna:** `void` 

## Criando novas ações sem adicioná-la ao ct.actions

### new CtAction(name)
Cria uma nova ct action.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| name | <code>String</code> | O nome da nova ação. |

