---
sidebarDepth: 3
---

# Introdução ao JavaScript, parte III: Objetos e Arrays em pronfudidade

## Objetos

Tudo em JavaScript é um objeto! Exceto para `true`, `false`, simples números e strings, `null` e `undefined`. O que isso significa para você? Significa que muitas das coisas úteis em JS têm ✨*propriedades*✨ — as coisas que estávamos falamos na primeira parte desta introdução ao JavaScript.

Então, como você pode criar e armazenar um novo objeto? A sintaxe é simples: você cria uma lista de propriedades entre `{` essas chaves `}`, separando cada item por uma vírgula (`,`) e separando os nomes das propriedades e os valores com dois-pontos (`:`). Você ter visto estruturas assim em algum catmods, como o ct.tween:

```js
var myObject = {
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: NaN
};
```

Podemos ler as propriedades dos objetos com um acessador de ponto — aquele que provavelmente já viu em todos os lugares como em `myObject.name`.

Os objetos são transferidos entre variáveis e propriedades por referência, portanto, se você continuar o trecho de código anterior e tentar armazenar o mesmo em digamos uma copy, e então modificar o objeto original, `myObject`, você notará que essa mudança também será refletida para a referência que atribuímos para a copy. Porque como explicado anteriormente, os objetos são atribuídos as variáveis e propriedades por referência, o que significa que o objeto é o mesmo e apenas está sendo compartilhado pelas variáveis e propriedades! Veja o exemplo a seguir:

```js
this.weapon = myObject;

// Depois…

console.log(this.weapon.price); // É um NaN! Isso não é bom, vamos corrigir isso!
myObject.price = 777; // Note que não estamos usando a referência `this.weapon` aqui.
console.log(this.weapon.price); // Ele agora é 777. Show de Bola!
```

### Objetos aninhados

Você pode armazenar objetos dentro de outros objetos. Você pode usar referências para outros objetos nas propriedades do seu objeto ou você pode criar esse objetos diretamente sem a necessidade de criar uma referência:

```js
this.weapon = {
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: 777
};
this.helmet = {
    name: 'The helmet of system thinking',
    description: 'Allows you to get a whole picture',
    wit: 5,
    price: 100
};
this.gear = {
    hands: this.weapon,
    head: this.helmet,
    body: { // Aqui estamos criando um objeto diretamente sem usar uma referência!
        name: 'The chestplate of ignorance',
        description: 'Protects your mind from the outer world',
        wit: -100,
        mood: 5,
        price: 3
    }
};

console.log(this.gear.body.name); // Retornará a string 'The chestplate of ignorance'.
```

### Deletando as propriedades dos objetos completamente

Você pode escrever `this.enemy = undefined` e em muitos casos isso será o suficiente, mas se estiver [trabalhando com o armazenamento local](localstorage.html) ou outra forma de dados persistentes, ou ainda, se você fizer um loop sobre as propriedades de um objeto, você provavelmente precisará remover essa propriedade sem deixar rastros — caso ela ainda estará lá, mesmo que não tenha nenhum valor atribuído.

Você pode usar a palavra reservada `delete` para remover qualquer propriedade de um objeto:

```js
if (!ct.templates.isValid(this.enemy)) {
    delete this.enemy;
}
```

### Se strings e números são constantes, então por que podemos usar métodos neles?

Porque o JavaScript é esperto! Na verdade, existem objetos baseados em strings e números simples, e você pode criá-los com `new String('Divine sausage')`, `new Number(42)`, e até `new Boolean(true)`. Mas essas formas não são recomendadas, porque 99.99% das vezes você não precisa dessa funcionalidade. Mesmo ela sendo uma funcionalidade *bastante divertida*, a mesma está além do escopo dessa página de introdução.

O que você *precisa* é de todos os métodos que `Number` e `String` possuem; para formatar esses valores e manipular as strings. JavaScript fornece isso pra gente quando você escreve `'  oh no '.trim()` ou `(99.9).toFixed(2)`.

## Arrays

Arrays podem ser pensados como objetos com propriedades numéricas e ordenadas, com uma *tonelada* de funções auxiliares.
Declarar um array é diferente de declarar um objeto:

```js
var groceryList = ['potato', 'carrot', 'thyme'];
this.waveEnemyAmount = [10, 10, 15, 15, 20, 25];

console.log(groceryList[0]); // sairá no console 'potato'
console.log(groceryList[1]); // sairá no console 'carrot'
console.log(this.waveEnemyAmount); // será impresso todo o array no console
```

