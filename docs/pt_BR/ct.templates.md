# ct.templates

Esse objeto nós permite criar e manipular novas Copies.

### `ct.templates.copy(template, x, y, exts)`

Criar uma nova Copy a partir de um template (modelo) fornecido. O `template` deve ser do tipo string — o nome do template. Se `x` ou `y` é omitido, então eles serão definidos com o valor 0. Retorna a nova copy criada.

Objeto `extensions` pode ser usado para adicionar parâmetros que estarão disponíveis no evento OnCreate da Copy.

::: tip Observação
Por padrão, esse método coloca a copy criada na room principal atual, (`ct.room`). Se você quer criar uma copy em, digamos, uma room de UI que esteja empilhada no topo da sua room principal, veja o método abaixo `ct.templates.copyIntoRoom`.
:::

#### Exemplo: Cria uma bala na posição atual da copy e a envia em uma direção específica

```js
var bullet = ct.templates.copy('Bullet', this.x, this.y);
bullet.direction = this.direction;
```

#### Exemplo: Criar uma nova copy sob o cursor ao clicar com o mouse

Você vai precisar de uma ação chamada `Press` que reage ao click do botão esquerdo do mouse. [Leia mais sobre as ações aqui](actions.html).

```js
if (ct.actions.Press.down) {
    ct.templates.copy('Fruit', ct.mouse.x, ct.mouse.y);
}
```

### `ct.templates.copyIntoRoom(template, x, y, parentRoom, extensions)`

Uma forma avançada de `ct.templates.copy` que coloca uma copy dentro de um `parentRoom` específico. Os outros parâmetros são iguais aos usados em `ct.templates.copy`.

#### Exemplo: Criar uma copy em uma room de camada de UI chamada de "UI_Layer" com parâmetros adicionais

```js
var uiLayer = ct.rooms.list['UI_Layer'][0];
if (uiLayer) {
    ct.templates.copy('UI_Message', 35, 65, uiLayer, {
        message: 'Os seus guerreiros enfrentaram o inimigo!',
        type: 'alert'
    });
}
```

### `ct.templates.each(func: Function)`

Aplicar uma função em todas as copies ativas.

#### Exemplo: destrói todas as copies dentro de um raio de 150px

```js
var me = this;
ct.templates.each(function () {
    if (this !== me) { // não estamos tentando destruir nós mesmos, né?
        if (ct.u.pdc(this.x, this.y, me.x, me.y) <= 150) {
            this.kill = true;
        }
    }
});
```

::: tip Dica
`ct.u.pdc` calcula a distância entres dois pontos. Esse e outras funções semelhantes podem ser encontradas [aqui](ct.u.html).
:::

### `ct.templates.exists(copy)` <badge>Novo na versão 1.3</badge>

Verifica se o parâmtero passado em uma copy que existe no mundo ct.js. Variáveis que retornam falso como `undefined` retornará `false`, assim como as copies destruídas; nas outras vezes, retronará `true`. Esse método também funciona com muitas das entidades PIXI, como por exemplo, `PIXI.Text` e `PIXI.Graphics`.

### `ct.templates.isCopy(obj)` <badge>Novo na versão 1.5</badge>
Verifica se o objeto passado como parâmetro é uma copy ct.js. Retorna `true` se o objeto passado como parâmetro é uma copy; caso contrário, retorna `false`.

### `ct.templates.list['TemplateName']`

Retorna um array com todas as copies existentes do template especificado.

#### Exemplo: determina a destruição de todas as Copies 'Bonus'

```js
for (var bonus of ct.templates.list['Bonus']) {
    bonus.kill = true;
}
```

Isso também pode ser escrito da seguinte forma:

```js
for (var bonus of ct.templates.list.Bonus) {
    bonus.kill = true;
}
```

### `ct.templates.withCopy(copy: Copy, func: Function)`

Funciona da mesma forma que `ct.templates.each`, exceto que é apenas para a Copy especificada.

### `ct.templates.withTemplate(template: string, func: Function)`

Funciona da mesma forma que `ct.templates.each`, exceto que a função é aplicada a cada copy do template especificado.
