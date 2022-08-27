---
sidebarDepth: 3
---

# Introduzione a JavaScript, parte III: oggetti e array, approfondimento

## Oggetti

Tutto in JavaScript è un oggetto! Ad eccezione di `true`, `false`, numeri e stringhe semplici, `null` e `undefined`, per la precisione. Cosa significa per te? Significa che la maggior parte delle cose in JS ha ✨*proprietà*✨ — quelle di cui stavamo parlando nella prima parte di questa introduzione a JavaScript.

Quindi, come puoi creare e archiviare un nuovo oggetto? La sintassi è semplice: crei una lista di proprietà all'interno di `{`parentisi graffe `}`, separi gli elementi (cioè ogni coppia *key-value*) con una virgola ( `,`) mettendo tra nome (*key*) e valore della proprietà (*value*) i due punti (`:`). Potresti aver visto tali strutture durante l'utilizzo di alcuni catmod, come `ct.tween`:

```js
var myObject = {
    name: 'Il martello uccidi bug',
    description: 'Acquista questo martello e schiarirai questi bug con facilità!',
    damage: 100500,
    price: NaN
};
```

We can later read properties of objects with a dot accessor — the one you've probably seen everywhere, like `myObject.name`.

In seguito potremo leggere le proprietà degli oggetti usando il punto (`.`) — il metodo che probabilmente hai visto altrove, come in `myObject.name`.

Objects transfer between variables and properties as a whole, so if you continue the previous snippet and try to store the same object in, say, a copy, *and* then try to modify the source object, you will notice that the changes are applied to a new reference as well. Because it is just one object shared between different variables and properties! Consider this example:

Gli oggetti vengono trasferiti con variabili e proprietà nel loro insieme, quindi se si continua lo snippet precedente e si tenta di memorizzare lo stesso oggetto, ad esempio, in una copia, e quindi si modifica l'oggetto di origine, si noterà che le modifiche vengono applicate anche al nuovo riferimento. Perché è solo un oggetto condiviso tra diverse variabili e proprietà! Considera questo esempio:

```js
this.weapon = myObject;

// Later…

console.log(this.weapon.price); // È un NaN! Non va bene, aggiustiamolo!
myObject.price = 777; // Nota come non ci riferiamo a `this.weapon` qui.
console.log(this.weapon.price); // Ora è 777. Evviva!
```

### Oggetti nidificati

Puoi memorizzare oggetti all'interno di altri oggetti. Puoi utilizzare riferimenti ad altri oggetti nelle proprietà del tuo oggetto o incorporarli:

```js
this.weapon = {
    name: 'Il martello uccidi bug',
    description: 'Acquista questo martello e schiarirai questi bug con facilità!',
    damage: 100500,
    price: 777
};
this.helmet = {
    name: 'Il casco del sistema di pensiero',
    description: 'Ti permette di ottenere immagini intere',
    wit: 5,
    price: 100
};
this.gear = {
    hands: this.weapon,
    head: this.helmet,
    body: { // Puoi inserire nuovi oggetti all'interno di uno in corso di definizione!
        name: 'Il pettorale obliante',
        description: 'Protegge la tua mente dal mondo esterno',
        wit: -100,
        mood: 5,
        price: 3
    }
};

console.log(this.gear.body.name); // Restituirà "Lo scudo del misconoscente".
```

### Eliminazione completa delle proprietà degli oggetti

Puoi scrivere `this.enemy = undefined` e, nella maggior parte dei casi, andrà bene, ma se stai [lavorando con localStorage](../localstorage.html) o altri dati persistenti, o se esegui il ciclo sulle proprietà di un oggetto, molto probabilmente dovrai rimuovere la proprietà senza  lasciare traccia, altrimenti rimane dov'è, anche se senza un valore definito.

Puoi utilizzare la parola chiave `delete` per rimuovere qualsiasi proprietà da un oggetto:

```js
if (!ct.templates.isValid(this.enemy)) {
    delete this.enemy;
}
```

### Se stringhe e numeri sono costanti, perché possiamo usare metodi su di essi?

Perché JavaScript è intelligente! In realtà ci sono oggetti basati su semplici stringhe e numeri e puoi crearli con `new String('Salsiccia divina')`, `new Number(42)`, e anche `new Boolean(true)`. Ma questi metodi non sono consigliati, il 99,99% delle volte non è necessaria questa funzionalità. Ed è *una funzionalità piuttosto originale* che va oltre lo scopo di questa pagina introduttiva.

