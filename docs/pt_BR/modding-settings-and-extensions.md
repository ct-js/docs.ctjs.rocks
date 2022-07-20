# Adicionando definições ao seu catmod e novos campos para assets

Adicionar novos campos permite que os usuários configurem seus módulos de dentro do ct.IDE, na aba 'Settings' do seu módulo. Você pode ter qualquer número de campos e usá-los dentro de seu código principal ou injeções. Além disso, quaisquer campos de extensão definidos para templates e outros assets estarão disponíveis durante o jogo em eventos e injeções. Isso adiciona flexibilidade para você e seus usuários.

## Adicionando definições

Atualmente, as definições são mostradas em cada painelo do módulo, na aba "Settings". Ele pode parecer com isso:

![ct.place settings as an example of moddable settings sections in ct.js](../images/catmodsSettingsExample.png)

As definições são definidas no arquivo `module.json`, sob a chave `fields`, e são um array de objetoss, cada objeto sendo um campo ou elemento gráfico.

Aqui está como a tela acima foi implementada:

```json Exemplo do módulo padrão ct.place
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

Na verdade, existem mais tipos de entrada; todas elas, assim como as descrições de outras chaves, podem ser encontradas na página [Declarações de campos](./modding-fields-declaration.html).

Os valores das definições são usados para modelagem em seu index.js e injeções. Injeções permitem que você ponha o seu código em eventos específicos do ct.js. Mais sobre eles e modelagem [aqui](./modding-events-and-injections.html).

## Adicionando extensões para assets incorporados

Você pode definir campos adicionais que estarão disponíveis nos editores de assets. Atualmente, você pode definir esses campos para templates, rooms, copies e tile layers. Aqui é onde esses campos são colocados no editor de template:

![](../images/modsFields.png)

E é assim que você os define dentro do `module.json`:

```json
{
    "main": {
        /*...*/
    },
    "typeExtends": [{
        "name": "Field name in the UI",
        "type": "text",
        "key": "varName"
    }]
}
```

Atualmente temos duas chaves onde você pode definir novos campos:

* `templateExtends`, para templates (aplicado diretamente às copies);
* `tileLayerExtends` para tile layers (escrito no campo `layer.extends`);
* `copyExtends` para copies individuais (aplicado diretamente às copies; <badge>novo em v1.4.2</badge>
* `roomExtends` para os seus levels (aplicado diretamente às rooms).

Desde v1.4, extensões suportam todos os campos que são suportados pelas injeções. Veja a página [Declarações de campos](modding-fields-declaration.html) para maiores informações.

Com `templateExtends`, os campos definidos estarão disponíveis no objeto `this.extends` para evitar a substituição de campos (e há muitos deles). Por exemplo, se você tem um campo com uma chave `tag`, então você será capaz de ler o seu valor com `this.extends.tag`. Muitas das vezes, você precisará de [injeções](./modding-events-and-injections.html) para poder usar esses campos, embora não necessariamente.

Com `tileLayerExtends`, os parâmetros são aplicados diretamente para um tile layer. Você pode obter uma lista de todos os tile layers `ct.templates.list['TILELAYER']`.