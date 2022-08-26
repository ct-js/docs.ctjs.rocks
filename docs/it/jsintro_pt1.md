# Introduzione a JavaScript, parte I: variabili, proprietà, operazioni

JavaScript è un ottimo linguaggio di programmazione che dà fantastici poteri a siti Web, giochi, app come ct.js e persino robot! È facile da imparare, anche se molto completo, ed è simile ad altri linguaggi di programmazione come C#, C++ o Java.

I giochi Ct.js sono tutti scritti in JavaScript. Con questo linguaggio definisci la logica per le tue copie, room (un livello del gioco) e scrivi nuove estensioni. Ora ne impareremo i concetti base.

## Variabili

Le variabili sono come cassetti dove memorizzare qualcosa. Puoi memorizzare qualsiasi informazione al loro interno, ad esempio un numero di vite, risorse o esperienze, il nome di un NPC (personaggio non giocante), etc.

Le variabili possono anche contenere dati più complessi, come un elenco di oggetti di un inventario o un mazzo di carte.

Puoi **dichiarare nuove variabili** con la parola chiave `var` e **assegnare loro valori** con un segno di uguaglianza:

```js
var maxHealth; // Variabile il cui valore rappresenta la salute di un giocatore
maxHealth = 100;
var health;
health = maxHealth; // Puoi copiare un valore da una variabile (MaxHealth) a un'altra (salute)

var mana, maxMana; // È possibile combinare una serie di dichiarazioni con una parola chiave "var"
maxMana = mana = 100; // È possibile assegnare un valore (100) a due variabili diverse contemporaneamente

var name;
name = 'ct.js'; // I valori di testo, o stringhe, sono racchiusi tra virgolette

var title = 'The Almighty Cat'; // È possibile combinare sia il processo di dichiarazione che l'assegnazione

var invincible = true, // Questi sono valori booleani
    stunned = false,
    bleed = false; // Puoi combinare più dichiarazioni e assegnazioni usando la virgola!
```

Il processo di dichiarazione dice a ct.js che vogliamo creare una nuova variabile. Senza di esso, ct.js generererebbe un errore, perché non possiamo archiviare informazioni in un luogo che non esiste.

L'assegnazione scrive un nuovo valore in una variabile. Quando *dichiarate*, le variabili sono `undefined`. Memorizzeranno le informazioni utili solo dopo l'assegnazione. Puoi assegnare nuove variabili molte volte.

## Proprietà

