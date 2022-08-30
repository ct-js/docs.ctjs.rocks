# Utilizzare l'editor dei livelli di gioco (Room)

Per comprendere i termini in grassetto che seguono, leggi [la loro definizione qui](ct-concepts.md).

Con il termine **Room** si intendono i livelli di gioco, le mappe, gli spazi in cui si svolge il tuo gioco. Una room può rappresentare un livello, un menu, un widget  dell'interfaccia utente ed è il luogo in cui posizioni le tue **copie** (istanze dei tuoi modelli), sfondi e tile. Sapere come usarlo al meglio faciliterà il processo di progettazione dei livelli.

A partire dalla versione 3.0, l'editor ha cinque strumenti situati nel pannello di sinistra:

* Strumento di selezione per spostare, ridimensionare, ruotare e modificare i tuoi oggetti in vari modi. Si utilizza sia con le copie che con le tile.
* Strumento "Add copies" (aggiungi copie) per inserire nuove copie nel livello — le istanze dei tuoi **template**.
* "Add tiles" (aggiungi tile) per posizionare pezzi di **texture** immobili per disegnare la struttura, il paesaggio di sfondo, del tuo livello o anche solo per aggiungere decori.
* Lo strumento "Manage backgrounds" (gestisci sfondi) apre un pannello in cui puoi aggiungere e gestire i tuoi sfondi — ripetendoli per scopi decorativi.
* Lo strumento "Room properties" (proprietà della stanza) con le impostazioni della stanza e della telecamera.

![Barra degli strumenti dell'editor](../images/roomEditor_toolbar.png)

## Spostarsi all'interno del livello

Per spostarti:

* Tieni premuto il pulsante centrale del mouse (la rotellina) e sposta il cursore per spostare il punto di vista.
* Puoi ingrandire e rimpicciolire con la rotellina del mouse — si ingrandirà il punto in cui si trova il puntatore.

::: tip
Se ti perdi, puoi premere il tasto `H` per tornare al centro del tuo livello e ripristinare lo zoom. Trovare questo comando anche nel menu a discesa dello zoom:
![Comando che ripristina la vista nel menu zoom](../images/roomEditor_resetView.png)
:::

## Aggiunta di copie e di tile

Gli strumenti per aggiungere nuove copie e tile hanno funzionalità abbastanza simili.
* Per impostazione predefinita, puoi posizionare più copie o tile premendo il mouse e trascinandolo. Se la griglia è abilitata, ogni copia e riquadro si aggancerà ad essa; in caso contrario, verranno posizionati liberamente con spaziatura a seconda della dimensione della griglia configurata in precedenza.
* Se tieni premuto il tasto `Shift` prima di iniziare a posizionare una tessera o una copia, queste si disporranno lungo una linea retta: diagonale, verticale o orizzontale.
* Se si tiene premuto il tasto `Alt`, l'aggancio alla griglia verrà temporaneamente disabilitato.
* Infine, se tieni premuto il tasto `Ctrl`, sarai in grado di rimuovere elementi con il cursore, come se fosse una gomma.

### Lavorare con le tile (piastrelle)

Per lavorare con le tile, hai bisogno di una texture che sia configurata  correttamente — assicurati di aver impostato una dimensione del fotogramma corretta ed un numero di colonne e righe adeguati. In generale, qualsiasi texture ct.js può funzionare come tileser, anche se è composta da un solo riquadro. Puoi utilizzare questa funzione per posizionare decorazioni fisse all'interno dei tuoi livelli.

Ecco un esempio di un set di tile impostato correttamente:

![Un esempio di un set di tile correttamente impostato](../images/roomEditor_tilesetSettings.png)

Per iniziare a lavorare con le tile, premi lo strumento "Add tiles" nella barra degli strumenti a sinistra e premi il pulsante "Find a Tileset" (trova un set di tile). Assicurati di avere un livello per le tile: i livelli sono elencati sotto la texture importata. Se non ne hai, fai clic sul pulsante "Add" e inserisci la sua profondità desiderata.

In fine seleziona una tessera salla texture che hai importato e posizionala all'interno del livello con un clic. Puoi selezionare più riquadri premendo e trascinando il puntatore su più fotogrammi. Dopodiché, disegna con le tessere usando il mouse.

:::tip
Ricorda che ogni piastrella è posizionata in un livello di tilead una certa profondità — non è possibile posizionare ogni piastrella su un livello di profondità arbitrario.

Anche la creazione di un eccessivo numero di livelli non è consigliata, perché 1) è stupido e 2) ogni livello di riquadri memorizza nella cache i suoi contenuti per aumentare le prestazioni di rendering e, se usi troppi livelli, annulli l'aumento delle prestazioni e peggiora la situazione a livello di RAM.
:::

