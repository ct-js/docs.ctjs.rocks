# behaviors

Behaviors are scriptable assets that define shared gameplay logic between templates or rooms. A behavior can target rooms or templates, and they can use any number of behaviors you create. This allows designing your code to be composable. For example, a regular enemy behavior can be split into several behaviors:

* Movement (or pathfinding)
* Has health
* Bullet shooter

You can also define custom fields in any of the behaviors. They will appear in templates and rooms as additional property panels in their settings after you add behaviors to these assets. Essentially, with these, you create GUI settings for templates and rooms, which is great for designers! For example, adding these fields to behaviors will make them more reusable — and will save you time:

* Movement behavior can include a field for velocity and, for example, a flag for flying characters to ignore movement cost;
* The health system would include a max health setting and may have a checkbox or two to mark whether copies receive damage from enemies' or player's projectiles. This allows you to use the same behavior for the player character, enemies, NPCs, and static obstacles!
* The behavior responsible for projectile spawn can expose fields to tweak shoot delay, damage range, and the template used for the spawned projectiles.

Every property defined in behavior's fields will become a property of the final copy (or room) and be accessible with `this.yourFieldName`. Catnip editors will have behavior fields listed in the Properties category.

## Behaviors and Enumerations

You can use Enumerations as a field type in a behavior's fields. They will produce a dropdown in a template's or room's settings with variants of the enumeration as this dropdown's options. The values of the dropdowns will be the value of the enumeration's key.

![](./images/enumerations_useInContentSchemas.png)

![](./images/enumerations_fieldTypes.png)

## Adding or Removing Behaviors Dynamically

You can add behaviors manually to templates or rooms, but ct.js also has a public API to dynamically add or remove behaviors directly in your game's runtime. You can use it, for example, to switch an enemy boss' behaviors when it switches its stages, add or remove functionality when UI elements become active or not, and much more.

Note that not all behaviors can be added or removed in gameplay time, as some events in behaviors make their code statically embedded into the assets that use them, meaning that you can't simply yoink them out at runtime. Static behaviors have a ❄️ snowflake icon when viewed in an asset browser, and the event list in them also will signal problematic events with the ❄️ snowflake icon.

You can workaround static behaviors by adding your properties and `if` statements to control the behavior's execution. Otherwise, feel free to use the methods below ⬇️

## Methods of `behaviors` API

### `behaviors.add(target, behaviorName)`

Adds a behavior to the given room or template. Only dynamic behaviors can be added.

* `target` — The room or template to which the behavior should be added.
* `behavior` — The behavior to be added, as it was named in ct.IDE.

### `behaviors.remove(target, behaviorName)`

Removes a behavior from the given room or template.
Only dynamic behaviors can be removed.

* `target` — The room or template from which the behavior should be removed.
* `behavior` — The behavior to be removed, as it was named in ct.IDE.

### `behaviors.has(target, behaviorName): boolean`

The function tells whether the specified object has a behavior applied to it.

* `target` — A room or a copy to test against.
* `behavior` — The behavior to look for.