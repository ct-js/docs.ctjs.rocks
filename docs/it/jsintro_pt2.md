# Introduzione a JavaScript, parte II: Condizioni e cicli

Le variabili sono utili per memorizzare le cose, ma non sono sufficienti per creare un gioco. Qui parleremo di istruzioni e cicli condizionali e di come possono definire la logica di un gioco.

## Istruzione "if"

Iniziamo con la struttura "if":

```js
if (/* Questa affermazione è true*/) {
    /* fai qualcosa */
} else {
    /* fare un'altra cosa */
}
```

Possiamo omettere la sezione "else" se non ne abbiamo bisogno:

```js
if (/* Questa affermazione è true */) {
    /* fai qualcosa */
}
```

Per far funzionare le cose, dobbiamo inserire un valore booleano o un'espressione di confronto tra parentesi e scrivere del codice. Possiamo fare molte cose con questa semplice affermazione:

```js Distruggere una copia se la sua salute vale zero o meno
if (this.health <= 0) {
    this.kill = true;
}
```

```js Fare un acquisto
var price = 500;
this.money = 1230;

if (this.money >= price) {
    this.money -= price;
    this.inventory.push(/* qualche oggetto */);
}
```

```js Fare un salto
this.onGround = true;
var keyUp = ct.keyboard.down['up'];
if (this.onGround && keyUp) {
    this.addSpeed(this, 10, 270);
}
```

```js Non saltare fuori dallo schermo
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

Ottimizziamo un po' quest'ultimo:

```js Non saltare fuori dallo schermo
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

## Ciclo "While"

I cicli "While" (detti anche loop while) eseguono più volte del codice finché le affermazioni tra parentesi diventano false.

```js
while (/* Questa affermazione è true */) {
    /* fai qualcosa */
}
```

Immagina di dover creare un numero di copie uguali e che questo numero non può  essere codificato o è relativamente grande per scriverlo a mano. In questo caso, un ciclo "while" può automatizzare il processo di creazione.

```js
var counter = 20; // Dobbiamo creare 20 copie

while (counter > 0) {
    ct.templates.copy('Enemy', this.x, this.y);
    counter --;
}
```

## Cicli "For"

I cicli "for" (detti anche loop for) funzionano allo stesso modo di quanto visto per "while". Prendiamo il precedente esempio "while" e trasformiamolo in un ciclo "for":

```js
for (var counter = 20; counter > 0; counter--) {
    ct.templates.copy('Enemy', this.x, this.y);
}
```

Sembra che abbiamo abbreviato tutto in una riga! E i cicli "for" esistono esattamente per questo:

```js
for (/*definisci le variabili qui*/; /*imposta una condizione*/; /*cambia le variabili dopo ogni iterazione*/) {
    /* istruzioni da eseguire ciclicamente */
}
```

Ma ci sono più d'un ciclo "for". Ad esempio, possiamo manipolare *array* e *oggetti* con i cicli "for...of" e "for...in".

:::tip
I cicli "for" di di cui sopra sono opzionali e anche piuttosto avanzati, ma sono potenti strumenti da tener ben presente durante la manipolazione di dati complessi.
:::

Diamo un'occhiata al seguente ciclo "for...of". Funziona con un *Array* , che sono essenzialmente un elenco ordinato di cose. Possiamo definire gli Array in questo modo:

```js
this.monstersPowers = [1, 2, 3, 5, 8];

console.log(this.monstersPowers[0]); // Stampa il primo elemento nella console
```

Visualizziamo tutti questi valori nella console. Ecco come potremmo farlo con l'istruzione "while":

```js
var ind = 0;
while (ind < this.monsterPowers.length) {
    console.log(this.monsterPowers[ind]);
    ind ++;
}
```

:::tip
La proprietà `length` esiste per tutti gli Array e restituisce la quantità di elementi contenuti al suo interno. Puoi sia leggere che modificare questa variabile.
:::

Ecco come potremmo fare la stessa cosa con un ciclo "for" generico:

```js
for (var ind = 0; ind < this.monsterPowers.length; ind++) {
    console.log(this.monsterPowers[ind]);
}
```

Ora, per concludere, guarda il ciclo "for...of":

```js
for (var element of this.monsterPowers) {
    console.log(element);
}
```

Questa istruzione fa due cose per noi automaticamente:

* crea i propri contatori e condizioni internamente, ma non li mostra, lasciando il codice pulito e
* memorizza ogni elemento nella variabile `element` che quindi avrà un valore diverso ad ogni iterazione.

Nota però che i cicli "for...of" funzionano solo su Array. Ma ci sono anche gli *Oggetti* .

*Gli oggetti* sono cose più astratte; possono essere immaginati come armadi con ripiani dotati di nome e ogni ripiano contiene un articolo. (A proposito,anche le Array sono oggetti, ma invece che avere un nome i ripiani sono numerati.) I nomi di questi "riapiani" sono detti *"key"* e una coppia di *key* e *value* (valore) è come la *proprietà* vista precedente nel tutorial!

```js
var magicWand = {
    name: 'The summoner of winter winds',
    forces: ['wind', 'ice'],
    level: 23,
    minLevel: 12
};

console.log(magicWand.name);
console.log(magicWand['forces']); // Un altro modo per ottenere valori dagli oggetti — in stile Array!
```

Possiamo usare due tipi di cicli "for" per scorrere tutti gli elementi di un Array, ma avremo bisogno di un ciclo "for...in" per esaminare le proprietà di un oggetto:

```js
for (var key in magicWand) {
    console.log(key, magicWand[key]);
}
```

Cosa succede in questo codice? In primo luogo, diciamo che vogliamo leggere le chiavi da `magicWand` usando la variabile `key`. Questo è per lo più simile al modo in cui funzionano i loop "for...of". Quindi stampiamo in console due valori alla volta, ad ogni iterazione: una chiave (sarà `"name"`, quindi `"forces"`, ecc.) e il valore corrispondente. Non possiamo semplicemente scrivere `magicWand.key` qui, perché `magicWand.key` cercherebbe una proprietà statica denominata `key` proprietà, ma possiamo usare la notazione in stile array per ottenere la proprietà dinamicamente.

La notazione in stile array è uno strumento potente che ha molti usi, e per ora ricorda che dovresti usare `someObject[key]`mentre usi i cicli "for...in".