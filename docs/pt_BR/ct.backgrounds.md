# ct.backgrounds

`ct.backgrounds` tem uma API que funciona com os objetos [`Background`](Background.md).

## Métodos e propriedades

### `ct.backgrounds.list['TextureName']`

Contém um array com todos os backgrounds da textura atual na room. O array para este ou aquele nome de textura pode está ausente se ainda não houver tais backgrounds, então você pode precisar checar se o próprio array existe antes de tentar acessar algum de seus elementos.

#### Exemplo: Obtém o primeiro background da textura `BG_Sand` e a tornar mais escura

```js
if (ct.backgrounds.list['BG_Sand']) {
    const bg = ct.backgrounds.list['BG_Sand'][0];
    bg.tint = 0x999999;
}
```

### `ct.backgrounds.add(texName, frame, depth, container)`

Argumento | Tipo | Descrição
-|-|-
`texName` | `String` | O nome da textura a ser usada como background
`frame` | `Number` | *(opcional)* O índice de um frame a ser usado. O padrão é `0`.
`depth` | `Number` | *(opcional)* A profundidade em que devemos pôr o background. O padrão é `0`.
`container` | `PIXI.Container` | *(opcional)* Onde devemos pôr o background. O padrão é `ct.room`, mas pode ser qualquer outra room ou pixi container válido.

**Retorna** a instância [`Background`](Background.html) criada.

::: tip Dica
Visite a [documentação da classe `Background`](Background.html) para aprender como ajustar a posição, aparência e movimento de um background.
:::

#### Exemplo: Criando um background, definindo a sua transparência e fazendo com que ele se mova horizontalmente

```js
const bg = ct.backgrounds.add('BG_SkyClouds', 0, -1000);
bg.alpha = 0.5;
bg.movementX = 1;
```