## Strumento di selezione

Lo strumento di selezione è probabilmente lo strumento creativo più  potente dell'editor — funziona in modo analogo agli editor per le immagini, poiché puoi riposizionare, ruotare, ridimensionare e persino ricolorare più entità contemporaneamente.

Quando lo strumento di selezione è attivo, trascina il mouse attorno alle copie o alle tile per disegnare un rettangolo e selezionarle. Puoi anche selezionare singoli oggetti facendo clic su di essi.

::: tip
Puoi modificare la categoria di entità selezionate, attivandola accanto all'intestazione "Select:".
:::

Quando hai selezionato qualcosa, apparirà un rettangolo con diverse maniglie colorate:

* Le maniglie agli angoli del rettangolo ridimensioneranno la selezione quando le trascini;
* Le maniglie sui lati ridimensioneranno la sola larghezza o altezza.
* Una maniglia livera sul lato destro ruoterà la selezione.

Mentre si sta scalando un'entità, è possibile utilizzare questi tasti modificatori:

* Tenere premuto `Shift` farà in modo che le maniglie diagonali ridimensionino proporzionalmente la selezione;
* Tenere premuto `Alt` ignorerà la griglia;
* L'uso di `Ctrl` renderà la scalatura simmetrica rispetto al centro.

Durante la rotazione degli oggetti, tieni premuto il `Shift` per ruotare di un multiplo di 15 gradi.

Puoi anche modificare i valori nel pannello delle proprietà a sinistra, ma tieni presente che contrariamente al riquadro di selezione che trasforma tutto in un gruppo, il pannello delle proprietà cambia i valori per ciascun oggetto individualmente.

## Aggiunta di sfondi

Gli sfondi vengono aggiunti con il quarto strumento della barra. Al suo interno, c'è un pulsante "Add a Background" (aggiungi uno sfondo) che apre un selettore di texture. Ci sono diverse cose da considerare con l'utilizzo degli sfondi:

* Una texture dovrebbe essere contrassegnata come sfondo quando viene importata; altrimenti avrà strappi e buchi nei punti di cucitura, quando viene replicata. Comunque verrà visualizzato un messaggio di avviso se si tenta di utilizzare una texture normale.
* Gli sfondi multi-frame, al momento, non sono ancora supportati.

Puoi cambiare la texture dello sfondo cliccando sulla texture corrente. Altre proprietà sono nascoste in un pannello che appare facendo clic sull'icona ⚙ a forma di ingranaggio..

