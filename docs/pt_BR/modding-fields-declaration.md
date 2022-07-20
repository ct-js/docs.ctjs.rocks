# Referência de campos para a definição de módulos e campos adicionais

Tanto a [definição de módulo](./modding-settings-and-extensions.html) quanto as extensões para templates integrados são implementadas através da escrita de uma declaração de campos editáveis em `module.json`. Uma declaração é um array de objetos, com cada objeto sendo um campo editável. Vamos olhar o módulo `ct.place` e o seu módulo `module.json` (veja o array de `fields`):

```json
{
    "main": {
        "name": "ct.place",
        "version": "3.1.0",
        "authors": [{
            "name": "Cosmo Myzrail Gorynych",
            "mail": "admin@nersta.ru"
        }]
    },
    "fields": [{
        "name": "Partitioning",
        "type": "h2"
    }, {
        "name": "Grid size X",
        "help": "Tells ct.place how to spacially group copies. This should be at least as large as the horizontal side of the biggest colliding sprite of your game.",
        "key": "gridX",
        "default": 512,
        "type": "number"
    }, {
        "name": "Grid size Y",
        "help": "Tells ct.place how to spacially group copies. This should be at least as large as the vertical size of the biggest colliding sprite of your game.",
        "key": "gridY",
        "default": 512,
        "type": "number"
    }, {
        "name": "Debug mode",
        "type": "h2"
    }, {
        "name": "Enable",
        "help": "Displays collision shapes, collision groups and partitions. It will also write additional keys to most colliding objects. Doesn't work on hidden objects.",
        "key": "debugMode",
        "default": false,
        "type": "checkbox"
    }, {
        "name": "Debug text size",
        "key": "debugText",
        "default": 16,
        "type": "number"
    }]
    /* ... */
}
```

Então um campo é um objeto com essa interface:

```ts
declare interface IExtensionField {
    name: string, // O nome exibido.
    type: string, // O tipo do campo
    key?: string, // O nome de uma chave JSON a ser escrita em`opts.entity`. Não é necessário para os tipos hN, como por exemplo, h1, h2, h3 e por aí vai, mas caso contrário é obrigatório
    default?: any, // O valor padrão; não é escrito para o `opts.entity`, mas é mostrado nas entradas.
    help?: string, // Uma descrição sobre o propósito do campo
    options?: Array<{ // Usado com type === 'radio' e type === 'select'.
        value: any,
        name: string,
        help?: string
    }>,
    if?: string, // Diz para mostrar este campo apenas se um outro campo neste módulo estiver definido (ou true-ish)
    fields?: Array<IExtensionField>, // São para type === 'table'
    arrayType?: string, // O tipo de campo usado para o editor de array (quando `type` é um 'array').
                        // Ele suporta um subconjunto de campos midfificáveis,
                        // excluindo headers, groups, tables, icons, radio, select, and arrays.
    // Esses três são usados com type === 'number', 'slider', ou 'sliderAndNumber'
    min?: number,
    max?: number,
    step?: number
    // Esses são usados com type === 'group'
    openedByDefault: boolean,
    lsKey: string,
    items: Array<IExtensionField>
}
```

Aqui nós marcamos um campo opcional na forma de `key?: type`. Os campos obrigatórios são `name` e `type`. O primeiro é um rótulo de texto que é mostrado antes de um campo de entrada; o último é uma string que define o método de entrada exibida para um usuário. It can be one of these strings:

* `input` — uma entrada de texto simples para strings curtas;
* `textfield` — uma grande área de texto para uma entrada longa;
* `code` — semelhante ao `textfield`, mas com uma fonte monospace e normalmente mais larga que `textfield`;
* `number` — um campo de entrada para inteiros;
* `slider` — um slider (também conhecido como range) para campos de entrada que são melhores inseridas com o mouse;
* `sliderAndNumber` — mostra um slider e um número em uma linha;
* `checkbox` — um checkbox para variáveis deslizantes;
* `radio` — uma lista de valores predefinidos para escolha. Esse tipo também requer que um array de `options` seja definido;
* `select` — um dropdown (lista suspensa) com uma lista de valores predefinidos. Requer que um array de `options` seja definido. Se qualquer opção tem um valor igual à `''` (uma string vazia), então essa opção ficará em branco e não será selecionável, atuando com um separador;
* `texture`, `template`, `room`, `sound`, `tandem` — um link para um asset em um projeto;
* `point2D` — mostra um par de entradas numéricas com os rótulos X e Y. Armazena os valores como um array de dois números;
* `h1`, `h2`, `h3` and `h4`. Eles realmente não são para qualquer entrada, mas exibem um cabeçalho para categorizar campos na aba catmod's settings. Esses campos requerem apenas `type` e `name`;
* `array` — série editável de valores simples. Requer que `arrayType` seja definido;
* `table` — série editável de objetos complexos em forma de tabela. Requer que `fields` seja definido.

Para configurações, a `key` do campo deve ser única para um módulo. Para campos estendidos de templates e outros assets, ele deve ser único em toda a base de código do usuário, então, nomear uma chave na forma de `mymodMyfieldname` é uma boa ideia.

## Ajustes adicionais para entrandas numéricas e de range (intervalo)

