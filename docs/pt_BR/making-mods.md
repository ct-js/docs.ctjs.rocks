# Criando os seus próprios módulos

Qualquer módulo é um diretório com a seguinte estrutura:

* `includes`
  * (arquivos a serem copiados para o jogo)
* `injects`
  * (injeções vão aqui)
* `CHANGELOG.md`
* `DOCS.md`
* `index.js`
* `LICENSE` (arquivo de texto puro, altamente recomendado)
* `module.json` (obrigatório)
* `README.md` (altamente recomendado que seja incluso)

`index.js` usualmente representa o código principal do seu módulo e é disponibilizado junto com o código compilado do seu jogo. Uma regra prática é sempre empacotar todas as suas dependências em um único arquivo, caso a sua dependência seja um outro módulo ct, então que ela seja explicitada no README.md.

`module.json` permite que o seu módulo seja descoberto pelo ct.IDE, e contém informações básicas, lista de autores e descrição das configurações do módulo.

`README.md` é um arquivo markdown com informações gerais, exemplos, notas especiais, etc. Ela é exibida na aba 'Info' da seção módulos do ct.IDE.

`DOCS.md` é exibido na aba 'Documentation' na seção de módulos do ct.IDE e no arquivo markdown também.

`CHANGELOG.md` deve conter o histórico de alterações, se houver alguma.

## Estrutura do `module.json`

`module.json` é o único arquivo obrigatório para os seus módulos. Ele tem o seguinte formato:

```json
{
    "main": {
        "name": "Module's name",
        "version": "1.0.0",
        "authors": [{
            "name": "Cosmo Myzrail Gorynych",
            "mail": "admin@nersta.ru"
        }, {
            ...
        }]
    },
    "fields": [{
        "name": "Field's name",
        "key": "field",
        "id": "field",
        "desc": "Field's description",
        "default": "default value",
        "type": "text"
    }, {
        ...
    }],
    "typeExtends": [{
        "name": "Field's name",
        "type": "text",
        "default": "default value",
        "key": "ctype"
    }]
}
```

## Adicionando injeções

Injeções é um poderoso instrumento para estender as funcionalidades doframework ct.js, além de permitir adição de métodos ou propriedades. Isso permite que você adicione lógica ao game loop, carregar recursos, criar Tipos embutidos, etc. 

A pasta `injects` contém os arquivos com os códigos que devem ser injetados durante a exportação do jogo. Todas eles são opcionais, e aqui vai uma lista de todas as injeções possíveis:

**Eventos gerais**:

* `load.js` – disparado apenas uma vez quando o código do jogo foi carregado, mas nada ainda aconteceu, por exemplo, nenhum recurso foi carregado;
* `start.js` – disparado apenas uma vez quando todos os recursos do jogo foram carregados. Nenhuma lógica foi executada ainda.
* `switch.js` – disparado a cada momento que uma room é alternada, mas antes de qualquer outro código. Aqui uma variável `room` é o nome da nova room.

**Eventos específicos para Room**:

* `roomoncreate.js` – disparado depois de entrar em uma nova room. Esse código é avaliado *depois* do código OnCreate definido pelo usuário, quando todas as copies foram criadas. Aqui, `this` é igual a nova room.
* `roomonleave.js` – disparado antes de sair da room, mas *antes* de qualquer script do usuário. Copies ainda existem aqui.
* `beforeroomdraw.js`
* `afterroomdraw.js` 
* `beforeroomstep.js`
* `afterroomstep.js`

**Eventos específico para Copy**:

* `oncreate.js` – aplicado a Copy recém-criada logo após a invocação do seu próprio evento OnCreate.
* `ondestroy.js` – Aplicado a Copy antes dela ser deletada. Esse método é invocado *antes* do evento OnDestroy da Copy.
* `beforedraw.js`
* `beforestep.js`
* `afterdraw.js`
* `afterstep.js`

**Utilitários e modelagem**:

