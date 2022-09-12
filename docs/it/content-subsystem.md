# Content subsystem - dati strutturati personalizzati

Il "content subsystem" (sottosistema dei contenuti) è un set contenente editor e procedure di esportazione che ti consentono di progettare, creare e utilizzare dati  strutturati all'interno del tuo gioco. Può immaginarlo come un database locale del tuo progetto. Ad esempio, può essere utilizzato per progettare bottini, livelli o ondate in un gioco tipo difesa della torre, o missioni o dialoghi in un gioco di ruolo o qualsiasi altra cosa simile nella struttura ad una tabella.

Il sottosistema dei contenuti può memorizzare valori semplici come numeri,  stringhe, valori booleani e anche riferimenti alle tue risorse, come template e room.

In sostanza, il "content subsystem" è costituito da:

* l'editor del tipo di contenuto che ti consente di progettare le tue strutture di dati
* l'editor di voci del contenuto che ti consente di creare e modificare i  tuoi contenuti in un'interfaccia simile a una tabella
* i dati esportati disponibili sotto il namespace `ct.content`.

## Progettazione dei dati

Puoi creare nuovi tipi di contenuto nella scheda "Project -> Content type editor".

Ogni tipo di contenuto ha questi campi:

* **Content type name** (il nome del contenuto) Questo è il nome della proprietà che utilizzerai nel tuo codice JS, quindi pensaci bene e scrivi un nome semplice senza spazi. Ad esempio, se scegli come nome per il tuo contenuto `Quests`, potrai accedervi nel gioco con `ct.content.Quests`.
* **Readable name** (il nome leggibile) Se il tuo nome principale non è del tutto leggibile, per esempio `BuffsNCurses`, puoi scrivere un nome diverso che verrà visualizzato nella GUI di ct.IDE. Non ha effetto sul codice che scrivi.
* **Icon** l'icona visualizzata nell'interfaccia utente di ct.IDE.
* **Content schema** (struttura del contenuto) Questo è un elenco di tutti i campi di ciascuna voce del tuo nuovo contenuto.

La struttura del contenuto è descritta con una tabella. Ogni riga sarà un campo dell'oggetto. Analogamente ai tipi di contenuto stessi, anche i campi hanno un nome regolare e uno leggibile. Se nomini il tuo campo `title`, sarai in grado di accedere al titolo della prima voce nel tuo contenuto con `ct.content.Quests[0].title`.

Oltre a un nome, ogni campo ha un tipo. I campi possono contenere valori semplici come stringhe, numeri e valori booleani, ma possono anche fare riferimento a risorse nel progetto: come texture, template, suoni, emettitori di particelle e livelli di gioco. Nel codice, tali riferimenti diventeranno stringhe — i nomi delle tue risorse.

Ci sono anche due caselle di controllo per ogni riga: "Required" e "Array".

* **Required** indica i campi obbligatori che devono essere compilati, altrimenti visualizzeranno un avviso nell'interfaccia utente di ct.IDE.
* Se **Array** è spuntato, un pulsante ti permetterà di editare la lista in corrispondenza di ogni voce, consentendoti di aggiungere un numero arbitrario di valori.

![An example of a content type with array field](../images/contentEditor_Arrays.png)

Ecco un esempio di un tipo di contenuto "Gear" (equipaggiamento):

![](../images/contentEditor_SchemaExample.png)

## Modifica dei dati

La modifica dei dati è semplice — una volta progettati, puoi iniziare a creare voci per il tipo di contenuto appena creato. Per ogni tipo di contenuto che crei, ci sarà una nuova sezione nella scheda "Project", proprio sotto "Catmods' settings".

![](../images/contentEditor_Tabs.png)

Crea voci con il pulsante "Add a row" (aggiungi una riga) e compila la tabella. Potrai rimuovere o aggiungere campi se dovrai modificare lo schema, ma tieni presente che la rimozione di campi dallo schema del contenuto è irreversibile.

## Usare i dati

Il modo più semplice per esplorare la struttura risultante dei tuoi dati è scrivere `ct.content.TypeName`nella console del debugger ed espandere i campi visualizzati:

![](../images/contentEditor_Inspect.png)

Sei libero di utilizzare i dati come preferisci — tutto viene rappresentato come oggetti all'interno di un array. Se non sai ancora come manipolare oggetti e array, leggi il nostro [terzo capitolo dell'introduzione a JS](jsintro_pt3.html) . Probabilmente dovrai anche [leggere riguardo ai loop qui](jsintro_pt2.html) .
