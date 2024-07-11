# Enumerations

Strictly speaking, enumerations is a type from TypeScript language you can edit in ct.js. It is usually used to describe a value type that has several choices. For example, in a fantasy game, you can create an enumeration called Damage Type with these values: physical, true, fire, acid, and astral damage. You can then efficiently use this enumeration as values in your code to define what attacks with what. Under the hood, these values will compile to simple numbers, but your code will be readable and definitely typed.

![](./images/enumerations_example.png)

If you are using JavaScript, TypeScript, or CoffeeScript in your project, the values of enumerations will be accessible as `YourEnumerationName.VariantName`, like in the enumeration editor. For Catnip, a special block in the Properties category is created for each enumeration in your Project.

## Mapping Enumerations Back

You can get the name of the enumeration's variant in this way:

```js
var damageType = DamageType.Fire;
console.log(damageType); // Will return an integer that corresponds to this damage type
console.log(DamageType[damageType]) // Will return 'Fire'
```

This is usually only useful when debugging your game, or for displaying values in UI if your game doesn't require translating these names.

## Using Enumerations in Content Types and Behaviors

Every Enumeration becomes a field type in Behaviors' and content types' fields. This will produce dropdowns with selectable variants in GUI. During export, these values will be replaced with integers that match the selected variants' values.

![](./images/enumerations_useInContentSchemas.png)

![](./images/enumerations_fieldTypes.png)