![Apri le impostazioni per lo sfondo facendo clic sull'ingranaggio](../images/roomEditor_backgroundSettings.png)

* La profondità cambia l'ordine di visualizzazione a copie, riquadri e altri sfondi. Impostandolo su un valore alto, verrà disegnato sopra a tutte le cose.
* I campi "Shift" (spostamento) posizionano lo sfondo nella room.
* I campi "Scaling" (ridimensionamento) allungano lo sfondo. Valori inferiori a 1 lo renderanno più piccolo, mentre valori maggiori di 1 lo renderanno più grande. L'uso di valori negativi capovolgerà lo sfondo.
* "Movement speed" (velocità di spostamento) consente di creare sfondi in movimento. Questo può essere utilizzato per creare effetti di pioggia che cade o di nuvole in movimento.
* "Parallax" cambia il modo in cui lo sfondo si sposta rispetto alla telecamera. Puoi impostare valori inferiori a 1 per creare un senso di profondità. I valori maggiori di 1 vengono generalmente utilizzati per i primi piani.
* La casella "Repeat" (ripeti) ti consente di scegliere come affiancare lo sfondo:                
  * `repeat` ripeterà lo sfondo affiancandolo in entrambe le direzioni
  * `repeat-x` ripeterà lo sfondo orizzontalmente
  * `repeat-y` ripeterà lo sfondo verticalmente
  * `no-repeat` non ripeterà lo sfondo affatto

## Proprietà del livello

La scheda "Properties" (proprietà) dell'editor stanza ha opzioni per il rendering e le modifiche della telecamera.
* "View width" e "View height" (larghezza e altezza della vista) definisce la dimensione iniziale della telecamera, ovvero l'area che mostra. Poiché la risoluzione e le dimensioni del canvas renderizzato è piuttosto elastico in ct.js, grazie al modulo `ct.fittoscreen`, questi non corrispondono alla risoluzione dello schermo — impostano solo quanto la telecamera mostri dell'intero livello e definisce le proporzioni tra i lati della vista. Tutto il resto è calcolato tramite `ct.fittoscreen` (puoi cambiarne le impostazioni nella scheda "Project").
* La casella di controllo "Keep camera in a rectangle" (mantieni la telecamera in un rettangolo) mostra i controlli per limitare ciò che la telecamera può mostrare durante i suoi spostamenti. Per impostazione predefinita, le room e le telecamere in ct.js sono illimitate, ma se abilitata, i bordi della telecamera non supereranno la regione specificata.
* "Background color" (colore sfondo) imposta il colore delle aree non coperte da copie, riquadri o texture di sfondo.
* La casella di controllo "Is a UI layer" (è un livello dell'interfaccia utente UI) indica come posizionare il livello quando questo viene utilizzato all'interno di un'altro. I livelli dell'interfaccia utente seguono la telecamera in genere e non sono  interessati dallo zoom, perfetti per i controlli dell'interfaccia utente (visualizzazione di punteggio, inventari, etc..).

::: tip
Per saperne di più sui livelli dell'interfaccia utente UI, vedi [la guida ai metodi append/prepend](ct.rooms.html#ct-rooms-append-nameoftheroom-ext-and-ct-rooms-prepend-nameoftheroom-ext) o [come il loro utilizzo pratico nel tutorial di JettyCat](tut-making-jettycat.html#creating-menus).
:::

## Strumenti aggiuntivi

Ci sono diversi strumenti aggiuntivi nella barra in alto dell'editor.

![Barra degli strumenti dell'editor](../images/roomEditor_topToolbar.png)

* I primi due pulsanti annullano o ripristinano le ultime modifiche fatte (equivalenti ai tasti di scelta rapida `Ctrl+Z`, `Ctrl+Shift+Z`). Ricorda che la dimensione della cronologia è limitata a circa 30 modifiche!

* L'interruttore "Simulate" (simula) abilita o disabilita le animazioni di sprite e sfondi nella stanza.

* Il selettore dello zoom ti consente di cambiare lo zoom se non hai un puntatore con un input a rotellina, come un mouse) e ha anche un'opzione per tornare al  centro della stanza.

* Il pulsante "Grid" (griglia) ha un sottomenu con diverse voci:                

  * Abilitazione/disabilitazione della griglia (`Ctrl+G`)
  * Abilitazione della griglia diagonale. Se vuoi una griglia pseudo-isometrica, dovrai impostare le dimensioni della griglia in un rapporto di 1:2
  * Modifica  le dimensioni della griglia

* Il menua forma di occhio ha interruttori per nascondere/mostrare entità specifiche nel livello. Ha anche due opzioni di visualizzazione speciali:                

  * Modalità raggi X: rende tutto trasparente, permettendo di vedere attraverso gli oggetti. Utile per posizionare oggetti nascosti e per scovare problemi di sovrapposizione.

  ![Modalità X-ray](../images/roomEditor_xRay.png)

  * "Colored tile layers" (layer di tile a colori): codifica a colori ogni layer di tile per distinguere visivamente quali piastrelle sono utilizzate e dove si trovano.
  ![Colored tile layers](../images/roomEditor_colorizeTileLayers.png)

* Il pulsante "Events" (eventi) apre un editor di script con tutti gli eventi del livello di gioco corrente.

## Tasti di scelta rapida

* `Q`, `W`, `E`, `R`, `T` permette la selezione degli strumenti — `Q` abiliterà lo strumento di selezione, `W` quello per l'aggiunta di copie e così via.
* `Ctrl+Z` annulla l'ultima modifica. `Ctrl+Shift+Z` la ripristina.
* `Ctrl+C` copia la selezione corrente, `Ctrl+V` la incolla (funziona solo con lo strumento Seleziona).
* `Ctrl+G` commuta la griglia.
* Dopo aver selezionato gli oggetti, puoi utilizzare i tasti freccia per spostarli. Utilizzare i tasti freccia + `Ctrl` tasto per disabilitare l'aggancio alla griglia.