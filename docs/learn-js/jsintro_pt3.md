---
sidebarDepth: 3
---

# Introduction to JavaScript, part III: Objects and Arrays, in-depth

## Objects

Everything in JavaScript is an object! Except for `true`, `false`, simple numbers and strings, `null`, and `undefined`. Yea. What does it mean for you? It means that most of the JS stuff has ✨*properties*✨ — the things we were talking about in the first part of this introduction to JavaScript.

So, how can you create and store a new object? The syntax is simple: you create a list of properties inside `{` these `}`, separate items with a comma (`,`), and divide properties' names and values with a semicolon (`:`). You might have seen such structures while using some catmods, like ct.tween:

```js
var myObject = {
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: NaN
};
```

We can later read properties of objects with a dot accessor — the one you've probably seen everywhere, like `myObject.name`.

Objects transfer between variables and properties as a whole, so if you continue the previous snippet and try to store the same object in, say, a copy, *and* then try to modify the source object, you will notice that the changes are applied to a new reference as well. Because it is just one object shared between different variables and properties! Consider this example:

```js
this.weapon = myObject;

// Later…

console.log(this.weapon.price); // It's a NaN! That's no good, let's fix it!
myObject.price = 777; // Notice how we don't refer to `this.weapon` here.
console.log(this.weapon.price); // It is now 777. Hooray!
```

### Nested objects

You can store objects inside other objects. You can use references to other objects in your object's properties, or inline them:

```js
this.weapon = {
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: 777
};
this.helmet = {
    name: 'The helmet of system thinking',
    description: 'Allows you to get a whole picture',
    wit: 5,
    price: 100
};
this.gear = {
    hands: this.weapon,
    head: this.helmet,
    body: { // You can inline new objects inside new objects!
        name: 'The chestplate of ignorance',
        description: 'Protects your mind from the outer world',
        wit: -100,
        mood: 5,
        price: 3
    }
};

console.log(this.gear.body.name); // Will return 'The chestplate of ignorance'.
```

### Deleting objects' properties completely

You can write `this.enemy = undefined`, and in most cases, it will be fine, but if you are [working with localStorage](tips-n-tricks/localstorage.html) or other persistent data, or if you loop over an object's properties, you will most likely need to remove the property without a trace — otherwise it is still there, though without a defined value.

You can use the keyword `delete` to remove any property from an object:

```js
if (!ct.templates.isValid(this.enemy)) {
    delete this.enemy;
}
```

### If strings and numbers are constants, why can we use methods on them?

Because JavaScript is smart! There are actually objects based on simple strings and numbers, and you can create such with `new String('Divine sausage')`, `new Number(42)`, and even `new Boolean(true)`. But these methods are not recommended, because 99.99% of the time you don't need this functionality. And it is *quite a funky* functionality that is beyond the scope of this introduction page.

What you *do* need, is all the methods that `Number` and `String` have; to format these values and manipulate the strings. And JavaScript provides them when you write `'  oh no '.trim()` or `(99.9).toFixed(2)`.

## Arrays

Arrays can be thought of as objects with numerical, ordered properties, with a *ton* of helper functions for them.
Declaring a new array is quite different from declaring a new object:

```js
var groceryList = ['potato', 'carrot', 'thyme'];
this.waveEnemyAmount = [10, 10, 15, 15, 20, 25];

console.log(groceryList[0]); // Will log 'potato'
console.log(groceryList[1]); // Will log 'carrot'
console.log(this.waveEnemyAmount); // Will output the whole array
```

Note how we access elements of the array: we use a number in square brackets, starting with `[0]`, to get the value.

You can store complex objects in arrays, too:

```js
this.shopItems = [{
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: 777
}, {
    name: 'The helmet of system thinking',
    description: 'Allows you to get a whole picture',
    wit: 5,
    price: 100
}, {
    name: 'The chestplate of ignorance',
    description: 'Protects your mind from the outer world',
    wit: -100,
    mood: 5,
    price: 3
}];

console.log(this.shopItems[0].name); // Will output 'The hammer of bug killing'
console.log(this.shopItems[2].price); // Will output `3`, the price of the chestplate of ignorance
```

Here we access a whole object with `[0]`, `[1]`, `[2]`, etc., and then read the property of this object, appending `.name` and `.price`. Be careful with this syntax!

### Getting array's length

