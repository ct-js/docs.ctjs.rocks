# u (утилиты)

Этот объект содержит множество полезных утилит для облегчения процесса разработки.

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

## Геометрия

### `u.ldx(длина, направление)` и `u.lengthDirX(длина, направление)`

Получает горизонтальную часть вектора.

#### Пример: Создание пуль, относящейся к спрайту героя

::: code-tabs#tutorial
@tab JavaScript
```js
var dx = u.ldx(40, this.angle),
    dy = u.ldy(40, this.angle);
var bullet = templates.copy('Bullet', this + dx, this + dy);
bullet.direction = this.angle;
```
@tab CoffeeScript
```coffee
dx = u.ldx 40, angle
dy = u.ldy 40, angle
bullet = templates.copy 'Bullet', this + dx, this + dy
bullet.direction = angle
```
:::

В приведенном примере создается новая пуля (bullet), которая спроецирована относительно положения героя на заданный угол (angle). Функции ldx и ldy используются для расчета смещения по осям X и Y соответственно, в зависимости от заданного угла. Затем создается копия шаблона "Bullet" с помощью функции templates.copy, передаются координаты пули с учетом смещения. Направление пули устанавливается равным углу героя (angle), чтобы она летела в направлении, куда смотрит герой.

### `u.ldy(длина, направление)` и `u.lengthDirY(длина, направление)`

Получает вертикальную часть вектора.

### `u.distance(from, to)`

Возвращает расстояние меж двумя объектами. У объектов обязательно должны быть свойства `x` и `y` (они есть у всех копий).

#### Пример: Получить расстояние от текущей копии до игрового персонажа

::: tabs#tutorial
@tab JavaScript
```js
var player = templates.list['Hero'][0];
if (templates.valid(player)) {
    console.log(u.distance(this, player));
}
```
@tab CoffeeScript
```coffee
player = templates.list['Hero'][0]
if templates.valid player
    console.log u.distance(this, player)
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>          <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">is valid</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>         <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/terminal.svg" class="feather"><span class="catnip-block-aTextLabel">Log to console</span>          <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">distance between</span>          <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>           <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">get array element</span>          <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>           <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>Hero</span></span>     </catnip-block>  <span class="catnip-block-aTextLabel">at</span>                     <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>      </catnip-block>
:::

### `u.direction(from, to)`

Возвращает угол вектора, идущего от одного объекта до другого, в градусах. У объектов обязательно должны быть свойства `x` и `y` (они есть у всех копий).

#### Пример: Выстрелить снаряд в направлении игрового персонажа

::: tabs#tutorial
@tab JavaScript
```js
var player = templates.list['Hero'][0];
if (templates.valid(player)) {
    var projectile = templates.copy('Laser', this.x, this.y);
    projectile.direction = u.direction(this, player);
}
```
@tab CoffeeScript
```coffee
player = templates.list['Hero'][0]
if templates.valid player
    projectile = templates.copy 'Laser', @x, @y
    projectile.direction = u.direction this, player
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>          <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">is valid</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>         <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Laser</span></span>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>     <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">projectile</span>               </catnip-block>          <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">projectile</span>               </catnip-block>         <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set direction to</span>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">direction</span>          <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>           <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">player</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">get array element</span>          <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>           <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>PotatoCat</span></span>     </catnip-block>  <span class="catnip-block-aTextLabel">at</span>                     <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>      </catnip-block>

:::

### `u.pdn(x1, y1, x2, y2)` и `u.pointDirection(x1, y1, x2, y2)`

Определяет направление вектора в градусах, указывающего с точки (x1, y1) на точку (x2, y2).

### `u.pdc(x1, y1, x2, y2)` и `u.pointDistance(x1, y1, x2, y2)`

Получает расстояние между точками (x1; y1) и (x2; y2).

### `г.rotate(x, y, deg)`

Поворачивает заданный вектор на заданный угол. Возвращает объект `PIXI.Point` с двумя свойствами: `x` и `y` компоненты.

### `u.rotateRad(x, y, рад)`

Тот же самый "u.rotate", но угол даётся в радианах. Возвращает объект (`PIXI.Point`) с двумя свойствами: "x" и "y".

### `u.degToRad(deg)`

Преобразует градусы в радианы.

### `u.radToDeg(рад)`

Преобразует радианы в градусы.

### `u.deltaDir(dir1, dir2)`

Возвращает разницу между двумя направлениями в градусах.

## Координаты игрового процесса и интерфейса пользователя

### `u.uiToGameCoord(x, y)`

Преобразует координаты из пользовательского интерфейса в игровые координаты. Возвращает объект (`PIXI.Point`), имеющий два свойства: `x` и `y`.

### `u.gameToUiCoord(x, y)`

Преобразует координаты игры в координаты интерфейса. Возвращает объект (`PIXI.Point`) с двумя свойствами: компонентами `x` и `y`.

## Математика

