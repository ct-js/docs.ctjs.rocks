# Adding type definitions and code completions to your modules

From version 1.2., ct.js now supports adding type definitions for catmods. With these, you can provide live type checks, code completion, and rich documentation when users hover over your method names.

Ct.js will look for a file `types.d.ts` inside the root of your module's directory. For example, `place` and `pointer` have them. `types.d.ts` is a [TypeScript declaration file](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html), a special manifest-like file that tells what methods and variables your module is providing. Please see the [TypeScript documentation](https://www.typescriptlang.org/docs/home.html) for more information.

By itself, a declaration file can only provide type checks and a list of completions. With [JSDoc-styled annotations](https://jsdoc.app/) and markdown comments, you can get rich documentation right in the editor.

## Example: describing a module

A `types.d.ts` file for an imaginary module called `sosiska` would look as the following:

```typescript
/**
 * A module for roasting flexible sausages inside your game.
 */
declare namespace sausage {
    /* Here all the methods and properties go */

    /**
     * Roasts your copy, adding a crispy crust
     * @param {Copy} me The copy that needs to be roasted
     */
    function roast(me: Copy): void;

    /**
     * Covers your copy in ketchup. Consumes `sosiska.ketchup`.
     * @param {Copy} me The copy to cover in ketchup
     * @param {boolean} tonsOfKetchup If set to `true`, it will spend a LOT of ketchup on this particular copy
     */
    function addKetchup(me: Copy, tonsOfKetchup?: boolean): void;

    /**
     * Amount of ketchup left
     */
    var ketchup: number;
}
```

## Example: describing new fields and functions for built-in types

Extending a class like Copy or Background is more tricky, as TypeScript does not support merging class declarations directly. You will have to use interfaces:

```ts
interface BasicCopy {
    /**
     * Roasts your copy, adding a crispy crust
     */
    function roastMe(): void;
    /**
     * A measure of how hard your copy was roasted
     */
    roastiness: number;
}
```

The above will show `roastMe` method and `roastiness` parameter in autocompletions for all the copies in ct.IDE and check your code for type errors.

## Built-in classes

Ct.js has a number of classes that represent in-game entities. You should use these names to describe arguments and properties of your module (as seen in "describing a module" section).

* `Copy`,
* `Background`,
* `Tileset`,
* `Room`,
* [All the pixi.js' classes](https://pixijs.download/release/docs/index.html).

This way ct.IDE will be able to provide reasonable autocompletions for your fields and functions' arguments.