# Сохранение и загрузка игр с помощью LocalStorage

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Сохранение состояния игры — необходимая функция для игр с протяжённым геймплеем. Возможно, вы также хотите сохранить лучший счет и никнейм для игры с короткими сессиями. LocalStorage придёт на помощь! Этот глобальный объект позволяет хранить различные строковые значения и обращаться к ним позже. Эта функция работает как в современных браузерах, так и в скомпилированных играх. В сочетании с другими полезными функциями мы можем хранить практически любой тип данных!

## Сохранение простых значений

Сохранение и чтение строковых значений довольно просто:

::: code-tabs#tutorial
@tab JavaScript
```js
// Запись значений в localStorage
localStorage.heroName = 'Isaac Newcat';
localStorage.heroTitle = 'The Allmighty';

// Чтение значений обратно
if ('heroName' in localStorage) { // было что-то сохранено раньше?
    // Чтение значений
    this.name = localStorage.heroName;
    this.title = localStorage.heroTitle;
} else {
    // Делать что-то с отсутствующими данными
    requestNameAndTitle();
}
```
@tab CoffeeScript
```coffee
# Запись значений в localStorage
localStorage.heroName = 'Isaac Newcat';
localStorage.heroTitle = 'The Allmighty';

# Чтение значений обратно
if 'heroName' of localStorage # было что-то сохранено раньше?
    # Чтение значений
    @name = localStorage.heroName;
    @title = localStorage.heroTitle;
else
    # Делать что-то с отсутствующими данными
    requestNameAndTitle();
```
:::

Когда дело доходит до чисел, дат, логических значений и прочего, нам нужно преобразовать считанные значения перед их использованием.

::: code-tabs#tutorial
@tab JavaScript
```js
// НЕПРАВИЛЬНЫЙ ПРИМЕР
localStorage.heroLevel = 15;

// ...позже...
this.level = localStorage.heroLevel;
// this.level теперь '15'. Ожидайте, это строка!
this.level += 1;
console.log(this.level);
```
@tab CoffeeScript
```coffee
# НЕПРАВИЛЬНЫЙ ПРИМЕР
localStorage.heroLevel = 15

# ...позже...
@level = localStorage.heroLevel
// this.level теперь '15'. Ожидайте, это строка!
@level += 1
console.log @level
```
:::

![Неверное использование localStorage](../../images/tutLocalStorage.png)

`this.level` теперь `'151'`! Это определенно не то, что мы бы ожидали. Причина в том, что `localStorage` может хранить только строки, и все прочее преобразуется в них. Из-за этого нам нужно преобразовывать значения из `localStorage` в нужные типы.

::: code-tabs#tutorial
@tab JavaScript
```js
// ПРАВИЛЬНЫЙ ПРИМЕР
localStorage.heroLevel = 15;

// ...позже...
this.level = Number(localStorage.heroLevel);
// this.level теперь 15. Это число!
this.level += 1;
console.log(this.level);
```
@tab CoffeeScript
```coffee
# ПРАВИЛЬНЫЙ ПРИМЕР
localStorage.heroLevel = 15

# ...позже...
@level = Number(localStorage.heroLevel)
# this.level теперь 15. Это число!
@level += 1
console.log @level
```
:::

![Правильное использование localStorage](../../images/tutLocalStorage_Yaaay.png)

Вот как мы можем преобразовать объекты Date и логические значения:

::: code-tabs#tutorial
@tab JavaScript
```js
localStorage.gameStartTime = new Date();
localStorage.hardcoreMode = false;

// ...позже...

this.startTime = new Date(localStorage.gameStartTime);
this.hardcoreMode = localStorage.hardcoreMode === 'true';
```
@tab CoffeeScript
```coffee
localStorage.gameStartTime = new Date()
localStorage.hardcoreMode = false
# ...позле...
@startTime = new Date localStorage.gameStartTime
@hardcoreMode = localStorage.hardcoreMode == 'true'
```
:::

## Хранение сложных объектов

Для всего, что выходит за рамки простых строк и чисел, нам нужны специальные функции кодирования и декодирования. К счастью, в JavaScript есть такие функции! Они `JSON.parse(encodedString)` и `JSON.stringify(complexObject)`.