Note como os elementos do array são acessados: usamos um número entre colchetes, começando com `[0]` para obter o valor.

Você pode armazenar objetos complexos em arrays também:

```js
this.shopItems = [{
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: 777
}, {
    name: 'The helmet of system thinking',
    description: 'Allows you to get a whole picture',
    wit: 5,
    price: 100
}, {
    name: 'The chestplate of ignorance',
    description: 'Protects your mind from the outer world',
    wit: -100,
    mood: 5,
    price: 3
}];

console.log(this.shopItems[0].name); // Sairá no console 'The hammer of bug killing'
console.log(this.shopItems[2].price); // sairá no console `3`, o preço de "The chestplate of ignorance"
```

Aqui acessamos todo o objeto com `[0]`, `[1]`, `[2]` e etc, e então lemos as propriedades desse objeto anexando `.name` e `.price`. Tenha cuidado com essa sintaxe!

### Obtendo o tamanho do array

Os Arrays têm várias funções para agilizar o processamento de qualquer dado de jogo que você precise.

Primeiro, existe a propriedade `length`, a qual retorna o número de elementos do array.

Como podemos usá-la? Digamos que você queira limitar a quantidade de lixo no invetário do seu jogador:

```js
this.inventory = ['sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'apple'];
this.maxInventorySize = 10;
// depois…

if (this.inventory.length >= this.maxInventorySize) {
    return; // aborta a função ou evento atual
}
this.inventory.push('gold ingot'); // Adiciona um novo elemento
```

É uma pena que eles nunca receberão esse "gold ingot" (lingote de ouro ou barra de ouro).

### Adicionando novos elementos ao arrays

Existem três forma de adicionar elementos ao array:

```js
var pizza = ['tomato sauce'];

pizza.push('pepperoni'); // Essa adiciona um novo elemento no final do array
pizza.unshift('dough'); // Essa adicona o elemento no início do array
pizza.splice(2, 0, 'cheese'); // Essa adiciona o elemento depois de pizza[2]. Por enquanto ignore o parâmetro "0".

console.log(pizza); // A saída será um array dough, tomato sauce, cheese, e pepperoni. Hum 🍕
```

### Removendo elementos do array

Vamos devorar a nossa pizza!

```js
var pizza = ['dough', 'tomato sauce', 'cheese', 'pepperoni'];

pizza.pop('dough'); // Remove o último elemento do array
pizza.splice(1, 2); // Remove dois elementos, começando com pizza[1].
pizza.splice(0, 1, 'crust'); // Remove um elemento, começando com pizza[0] e substitui o mesmo por 'crust'.
pizza.shift(); // Remove o primeiro elemento do array

console.log(pizza); // A saída será um array vazio!
```

:::tip Mais de uma forma de array.splice
Você viu que `pizza.splice` foi usado de três forma diferentes: para adicionar, remover e substituir valores. Como esse método funciona?

O objetivo dele é o de modificar um array através da adição, substituição ou remoção de elementos. A sua forma completa é `.splice(startFromIndex, deleteCount, addOne, addTwo, addThree, …)`. Você pode remover vários elementos do array sem precisar adicionar ou você pode fazer o contrário, adicionar elementos sem remover:

* Quando você escreve `.splice(3, 0, 'sausage')`, você adiciona elementos sem remover, nesse exemplo, um novo elemento depois do terceiro elemento será adicionado.
* Quando você escreve `.splice(3, 1)`, você remove apenas um elemento, nesse exemplo, o elemento na posição `3`.
* Quando você escreve `.splice(3, 1, 'sausage')`, você substitui um elemento por outro, nesse exemplo, o elemento da posição `3` é substituído por `sausage`.
* Quando você escreve `.splice(3, 2)` você remove vários elementos de uma vez, nesse exemplo, os elementos da posição `3` e `4`.
:::

### Funções para pesquisar, filtra, ordenar e reduzir arrays

#### Filtrando com `array.filter`

`array.filter` é uma função útil que cria um novo array a partir do existente. Você passa uma função que fará o filtro como parâmetro, esse parâmetro é o que chamamos de "predicado", que é escrito por você.

Vamos pegar todas as feras neutras e amigáveis em nosso bestiário:

