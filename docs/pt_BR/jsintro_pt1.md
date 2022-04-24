# Introdução ao JavaScript, parte I: Variáveis, Propriedades, Operações

JavaScript é uma ótima linguagem de programação para websites, games, apps como ct.js e até mesmo para robôs! Ela é muito fácil de aprender e é similar a outras linguagens de programação como C#, C++ ou Java.

Jogos em ct.js são totalmente escritos em JavaScript. Você define a lógica para as suas Copies e Rooms além de escrever extensões com ela. Aqui nós ensinaremos os conceitos básicos da linguagem.

## Variáveis

Variáveis são como gavetas, assim como a gaveta de suas meias. Dentro dessas gavetas você pode armazenar qualquer informação, por exemplo, número de vidas, recursos ou experiência, um nome de um NPC (non-player character) e etc. 

Variáveis também podem conter estrutura de dados mais complexa, como uma lista de inventários ou uma lista de cartas de baralho.

Você pode *declarar* novas variáveis com as palavras reservadas `var`, `let` e `const` e *assinar valores para elas* com um sinal de igualdade: 

```js
var maxHealth;
maxHealth = 100;
var health;
health = maxHealth; // Você pode copiar o valor da variável (maxHealth) para a variável (health)

var mana, maxMana; // Você pode fazer múltiplas declarações com o uso de apenas uma única palavra reservada 'var'
maxMana = mana = 100; //  Você também pode atribuir um valor (100) para múltiplas variáveis de uma vez

var name;
name = 'ct.js'; // Valores de texto ou String, são colocados entre aspas

var title = 'The Almighty Cat'; // Você pode combinar o processo de declaração e atribuição em uma única instrução

var invincible = true, // Esses são valores booleanos
    stunned = false,
    bleed = false; // Você pode combinar múltiplas declarações e atribuições com o uso da vírgula!
```

O processo de *Declaração* diz ao ct.js que nós queremos criar uma nova variável. Sem isso, o ct.js lançaria um erro, porque nós não podemos armazenar informações em um local que não existe.

*Assinatura* escreve um novo valor para a variável. Quando *declarada*, as variáveis são `undefined`. Elas armazenarão informações úteis apenas depois da *assinatura*. Você pode assinar as novas variáveis quantas vezes você quiser.

## Propriedades

Variáveis são excelentes para valores temporários, mas elas desaparecem depois que um ct.js termina (por exemplo, depois de 'On Destroy', 'On Step'). Isso faz com que as variáveis sejam úteis para operações rápidas, mas inúteis para uma execução a longo prazo. Nós devemos usar *propriedades* para armazenar informações que podemos utilizar depois.

Você pode usar propriedades da mesma forma que você usa variáveis, mas elas existem apenas dentro de *Objetos*. Objetos são coisas muito abstratas, e isso inclui todas as Copies e Rooms. Você irá criar os seus próprios objetos em breve, mas agora, vamos ver como criar e usar propriedades: 

```js
this.maxHealth = 100;
this.health = this.maxHealth;

this.maxMana = this.mana = 100;

this.name = 'ct.js';
this.title = 'The Almighty Cat';

this.invincible = true;
this.stunned = false;
this.bleed = false;
```

Como você pode notar, a difrença mais significante é que não precisamos declarar as propriedades. Podemos simplesmente definir de forma direta valores para ela.

Também tem uma nova palavra reservada: `this`. `this` representa o objeto atual, o qual é usado para acessar a propriedade no código. Se você escreve um código no evento 'On Step' de uma Copy, então `this` representa o exato e atual objeto de copy. Escrevendo `this.health = 100;` faz com que seja armazenado dentro da propriedade `health` do objeto copy atual o valor `100`.

Nós podemos usar a palavra reservada `this` em um código dentro de uma room. E nesse caso, os valores serão armazenados nessa room.

## Operações com valores, propriedades e variáveis

Variáveis e propriedades são completamente inúteis da forma que estão. Através de instruções condicionais, loops e operações, elas se tornam um poderoso mecanismo de definição de lógica em seu jogo. Depois nós falaremos sobre loops e condicionais. Por hora, vamos nos focar apenas em operações.

Operações numéricas é familiar pra todo mundo. Elas são como equações aritméticas: 