* `css.css` – injeta o CSS dentro do jogo exportado.
* `res.js` – invocado apenas uma vez durante o parsing das imagens carregadas.
* `resload.txt` – uma lista de imagens separadas por vírgula a serem carregadas. O início deve ser iniciado com vírgula também, como em `, 'img/ct.place.demoimg1.png', 'img/ct.place.demoimg2.png'`
* `types.js` – aqui você pode pôr os seus próprios Types.
* `styles.js` – aqui você pode pôr os seus próprios estilos de desenho. 
* `htmltop.html` – esse código é colocado antes do elemento canvas. 
* `htmlbottom.html` – esse código é colocado depois do elemento canvas.

### Adicionando campos

Adicionar campos permite que os usuários configure os seus módulos de dentro do ct.IDE, na aba 'Settings' do seu módulo. Você pode ter a quantidade de campos que você quiser e usá-los dentro do seu código principal ou injetar.

Os campos são descritos em `module.json`, e pode ser um desses tipos:

* `input` – um simples texto de entrada para strings curtas;
* `textfield` – uma área de texto grande para entradas longas;
* `number` – um campo de entrada para inteiros;
* `checkbox` – um checkbox para variáveis booleanas;
* `radio` – uma lista de valores predefinidos em que apenas um é escolhido.

O `id` do campo deve ser único para o módulo. Uma `key` determina qual parte do código deve ser substituída pelo valor do campo. Se você tem um campo com uma key `'enabled'`, então todas as correspondências com `/*%enabled%*/` ou `%enabled%` será substituída pelo valor do campo. Também pode ter um campo `help`, que será mostrado abaixo do campo de entrada e pode conter algumas dicas ou uma explicação detalhada do que o seu campo faz.

```json Exemplo padrão do módulo akatemplate
{
    "main": {
        "name": "Basic Template",
        "version": "1.0.0",
        "authors": [{
            "name": "Cosmo Myzrail Gorynych",
            "mail": "admin@nersta.ru"
        }]
    },
    "fields": [
        {
            "name": "HTML top",
            "key": "toptop",
            "id": "toptop",
            "default": " ",
            "type": "textfield"
        },
        {
            "name": "HTML bottom",
            "key": "botbot",
            "id": "botbot",
            "default": " ",
            "type": "textfield"
        },
        {
            "name": "CSS",
            "key": "csscss",
            "id": "csscss",
            "default": " ",
            "type": "textfield"
        }
    ]
}
```

#### Adicionando entradas de radio (exemplo)

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

## Adicionando extensões ao editor Types

Você pode definir campos adicionais que estarão disponíveis ao editor Types. Eles serão exibidos na coluna da esquerda:

![](./../images/modsFields.png)

É dessa forma que você os define no `module.json`:

```json
{
    "main": {
        ...
    },
    "typeExtends": [{
        "name": "Field name in the UI",
        "type": "text",
        "key": "varName"
    }]
}
```

Por hora, os valores suportados são:

* `text` que representa uma `String`;
* `number` que representa um `Number`;
* `checkbox` que representa um `Boolean`.

## Adicionando novos métodos

Desde a versão `v1.0.0-next-3` que o ct.js usa o sistema de ações para gerenciar entradas de mouse, teclado, gamepads e etc. Se você está fazendo um módulo com um novo método de entrada, você deve fazer algumas coisas:

### Forneça uma lista de sinais de entradas disponíveis (aka input methods)

Isso é para permitir que os usuários selecione o seus novos métodos de entrada no ct.IDE, através do editor Action. Para fazer isso, você deve adicionar uma nova entrada `inputMethods` ao seu `module.json`:

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

Depois, você deve escreve o seu módulo e atualizar o `ct.inputs.registry`. Ele é como um mapa de objetos com chaves igual ao nome do seu módulo + código de sinal, por exemplo, `keyboard.KeyW` ou `mouse.Left`, e o valor `Number` de `-1` até `1`. Aqui, `0` representa que não existe um sinal (por exemplo, um botão que não foi pressionado ou os direcionais/alavanca do gamepad que está na posição inicial). Controles analógicos usará a faixa de `(-1, 1)`, enquanto que os botões normalmente alternam entre `0` and `1`.

```js
ct.inputs.registry['keyboard.keyW'] = 1;
ct.inputs.registry['gamepad.LeftThumbX'] = 0.2;
```