```js
var bestiary = [{
    name: 'Pig',
    aggressiveness: 'neutral'
}, {
    name: 'Cat',
    aggressiveness: 'friendly'
}, {
    name: 'Wolf',
    aggressiveness: 'hostile'
}, {
    name: 'Bear',
    aggressiveness: 'hostile'
}, {
    name: 'Magic pony',
    aggressiveness: 'neutral'
}];

var neutralAnimals = bestiary.filter(beast => {
    if (beast.aggressiveness === 'hostile') {
        return false;
    }
    return true; // Será executada apenas se a instrução anterior não for,
                 // porque `return` para a execução da função.
});
console.log(neutralAnimals);
```

Cada fera que retorna `false` não será incluída no array `neutralAnimals`. Assim, aquelas que retornarem `true` serão.

Vamos ver um novo exemplo: obtendo a lista de armas que um héroi pode comprar atualmente:

```js
this.money = 1230;
var shop = [{
    name: 'The Art of the Realm of Constants',
    price: 130,
    type: 'book'
}, {
    name: 'The hammer of bug killing',
    price: 100500,
    type: 'weapon'
}, {
    name: 'A rusty axe of intoxication',
    price: 853,
    type: 'weapon'
}, {
    name: 'A scroll of lightning',
    price: 167,
    type: 'book'
}];
// pulando tanto `return` como as chaves — essa é uma sintaxe curta, o resultado será retornado automaticamente!
var purchaseable = shop.filter(item => item.price <= this.money);
var purchaseableWeapon = purchaseable.filter(item => item.type === 'weapon');
console.log(purchaseableWeapon);
```

