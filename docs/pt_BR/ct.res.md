# ct.res

Esse módulo é responsável por carregar os recursos em seus projetos de jogos. Com esse módulo, você pode carregar recursos adicionais durante o jogo.

## `ct.res.loadScript(url: string): Promise<void>;`

Carrega e executa o script pela URL. A URL do do arquivo de script pode ser relativa ou absoluta.

## `ct.res.loadTexture(url: string, name: string, textureOptions: ITextureOptions): Promise<PIXI.Texture[]>;`

Carrega uma imagem individual como uma textura ct.js rotulada.

* `url` - O caminho para o arquivo de imagem.
* `name` - O nome da textura ct.js, pois é esse nome que você usará em seu código para acessar a textura.
* `textureOptions` - Informação sobre o eixo da textura e a máscara de colisão:
    * `shape`: veja "Criando máscaras de colisões dinamicamente" para o ct.place no ct.IDE, localizado no painel flutuante direito na aba "Modules' docs" ou "Documentações dos módulos".
    * `anchor`:
        * `x`: um número de 0 até 1, com with 0 sendo o lado esquerdo, 0.5 sendo o centro e 1 sendo o lado direito.
        * `y`: um número de 0 até 1, com 0 sendo a parte superior, 0.5 sendo o centro e 1 sendo a parte inferior.

### Exemplo: carregando uma textura adicional em ct.js

```js
ct.res.loadTexture('Background_42.png', 'Background_42', {
    anchor: {
        x: 0,
        y: 0
    }
})
.then(textureName => {
    // Adiciona um background para a room atual com um profundidade de -100.
    ct.backgrounds.add(textureName, 0, -100);
});
```

## `ct.res.loadDragonBonesSkeleton(ske: string, tex: string, png: string, name: string): void;`

Carregar para o jogo um esqueleto, uma animação por ossos, feito no DragonBones
* `ske` -  o caminho do arquivo `_ske.json` que contém a armadura e as animações.
* `tex` - o caminho do arquivo `_tex.json` que descreve o atlas com as texturas do esqueleto.
* `png` - o caminho do atlas `_tex.png` que contém todas as texturas do esqueleto.
* `name` - o nome do esqueleto que será usado em seu jogo ct.js.

## `ct.res.loadAtlas(url: string): Promise<string[]>;`

Carrega um arquivo .json com a sua imagem de origem compatível com o Texture Packer, adicionando texturas ct.js ao jogo.

* `url` - O caminho para o arquivo JSON que descreve as texturas do atlas.

O método retorna um promise que resolve em um array com com todas as texturas ct.js carregadas (um array com os nomes das texturas).

## `ct.res.loadBitmapFont(url: string, name: string): Promise<string>;`

Carrega uma fonte bitmap através de um arquivo XML.
* `url` - O caminho para o arquivo XML que descreve as fontes bitmap.
* `name` - O nome da fonte.

Retorna uma promise que resolve no nome da fonte (aquela que você passou em `name`).

## `ct.res.getTexture(name: string): PIXI.Texture[];`

Obtém uma textura pixi.js através do nome de uma textura ct.js, o que significa que ela pode ser utilizada em objetos pixi.js.

* `name` O nome da textura ct.js. Se `-1` (um número) é fornecido em vez do nome da textura, então uma textura vazia será retornada.

Retorna um array com todos os frames dessa textura ct.js. Abaixo existe uma forma expandida do ct.res.getTexture que retorna frames individuais.

## `ct.res.getTexture(name: string, frame: number): PIXI.Texture;`

Obtém uma textura pixi.js a partir do nome de uma textura ct.js, então a mesma pode ser usada em objetos pixi.js.
* `name` — O nome da textura ct.js. Se `-1` (um número) é fornecido em vez do nome da textura,então uma textura vazia será retonada.
* `frame` — O índice do frame a ser extraído.

Retorna uma simples PIXI.Texture.

## `ct.res.makeSkeleton(name: string, skin?: string): unknown;`
Cria um esqueleto DragonBones, pronto para ser adicionado em suas copies.
* `name` - O nome do esqueleto.
* `skin` - Opcional; permite que você determine a pele necessária.

Retorna o esqueleto criado.

Veja também: [Usando animações por ossos em projetos ct.js](skeletal-animation)