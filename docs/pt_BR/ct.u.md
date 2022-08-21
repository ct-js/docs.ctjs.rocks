# ct.u

Esse objeto contém um número acessível de funções úteis com o objetivo de facilitar o processo de desenvolvimento.

## Geometria

### `ct.u.ldx(length, direction)` e `ct.u.lengthDirX(length, direction)`

Retorna o comprimento do vetor no eixo horizontal a partir do ângulo fornecido em `direction`.

### `ct.u.ldy(length, direction)` e `ct.u.lengthDirY(length, direction)`

Retorna o comprimento do vetor no eixo vertical a partir do ângulo fornecido em `direction`.

#### Exemplo: Cria uma bala em relação ao sprite do herói

```js
var dx = ct.u.ldx(40, this.angle),
    dy = ct.u.ldy(40, this.angle);
var bullet = ct.templates.copy('Bullet', this + dx, this + dy);
bullet.direction = this.angle;
```

### `ct.u.pdn(x1, y1, x2, y2)` e `ct.u.pointDirection(x1, y1, x2, y2)`

Obtém a direção do vetor o qual está apontando de (x1;y1) até (x2;y2).

### `ct.u.pdc(x1, y1, x2, y2)` e `ct.u.pointDistance(x1, y1, x2, y2)`

Obtém a distância entre os pontos (x1;y1) e (x2;y2).

### `ct.u.rotate(x, y, deg)`

Rotaciona o vetor para o ângulo dado. Retorna um objeto (`PIXI.Point`) com duas propriedades: as componentes `x` e `y`.

### `ct.u.rotateRad(x, y, rad)`

O mesmo que `ct.u.rotate`, mas o ângulo fornecido é em radianos. Retorna um objeto (`PIXI.Point`) com duas propriedades: as componentes `x` e `y`.

### `ct.u.degToRad(deg)`

Converte de graus para radianos.

### `ct.u.radToDeg(rad)`

Converte de radianos para graus.

### `ct.u.deltaDir(dir1, dir2)`

Retorna a diferença entre duas direções, em graus.

## Jogabiliddae e Coordenadas de UI

### `ct.u.uiToGameCoord(x, y)`

Converte as coordenadas de UI para as coordenadas de jogo. Retorna um objeto (`PIXI.Point`) com duas propriedades: as componentes `x` e `y`.

### `ct.u.gameToUiCoord(x, y)`

Converte as coordenadas de jogo para as coordenadas de UI. Retorna um objeto (`PIXI.Point`) com duas propriedades: as componentes `x` e `y`.

## Matemática

### `ct.u.clamp(min, val, max)`

Retorna um valor fixo `val` limitados aos mínimos e máximos especificados nos parâmetros `min` e `max`.

### `ct.u.lerp(a, b, alpha)`

Interpola linearmente um valor de `a` até `b`, retornando `a` se `alpha` = 0 e `b` se `alpha` = 1.

### `ct.u.unlerp(a, b, val)`

Um oposto para `ct.u.lerp`. Retorna uma posição de `val` dentro do intervalo de `a` até `b`. Se `val` estiver dentro desse intervalo, esse método retornará um valor entre 0 e 1.

### `ct.u.map(val, inMin, inMax, outMin, outMax)`

Remapeia o valor dado `val` de um intervalo de números (`inMin` - `inMax`) para outro (`outMin` - `outMax`).

## Verifica a existência de colisões internas

### `ct.u.prect(x1, y1, arg: Array|Copy)` e `ct.u.pointRectangle(x1, y1, arg: Array|Copy)`

Verifica se o ponto (x1;y1) fornecido está dentro do retângulo. `arg` pode ser um array de coordenadas ([x1, y1, x2, y2]) ou uma Copy com uma forma retangular.

### `ct.u.pcircle(x1, y1, arg: Array|Copy)` e `ct.u.pointCircle(x1, y1, arg: Array|Copy)`

Verifica se o ponto fornecido está dentro de um círculo. `arg` pode ser um array com [x1, y1, raio], ou uma Copy com uma forma circular.

## Diversos

### `ct.u.hexToPixi(hex: string)`

Converte uma string hexadecimal para uma cor Pixi.

#### Exemplo: Define a tonalidade da copy a partir da cor hexadecimal do CSS

```js
this.tint = ct.u.hexToPixi('#0dfac3');
```

### `ct.u.pixiToHex(pixi: number)`

Converte uma cor Pixi para um código de cor codificado em hexadecimal.

#### Exemplo: Define a cor de fundo da página através de uma cor Pixi

```js
document.body.style.backgroundColor = ct.u.pixiToHex(0x0dfac3);
```

### `ct.u.wait(time)`

Retorna uma Promise. Espera `time` em milissegundos, e então o resolve sem qualquer dados. Rejeita se uma nova room foi carregada antes da Promise ser resolvida. Exemplo:

``` js
var enemy = whatever;
enemy.state = 'Disappear';
ct.u.wait(1000)
.then(() => {
    if (!enemy.kill) { // isso acontecerá um segundo depois do código acima ser chamado.
        enemy.kill = true;
    }
});
```

### `ct.u.load(url: String, callback: Function)`

Carrega o script especificado e invoca o callback quando ele for carregado.

### `ct.u.ext(o1, o2[, arr: Array[String]])`

Transfere as propriedades do objeto de `o2` para `o1`. Você pode especificar um array com os nomes das propriedades que você quer transferir; caso contrário tudo será transferido.

::: warning Alerta:
Isso não cria [uma cópia em profundidade](https://we-are.bookmyshow.com/understanding-deep-and-shallow-copy-in-javascript-13438bad941c).
:::