### `u.clamp(min, val, max)`

Возвращает значение `val`, прирезанное к значению `min` и `max`.

### `u.lerp(a, b, alpha)`

Линейно интерполирует значение от `a` до `b`, возвращая `a`, если `alpha` = 0, и `b`, если `alpha` = 1.

### `u.unlerp(a, b, val)`

Обратная функция к `u.lerp`. Возвращает позицию `val` в диапазоне от `a` до `b`. Если `val` находится внутри этого диапазона, метод вернет значение между 0 и 1.

### `u.map(val, inMin, inMax, outMin, outMax)`

Преобразует заданное `val` из одного диапазона чисел (`inMin` - `inMax`) в другой (`outMin` - `outMax`).

## Встроенные проверки столкновения

### `u.prect(x1, y1, arg: number[] | Copy)` и `u.pointRectangle(x1, y1, arg: number[] | Copy)`

Проверяет, находится ли заданная точка (x1;y1) внутри прямоугольника. `arg` может быть либо массивом координат ([x1, y1, x2, y2]), либо Копией с прямоугольной формой.

### `u.pcircle(x1, y1, arg: number[] | Copy)` и `u.pointCircle(x1, y1, arg: number[] | Copy)`

Проверяет, находится ли заданная точка внутри круга. `arg` может быть либо массивом [x1, y1, радиус], либо Копией с круглой формой.

## Значения времени

### `u.time`

Измерение того, сколько времени потребовалось для предыдущей рамки, чтобы нарисовать ее, в секундах. Вы можете использовать его, умножая на скорость ваших копий и другие значения с скоростью, чтобы получить такую же скорость при разных кадровых скоростях, независимо от задержек или максимальной пропускной способности кадров.

Если вы планируете изменить целевую кадровую скорость вашей игры, вам следует использовать `u.time` вместо `u.delta`.

**Минимальный пример:**
```js
this.x += this.windSpeed * u.time;
```

Обратите внимание, что `this.move()` уже использует это значение, поэтому нет необходимости умножать `this.speed` на него заранее.

### `u.timeUi`

Аналогично свойству `u.time`, это свойство также измеряет время между предыдущим и текущим кадрами, в секундах, но это значение игнорирует эффекты медленного воспроизведения и паузы игры. (См. здесь [поиск по советам и хитрощам /game-pause.md] для получения дополнительной информации о приостановке игры и изменении скорости игры.)

### `u.delta`

Измерение, показывающее, сколько времени ушло на отрисовку предыдущей кадра, обычно равное 1 и большее по величине при задержках. Например, если оно равно 2, это означает, что предыдущий кадр рисовался вдвое дольше, чем ожидалось на основе FPS-сокращения.

:::warning Это свойство устарело.
Используйте `u.time` вместо него.
:::

### `u.deltaUi`

Аналогично свойству `u.delta`, это свойство также измеряет время между предыдущим и текущим кадрами, но этот показатель игнорирует эффекты медленного воспроизведения и паузы в игре. (См. здесь [отсюда](/tips-n-tricks/game-pause.md), чтобы узнать о паузе в игре и изменении скорости игры.)

:::warning Это устаревшее свойство.
Используйте `u.timeUi` вместо него.
:::

## Разное:

### `u.hexToPixi(hex: string)`

Преобразует строку в шестнадцатеричном формате в цвет Pixi.

#### Пример: установить цвет оттенка копии из CSS-цвета

::: code-tabs#tutorial
@tab JavaScript
```js
this.tint = u.hexToPixi('#0dfac3');
```
@tab CoffeeScript
```coffee
@tint = u.hexToPixi '#0dfac3'
```
:::

### `u.pixiToHex(pixi)`

Преобразует цвет Pixi в шестнадцатеричный код цвета.

#### Пример: установить цвет фона страницы из цвета Pixi

::: code-tabs#tutorial
@tab JavaScript
```js
document.body.style.backgroundColor = u.pixiToHex(0x0dfac3);
```
@tab CoffeeScript
```coffee
document.body.style.backgroundColor = u.pixiToHex(0x0dfac3);
```
:::

### `u.wait(time)`

Возвращает Promise, который ждет `time` миллисекунд, а затем разрешается без каких-либо данных. Отклоняется, если в процессе ожидания загружается новая комната. Пример:

::: code-tabs#tutorial
@tab JavaScript
```js
var enemy = whatever;
enemy.state = 'Disappear';
u.wait(1000)
.then(() => {
    if (!enemy.kill) { // Выполнется через секунду
        enemy.kill = true;
    }
});
```
@tab CoffeeScript
```coffee
enemy = whatever
enemy.state = 'Disappear'
u.wait 1000
.then =>
    if not enemy.kill
        # Выполнется через секунду
        enemy.kill = yes
```
:::

### `u.load(url: Строка, обратный вызов: Функция)`

Загружает указанный скрипт и вызывает обратный вызов после его загрузки.