Arrays have several functions to streamline the processing of any gameplay data you need.

First, there's the `length` property, which is the number of elements in the array.

How can it be used? Say you want to limit the amount of junk in your player's inventory:

```js
this.inventory = ['sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'sword', 'apple'];
this.maxInventorySize = 10;
// later…

if (this.inventory.length >= this.maxInventorySize) {
    return; // abort the current event or function
}
this.inventory.push('gold ingot'); // Add a new element
```

Too bad they never get this gold ingot.

### Adding new elements to arrays

There are three methods to add new elements to the array:

```js
var pizza = ['tomato sauce'];

pizza.push('pepperoni'); // This adds a new element to the end of the array
pizza.unshift('dough'); // This adds an element to the beginning of the array
pizza.splice(2, 0, 'cheese'); // This adds a new element after pizza[2]. Ignore the 0 argument for a bit here.

console.log(pizza); // Will output the array with dough, tomato sauce, cheese, and pepperoni. Yum 🍕
```

### Removing elements from an array

Let's devour our pizza!

```js
var pizza = ['dough', 'tomato sauce', 'cheese', 'pepperoni'];

pizza.pop('dough'); // Remove the last element from the array
pizza.splice(1, 2); // Remove two elements, starting with pizza[1].
pizza.splice(0, 1, 'crust'); // Remove one element, starting with pizza[0], and replace it with 'crust'.
pizza.shift(); // Removes the first element of the array

console.log(pizza); // Will output an empty array!
```

:::tip More on the array.splice method
You can see that `pizza.splice` was used in three different cases: for adding, removing, and replacing values. How does the method work?

This function is used to replace one set of elements with another one. Its full form is `.splice(startFromIndex, deleteCount, addOne, addTwo, addThree, …)`. But you can delete several elements and add nothing to remove items in the array, or do the opposite — delete nothing and add new elements:

* When you write `.splice(3, 0, 'sausage')`, you add new elements after the array's third element.
* When you write `.splice(3, 1)`, you remove an element.
* When you write `.splice(3, 1, 'sausage')`, you replace an element with another one.
* You can write `.splice(3, 2)` to remove several elements at once.
:::

### Functions for searching, filtering, sorting, reducing arrays

#### Filtering with `array.filter`

`array.filter` is a handy function that creates a new array out of the existing one. You pass it a filtering function as an argument, called "predicate", written by you.

Let's get all the neutral and friendly beasts in our bestiary:

```js
var bestiary = [{
    name: 'Pig',
    aggressiveness: 'neutral'
}, {
    name: 'Cat',
    aggressiveness: 'friendly'
}, {
    name: 'Wolf',
    aggressiveness: 'hostile'
}, {
    name: 'Bear',
    aggressiveness: 'hostile'
}, {
    name: 'Magic pony',
    aggressiveness: 'neutral'
}];

var neutralAnimals = bestiary.filter(beast => {
    if (beast.aggressiveness === 'hostile') {
        return false;
    }
    return true; // Will execute only if the clause before doesn't,
                 // because `return` stops function execution.
});
console.log(neutralAnimals);
```

Here every beast that returns `false` will not be included in the `neutralAnimals` array. Those that return `true`, however, will.

Let's look at another example: getting the list of weapons a hero can currently buy:

```js
this.money = 1230;
var shop = [{
    name: 'The Art of the Realm of Constants',
    price: 130,
    type: 'book'
}, {
    name: 'The hammer of bug killing',
    price: 100500,
    type: 'weapon'
}, {
    name: 'A rusty axe of intoxication',
    price: 853,
    type: 'weapon'
}, {
    name: 'A scroll of lightning',
    price: 167,
    type: 'book'
}];
// skipping both `return` and brackets here — this is a shorter syntax, and the result is returned automatically!
var purchaseable = shop.filter(item => item.price <= this.money);
var purchaseableWeapon = purchaseable.filter(item => item.type === 'weapon');
console.log(purchaseableWeapon);
```

#### Array's `sort` method

The `array.sort` method can work as-is with text items:

```js
var groceryList = [
    'potato',
    'carrot',
    'salad',
    'sausages'
];
groceryList.sort();
console.log(groceryList); // potato and carrots will be swapped
```

You may notice that contrary to other similar methods, sorting does not create a new array but modifies the existing one.