::: code-tabs#tutorial
@tab JavaScript
```js
var inventory = [{
    name: 'A rusty axe',
    type: 'weapon',
    twoHanded: true,
    durability: 0.87,
    damage: [8, 11],
    effects: {
        poison: 1,
        duration: 5
    },
    icon: 'BattleAxe_Old'
    stack: 1
}, {
    name: 'Health Potion',
    type: 'consumable',
    effects: {
        regen: 5,
        duration: 15
    },
    icon: 'Potion_Red',
    stack: 15
}, {
    // …other stuff
}];

// Save the inventory
localStorage.heroInventory = JSON.stringify(inventory);

// …later

// Load the inventory from the previously saved string
this.inventory = JSON.parse(localStorage.heroInventory);
```
@tab CoffeeScript
```coffee
inventory = [
    {
        name: 'A rusty axe'
        type: 'weapon'
        twoHanded: true
        durability: 0.87
        damage: [
            8
            11
        ]
        effects:
            poison: 1
            duration: 5
        icon: 'BattleAxe_Old'
        stack: 1
    }
    {
        name: 'Health Potion'
        type: 'consumable'
        effects:
            regen: 5
            duration: 15
        icon: 'Potion_Red'
        stack: 15
    }
    {
        # …other stuff
    }
]
# Save the inventory
localStorage.heroInventory = JSON.stringify inventory
# …later
# Load the inventory from the previously saved string
@inventory = JSON.parse localStorage.heroInventory
```
:::

Это довольно сложная вещь! Здесь мы сохраняем массив, но вы можете передать как массивы, так и объекты в `JSON.stringify`.

Нельзя сериализировать функции, объекты Date в исходном виде и цикличные ссылки. Но в большинстве случаев вам и не надо будет сохранять такие данные в своих играх!

## Using LocalStorage for Savegames in Catnip

В Catnip вы можете использовать "сохранить под ключом" и "загрузить из ключа" для работы с `localStorage`. Также следует использовать "ключ в хранилище?", чтобы проверить, есть ли сохранённый файл, когда вы пытаетесь загрузить данные. Помните, что `localStorage` хранит только строки, и вам нужно преобразовывать любые числа и другие нестроковые значения, когда вы загружаете значения непосредственно из `localStorage`:

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Заметка</span>       <textarea style="height: 21px;" value="Сохранение численного значения и строки" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Сохранить под ключом</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 9.5ch;    " value="highscore" readonly="readonly"> <span class="catnip-block-aTextLabel">значение</span>                    <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">highscore</span>               </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Сохранить под ключом</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="playerName" readonly="readonly"> <span class="catnip-block-aTextLabel">значение</span>                    <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">playerName</span>               </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Заметка</span>       <textarea style="height: 21px;" value="Загрузка значений" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Задать</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">playerName</span>               </catnip-block>  <span class="catnip-block-aTextLabel">значение</span>                    <catnip-block class=" computed string wildcard  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">загрузить из ключа</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="playerName" readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Задать</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">highscore</span>               </catnip-block>  <span class="catnip-block-aTextLabel">значение</span>                    <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/sort-numerically.svg" class="feather"><span class="catnip-block-aTextLabel">в число</span>          <catnip-block class=" computed string wildcard  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">загрузить из ключа</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 9.5ch;    " value="highscore" readonly="readonly">     </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Заметка</span>       <textarea style="height: 21px;" value="Обрати внимание, что здесь нужен блок &quot;в число&quot;!" readonly="readonly"></textarea>         </catnip-block>

Чтобы хранить сложные объекты, вы можете использовать команды "сериализовать объект" и "десериализовать объект", чтобы преобразовать их в строки и обратно. Вот пример:

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Заметка</span>       <textarea style="height: 21px;" value="Создание объекта и его сохранение" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Создать новый объект</span>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">сохранить в</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>          <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Расширенные настройки</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div>  <dl> <dt> <input type="text" class="catnip-block-aConstantInput string " value="lives" style="width: 5.5ch" readonly="readonly"> </dt> <dd> <div class="toright anActionableIcon"> <img src="/assets/icons/delete.svg" class="feather"> </div> <catnip-block class=" computed wildcard  userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">heroHp</span>               </catnip-block>  </dd> </dl><dl> <dt> <input type="text" class="catnip-block-aConstantInput string " value="money" style="width: 5.5ch" readonly="readonly"> </dt> <dd> <div class="toright anActionableIcon"> <img src="/assets/icons/delete.svg" class="feather"> </div> <catnip-block class=" computed wildcard  userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">money</span>               </catnip-block>  </dd> </dl> <div class="pad"> <button class="inline small"> <img src="/assets/icons/plus.svg" class="feather"><span>Добавить свойство</span> </button> </div> </div>       </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Сохранить под ключом</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="mySavegame" readonly="readonly"> <span class="catnip-block-aTextLabel">значение</span>                    <catnip-block class=" computed string string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">сериализировать объект</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Заметка</span>       <textarea style="height: 21px;" value="Загрузить объект сохранения обратно" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Десериализировать объект</span>          <catnip-block class=" computed string string  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">загрузить из ключа</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="mySavegame" readonly="readonly">     </catnip-block>     <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">сохранить в</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Задать</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">money</span>               </catnip-block>  <span class="catnip-block-aTextLabel">значение</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">считать</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="lives" readonly="readonly"> <span class="catnip-block-aTextLabel">у</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Задать</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">heroHp</span>               </catnip-block>  <span class="catnip-block-aTextLabel">значение</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">считать</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="money" readonly="readonly"> <span class="catnip-block-aTextLabel">у</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>      </catnip-block>