# ct.u

Esse objeto contém um número acessível de funções úteis com o objetivo de facilitar o processo de desenvolvimento.

## Métodos e propriedades

### `ct.u.ldx(length, direction)` and `ct.u.lengthDirX(length, direction)`

Obtém a parte horizontal de um vetor.

### `ct.u.ldy(length, direction)` and `ct.u.lengthDirY(length, direction)`

Obtém a parte vertical de um vetor.

### `ct.u.pdn(x1, y1, x2, y2)` and `ct.u.pointDirection(x1, y1, x2, y2)`

Obtém a direção do vetor a partir (x1;y1) até (x2;y2).

### `ct.u.pdc(x1, y1, x2, y2)` and `ct.u.pointDistance(x1, y1, x2, y2)`

Obtém a distância entre os pontos (x1;y1) e (x2;y2).

### `ct.u.rotate(x, y, deg)`

Rotaciona o vetor para o ângulo dado. Retorna o array com duas entradas: as componentes `x` e `y`.

### `ct.u.rotateRad(x, y, rad)`

O mesmo que `ct.u.rotate`, mas o ângulo fornecido é em radianos.

### `ct.u.degToRad(deg)`

Converte graus para radianos.

### `ct.u.radToDeg(rad)`

Converte radianos para graus.

### `ct.u.deltaDir(dir1, dir2)`

Retorna a diferença entre duas direções, em graus.

### `ct.u.clamp(min, val, max)`

Retorna um valor fixo `val` limitados ao mínimos ao máximos especificados.Returns a clamped value.

### `ct.u.lerp(a, b, alpha)`

Interpola linearmente um valor de `a` até `b`, retornando `a` se `alpha` = 0 e `b` se `alpha` = 1.

### `ct.u.unlerp(a, b, val)`

Um oposto para `ct.u.lerp`. Retorna uma posição de `val` dentro do intervalo de `a` até `b`. Se `val` estiver dentro do intervalo, esse método retorna um valor entre 0 e 1.

### `ct.u.prect(x1, y1, arg: Array|Copy)` e `ct.u.pointRectangle(x1, y1, arg: Array|Copy)`

Verifica se o ponto (x1;y1) fornecido está dentro do retângulo. `arg` pode ser um array de coordenadas ([x1, y1, x2, y2]) ou uma Copy com uma forma retangular.

### `ct.u.pcircle(x1, y1, arg: Array|Copy)` and `ct.u.pointCircle(x1, y1, arg: Array|Copy)`

Verifica se o ponto fornecido está dentro de um círculo. `arg` pode ser um array com [x1, y1, raio], ou uma Copy com uma forma circular.

### `ct.u.wait(time)`

Retorna um Promise. Espera `time` em milissegundos, e então o resolve sem qualquer dados. Rejeita se uma nova room foi carregada antes do Promise ser resolvida. Exemplo:

``` js
var enemy = whatever;
enemy.state = 'Disappear';
ct.u.wait(1000)
.then(() => {
    if (!enemy.kill) { // this will happen a second after the code above was called.
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