You can also pass a predicate that will return how two objects compare to each other. Let's try the item list from the shop above and sort it by its price, in ascending order:

```js
var shop = [{
    name: 'The Art of the Realm of Constants',
    price: 130,
    type: 'book'
}, {
    name: 'The hammer of bug killing',
    price: 100500,
    type: 'weapon'
}, {
    name: 'A rusty axe of intoxication',
    price: 853,
    type: 'weapon'
}, {
    name: 'A scroll of lightning',
    price: 167,
    type: 'book'
}];

shop.sort((a, b) => {
    return a.price - b.price;
});
```

Here we take two items and return the difference between the first one (`a`) and the last one (`b`). If the resulting number is negative, the first item will sink closer to the `0` index, and the second one will rise to a higher index. If the result of your calculation is positive, the opposite will happen. If `0` is returned, items won't be swapped.

:::tip
You only need to call the `sort` method once — JavaScript will continue sorting until the array is stable.
:::

#### Array's element finding and testing methods

There are quite a lot of methods used to find items in an array!

##### Get if an element is in an array with `array.includes`

`array.includes(value)` is a simple check when you only need to know if an element is present in the current array. It returns a boolean value (`true` or `false`).

```js
var buffs = ['vigor', 'rested', 'rage'];
// Add a new element to the array only if it doesn't exist there yet
if (!buffs.includes('blessed')) {
    buffs.push('blessed');
}
```

##### Check if some elements in an array satisfy a condition with `array.some`

This is a higher-order function for testing whether at least one of the elements satisfies your condition. It accepts a predicate that walks over every element, and returns `true` only if at least one call of this function returned `true`.

```js
this.gear = [{
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    enchantment: 'blessed'
}, {
    name: 'The helmet of system thinking',
    description: 'Allows you to get a whole picture',
    wit: 5,
    enchantment: 'none'
}, {
    name: 'The chestplate of ignorance',
    description: 'Protects your mind from the outer world',
    wit: -100,
    mood: 5,
    enchantment: 'cursed'
}];

// Add a debuff only if one of the items is cursed
if (this.gear.some(item => item.enchantment === 'cursed')) {
    this.debuffs.push('cursed');
}
```

#### Get an element that satisfies a condition with `array.find`, `array.findIndex`

These are similar in their idea to `array.some`, but they return the first item that does satisfy your requirements. `array.find` returns the element itself (or `undefined` if none was found), while `array.findIndex` returns the position of the suitable item in the array (or `-1` if there was no such element).

```js
this.gear = [{
    name: 'The hammer of bug killing',
    type: 'weapon'
}, {
    name: 'The helmet of system thinking',
    type: 'head'
}, {
    name: 'The chestplate of ignorance',
    type: 'torso'
}];

// Set the dealt damage to the weapon's damage in the current gear array
var weapon = this.gear.find(item => item.type === 'weapon');
this.damage = weapon.damage;

// Remove the helmet
var helmetIndex = this.gear.findIndex(item => item.type === 'head');
if (helmetIndex !== -1) { // Make sure we did find a helmet
    this.gear.splice(helmetIndex, 1);
}
```

##### Find the index of a known element in an array with `array.indexOf`

Similar to `array.findIndex`, `array.indexOf` returns the index of the specified element in an array. It is useful if you store numbers or strings in an array, or have a reference to the object you seek.

```js
var groceryList = [
    'potato',
    'carrot',
    'cucumber',
    'banana',
    'cherry'
];
var carrotIndex = array.indexOf('carrot');
if (carrotIndex !== -1) { // Make sure we did find an item
    groceryList.splice(carrotIndex, 1);
}
```

#### Array's `reduce` method

The `array.reduce` method walks over every element of an array, executing your function (predicate), and passing the result of this function to its next call. It is usually used to quickly gather different statistics from an array, and by writing a different predicate you can calculate different statistical values.

Say you write a tower defense game, and you have a final boss at the last wave. You want to calculate the time before the boss spawns, and for that, you want to sum up all the waves' delays.

Considering the following structure, we can use array's `.reduce` method to get a sum of all the delays:

