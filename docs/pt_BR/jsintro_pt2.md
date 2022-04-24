# Introdução ao JavaScript, parte II: Condicionais e Loops

Variáveis é um bom lugar para guardar as coisas, mas apenas isso não faz um jogo. Aqui nós falaremos sobre instruções condicionais e loops, e como eles podem definir a lógica do jogo.

## Instrução "if"

Vamos iniciar com a estrutura de um "if":

```js
if (/* essa instrução é verdadeira */) {
    /* então faça algo útil */
} else {
    /* caso contrário, faça outra coisa útil */
}
```

Podemos omitir a parte "else" se não precisarmos dele:

```js
if (/* essa instrução é verdadeira */) {
    /* então faça algo útil */
}
```

Para fazer as coisas funcionarem, precisamos passar um valor Booleano entre os parênteses e em seguida escrever algum código. Podemos fazer um monte de coisas com essa simples instrução:

::: tip Destrói uma Copy se health for menor ou igual a zero
```js 
if (this.health <= 0) {
    this.kill = true;
}
```
:::

::: tip Realiza uma compra
```js 
var price = 500;
this.money = 1230;

if (this.money >= price) {
    this.money -= price;
    this.inventory.push(/* algum item */);
}
```
:::

::: tip Dá um pulo
```js 
this.onGround = true;
var keyUp = ct.keyboard.down['up'];
if (this.onGround && keyUp) {
    this.addSpeed(this, 10, 270);
}
```
:::

::: tip Não pula fora dos limites da tela
```js 
if (this.x < 0) {
    this.x = 0;
}
if (this.x > ct.viewWidth) {
    this.x = ct.viewWidth;
}
if (this.y < 0) {
    this.y = 0;
}
if (this.y > ct.viewHeight) {
    this.y = ct.viewHeight;
}
```
:::

Vamos otimizar um pouco o código anterior:

::: tip Não pula fora dos limites da tela
```js
if (this.x < 0) {
    this.x = 0;
} else if (this.x > ct.viewWidth) {
    this.x = ct.viewWidth;
}
if (this.y < 0) {
    this.y = 0;
} else if (this.y > ct.viewHeight) {
    this.y = ct.viewHeight;
}
```
:::

## Loops "while"

loops "while" executa o código múltiplas vezes até que a instrução se torna `false`.

```js 
while (/* essa instrução é verdadeira */) {
    /* faz alguma coisa  */
}
```

Imagine que a gente precise criar um monte de Copies iguais, e que esse número alto de Copies não possa ser codificado ou que seja uma quantidade relativamente alta pra escrever na "mão grande". Nesse caso, um loop "while" pode automatizar o processo de criação dessas Copies.

```js
var counter = 20; // Precisamos criar 20 Copies

while (counter > 0) {
    ct.types.copy('Enemy', this.x, this.y);
    counter --;
}
```

## Loops "for"

De modo geral, os loops "for" funcionam da mesma forma que os loops "while". Vamos reescrever o exemplo anterior em "while" para "for":

```js
for (var counter = 20; counter > 0; counter--) {
    ct.types.copy('Enemy', this.x, this.y);
}
```

Observe que nós juntamos todas as coisas relacionadas ao loop em uma única linha! Loops "for" são criados exatamente para isso:

```js
for (/*declaração das variáveis vão aqui*/; /* define uma condição*/; /*altera as variáveis a cada interação*/) {
    /* corpo do loop */
}
```

Mas ainda existem outros tipos de loops "for". Por exemplo, nós podemos manipular *arrays* e *objetos* com um loop "for…of" e "for…in".

:::tip Dica
Os loops for abaixo são opcionais e bastante avançados, mas eles também são um poderoso instrumento para a manipulação de dados complexos.
:::

Vamos olhar o loop "for…of". Ele funciona com *Arrays*, os quais são essencialmente uma lista ordenada de coisas. Nós podemos definir Arrays dessa forma:

```js
this.monstersPowers = [1, 2, 3, 5, 8];

console.log(this.monstersPowers[0]); // envia o primeiro elemento do array para o console
```

Vamos enviar todos esses valores para o console. Vamos ver como fazer isso com a declaração "while":

```js
var ind = 0;
while (ind < this.monsterPowers.length) {
    console.log(this.monsterPowers[ind]);
    ind ++;
}
```

:::tip Dica
A propriedade `length` existe em todos os Arrays, e ela define o número de elementos do array. Você pode tanto ler como alterar essa propriedade.
:::

Aqui está como podemos fazer a mesma coisa com um loop "for" genérico:

```js
for (var ind = 0; ind < this.monsterPowers.length; ind++) {
    console.log(this.monsterPowers[ind]);
}
```

Agora eis o loop "for…of":

```js
for (var element of this.monsterPowers) {
    console.log(element);
}
```

Ele faz duas coisas para nós automaticamente:

* Ele cria um contador interno e as condições, mas não mostra, o que deixa o código mais limpo.
* Ele também armazena cada elemento na variável `element` (Ela terá um valor diferente a cada interação).

Note que o loop "for…of" funciona apenas com arrays. Mas também existem os *objetos*.

*Objetos* são muito mais abstratos; eles podem ser interpretados como armários com prateleiras nomeadas, cada prateleira contendo um item. A propósito, Arrays são Objetos também, mas em vez de prateleiras com nomes, eles têm índices numéricos. Os nomes dessas "prateleiras" são chamadas de *"chaves"*, e um par de uma chave e um valor é o que chamamos de *propriedade*, vista na [parte I](./jsintro_pt1.html) desse tutorial!

```js
var magicWand = {
    name: 'The summoner of winter winds',
    forces: ['wind', 'ice'],
    level: 23,
    minLevel: 12
};

console.log(magicWand.name);
console.log(magicWand['forces']); // Uma outra forma de obter os valores dos objeto no estilo array!
```

Podemos utilizar dois tipos de loop "for" para percorrer todos os elementos de uma array, mas nós precisaremos de um loop "for…in" para percorrer todas as propriedades de um Objeto:

```js
for (var key in magicWand) {
    console.log(key, magicWand[key]);
}
```

O que acontece lá? primeiro, dizemos que queremos ler as chaves de `magicWand` e guardar o resultado na variável `key`. Isso é muito semelhante ao funcionamento do loop "for…of". Em seguida enviamos os dois valores para o console: key (que é a chave e será `"name"`, depois `"forces"` e por aí vai.) e o seu valor. Nós não podemos apenas escrever `magicWand.key` aqui, porque em `magicWand.key`, `key` não é uma propriedade estática, mas nós podemos utilizar uma notação no estilo Array para obter as propriedades dinamicamente.

A notação no estilo Array é um poderoso instrumento que tem muitos usos, mas por enquanto, lembre-se que você deve usar `someObject[key]` quando usar o loop "for…in".
