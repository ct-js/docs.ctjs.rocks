# Adcionando novos métodos de entrada ao ct.js

Desde `v1.0.0-next-3`, o ct.js agora usa um sistema de Ações para gerenciar entradas de mouse, teclado, gamepads e etc. Se você está criando um módulo com um novo método de entrada, você deve fazer algumas coisa.

## 1. Forneça uma lista de sinais de entrada disponíveis (conhecido como "input methods")

Com esta lista, os usuários poderão selecionar seus novos métodos de entrada no ct.IDE, com o editor de Ações. Para isso, você deve adicionar uma nova entrada `inputMethods` para o seu `module.json`:

```json
{
    "main": {
        "name": "A catmod for a new input method",
        "version": "0.0.0",
        "authors": [{/*...*/}]
    },
    "inputMethods": {
        "Code1": "The name of the first button, axis, etc.",
        "Code2": "The name of the second button, axis, etc.",
        "Code3": "The name of the third button, axis, etc."
    }
}
```

## 2. Escreva um código que atualize o `ct.inputs.registry`

Depois, você deve escrever o seu módulo para que atualize o `ct.inputs.registry`. É um objeto semelhante a um mapa com chaves iguais ao nome do seu módulo + código do sinal e valores numéricos de `-1` a `1`.

Aqui, `0` significa que não tem sinal (por exemplo, um botão não foi pressionado ou o direcional do gamepad está na sua posição de repouso). Os analógicos usarão o intervalo completo `(-1, 1)`, enquanto que os botões normalmente alternam entre `0` e `1`.

```js
ct.inputs.registry['keyboard.keyW'] = 1;
ct.inputs.registry['gamepad.LeftThumbX'] = 0.2;
```

Dependendo do método de entrada que esteja implementando e da sua API nativa, você pode precisar verfificá-los a cada frame com [injeções](./modding-events-and-injections.html), ou monitorar os seus eventos.

## Exemplos

Não existe um exemplo genérico para novos métodos de entrada, então você pode estudar os módulos `mouse`, `keyboard`, `gamepad` e `vkeys` na pasta `ct.js/data/ct.libs` — cada um deles resolvem as suas tarefas de formas diferentes.