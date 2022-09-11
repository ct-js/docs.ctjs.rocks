# Utilizzo dell'animazione a scheletro nei progetti ct.js

ct.js supporta l'importazione di animazioni create con DragonBones. È stato testato con DragonBones v5.6 ma, poiché DragonBones ha una buona compatibilità con le versioni precedenti, dovrebbe funzionare anche con la v4.0. Dragonones è gratuito ed è disponibile sul [loro sito ufficiale](http://dragonbones.com/) .

## Importazione dell'animazione a scheletro

Per importare le animazioni con le loro texture, dovresti prima aprire il tuo progetto DragonBones. Assicurati che la tua armatura sia chiamata esattamente `Armature`.

![](../images/skeletalAnimationsDB_03.png)

Seleziona File — Export…

![](../images/skeletalAnimationsDB_01.png)

Devi poi aprire la scheda "Animation Data + Texture". Assicurati di esportare DragonBones **JSON** (non il formato binario!) e che il tuo sfondo sia trasparente. Puoi impostare altri parametri, come preferisci. Quindi, clicca il pulsante "Finish".

![](../images/skeletalAnimationsDB_02.png)

Otterrai tre file nella directory di output:

* `Animation_ske.json`;
* `Animation_tex.json`;
* `Animation_tex.png`.

Avremo bisogno che tutti e tre i file si trovino nella stessa posizione. Apri ct.js, quindi la scheda "Textures" e premi il pulsante "Import" a fianco di "Skeletal Animation". Individua il file `Animation_ske.json`e aggiungilo. Ct.js importerà quindi tutti e tre i file nel tuo progetto.

## Utilizzo delle animazioni a scheletro

Le animazioni a scheletro sono diverse dagli sprite delle normali copie e quindi non avranno funzionalità come il rilevamento delle collisioni, ma possono essere aggiunte a qualsiasi tradizionale copia.

Per aggiungere un'animazione a una copia, scrivi questo nel suo codice "Creation":

```js
this.skel = ct.res.makeSkeleton('YourAnimationName');
this.skel.animation.play('DefaultAnimation');

this.addChild(this.skel);
this.graph = -1; // This will hide the copy's own sprite
```

Queste sono alcune funzioni utili a manipolare lo scheletro:

* `skel.animation.play('AnimationName');`
* `skel.animation.fadeIn('NewAnimation', durationInSecs);`
* `skel.armature.getSlot("SlotName").display = false;`

Example of adding dynamic skeletal animation with blends:

Esempio di utilizzo di varie animazioni dinamiche:

```js
/* Evento "Frame end" */
var anim = this.skel.animation;

if (this.onGround) { // definito in precedenza
    if (this.hspeed === 0) {
        if (anim.lastAnimationName !== 'Stand') {
            anim.fadeIn('Stand', 0.2);
        }
    } else {
        if (anim.lastAnimationName !== 'Run') {
            anim.fadeIn('Run', 0.3);
        }
    }
} else {
    if (anim.lastAnimationName !== 'Jump') {
        anim.fadeIn('Jump', 0.2);
    }
}
```

## Rispondere agli eventi di animazione

ct.js ascolterà automaticamente gli eventi sonori all'interno dello scheletro di DragonBones. I nomi che definisci nel progetto DragonBones dovranno essere gli stessi utilizzati nella sezione dei suoni di ct.js.

Per ascoltare gli eventi personalizzati, aggiungi questo codice subito dopo la definizione dello scheletro all'interno di uno sprite:

```js
this.skel.on(dragonBones.EventObject.FRAME_EVENT, event => {
    if (event.name === 'Shoot') {
        /* Definisci la logica per lo sparo qui */
    } else if (event.name === '...') {
        /* ... */
    }
});
```
