# ct.tilemaps

O objeto `ct.tilemap` permite fazer tilemaps no jogo. Ele também pode armazenar em cache os seus tilemaps, tornando o seu jogo notavelmente mais rápido, entretando, uma vez que os seus tilemaps estejam no chache, os mesmos não permitirão edição.

## Métodos do `ct.tilemaps`

### `ct.tilemaps.create(depth)`

Criar e retorna um novo tilemap. `depth` define a profundidade desse tilemap, o posicionando acima ou atrás de outros objetos.

**Retorna** uma nova instância criada de `Tilemap`.

### `ct.tilemaps.addTile(tilemap, textureName, x, y, frame)`

Adiciona um tile no tilemap especificado.
Parâmetro | Tipo | Descrição
-|-|-
`tilemap` | `Tilemap` | O tilema no qual o tile será adicionado.
`textureName` | `string` | O nome de uma textura ct.js de renderização.
`x` | `number` | A coordenada do eixo horizontal na qual o tile deve ser adicionado.
`y` | `number` | A coordenada do eixo vertical na qual o tile deve ser adicionado.
`frame` | `number` | *(opcional)* Deternmina qual o frame deve ser renderizado. O padrão é 0.

**Retorna** o tile criado, o qual é um [`PIXI.Sprite`](https://pixijs.download/release/docs/PIXI.Sprite.html).

### `ct.tilemaps.cache(tilemap, chunkSize)`

Armazena um tilemap em cache, agrupando os tiles em grandes pedaços e transformando os mesmos em vários bitmaps. Uma vez que esteja no cache, não pode mais ser modificado.

Parâmetro | Tipo | Descrição
-|-|-
`tilemap` | `Tilemap` | O tilemap a ser armazenado no cache.
`chunkSize` | `number` | *(opcional)* O tamanho mínimo de um pedaço. O padrão é 1024.

### `ct.tilemaps.cacheDiamond(tilemap, chunkSize)`

Habilita o cache nesse tileset, congelando e transformando o mesmo em uma série de texturas bitmaps. Isso proporciona uma grande aumento de velocidade, mas impede que seja feita edição adicional.

Essa versão empacota os tiles na forma de losango e organiza os mesmos de cima para baixo. Isso corrige o problema de junção entre os tiles para jogos isométricos.

Note que os tiles devem ser colocados em uma superfície plana para uma ordenação apropriada. Se você precisa de um efeito de elevação, considere descolcar cada tile com a propriedade `tile.pivot.y`.

Isso é o mesmo que chamar `tilemap.cacheDiamond();`

Parâmetro | Tipo | Descrição
-|-|-
`tilemap` | `Tilemap` | O tilemap a ser armazenado no cache.
`chunkSize` | `number` | *(opcional)* O tamanho mínimo de cada pedaço. O padrão é 1024.

## Métodos do `Tilemap`

`Tilemap` é uma subclasse de [`PIXI.Container`](https://pixijs.download/release/docs/PIXI.Container.html), e ela pode ser colorida ou pintada, transfromada e movida. Os métodos abaixo repetem os métodos de `ct.tilemaps`, mas eles estão em um estilo orientado a objetos.

### `tilemap.addTile(textureName, x, y, frame)`

Coloca um tile no tilemap atual.
Parâmetro | Tipo | Descrição
-|-|-
`textureName` | `string` | O nome de uma textura ct.js para ser renderizada.
`x` | `number` | A coordenada do eixo horizontal na qual o tile deve ser adcionado.
`y` | `number` | A coordenada do eixo vertical na qual o tile deve ser adcionado.
`frame` | `number` | *(opcional)* Determina qual o frame deve ser renderizado. O padrão é 0.

### `tilemap.cache(chunkSize)`

Armazena o tilemap no cache, agrupando os tiles em pedaços grandes e transformandos os mesmos em vários bitmaps. Uma vez armazenado no cache, o mesmo não pode ser mais modificado.

Parâmetro | Tipo | Descrição
-|-|-
`chunkSize` | `number` | *(opcional)* O tamanho mínimo de um pedaço. O padrão é 1024.

### `tilemap.cacheDiamond(chunkSize)`

Armazena o tilemap no cache, agrupando os tiles em grandes pedaços e transformando os mesmos em vários bitmaps. Uma vez armazenado no cache, o mesmo não pode ser mais modificado.

Essa versão empacota os tiles na forma de losango e organiza os mesmos de cima para baixo. Isso corrige o problema de junção entre os tiles para jogos isométricos.

Note que os tiles devem ser colocados em uma superfície plana para uma ordenação apropriada. Se você precisa de um efeito de elevação, considere descolcar cada tile com a propriedade `tile.pivot.y`.

Parâmetro | Tipo | Descrição
-|-|-
`chunkSize` | `number` | *(opcional)* O tamanho mínimo de um pedaço. O padrão é 1024.

## Exemplo: Cria uma linha de tiles com diferentes frames de textura

```js
this.tilemap = ct.tilemaps.create(-100);
for (let i = 0; i < 10; i++) {
    ct.tilemaps.addTile(this.tilemap, 'Tiles', i*64, 0, i);
}
this.tilemap.cache();
```

## Exemplo: Gera uma mapa feito de bloco e Perlin noise e habilita a colisão

Você vai precisar ativar o módulo `ct.noise` em seu projeto, além do módulo `ct.place` que já vem ativo por padrão, e de uma textura chamada de `RockTile`.

```js
const tilemap = ct.tilemaps.create(-100);
ct.noise.setSeed(); // Vamos randomizar o seed a cada início

// Vamos assumir que você tem uma textura chamada 'RockTile' de dimensões de 64x64px.
for (var x = 0; x < ct.camera.width / 64; x++) {
    for (var y = 0; y < ct.camera.height / 64; y++) {
        var value = ct.noise.simplex2d(x / 7, y / 7); // Retorna um valor de -1 até 1.
        if (value > 0) {
            const tile = tilemap.addTile('RockTile', x*64, y*64);
            // Os tiles são PIXI.Sprites; nós podemos ajustar a sua cor e transparência antes de ser armazenado no cache
            tile.alpha = value * 0.5 + 0.5;
        }
    }
}

tilemap.cache();
ct.place.enableTilemapCollisions(tilemap, 'Solid');
```