```js
this.level = 10;
this.health = this.level * 4; // 40
this.health = this.health - 5; // 35
this.inventoryCapacity = (5 + 10) * 8; // 120
this.magicPower = 5 + 10 * 8; // 85
this.magicDamage = this.magicPower + this.level * 5; // 135
this.magicResistance = this.magicPower / 10; // 8.5
/* E se precisarmos obter o resto da divisão? */
this.remainder = 11 % 4; // 3, porque 11 / 4 = 2 e 3 é resto da divisão;
```

Quando precisamos *alterar* o valor numérico de uma variável ou propriedade, podemos simplesmente unir a atribuição e operação em uma única assinatura ou instrução:

```js
this.health = 10;
this.health += 5; // health agora é 15
this.health /= 5; // 3
this.health *= 10; // 30
this.health -= 20; // 10
```

Existe também um operador que modifica o valor da variável em `1` unidade:

```js
this.counter = 10;
this.counter++; // this.counter agora é 11
this.counter++; // 12
this.counter--; // 11 outra vez
```

Strings também tem os seus próprios operadores. Usamos um operador de `+` para *concatenar* as Strings: 

```js
this.name = 'ct.js';
this.title = 'Almighty Cat';
this.title = 'The ' + this.title; // 'The Almighty Cat'
this.name += ', '; // 'ct.js, '
this.name += this.title; // 'ct.js, The Almighty Cat'
```

Nós sempre podemos adicionar números para as strings:

```js
var score = 1000,
    drawText = 'Score: ' + score; // 'Score: 1000'

var power = 42,
    powerInfo = power + ' of power'; // '42 of power'
```

**Alerta!** Coisas estranhas acontecem quandos misturamos strings com operações numéricas: 

```js
var money = 100,
    price = '5';
var case1 = money - price, // 95
    case2 = money + price; // 1005 (!)
```

Isso acontece porque no `case1` o JavaScript converte a string price automaticamente para um valor numérico, enquanto que no `case2` o operador `+` utilizado é uma concatenação de string e não uma operação numérica. Então a regra é muito simples, armazene os valores numéricos como números e não como strings. Se você precisa converter uma String para um número, use `Number.parseFloat(suaString)` ou `Number.parseInt(suaString)`, a primeira é para números decimais e a segunda é para números inteiros.

## Valores booleanos e de comparações

Booleano existe em variáveis e propriedades, os valores que um booleano pode assumir é `true` ou `false`.

Valores booleanos são obtidos através do uso de comparações, e eles também têm os seus próprios operadores. Os números têm as comparações baseado nos operadores matemáticos, equanto que Strings podem ser iguais (`==`) ou diferentes (`!=`):

```js
var health = 63,
    maxHealth = 100,
    mana = 100,
    maxMana = 100;

health < maxHealth; // true
mana > maxMana; // false
mana >= maxMana; // true
health <= maxHealth; // true
health == maxHealth; // são iguais? false
health != maxHealth; // não são iguais, certo? true

var cat = 'Albert',
    dog = 'Snowball';
cat == dog; // false
cat != dog; // true

/* Existe também as comparções estritas, a qual compara os valores e os tipos das variáveis*/

5 == '5'; // true
5 === '5'; // false, porque '5' é uma String e não um número
5 === parseFloat('5') // true, porque parseFloat retorna um número e assim, 5 é igual a 5
```

Os valores booleanos têm os seus próprios operadores também. O mais básico é a `!`, o qual nega o valor booleano.

```js An '!' operator
!true; // false
!false; // true

var health = 50,
    alive = !(health <= 0); // true
var dead = !alive; // false
```

Também existe os operadores `&&` e `||`. O primeiro representa "E", enquanto que o segundo representa "OU". Eles são usados para combinar os diferentes valores Booleanos.

```js Use of '&&' and '||'
this.onGround = true;
var keyUp = ct.keyboard.down['up'], // será 'true' se a tecla de seta para cima for pressionada
    canJump = this.onGround && keyUp;

this.powerFromLeft = false;
this.powerFromRight = true;
this.poweredOn = this.powerFromLeft || this.powerFromRight; // true
```

Na próxima parte nós falaremos um pouco mais sobre instruções condicionais e loops. Por hora, recomendo que você leia sobre as [propriedades das Copies](ct.templates.html) e [Rooms](ct.rooms.html).