Quello di cui hai *bisogno* sono tutti i metodi di `Number` e `String`; per formattare i valori e manipolare le stringhe. E JavaScript li fornisce quando scrivi `' oh no '.trim()`o `(99.9).toFixed(2)`.

## Array (matrici di valori)

Gli Array possono essere immaginati come oggetti con proprietà numeriche ordinate, con un *sacco* di funzioni di supporto per la loro gestione e modifica. Dichiarare un nuovo array è abbastanza diverso dal dichiarare un nuovo oggetto:

```js
var groceryList = ['patata', 'carota', 'timo'];
this.waveEnemyAmount = [10, 10, 15, 15, 20, 25];

console.log(groceryList[0]); // Scriverà "patata"
console.log(groceryList[1]); // Scriverà "carota"
console.log(this.waveEnemyAmount); // Scriverà l'intero array
```

Nota come accediamo agli elementi dell'array: usiamo un numero tra parentesi quadre, iniziando con lo `[0]`, per ottenerne il valore.

Puoi anche memorizzare oggetti complessi in un array (in questa array vengono inseriti tre oggetti dotati di quattro proprietà *key-value*):

```js
this.shopItems = [{
    name: 'Il martello uccidi bug',
    description: 'Acquista questo martello e schiarirai questi bug con facilità!',
    damage: 100500,
    price: 777
}, {
    name: 'Il casco del sistema di pensiero',
    description: 'Ti permette di ottenere immagini intere',
    wit: 5,
    price: 100
}, {
    name: 'Il pettorale obliante',
    description: 'Protegge la tua mente dal mondo esterno',
    wit: -100,
    mood: 5,
    price: 3
}];

console.log(this.shopItems[0].name); // Scriverà 'Il martello uccidi bug'
console.log(this.shopItems[2].price); // Scriverà `3`, il prezzo del pettorale
```

Qui accediamo a un intero oggetto mediante `[0]`, `[1]`, `[2]`, etc. quindi leggiamo la proprietà dell'oggetto, aggiungendo `.name` e `.price`. Fai attenzione a questa sintassi!

### Ottenere la lunghezza dell'array

Gli array hanno diverse funzioni per semplificare l'elaborazione di tutti i dati di gioco di cui hai bisogno.

Innanzitutto, c'è la proprietà `length`, che è la quantità di elementi presenti nell'array.

Come puó essere usata? Supponi di voler limitare la quantità di spazzatura all'interno dell'inventario del tuo giocatore:

```js
this.inventory = ['spada', 'spada', 'spada', 'spada', 'spada', 'spada', 'spada', 'spada', 'spada', 'apple'];
this.maxInventorySize = 10;
// later…

if (this.inventory.length >= this.maxInventorySize) {
    return; // interrompe l'evento in corso o la funzione
}
this.inventory.push('lingotto in oro'); // Aggiungi un nuovo elemento
```