:::tip Dica
Para saber mais sobre a sintaxe curta, você pode acessar a documentação que aborda o conceito de arrow functions [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
:::

#### O método `sort` do array

O método `array.sort` pode ser utilizado do jeito que está, pois ele nos oferece uma ordenação natural, tanto para números como para strings:

```js
var groceryList = [
    'potato',
    'carrot',
    'salad',
    'sausages'
];
groceryList.sort();
console.log(groceryList); // potato e carrots serão trocados
```

Você pode notar que diferente dos outros métodos semelhantes, a ordenação não cria uma novo array, em vez disso, ele modifica o array existente.

Você pode também pode fazer uma ordenação não natural, passando um predicado que retornará como os objetos serão comparados entre si. Vamos usar a lista da loja acima e ordenar os elementos pelo preço de forma crescente:

```js
var shop = [{
    name: 'The Art of the Realm of Constants',
    price: 130,
    type: 'book'
}, {
    name: 'The hammer of bug killing',
    price: 100500,
    type: 'weapon'
}, {
    name: 'A rusty axe of intoxication',
    price: 853,
    type: 'weapon'
}, {
    name: 'A scroll of lightning',
    price: 167,
    type: 'book'
}];

shop.sort((a, b) => {
    return a.price - b.price;
});
```

Aqui pegamos dois itens e retornamos a difrença entre eles, o primeiro é o (`a`) e o segundo é o (`b`). Se o resultado dessa diferença é um número negativo, então o primeiro elemento está antes do segundo na ordenação, agora se o resultado for um número positivo, então isso significa que o primeiro elemento é depois do segundo na ordenação, mas se o valor resultante for zero, então eles estão no mesmo nível e pouco importante quem vem antes ou depois.

:::tip Dica
Você precisa chamar o método `sort` apenas uma vez por ordenação — já que o JavaScript continuará a ordenação até que o array esteja estável. Mas note que se você alterar o array adicionando um elemento não ordenado, você terá que chamar o `sort` novamente. Para saber mais sobre o método `sort`, acesse a documentação dele [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
:::

#### Métodos para encontrar e testar elementos do array

Existem muitas formas de encontrar um elemento em um array!

##### Determinando se um elemento está dentro do array com `array.includes`

`array.includes(value)` é uma verificação muito simples quando você precisa apenas saber se um elemento está presente no array atual. Ele retorna um valor booleano, (`true` or `false`).

```js
var buffs = ['vigor', 'rested', 'rage'];
// Adiciona um novo elemento ao array apenas se o mesmo não estiver presente
if (!buffs.includes('blessed')) {
    buffs.push('blessed');
}
```

:::tip Dica
Para saber mais sobre o método `includes`, veja a documentação dele [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).
:::

##### Verificando se algum elemento no array satisfaz uma condição com `array.some`

Essa função testa se pelo menos um dos elementos satisfaz a sua condição. Ela aceita um predicado que será testado sobre cada elemento e retornará `true` apenas se pelo menos um deles passar no teste do predicado retornando `true`.

```js
this.gear = [{
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    enchantment: 'blessed'
}, {
    name: 'The helmet of system thinking',
    description: 'Allows you to get a whole picture',
    wit: 5,
    enchantment: 'none'
}, {
    name: 'The chestplate of ignorance',
    description: 'Protects your mind from the outer world',
    wit: -100,
    mood: 5,
    enchantment: 'cursed'
}];

// Adiciona em debuff apenas se um dos elementos é cursed
if (this.gear.some(item => item.enchantment === 'cursed')) {
    this.debuffs.push('cursed');
}
```

:::tip Dica
Para saber mais sobre o método `some`, acesse a sua documentação [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
:::

#### Obtenha um elemento que satisfaça uma condição com os métodos `array.find`, `array.findIndex`

Elas são semelhantes ao método `array.some`, mas diferente de `array.some` que retorna um valor booleano, array.find retornará o primeiro elemento que satisfizer a condição passada pelo predicado, em caso de falha, será retornado `undefined`, já `array.findIndex` retornará a posição do elemento que satisfizer a condição definida pelo predicado, caso não seja satisfeita, então `-1` será restornando, indicando que nenhum elemento foi encotrado.

```js
this.gear = [{
    name: 'The hammer of bug killing',
    type: 'weapon'
}, {
    name: 'The helmet of system thinking',
    type: 'head'
}, {
    name: 'The chestplate of ignorance',
    type: 'torso'
}];
// Procura no array gear pelo objeto em que o valor da sua propriedade type seja igual a string "weapon" e guarda esse objeto na variável weapon.
var weapon = this.gear.find(item => item.type === 'weapon');
this.damage = weapon.damage;

// Remove ohelmet
var helmetIndex = this.gear.findIndex(item => item.type === 'head');
if (helmetIndex !== -1) { // Temos que ter certeza que encontramos um helmet
    this.gear.splice(helmetIndex, 1);
}
```

:::tip Dica
Para maiores informações sobre os métodos `find` e `findIndex`, você pode consultar a documentção deles [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find) e [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex), respectivamente.
:::

##### Encontre a posição de um elemento conhecido em um array com `array.indexOf`

Semelhante ao `array.findIndex`, `array.indexOf` retornará a posição do elemento especificado em um array. É útil quando você armazena números ou string em um array, ou se você tem uma referência do objeto que você procura.

```js
var groceryList = [
    'potato',
    'carrot',
    'cucumber',
    'banana',
    'cherry'
];
var carrotIndex = array.indexOf('carrot');
if (carrotIndex !== -1) { // Temos que ter a certeza que encontramos um item
    groceryList.splice(carrotIndex, 1);
}
```
:::tip Dica
A documentação para `indexOf` pode ser consultada [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).
:::

#### Método `reduce` do array

O método `array.reduce` percorre cada elemento de um array, executando o seu predicado passado como parâmetro, e passa o resultado desse predicado para a próxima chamada. Normalmente ela é utilizada para rapidamente coletar diferentes estatísticas de um array, e escrevendo diferentes predicados, você pode calcular diferentes valores estatísticos.

Digamos que você escreva um jogo de tower defense e que você tem um chefão final na última onda. Você quer calcular o tempo antes que o chefão apareça e, para isso, quer somar todos os atrasos das ondas.

Considerando a estrutura a seguir, podemos fazer uso do método `.reduce` do array para somar todos os atrasos:

```js
var waves = [{
    delay: 30,
    monsters: [{
        template: 'Monster_Flyer',
        health: 10,
        amount: 10
    }]
}, {
    delay: 10,
    monsters: [{
        template: 'Monster_Flyer',
        health: 15,
        amount: 12
    }]
}, {
    delay: 12,
    monsters: [{
        template: 'Monster_Flyer',
        health: 15,
        amount: 20
    }, {
        template: 'Monster_Tank',
        health: 15,
        amount: 20
    }]
}, {
    delay: 20,
    monsters: [{
        template: 'Monster_Boss',
        health: 1000,
        amount: 1
    }]
}];

var timeTillBoss = waves.reduce((currentSum, wave) => {
    return currentSum + wave.delay
}, 0); // O valor 0, zero, representa o valor inicial.
```

Agora vamos usar o mesmo array para obter a quantidade total de inimigos na onda, pelo tipo deles. Este será um exemplo mais difícil, porque precisamos de um array de monstros dentro do nosso array principal:

```js
var monstersInTheLevel = waves.reduce((currentStats, wave) => {
    for (const monsterGroup of wave.monsters) {
        // Inicializa um grupo de monstros se ele ainda tiver sido feito pelo objeto de estatísticas
        if (!currentStats[monsterGroup.template]) {
            currentStats[monsterGroup.template] = 0;
        }
        currentStats[monsterGroup.template] += monsterGroup.amount;
    }
}, {}); // O valor inicial é um objeto vazio
```

Foi fácil de entender? talvez. Poderia ser feito com os loops regulares? Sem dúvida. Entretanto, se você tiver diferentes arrays que precisam ser processados em, seria difícil escrever loops para cada um deles. Com `.reduce`, `.forEach`, `.filter`, `.find`, você guardar o seu predicado em variável ou propriedade e usá-la muitas vezes quando necessário, deixando assim, o seu código mais limpo.

:::tip Dica
Você pode consultar a documentação sobre o `reduce` [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
:::

### JavaScript e o conhecimento relacionado ao lado medonho do array 🕸🕷

#### Arrays de duas dimensões

Em JavaScript, os arrays do jeito que está é apenas de uma dimensão: podemos dizer então que ele é apenas uma lista. Mas se você então criar uma de lista de outra lista, teremos então um array de duas dimensões semelhante aos encontrados em outras lingaugens, como em Java por exemplo!

```js
var myMap = [
    [1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1],
    [2, 0, 1, 1, 1],
    [1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0],
];
```

Você pode então obter um com `myMap[2][0]`. (Esse exemplo retornaria `2` — o elemento localizado na segunda linha da coluna 0.)

:::tip Dica
Lembre-se que em JavaScript assim como em outras linguagens, a primeira posição do array é o índice de número `0` (zero). Você pode aprender mais sobre arrays [aqui](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/Arrays).
:::

#### Acessador especial no estilo array para as propriedades dos objetos

Você lembra que quase tudo em JavaScript é um objeto? E que arrays também são? Por que você acha que os arrays têm uma sintaxe especial para acessar os seus elementos?

Porque na verdade isso não é uma exclusividade dos arrays! Cada objeto pode ter as suas propriedades lidas, excluídas e alteradas com um acessador de prorpiedade no estilo array:

```js
var myObject = {
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: NaN
};
myObject['price'] = 1000;
```

Qualquer valor que pode ser convertido para strings pode ser utilizada como um acessador:

```js
// Esse é um exemplo estranho, mas e se fosse assim a forma que você apresenta uma barra de habilidades personalizável em um ARPG?
var abilities = {
    '0': 'Moon strike',
    '1': 'Slashing leap',
    '5': 'Mend'
};
// Reposiciona a habilidade:
var ability = abilities[1];
delete abilities[1];
abilities[2] = ability;
```

E o melhor de tudo, o acessador não precisa ser estático! Você pode calcular valores concatenando strings ou fazendo outras coisas mágicas:

```js
this.stats = {
    resistanceFire: 5,
    resistanceIce: 0
};
this.armor = {
    name: 'The Robe of Chill',
    resistanceType: 'Ice',
    resistanceBoost: 15
};
// `'resistance' + this.armor.resistanceType` é 'resistanceIce',
// Então a propriedade this.stats.resistanceIce será alterada.
this.stats['resistance' + this.armor.resistanceType] += this.armor.resistanceBoost;
```

#### Um caso especial: strings são… arrays?!

As strings têm uma prorpiedade `.length`, a qual retorna o tamanho da string, dããããã. Elas também podem retornar os caracteres em uma posição específica se você tentar usar um acessador no estilo array:

```js
var string = 'Hello ct.js!';
console.log(string.length); // Retronará 12
console.log(string[1]) // Retornará 'e'
```

Mas as strings não têm todos esses métodos legais e inteligentes como `.forEach`, `.map`, ou `.filter`. Na verdade ela tem os [seus próprios métodos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods) para simplificar a transformação de strings, como `.trim()`, `.search`, `.replace`, [e outros](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods), além disso, as strings também têm o seu próprio método `.slice`. Não que você precise tratar as suas strings como arrays reais, mas se você *realmente* precisar, você pode usar `Array.from(yourString)` para criar um novo array que tenha os caracteres da string como elementos do array.

## Conclucsão

Objetos e arrays são recursos poderosos — eles são principalmente uma estrutura em que cabem tudo o que você coloca neles. Sabendo como manipulá-los eficientemente, permitirá que você escreva códigos de forma rápida e fácil. Mas não se preocupe se você não conseguir lembrar tudo agora — a perfeição vem com a prática, e a prática precisa de tempo. Não como se eu usasse todos os métodos uma vez por mês, he-he.

Boa codificação!  
CoMiGo
