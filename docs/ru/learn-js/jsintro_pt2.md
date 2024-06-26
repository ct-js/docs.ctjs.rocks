# Введение в JavaScript, часть II: Условия и циклы

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Переменные полезны для хранения данных, но этого недостаточно для создания игры. Здесь мы поговорим об условных операторах и циклах и о том, как они могут определять логику игры.

## Условные операторы

Начнем с условного оператора "if":

```js
if (/* если это утверждение верно */) {
    /* выполняем какие-то действия */
}
```

Если нам нужно выполнить действия в обоих случаях, мы можем использовать оператор "else if":

```js
if (/* если это утверждение верно */) {
    /* выполняем действия */
} else if (/* это утверждение также верно */) {
    /* выполняем другие действия */
}
```

#### Пример: Уничтожить копию, если ее здоровье равно нулю или меньше

```js
if (this.health <= 0) {
    this.kill = true;
}
```

#### Пример: использовать условие для совершения покупки

```js
var price = 500;
this.money = 1230;

if (this.money >= price) {
    this.money -= price;
    this.inventory.push(/* какой-то предмет */);
}
```

#### Пример: прыжок

```js
this.onGround = true;
var keyUp = actions.Jump.down;
if (this.onGround && keyUp) {
    this.addSpeed(this, 10, 270);
}
```

#### Пример: не прыгай за пределы экрана

```js
if (this.x < 0) {
  this.x = 0;
}
if (this.x > camera.width) {
  this.x = camera.width;
}
if (this.y < 0) {
  this.y = 0;
}
if (this.y > camera.height) {
  this.y = camera.height;
}
```

Давай оптимизируем последний пример немного:

```js Не прыгай за пределы экрана
if (this.x < 0) {
  this.x = 0;
} else if (this.x > camera.width) {
  this.x = camera.width;
}
if (this.y < 0) {
  this.y = 0;
} else if (this.y > camera.height) {
  this.y = camera.height;
}
```

## "While" циклы

"While" циклы выполняют некоторый код многократно до тех пор, пока какое-то условие не станет ложным.

```js
while (/* это условие истинно */) {
    /* что-то сделать  */
}
```

Представьте, что нам нужно создать несколько копий определенного объекта, и это количество нельзя захардкодить или он довольно велик, чтобы писать его вручную. В этом случае цикл "while" может автоматизировать процесс создания.

```js
var counter = 20; // Нам нужно создать 20 копий

while (counter > 0) {
    templates.copy('Enemy', this.x, this.y);
    counter--;
}
```

## "For" циклы

Общий цикл "for" работает так же, как и цикл "while". Давайте возьмем предыдущий пример цикла "while" и преобразуем его в цикл "for":

```js
for (var counter = 20; counter > 0; counter--) {
    templates.copy('Enemy', this.x, this.y);
}
```

Вот так мы свели все связанные с циклами вещи к одной строке! И циклы "for" были созданы именно для этого:

```js
for (/*задайте переменные*/; /*указать условие*/; /*изменяйте переменные после каждой итерации*/) {
    /*тело цикла */
}
```

Но есть и другие циклы "for". Например, мы можем работать с массивами и объектами с помощью циклов "for…of" и "for…in".

:::tip
Циклы "for", которые мы рассмотрим ниже, являются опциональными и довольно сложным материалом, но они также являются мощными инструментами при работе со сложными данными.
:::

Давайте посмотрим на циклы "for…of". Они работают с массивами, которые по сути являются упорядоченным списком вещей. Мы можем определить массивы следующим образом:

```js
this.monstersPowers = [1, 2, 3, 5, 8];

console.log(this.monstersPowers[0]); // вывод первого элемента в консоль
```

Давайте выведем все эти значения в консоль с помощью цикла "while":

```js
var ind = 0;
while (ind < this.monster Powers.length) {
    console.log(this.monsterPowers[ind]);
    ind++;
}
```

:::tip
Свойство `length` существует у всех массивов и указывает на количество элементов в них. Вы можете как читать, так и изменять это свойство.
:::

Так мы могли бы сделать то же самое с помощью стандартного цикла "for":

```js
for (var ind = 0; ind < this.monsterPowers.length; ind++) {
    console.log(this.monsterPowers[ind]);
}
```

Теперь взгляните на цикл "for…of":

```js
for (var element of this.monsterPowers) {
    console.log(element);
}
```

Этот цикл выполняет два важных действия:

* он создает свои собственные внутренние счетчики и условия, но не показывает их, поэтому код остается чистым, и
* он хранит каждую переменную в переменную `element` (ее значение меняется на каждом итерации).

Однако циклы "for…of" работают только с массивами. Но есть также *объекты*.

*Объекты* более абстрактны; их можно рассматривать как шкафы с именованными полками, где на каждой полке находится какой-то элемент. Кстати, массивы тоже являются объектами, но вместо именованных полки они содержат нумерованные. Эти "полки" называются *"ключами"* и пара ключ-значение называется *свойством* из предыдущего раздела!

```js
var magicWand = {
    name: 'The summoner of winter winds',
    forces: ['wind', 'ice'],
    level: 23,
    minLevel: 12
};

console.log(magicWand.name);
console.log(magicWand['forces']); // Другой способ получения значений из объектов — массивной!
```

Мы можем использовать два типа циклов "for", чтобы пройти по всем элементам массива, но нам понадобится цикл "for…in", чтобы пройти по всем свойствам объекта:

```js
for (var key in magicWand) {
    console.log(key, magicWand[key]);
}
```

Что здесь происходит? Во-первых, мы указываем, что хотим получить ключи из объекта `magicWand` и сохранить их в переменной `key`. Это довольно похоже на то, как работают циклы "for…of". Затем мы выводим пару ключ-значение на каждой итерации: ключ (который будет `"name"`, затем `"forces"`, и так далее) и соответствующее значение. Мы не можем просто написать `magicWand.key`, потому что мы ищем статический ключ, но мы можем использовать массивный стиль записи, чтобы динамически получать эти свойства.

Массивный стиль записи — это мощный инструмент, который имеет множество применений, но на данный момент запомните, что нужно использовать `someObject[key]`, когда используются циклы "for…in".