Peccato che non abbiano mai ricevuto questo lingotto d'oro; l'istruzione `return` interrompe e l'evento e quindi impendendo che l'ultimo comando (la raccolta dell'oro) venga eseguito.

### Aggiunta di nuovi elementi agli array

Esistono tre metodi per aggiungere nuovi elementi all'array:

```js
var pizza = ['salsa di pomodoro'];

pizza.push('peperoni'); // Questo aggiunge un nuovo elemento alla fine dell'array
pizza.unshift('pasta'); // Questo aggiunge un elemento all'inizio dell'array
pizza.splice(2, 0, 'formaggio'); // Questo aggiunge un nuovo elemento dopo pizza [2]. Ignora l'argomento 0 per il momento.

console.log(pizza); // Scriverà l'array con pasta, salsa di pomodoro, formaggio e peperoni. Yum 🍕
```

### Rimozione di elementi da un array

Divoriamo la nostra pizza!

```js
var pizza = ['pasta', 'salsa di pomodoro', 'formaggio', 'peperoni'];

pizza.pop('dough'); // Rimuove l'ultimo elemento dall'array
pizza.splice(1, 2); // Rimuove due elementi, a partire da pizza [1].
pizza.splice(0, 1, 'crosta'); // Rimuove un elemento, a partire da pizza[0] e lo sostituisce con "crosta".
pizza.shift(); // Rimuove il primo elemento dell'array

console.log(pizza); // Scriverà un array vuoto!
```

::: tip Ulteriori informazioni sul metodo array.splice
Hai visto che `pizza.splice` è stato utilizzato in tre diversi casi: per aggiungere, rimuovere e sostituire valori. Come funziona il metodo?

Questa funzione viene utilizzata per sostituire un insieme di elementi con un altro. La sua forma completa è `.splice(startFromIndex, deleteCount, addOne, addTwo, addThree, …)`. Ma puoi eliminare diversi elementi e non aggiungere nulla per rimuovere gli elementi nell'array, oppure fare il contrario — non eliminare nulla e aggiungere nuovi elementi:

* Quando scrivi `.splice(3, 0, 'sausage')`, aggiungi nuovi elementi dopo il terzo elemento dell'array.
* Quando scrivi `.splice(3, 1)`, rimuovi un elemento.
* Quando scrivi `.splice(3, 1, 'sausage')`, sostituisci un elemento con un altro.
* Puoi scrivere `.splice(3, 2)`per rimuovere più elementi contemporaneamente.
:::

### Funzioni per la ricerca, il filtraggio, l'ordinamento, la riduzione degli array

#### Filtrare con`array.filter`

`array.filter` è una comoda funzione che crea un nuovo array da quello esistente. Devi passargli una funzione di filtro scritta da te come argomento, detto "predicato".

Prendiamo tutte le bestie neutrali e amichevoli nel nostro bestiario:

```js
var bestiary = [{
    name: 'Maiale',
    aggressiveness: 'neutra'
}, {
    name: 'Gatta',
    aggressiveness: 'amichevole'
}, {
    name: 'Lupo',
    aggressiveness: 'ostile'
}, {
    name: 'Orso',
    aggressiveness: 'ostile'
}, {
    name: 'Pony magico',
    aggressiveness: 'neutral'
}];

var neutralAnimals = bestiary.filter(beast => {
    if (beast.aggressiveness === 'ostile') {
        return false;
    }
    return true; // Verrà eseguita solo se la clausola precedente non s'è verifica,
                 // perché `return` interrompe l'esecuzione della funzione.
});
console.log(neutralAnimals);
```

Qui ogni bestia che ritornerà `false` non sarà inclusa in nell'array `neutralAnimals`. Quelle che ritornano `true`, invece, sì.

Diamo un'occhiata a un altro esempio — ottenere l'elenco delle armi che un eroe può attualmente acquistare:

```js
this.money = 1230;
var shop = [{
    name: 'Arte del regno delle costanti',
    price: 130,
    type: 'libro'
}, {
    name: 'Il martello uccidi bug',
    price: 100500,
    type: 'arma'
}, {
    name: 'A rusty axe of intoxication',
    price: 853,
    type: 'arma'
}, {
    name: 'A scroll of lightning',
    price: 167,
    type: 'libro'
}];
// skipping both `return` and brackets here — this is a shorter syntax, and the result is returned automatically!
var purchaseable = shop.filter(item => item.price <= this.money);
var purchaseableWeapon = purchaseable.filter(item => item.type === 'arma');
console.log(purchaseableWeapon);
```

#### Metodo `sort` dell'array

Il metodo `array.sort` può funzionare così com'è con gli elementi di testo:

```js
var groceryList = [
    'patata',
    'carota',
    'insalata',
    'salsicce'
];
groceryList.sort();
console.log(groceryList); // patate e carote verranno scambiate
```

Potresti notare che, contrariamente ad altri metodi simili, l'ordinamento non crea un nuovo array ma modifica quello esistente.

Puoi anche passare un ""predicato"" che restituirà il confronto tra due oggetti. Proviamo l'elenco degli articoli del negozio di cui sopra e ordiniamolo in base al prezzo, in ordine crescente:

```js
var shop = [{
    name: 'Arte del regno delle costanti',
    price: 130,
    type: 'libro'
}, {
    name: 'Il martello uccidi bug',
    price: 100500,
    type: 'arma'
}, {
    name: 'Ascia arrugginita di intossicazione',
    price: 853,
    type: 'arma'
}, {
    name: 'Una pergamena di fulmini',
    price: 167,
    type: 'libro'
}];

shop.sort((a, b) => {
    return a.price - b.price;
});
```

Qui prendiamo due articoli e restituiamo la differenza tra il primo (`a`) e l'ultimo ( `b`). Se il numero risultante è negativo, il primo elemento cambierà di posizione scendendo verso l'indice `0` e il secondo salirà. Se il risultato del calcolo è positivo, accadrà il contrario. Se varrà `0` gli articoli non verranno scambiati.

:::tip

Devi chiamare il metodo `sort` solo una volta — JavaScript continuerà a ordinare finché l'array non sarà stabile.
:::

#### Metodi di ricerca e test degli elementi dell'array

Ci sono molti metodi usati per trovare gli elementi in un array!

##### Guarda se un elemento si trova in un array con `array.includes`

`array.includes(value)`è un semplice controllo utile quando devi solo sapere se un elemento è presente nell'array corrente. Restituisce un valore booleano (`true`o `false`).

```js
var buffs = ['vigore', 'riposo', 'rabbia'];
// Aggiungi un nuovo elemento all'array solo se non esiste già
if (!buffs.includes('benedetta')) {
    buffs.push('benedetta');
}
```

##### Check if some elements in an array satisfy a condition with `array.some`

Questa è una funzione di ordine superiore per verificare se almeno uno degli elementi soddisfa una data condizione. Accetta un predicato che viene verificato su ogni elemento e restituisce `true` solo se viene restituita almeno una chiamata di questa funzione con valore `true`.

```js
this.gear = [{
    name: 'Il martello uccidi bug',
    description: 'Acquista questo martello e schiarirai questi bug con facilità!',
    damage: 100500,
    enchantment: 'benedizione'
}, {
    name: 'Il casco del sistema di pensiero',
    description: 'Ti permette di ottenere immagini intere',
    wit: 5,
    enchantment: 'none'
}, {
    name: 'Il pettorale obliante',
    description: 'Protegge la tua mente dal mondo esterno',
    wit: -100,
    mood: 5,
    enchantment: 'maledizione'
}];

// Add a debuff only if one of the items is cursed
if (this.gear.some(item => item.enchantment === 'maledizione')) {
    this.debuffs.push('maledizione');
}
```

#### Ottieni un elemento che soddisfi una condizione con `array.find`,`array.findIndex`

Questi sono simili nell'idea a `array.some`, ma restituiscono il primo articolo che soddisfa le tue esigenze. `array.find` restituisce l'elemento stesso (o `undefined`se non ne è stato trovato nessuno), mentre `array.findIndex` restituisce la posizione dell'elemento trovato nell'array (o `-1` se tale elemento non esiste).

```js
this.gear = [{
    name: 'Il martello uccidi bug',
    type: 'arma'
}, {
    name: 'Il casco del sistema di pensiero',
    type: 'testa'
}, {
    name: 'The chestplate of ignorance',
    type: 'torso'
}];

// Impostare il danno inflitto al danno dell'arma nell'array gear corrente
var weapon = this.gear.find(item => item.type === 'arma');
this.damage = weapon.damage;

// Remove the helmet
var helmetIndex = this.gear.findIndex(item => item.type === 'testa');
if (helmetIndex !== -1) { // Make sure we did find a helmet
    this.gear.splice(helmetIndex, 1);
}
```

##### Trova l'indice di un elemento noto in un array con`array.indexOf`

Simile a `array.findIndex`, `array.indexOf` restituisce l'indice dell'elemento specificato in un array. È utile se memorizzi numeri o stringhe in un array o hai un riferimento all'oggetto che cerchi.

```js
var groceryList = [
    'patata',
    'carota',
    'cetriolo',
    'banana',
    'ciliegia'
];
var carrotIndex = array.indexOf('carota');
if (carrotIndex !== -1) { // Si assicura di trovare un oggetto
    groceryList.splice(carrotIndex, 1);
}
```

#### Metodo`reduce` dell'array

Il metodo `array.reduce` esamina ogni elemento di un array, eseguendo la funzione (predicato) e passando il risultato di questa funzione alla chiamata successiva. Di solito viene utilizzato per raccogliere rapidamente diverse statistiche da un array e scrivendo un predicato diverso è possibile calcolare  diversi valori statistici.

Supponiamo che tu scriva un gioco di "difesa della torre" e che tu abbia un boss finale all'ultima ondata. Vuoi calcolare il tempo prima che si generi il boss e, per questo, vuoi sommare tutti i ritardi delle entrate in scena.

Considerando la seguente struttura, possiamo usare il metodo `.reduce` dell'array per ottenere una somma di tutti i ritardi:

```js
var waves = [{
    delay: 30,
    monsters: [{
        template: 'Mostro_volante',
        health: 10,
        amount: 10
    }]
}, {
    delay: 10,
    monsters: [{
        template: 'Mostro_volante',
        health: 15,
        amount: 12
    }]
}, {
    delay: 12,
    monsters: [{
        template: 'Mostro_volante',
        health: 15,
        amount: 20
    }, {
        template: 'Mostro_carro',
        health: 15,
        amount: 20
    }]
}, {
    delay: 20,
    monsters: [{
        template: 'Mostro_boss',
        health: 1000,
        amount: 1
    }]
}];

var timeTillBoss = waves.reduce((currentSum, wave) => {
    return currentSum + wave.delay
}, 0); // Qui 0 è il valore iniziale.
```

Ora usiamo lo stesso array per ottenere il numero di tutti i nemici nelle ondate, per tipo. Questo è un esempio un po' difficile poiché abbiamo bisogno di un array di mostri all'interno del nostro array principale:

```js
var monstersInTheLevel = waves.reduce((currentStats, wave) => {
    for (const monsterGroup of wave.monsters) {
        // Inizializza un gruppo di mostri se non è stato ancora creato
        if (!currentStats[monsterGroup.template]) {
            currentStats[monsterGroup.template] = 0;
        }
        currentStats[monsterGroup.template] += monsterGroup.amount;
    }
}, {}); // Inizia con un oggetto vuoto
```

È stato facile da capire? Forse. Possiamo fare lo stesso con normali cicli loop? Certo. Tuttavia, se hai diversi array che devi elaborare in blocco, sarebbe difficile scrivere loop per ognuno di essi. Con `.reduce`, `.forEach`, `.filter`, `.find`, puoi archiviare l'intera funzione del predicato in una variabile o proprietà e quindi utilizzarla più volte dove necessario, rendendo  pulito il tuo codice.


### Particolari conoscenze rellative agli array in JavaScript 🕸🕷

#### Array bidimensionali

In JavaScript, gli array così come sono sono unidimensionali: è solo un elenco. Ma se crei un elenco di elenchi, diventa improvvisamente simile agli array bidimensionali di altri linguaggi!

```js
var myMap = [
    [1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1],
    [2, 0, 1, 1, 1],
    [1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0],
];
```

Quindi otterresti un valore scrivendo `myMap[2][0]`. (Questo esempio restituirebbe `2`: l'elemento nella riga due e nella colonna zero.)

#### Accessorio speciale in stile array per le proprietà degli oggetti

Ricordi che quasi tutto in JavaScript è un oggetto? E anche gli array? Perché pensi che gli array abbiano una sintassi speciale per accedere ai loro elementi?

Perché in realtà non è esclusivo degli array! Ogni oggetto può avere le sue proprietà lette, cancellate e modificate con  una funzione di accesso alle proprietà simile a un array:

```js
var myObject = {
    name: 'Il martello uccidi bug',
    description: 'Acquista questo martello e schiarirai questi bug con facilità!',
    damage: 100500,
    price: NaN
};
myObject['price'] = 1000;
```

Qualsiasi valore che può essere convertito in stringhe può essere utilizzato come accessor:

```js
// Questo è davvero uno strano esempio, ma cosa procedere per creare una barra di abilità personalizzabile di un ARPG?
var abilities = {
    '0': 'Moon strike',
    '1': 'Slashing leap',
    '5': 'Mend'
};
// Riposizionare l'abilità:
var ability = abilities[1];
delete abilities[1];
abilities[2] = ability;
```

E il meglio è che gli accessor non devono essere per forza statici! Puoi calcolare i valori concatenando stringhe o facendo altre cose magiche:

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
// `'resistance' + this.armor.resistanceType` ritorna il risultato 'resistanceIce',
// Così la proprietà this.stats.resistanceice verrà modificata.
this.stats['resistance' + this.armor.resistanceType] += this.armor.resistanceBoost;
```

#### Caso speciale: le stringhe sono... array?!

Le stringhe hanno una proprietà `.length`, che restituisce la lunghezza della stringa, dai! Possono anche restituire i valori in posizioni specifiche se si tenta di utilizzare una funzione di accesso di tipo array:

```js
var string = 'Hello ct.js!';
console.log(string.length); // Scriverà 12
console.log(string[1]) // Scriverà 'e'
```

Ma le stringhe non hanno tutti quei metodi fantastici come `.forEach`, `.map`o `.filter`. In realtà hanno [i loro metodi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods) per semplificare la trasformazione di stringhe come `.trim()`, `.search`, `.replace`, [e altri](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods) e hanno anche il loro `.slice` . Non che sia prassi trattare le stringhe come array reali, ma se ne hai *davvero* bisogno, puoi usare `Array.from(yourString)`per creare un nuovo array che abbia i caratteri della stringa come elementi.

## Conclusione

Gli oggetti e gli array sono potenti — sono per lo più strutture a forma libera che possono adattarsi a tutto ciò che ci metti dentro. Sapere come manipolarli in modo efficiente ti consentirà di scrivere codice velocemente e facilmente. Ma non preoccuparti se non riesci a ricordare tutto quanto detto finora — la  perfezione arriva con la pratica e la pratica ha bisogno di tempo. Non che io usi tutti i metodi una volta al mese o giù di lì, he-he.

Buona codifica! 
CoMiGo