`number`, `slider`, `sliderAndNumber` são tipos de entrada que aceitam campos adicionais para definir restrições na entrada:

* `min` — o valor mínimo permitido;
* `max` — o valor máximo permitido;
* `step` — o tamanho do passo para as entradas numéricas e de slider. Os usuários ainda podem inserir valores arbitrários nos campos de entrada numérica.

## Adicionando entradas de radio

Você pode apresentar várias opções de entrada para os seus usuários em um grupo e permitir que ele escolha apenas uma. Isso pode ser feito com o tipo de entrada `radio` e requer um array de `options` que descreve os valores possíveis e os seus rótulos:

```json
{
    "main": {
        ...
    },
    "fields": [{
        "name": "List name",
        "type": "radio",
        "key": "variable",
        "id": "variable",
        "default": "value1",
        "options": [{
            "value": "value1",
            "name": "First value",
            "help": "A little hint that will go right after the first variant"
        }, {
            "value": "value2",
            "name": "Second value",
            "help": "A little hint that will go right after the second variant"
        }, {
            ...
        }]
    }]
}
```

## Tabelas

As tabelas permitem que os usuários descrevam um array de entidades de uma estrutura específica. Os usuários podem adicionar/remover linhas e reorderná-las. A tabelas aninhadas são suportadas, embora a aparência seja terrível.

![](../images/catmodsTable.png)

Um campo de tabela é definido simplesmente definindo o tipo de campo para `table`. Esses campos são descritos em um array de `fields`, da mesma forma que você define campos para todo o módulo.

### Exemplo: Definições iniciais do catmod ct.splashscreen

```json{22,24-45}
{
    "main": {
        /* … */
    },
    /* Dois campos regulares vêm primeiro*/
    "fields": [{
        "name": "Slide duration, ms",
        "key": "slideDuration",
        "default": 3000,
        "type": "number",
        "min": 0
    }, {
        "name": "Transition duration, ms",
        "key": "transitionDuration",
        "default": 1000,
        "type": "number",
        "min": 0
    }, {
        "name": "Slides",
        "key": "slides",
        /* um campo com o "type": "table" define uma tabela de controle */
        "type": "table",
        "default": [],
        /* Os campos das tabelas são descritos aqui */
        "fields": [{
            "name": "Logo texture",
            "key": "texture@@texture",
            "default": -1,
            "type": "texture"
        }, {
            "name": "Effect",
            "key": "effect",
            "type": "select",
            "default": "none",
            "options": [{
                "value": "none",
                "name": "None"
            }, {
                "value": "zoomIn",
                "name": "Zoom in"
            }, {
                "value": "zoomOut",
                "name": "Zoom out"
            }]
        }]
    }]
}
```

### Valores padrão para as tabelas

Para a prṕria tabela, a chave `default` deve ser um array de elementos padrão nele. Cada elemento é um objeto com entradas `"key": "value"`. Você pode pôr um array vazio `[]` se você não precisa definir elementos padrão.

Para campos das tabelas, a chave `default` define os valores padrão para as linhas recém-adicionadas.

## Unwrapping UIDs de templates e texturas

Quando você dfine um campo com o tipo `texture` ou `template` e um usuário escolhe um asset para esse campo, um UID de recurso é armazenado. Para dizer ao ct.js para transformar esse UID em um nome de um asset específico, você deve adicionar o sufixo `@@assetType`, escrevendo o tipo correto de asset:

* `yourVarName@@template` para templates;
* `yourVarName@@texture` para texturas.

Valor exportado será então o nome de um asset, como é mostrado na e IDE e é normalmente usado no código.

Isso funciona para injeções e para extensões de assets. Para injeções, se você tem uma `key` na forma de `yourVarName@@assetType`, as correspondências com `/*%yourVarName%*/` ou `%yourVarName%` serão substituídas.

## Campos de grupos

Você pode criar um grupo recolhível de campos definido o parâmetro `type` de um campo para `group`. Isso ajuda a economizar espaço nos editores de tipo e de room ou simplesmente ocultar campos menos usados.

O tipo `group` requer três propriedades adicionais para serem definidas:

* `openedByDefault` — se ou não o painel deve ser aberto por padrão.
* `lsKey` — uma chave no armazenamento local para armazenar se um usuário deixou este grupo aberto ou não. Deve ser único, e é recomendado que contenha o nome do seu módulo para evitar colisões com outros módulos.
* `items` — o array de campos dentro de um grupo. Esses são os mesmos campos que você definiria fora.

### Exemplo: criando um campo regular e um grupo de campos para templates ct.js

```json
// ...
"templateExtends": [
    {
        "name": "Create a hoverboard",
        "type": "checkbox",
        "key": "createHoverboard",
        "default": false
    }, {
        "name": "Hoverboard properties",
        "type": "group",
        "openedByDefault": false,
        "lsKey": "hoverboards.advancedProperties",
        "items": [{
            "name": "Speed, mps",
            "type": "number",
            "key": "hoverboardSpeed",
            "default": 100
        }, {
            // Um outro campo pode ser definido aqui
        }, {
            // E qualquer quantidade de outros mais
        }]
    }
]
// ...
```