```js
var waves = [{
    delay: 30,
    monsters: [{
        type: 'Monster_Flyer',
        health: 10,
        amount: 10
    }]
}, {
    delay: 10,
    monsters: [{
        type: 'Monster_Flyer',
        health: 15,
        amount: 12
    }]
}, {
    delay: 12,
    monsters: [{
        type: 'Monster_Flyer',
        health: 15,
        amount: 20
    }, {
        type: 'Monster_Tank',
        health: 15,
        amount: 20
    }]
}, {
    delay: 20,
    monsters: [{
        type: 'Monster_Boss',
        health: 1000,
        amount: 1
    }]
}];

var timeTillBoss = waves.reduce((currentSum, wave) => {
    return currentSum + wave.delay
}, 0); // Here 0 is the starting value.
```

Now let's use the same array to get the number of all the enemies in the waves, by their type. This will be a harder example as we need monsters' arrays within our main array:

```js
var monstersInTheLevel = waves.reduce((currentStats, wave) => {
    for (const monsterGroup of wave.monsters) {
        // Initialize a monster group if it hasn't been written to the stats object yet
        if (!currentStats[monsterGroup.type]) {
            currentStats[monsterGroup.type] = 0;
        }
        currentStats[monsterGroup.type] += monsterGroup.amount;
    }
}, {}); // Start with an empty object
```

Was it easy to understand? Maybe. Could we do the same with regular loops? Of course. Yet if you have different arrays that you need to process in bulk, it would be hard to write loops for every one of them. With `.reduce`, `.forEach`, `.filter`, `.find`, you can store the whole predicate function in a variable or property, and then use it multiple times where needed, making your code clean.


### Dark array-related JavaScript knowledge 🕸🕷

#### Two-dimensional arrays

In JavaScript, arrays as-is are one-dimensional: it's just a list. But if you create a list of lists, it suddenly becomes similar to two-dimensional arrays in other languages!

```js
var myMap = [
    [1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1],
    [2, 0, 1, 1, 1],
    [1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0],
];
```

You would then get a value with `myMap[2][0]`. (This example would return `2` — the element in the second row and in column zero.)

#### Special, array-like accessor for objects' properties

Do you remember that almost everything in JavaScript is an object? And arrays too? Why do you think arrays have a special syntax for accessing their elements?

Because it is actually not exclusive to arrays! Every object can have its properties read, deleted, and changed with an array-like property accessor:

```js
var myObject = {
    name: 'The hammer of bug killing',
    description: 'Buy this hammer and you will crush these bugs with ease!',
    damage: 100500,
    price: NaN
};
myObject['price'] = 1000;
```

Any value that can be converted to strings can be used as an accessor:

```js
// This is a strange example indeed, but what if that's how you present a customizable ability bar in an ARPG?
var abilities = {
    '0': 'Moon strike',
    '1': 'Slashing leap',
    '5': 'Mend'
};
// Reposition the skill:
var ability = abilities[1];
delete abilities[1];
abilities[2] = ability;
```

And the best of it, accessors don't need to be static! You can compute values by concatenating strings or doing other magic stuff:

```js
this.stats = {
    resistanceFire: 5,
    resistanceIce: 0
};
this.armor = {
    name: 'The Robe of Chill',
    resistanceType: 'Ice',
    resistanceBoost: 15
};
// `'resistance' + this.armor.resistanceType` is 'resistanceIce',
// So the property this.stats.resistanceIce will be changed.
this.stats['resistance' + this.armor.resistanceType] += this.armor.resistanceBoost;
```

#### Special case: strings are… arrays?!

Strings have a `.length` property, which returns the length of the string, duh. They can also return the symbols in specific positions if you try to use an array accessor:

```js
var string = 'Hello ct.js!';
console.log(string.length); // Will return 12
console.log(string[1]) // Will return 'e'
```

But strings don't have all those smart methods like `.forEach`, `.map`, or `.filter`. They actually have [their own methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods) to simplify transforming strings, like `.trim()`, `.search`, `.replace`, [and others](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods), and they have their own `.slice`, too. Not like you will need to treat strings as real arrays, but if you *really* need to, you can use `Array.from(yourString)` to create a new array that has string's symbols as its elements.

## Conclusion

Objects and arrays are powerful — they're mostly free-form structures that can fit everything you put into them. Knowing how to manipulate them efficiently will allow you to write code faster and easier. But don't fret if you can't remember everything right now — perfection comes with practice, and practice needs time. Not like I use every method once in a month or so, he-he.

Happy coding!  
CoMiGo
