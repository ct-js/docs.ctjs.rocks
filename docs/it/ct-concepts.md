# Concetti base

**LEGGI CON ATTENZIONE LA DEFINIZIONE DEI TERMINI SOTTO RIPORTATI**

**Ct.js** è una libreria modulare scritta in JavaScript, abbinata a un editor visuale. Ci riferiremo all'editor con il nome di **ct.IDE** . I giochi in ct.js sono anch'essi scritti in JavaScript: è il linguaggio di  programmazione del web, è flessibile, facile da imparare e molto completo.

Ogni gioco creato coon ct.js è costituito da **texture**, **copie**, **template** e **room**. Impara questi termini perchè li incontrerai numerose volte all'interno della documentazione.

* Una **texture** è una semplice immagine e da sola non fa molto, ma viene utilizzata dalle copie, che sono le entità del gioco, e può essere disegnata con il codice. Questa risorsa può rappresentare lo sprite di un gioco, ma può anche essere un set di tile, uno sfondo, etc...
* Una **copia** è un'entità logica del tuo gioco che può interagire con gli input dell'utente e altre copie. Nemici, alberi, proiettili, gemme, bonus, gatti: ognuno di queste cose è una copia. Le copie sono spesso chiamate *"oggetti"* , *"attori"* o *"istanze"* in altri game engine.
* Ogni copia corrisponde a un **template** specifico. Un template è un modello base che viene utilizzato per la creazione delle copie, ereditando da questo le impostazioni e i comportamenti che lo animano. Per esempio ogni navicella nemica, in un gioco di guerre stellari, è una copia che viene creata utilizzando lo stesso template, perchè ognuna avrà certamente la stessa immagine, velocità, abilità di sparare per esempio. Il template può essere chiamato *classe* o *oggetto* in altri game engine.
* Una **room** (stanza o livello di gioco o mappa) is a 2D space in your game where you place your copies. Rooms may have their own additional behavior (level scripts). Rooms are also often referred to as *levels* or *maps*. A notable difference is that rooms in ct.js are boundless when other 2D engines tend to set a specific size to it.
* Una room (spesso indicata anche come stanza o livello di gioco o mappa)  è uno spazio 2D del tuo gioco in cui puoi inserire le tue copie. Le room possono avere la propria logica aggiuntiva - gli script del livello di gioco. Una differenza notevole è che questi livelli di gioco in ct.js sono illimitati mentre altri motori 2D tendono ad impostarne una dimensione specifica.

Ci sono caratteristiche aggiuntive che aiutano a rendere i giochi più succosi, belli, divertenti da giocare e facili da sviluppare:

* [**Azioni**](../actions.html) che combinano diversi metodi di input in un'unica API, così puoi scrivere un codice unico per gestire tastiere, gamepad, joystick virtuali e altro.
* **I Catmod** sono moduli aggiuntivi che modificano la libreria principale e aggiungono nuovi strumenti per la programmazione e funzionalità al game engine.
* **I font personalizzati** ti consentono di aggiungere file .ttf nei tuoi giochi, in modo che il tuo gioco abbia un bell'aspetto in ogni browser o PC.
* **Gli emettitori,** o semplicemente i sistemi di particelle, sono effetti visivi flessibili creati partendo dalle texture. Con questi si possono realizzare esplosioni, effetti magici, pioggia, neve e altri effetti speciali molto facilmente.
* [**Animazioni mediante scheletro**](../skeletal-animation.html) per personaggi dotati di skin e con animazioni fluide.
* **I suoni** sono risorse audio che vengono riprodotte dal codice.
* **Gli stili di testo** sono modelli per disegnare etichette all'interno dell'interfaccia utente.
