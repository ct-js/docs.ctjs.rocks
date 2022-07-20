# Usando uma Animação por Ossos em Projetos ct.js

ct.js suporta a importação de animações DragonBones. Ele foi testado com o DragonBones v5.6, mas como o DragonBones tem uma boa compatibilidade com as versões anteriores, a versão v4.0 deve funcionar também. Dragonones é de uso gratuito e está disponível no [site oficial deles](http://dragonbones.com/).

## Importando Animação por Ossos

Para importar as animações com as suas texturas, você deve primeiro abrir o seu projeto DragonBones. Esteja certo de que você chamou a sua armadura extamente como `Armature`.

![](./../images/skeletalAnimationsDB_03.png)

Selecione File — Export…

![](./../images/skeletalAnimationsDB_01.png)

Você então abre a aba "Animation Data + Texture". Esteja certo que você exportou o DragonBones para **JSON** (e não para o formato binário!) e que o seu background é transparente. Você pode configurar outros parâmetros que você queira. Em seguida pressione o botão "Finish".

![](./../images/skeletalAnimationsDB_02.png)

Você irá obter três arquivos na pasta onde você exportou:

* `Animation_ske.json`;
* `Animation_tex.json`;
* `Animation_tex.png`.

Tudo o que nós precisamos é que esses três arquivos estejam na mesma pasta. Abra o ct.js, e na aba `Textures`, pressione o botão "Import" sob a seção "Skeletal Animation". Localize o arquivo `Animation_ske.json` e o adicione. Ct.js então importará todos os três arquivos para o seu projeto.

## Usando Animações por Ossos

Animações por Ossos são diferentes dos sprites das copies, e desse forma eles não terão recursos com a detecção de colisão, mas eles podem ser adicionados para qualquer copy regular.

Para adicionar uma animação skeletal para uma copy, escreva isso em seu código `OnCreate`:

```js
this.skel = ct.res.makeSkeleton('YourAnimationName');
this.skel.animation.play('DefaultAnimation');

this.addChild(this.skel);
this.graph = -1; // Isto ocultará o próprio sprite da copy
```

Existem algumas funções para manipular os ossos:

* `skel.animation.play('AnimationName');`
* `skel.animation.fadeIn('NewAnimation', durationInSecs);`
* `skel.armature.getSlot("SlotName").display = false;`

Exemplo de como adicionar efeitos dinâmicos em uma animação por ossos:

```js
/* Draw event */
var anim = this.skel.animation;

if (this.onGround) { // deve ser definido antes
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

## Respondendo aos Eventos da Animação

Ct.js automaticamente ouvirá por eventos de som dentro do DragonBones skeleton. Os nomes que você define em seu projeto DragonBones devem ser os mesmos que os sons do ct.js.

Para ouvir por um evento específico, adicione esse código logo após ter anexado os ossos ao sprite:

```js
this.skel.on(dragonBones.EventObject.FRAME_EVENT, event => {
    if (event.name === 'Shoot') {
        /* Define a lógica do tiro aqui */
    } else if (event.name === '...') {
        /* ... */
    }
});
```
