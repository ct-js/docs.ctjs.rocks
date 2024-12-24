# Saving and Loading Games with LocalStorage

Saving a game's state is a necessary feature for games with anyhow long-term progression. Maybe you also want to store a highscore and a nickname for a fast-paced game with short playsessions. LocalStorage to the rescue! This global object allows for storing different string values and accessing them later. This feature works both in modern browsers and packed games. Combined with other handy features, we can store nearly any type of data!

## Saving Simple Values

Saving and reading string values is pretty easy:

::: code-tabs#tutorial
@tab JavaScript
```js
// Writing values to localStorage
localStorage.heroName = 'Isaac Newcat';
localStorage.heroTitle = 'The Allmighty';

// Reading values back
if ('heroName' in localStorage) { // was anything saved before?
    // Read the values
    this.name = localStorage.heroName;
    this.title = localStorage.heroTitle;
} else {
    // Do something with a missing data
    requestNameAndTitle();
}
```
@tab CoffeeScript
```coffee
# Writing values to localStorage
localStorage.heroName = 'Isaac Newcat'
localStorage.heroTitle = 'The Allmighty'

# Reading values back
if 'heroName' of localStorage # was anything saved before?
    # Read the values
    @name = localStorage.heroName
    @title = localStorage.heroTitle
else
    # Do something with a missing data
    requestNameAndTitle()
```
:::

When it comes to numbers, dates, booleans, other stuff, we need to convert read values before using them.

::: code-tabs#tutorial
@tab JavaScript
```js
// WRONG WAY
localStorage.heroLevel = 15;

// …later…
this.level = localStorage.heroLevel;
// this.level is now '15'. Wait, it's a string!
this.level += 1;
console.log(this.level);
```
@tab CoffeeScript
```coffee
# WRONG WAY
localStorage.heroLevel = 15

# …later…
@level = localStorage.heroLevel
# this.level is now '15'. Wait, it's a string!
@level += 1
console.log @level
```
:::

![Wrong use of localStorage](./../images/tutLocalStorage.png)

`this.level` is now `'151'`! This is definitely not what we would expect. The reason is that `localStorage` can only store strings, and anything else is turned into those. Because of that, we need to convert the values of `localStorage` to the needed types.

::: code-tabs#tutorial
@tab JavaScript
```js
// BETTER WAY
localStorage.heroLevel = 15;
// …later…
this.level = Number(localStorage.heroLevel);
// this.level is now 15. It's a number!
this.level += 1;
console.log(this.level);
```
@tab CoffeeScript
```coffee
# BETTER WAY
localStorage.heroLevel = 15

# …later…
@level = Number(localStorage.heroLevel)
# this.level is now 15. It's a number!
@level += 1
console.log @level
```
:::

![Proper use of localStorage](./../images/tutLocalStorage_Yaaay.png)

Here is how we can convert Date objects and Booleans:

::: code-tabs#tutorial
@tab JavaScript
```js
localStorage.gameStartTime = new Date();
localStorage.hardcoreMode = false;

// later…

this.startTime = new Date(localStorage.gameStartTime);
this.hardcoreMode = localStorage.hardcoreMode === 'true';
```
@tab CoffeeScript
```coffee
localStorage.gameStartTime = new Date()
localStorage.hardcoreMode = false
# later…
@startTime = new Date localStorage.gameStartTime
@hardcoreMode = localStorage.hardcoreMode == 'true'
```
:::

## Storing Complex Objects

For anything beyound simple strings and numbers we need special encoding and decoding functions. Thankfully, there are such functions in JavaScript! They are `JSON.parse(encodedString)` and `JSON.stringify(complexObject)`.

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

This is quite a complex thing! Here we encode an array, but you can pass both arrays and objects to `JSON.stringify`.

What can't be encoded, though, are functions, Date objects as-is, circular references. But in most cases you won't even save such data in your games!

## Using LocalStorage for Savegames in Catnip

In Catnip, you can use "save to storage" and "load from storage" to work with `localStorage`. You should also use "is key in storage" to see if there is a savefile when you try to load data. Do remember that `localStorage` stores strings only and you should convert any Numbers and other non-string values when you load values directly from `localStorage`:


<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>       <textarea style="height: 21px;" value="Save a numeric and a string value" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Save to storage in key</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 9.5ch;    " value="highscore" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">highscore</span>               </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Save to storage in key</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="playerName" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">playerName</span>               </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>       <textarea style="height: 21px;" value="Load these values back" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">playerName</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed string wildcard  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">load from storage from key</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="playerName" readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">highscore</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/sort-numerically.svg" class="feather"><span class="catnip-block-aTextLabel">to number</span>          <catnip-block class=" computed string wildcard  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">load from storage from key</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 9.5ch;    " value="highscore" readonly="readonly">     </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>       <textarea style="height: 21px;" value="Note the &quot;to number&quot; here!" readonly="readonly"></textarea>         </catnip-block>

To store complex objects, you can use "serialize" and "deserialize" commands to turn them into strings and back. Here is an example:


<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>       <textarea style="height: 21px;" value="Create an object and save it whole" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Create a new object</span>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>          <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div>  <dl> <dt> <input type="text" class="catnip-block-aConstantInput string " value="lives" style="width: 5.5ch" readonly="readonly"> </dt> <dd> <div class="toright anActionableIcon"> <img src="/assets/icons/delete.svg" class="feather"> </div> <catnip-block class=" computed wildcard  userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">heroHp</span>               </catnip-block>  </dd> </dl><dl> <dt> <input type="text" class="catnip-block-aConstantInput string " value="money" style="width: 5.5ch" readonly="readonly"> </dt> <dd> <div class="toright anActionableIcon"> <img src="/assets/icons/delete.svg" class="feather"> </div> <catnip-block class=" computed wildcard  userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">money</span>               </catnip-block>  </dd> </dl> <div class="pad"> <button class="inline small"> <img src="/assets/icons/plus.svg" class="feather"><span>Add a custom property</span> </button> </div> </div>       </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Save to storage in key</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="mySavegame" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed string string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">serialize object</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>       <textarea style="height: 21px;" value="Load the savegame object" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Deserialize object</span>          <catnip-block class=" computed string string  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">load from storage from key</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 10.5ch;    " value="mySavegame" readonly="readonly">     </catnip-block>     <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">money</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="lives" readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>          <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">heroHp</span>               </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                    <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>           <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="money" readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                    <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">savefile</span>               </catnip-block>      </catnip-block>      </catnip-block>