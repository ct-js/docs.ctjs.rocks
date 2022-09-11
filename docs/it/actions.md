# Action - le azioni

Le azioni sono un livello di astrazione che riguardano i vari metodi di input, ti consentono di scrivere un'unica istruzione per gestirne vari dispositivi che si  tratti di tastiera, mouse, gamepad, tasti virtuali o tutto ciò che può essere collegato a ct.js per interagire nel gioco. Il vantaggio è che un'unica azione resta in ascolto non solo più dispositivi contemporaneamente ma, ad esempio, anche di più pulsanti di uno specifico dispositivo. Ad esempio, puoi ascoltare contemporaneamente WASD e le frecce della tastiera e il codice sarà come se stessi ascoltando una cosa sola (e anche meno). Se verranno aggiunti controlli di un gamepad, la quantità del tuo codice non cambierà.

![](../images/actions.png)

Affinché le azioni funzionino, è necessario collegare moduli particolari: fornitori di metodi di input. Le azioni stesse sono descritte nella scheda "Settings", sotto il pulsante "Actions and input methods". Ct.js viene fornito con una serie di provider di input predefiniti: `ct.mouse` per tenere traccia dei clic del mouse `ct.keyboard` per le sequenze di tasti `ct.touch` e `ct.vkeys` per dispositivi mobili, `ct.gamepad`.

Tutti questi moduli si trovano e si possono abilitare nella scheda "Catmods" nelle impostazioni di un progetto, nella categoria "Input methods":

![](../images/actions_filterInputProviders.png)

## Creare di nuove azioni

Per creare una nuova azione, vai alla scheda "Project", quindi fai clic sulla scheda "Actions and input methods" in alto a sinistra. Viene visualizzato un pannello in cui le azioni sono specificate nella parte a sinistra e i metodi di input a destra.

![Apertura editor per le azioni](../images/actions_02.png)

Fare clic sul pulsante "Add Action". Descriveremo ora lo standard e, forse, la caratteristica più importante di qualsiasi gioco ­– "Il movimento". Se hai un gioco platform, avrai solo bisogno del movimento orizzontale, ma potrebbe essere necessario anche il movimento verticale. Definisci quindi queste due azioni `MoveX` e `MoveY` per lo spostamento orizzontale e verticale rispettivamente.

Aggiungi il primo metodo di input al movimento orizzontale con il pulsante corrispondente. Clicca "Add an input method" e nel modulo che appare, individua il pulsante `A` (puoi inserirlo nella barra di ricerca e se non lo trovi verifica di aver attivato il modulo "Keyboard" in "Catmods"), quindi fai clic su "Select". Fai lo stesso per i tasti `D`, `ArrowLeft` e `ArrowRight`. Dovrebbe apparire così:

![Creazione di un movimento orizzontale per platform](../images/actions_01.png)

Ma aspetta `A` e `D` puntano in direzioni opposte! Come fa il codice a capire dove spostare il personaggio del gioco? Il fatto è che nel codice, le azioni assumono valori da -1 a 1, e usando numeri negativi possiamo indicare che dobbiamo andare, diciamo, a sinistra e usando quelli positivi a destra. Questo viene fatto usando la colonna **multiplier**, dei moltiplicatori . Se specifichi il moltiplicatore -1 ad `A`, quando lo premi, l'azione restituirà il valore -1 e se `D` viene lasciato a 1, quando premi `D`, l'azione varrà 1.

In ct.js, il valore orizzontale `X` cresce da sinistra a destra e il valore `Y` aumenta dall'alto verso il basso. Se non si ruota la telecamera e se si dispone di una tastiera QWERTY, `A` sposterà a sinistra — direzione negativa della coordinata `X` — e `D` sposterà verso destra, la direzione crescente di `X`. Pertanto, assegneremo il moltiplicatore -1 sia ad `A` che al tasto `ArrowLeft` — freccia sinistra.

Dopo aver aggiunto un'altra azione, `MoveY`, assegneremo il moltiplicatore -1 ai tasti pulsanti `ArrowUp` e `W` (la direzione verso l'alto è quella negativa per l'asse verticale).

Se dovessimo definire un'azione elementare (ad esempio il salto), non avremmo bisogno di moltiplicatori. Se utilizzassimo il joystick di un gamepad, potrebbe essere necessario un moltiplicatore nel caso in cui il personaggio del gioco si muovesse nella direzione sbagliata.

## Esempi

**Una tipica configurazione iniziale per un platform**

![Setup azioni per un gioco Platform](../images/actions_03.png)

**Una configurazione tipica per uno sparatutto dall'alto**

![Setup azioni per uno sparatutto in ct.js](../images/actions_04.png)