Le variabili sono ottime per valori temporali, ma scompaiono dopo ogni completamento di un evento in ct.js (ad esempio dopo l'evento "Creation" o "Frame start" in un template). Ciò rende le variabili utili per operazioni rapide ma inutilizzabili a lungo termine. Dovremmo utilizzare **le proprietà** per memorizzare le informazioni in modo da poterle utilizzare in seguito.

Puoi usare le proprietà nello stesso modo in cui usi le variabili, ma ricorda che queste esistono solo all'interno degli *Oggetti* dove vengono definite . Gli oggetti sono cose molto astratte e includono tutte le Copie e le Stanze di un gioco. Presto ne creerai anche tu. Ma per ora, diamo un'occhiata a come creare e utilizzare le proprietà:

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

Come puoi vedere, la differenza più significativa è che non abbiamo bisogno di dichiarare le proprietà. Possiamo iniziare a scrivere i valori direttamente.

C'è una nuova parola chiave: `this`. `this` sta per l'oggetto corrente a cui il codice appartiene. Se scrivi un codice per un evento "Frame start" di una copia, `this` punterà a questa copia esatta. Scrivere `this.health = 100;` significa memorizzare una proprietà `health` all'interno della copia corrente, con un valore `100`; per esempio per indicare il livello di salute di un nemico per eliminarlo quando raggiunge zero.

Possiamo usare la parola chiave `this` anche all'interno del codice di una room. In questo caso, i valori verranno memorizzati e riguarderanno quel livello in particolare, non gli atri eventualmente presenti.

## Operazioni con valori, proprietà e variabili

Le variabili e le proprietà sono abbastanza inutili così come sono. Con le istruzioni condizionali, i cicli loop e le operazioni diventano un potente meccanismo per definire la logica del tuo gioco. Parleremo di cicli loop e condizionali più avanti. Per ora, diamo un'occhiata alle operazioni.

Le operazioni con i numeri sono familiari. Sono come equazioni aritmetiche:

```js
this.level = 10;
this.health = this.level * 4; // 40 è il risultato dell'operazione
this.health = this.health - 5; // 35
this.inventoryCapacity = (5 + 10) * 8; // 120
this.magicPower = 5 + 10 * 8; // 85
this.magicDamage = this.magicPower + this.level * 5; // 135
this.magicResistance = this.magicPower / 10; // 8.5
/* E se dovessimo ottenere il resto della divisione? */
this.remainder = 11 % 4; // risulta 3, perchè 11 / 4 = 2 con resto 3;
```

Quando dobbiamo *modificare* una variabile o una proprietà, possiamo unire l'assegnazione e l'operazione necessaria per abbreviare il codice se possibile:

```js
this.health = 10;
this.health += 5; // La salute (health) ora è 15
this.health /= 5; // 3
this.health *= 10; // 30
this.health -= 20; // 10
```

Ci sono anche due operatori fantasiosi che modificano il valore di una variabile di `1`:

```js
this.counter = 10;
this.counter++; // counter ora vale 11
this.counter++; // 12
this.counter--; // 11 di nuovo
```

Anche le stringhe hanno i loro operatori. Useremo un segno più per *concatenare* le stringhe:

```js
this.name = 'ct.js';
this.title = 'Almighty Cat';
this.title = 'The ' + this.title; // 'The Almighty Cat'
this.name += ', '; // 'ct.js, '
this.name += this.title; // 'ct.js, The Almighty Cat'
```

Possiamo anche aggiungere numeri alle stringhe per comporre frasi contenente dati memorizzati nelle variabili, per esempio:

```js
var score = 1000,
    drawText = 'Score: ' + score; // 'Score: 1000'

var power = 42,
    powerInfo = power + ' of power'; // '42 of power'
```

**Avvertimento!** Le cose diventano strane quando mescoliamo stringhe simili a numeri e operatori matematici:

```js
var money = 100,
    price = '5';
var case1 = money - price, // 95
    case2 = money + price; // 1005 (!)
```

Quindi la regola pratica è memorizzare i valori numerici come numeri, non come stringhe (e quindi senza usare le virgolette). Se devi convertire una stringa in un numero, usa `parseFloat(yourString)`.

## Valori booleani e confronti

Booleane sono quelle variabili e proprietà i cui valori possibili sono esclusivamente o `true`o `false`. Nota che qui non usiamo le virgolette.

I valori booleani possono essere calcolati utilizzando i confronti e hanno i propri operatori. I numeri posso essere confrontati come si fa normalmente in matematica, mentre le stringhe o sono uguali o no:

```js
var health = 63,
    maxHealth = 100,
    mana = 100,
    maxMana = 100;

health < maxHealth; // true
mana > maxMana; // false
mana >= maxMana; // true
health <= maxHealth; // true
health === maxHealth; // sono uguali? false
health !== maxHealth; // non sono uguali, giusto? true

var cat = 'Albert',
    dog = 'Snowball';
cat === dog; // false
cat !== dog; // true

/* Ci sono anche confronti non restrittivi, che confrontano i valori ma trasformano i modelli di variabili */

5 === '5'; // false, perchè '5' è una stringa, non un numero
5 == '5'; // true
5 === parseFloat('5') // true, perché Parsefloat restituisce un numero, e così è il primo 5
```

Anche i valori booleani hanno i loro operatori. Il più semplice è `!`, che nega un valore accanto ad esso.

```js An '!' operator
!true; // false
!false; // true

var health = 50,
    alive = !(health <= 0); // true
var dead = !alive; // false
```

Ci sono anche `&&`e `||`. Il primo è l'operatore "AND" e il secondo è "OR". Sono usati per operare con diversi valori booleani.

```js Use of '&&' and '||'
this.onGround = true;
var keyUp = ct.keyboard.down['up'], // Sarà "vero" se viene trattenuta il tasto freccia in alto
    canJump = this.onGround && keyUp;

this.powerFromLeft = false;
this.powerFromRight = true;
this.poweredOn = this.powerFromLeft || this.powerFromRight; // true
```

Nella parte successiva parleremo di istruzioni condizionali e cicli loop. Per ora, ti consiglio di leggere le [proprietà predefinite di Copie (le entità del gioco)](../ct.templates.html) e [Room (i livelli di gioco)](../ct.rooms.html) .
