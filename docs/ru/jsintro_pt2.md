# Введение в JavaScript, часть II: условия и циклы

Переменные хороши для хранения информации, но этого недостаточно для создания игры. Здесь мы поговорим об условных операторах и циклах, и о том, как они могут определять логику игры.

## Утверждение "если" (if)

Начнем со структуры "if-else":

```js
if (/* Условие */) {
    /* Выполняеться этот участок кода если условие истинно */
} else {
    /* Выполняеться этот участок кода если условие ложное */
}
```

Мы можем не писать часть "else", если она вам не нужна

```js
if (/* Условие */) {
    /* Выполняеться этот участок кода если условие истинно */
}
```

Чтобы все работало, нам нужно написать условие в круглых скобках и написать код, который будет исполняться в зависимости от значения в условии.
С помощью этого простого утверждения мы можем сделать множество вещей:

```js Уничтожить копию, если ее здоровье равно нулю или ниже
if (this.health <= 0) {
    this.kill = true;
}
```

```js Совершить покупку
var price = 500;
this.money = 1230;

if (this.money >= price) {
    this.money -= price;
    this.inventory.push(/* some item */);
}
```

```js Совершить прыжок
this.onGround = true;
var keyUp = ct.keyboard.down['up'];
if (this.onGround && keyUp) {
    this.addSpeed(this, 10, 270);
}
```

```js Чтобы персонаж не выходил за пределы экрана
if (this.x < 0) {
    this.x = 0;
}
if (this.x > ct.viewWidth) {
    this.x = ct.viewWidth;
}
if (this.y < 0) {
    this.y = 0;
}
if (this.y > ct.viewHeight) {
    this.y = ct.viewHeight;
}
```

Давайте немного оптимизируем последний вариант:

```js Чтобы персонаж не выходил за пределы экрана
if (this.x < 0) {
    this.x = 0;
} else if (this.x > ct.viewWidth) {
    this.x = ct.viewWidth;
}
if (this.y < 0) {
    this.y = 0;
} else if (this.y > ct.viewHeight) {
    this.y = ct.viewHeight;
}
```

## Циклы "while"

Циклы while выполняют некоторый код до того времени, пока условие не станет ложным.

```js
while (/* условие */) {
    /* Ваш код, который будет повторяться  */
}
```

Представьте, что нам нужно создать некоторое количество одинаковых копий, и что это количество не может быть определено заранее или оно относительно велико, чтобы написать его вручную. В этом случае цикл "while" может автоматизировать процесс создания.

```js
var counter = 20; // Нам нужно создать 20 копий

while (counter > 0) {
    ct.templates.copy('Enemy', this.x, this.y);
    counter --;
}
```

## Циклы "for"

Общие циклы "for" работают так же, как и циклы "while". Давайте возьмем предыдущий пример "while" и превратим его в цикл "for":

```js
for (var counter = 20; counter > 0; counter--) {
    ct.templates.copy('Enemy', this.x, this.y);
}
```

Похоже, мы объединили все, что связано с циклами, в одной строке! И циклы "for" созданы именно для этого:

```js
for (/*определяем переменные здесь*/; /*устанавливаем условие*/; /*изменять переменные после каждой итерации*/) {
    /* Ваш код, который будет повторяться  */
}
```

Но существует больше разновидностей циклов "for". Например, мы можем манипулировать *массивами* и *объектами* с помощью циклов "for...of" и "for...in".

:::совет
Приведенные ниже циклы "for" являются необязательными и представляют собой довольно сложный материал, но они также являются мощными инструментами при манипулировании сложными данными.
:::

Давайте рассмотрим циклы "for...of". Они работают с *массивами*, которые, по сути, представляют собой упорядоченный список. Мы можем определить массивы таким образом:

```js
this.monstersPowers = [1, 2, 3, 5, 8];

console.log(this.monstersPowers[0]); // вывести первый элемент массива в консоль
```

Давайте выведем *все значения массива* в консоль. Вот как мы можем сделать это с помощью оператора "while":

```js
var ind = 0;
while (ind < this.monsterPowers.length) {
    console.log(this.monsterPowers[ind]);
    ind ++;
}
```

:::совет
Свойство `length` существует у всех массивов, и оно определяет количество элементов внутри массива. Вы можете как читать, так и изменять эту переменную.
:::

Вот как мы могли бы сделать то же самое с помощью цикла "for":

```js
for (var ind = 0; ind < this.monsterPowers.length; ind++) {
    console.log(this.monsterPowers[ind]);
}
```

Теперь смотрите, цикл "for...of":

```js
for (var element of this.monsterPowers) {
    console.log(element);
}
```

Этот код автоматически делает две вещи для нас:

* он создает свои внутренние счетчики и условия, но не показывает их, чтобы код оставался чистым
* он сохраняет каждый элемент в переменную `element` (она будет иметь другое значение на каждой итерации).

Обратите внимание, что циклы "for...of" работают только с массивами. Но есть еще и *Объекты*.

*Объекты* - это более абстрактные вещи; их можно интерпретировать как шкафы с именованными полками, каждая из которых содержит один предмет. Кстати, массивы - это тоже объекты, но вместо именованных полок они содержат пронумерованные. Имена этих "полок" называются *"ключами"*, а пара из ключа и значения - это *свойство* из предыдущей части учебника!

```js
var magicWand = {
    name: 'The summoner of winter winds',
    forces: ['wind', 'ice'],
    level: 23,
    minLevel: 12
};

console.log(magicWand.name);
console.log(magicWand['forces']); //Еще один способ получения значений из объектов - в стиле массива!
```

Мы можем использовать два вида циклов "for" для перебора всех элементов массива, но для перебора всех свойств объекта нам понадобится цикл "for...in":

```js
for (var key in magicWand) {
    console.log(key, magicWand[key]);
}
```

Что же происходит? Во-первых, мы говорим, что хотим считать ключи из `magicWand` в переменную `key`. Это в основном похоже на то, как работают циклы "for...of".
Затем мы выводим два значения за раз, на каждой итерации: ключ (это будет `"имя"`, затем `"силы"` и т.д.) и соответствующее значение.
Мы не можем просто написать здесь `magicWand.key`, потому что `magicWand.key` будет искать статическое свойство `key`, но мы можем использовать нотацию, стилизованную под массив, чтобы получить эти свойства динамически.

Нотация в стиле массива - это мощный инструмент, который имеет множество применений, но пока запомните, что при использовании циклов "for...in" следует использовать `someObject[key]`.