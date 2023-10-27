# behaviors

Ct.js has a public API that allows you to dynamically add and remove behaviors you've created in ct.IDE directly in your game's runtime. You can use it, for example, to switch an enemy boss' behaviors when it switches its stages, or add or remove functionality when UI elements become active or not, and much more.

## Static and Dynamic Behaviors

Note that not all behaviors can be added or removed in gameplay time, as some events in behaviors make their code to be statically embedded into the assets that use them, meaning that you can't simply yoink them out at runtime. Static behaviors have a ❄️ snowflake icon when viewed in an asset browser, and event list in them also will signal about problematic events with the ❄️ snowflake icon.

You can workaround static behaviors by adding your own properties and `if` statements to control the behavior's execution. Otherwise, feel free to use the methods below ⬇️

## Methods of `behaviors` API

### `behaviors.add(target, behaviorName)`

Adds a behavior to the given room or template. Only dynamic behaviors can be added.

* `target` — The room or template to which the behavior should be added.
* `behavior` — The name of the behavior to be added, as it was named in ct.IDE.

### `behaviors.remove(target, behaviorName)`

Removes a behavior from the given room or template.
Only dynamic behaviors can be removed.

* `target` — The room or template from which the behavior should be removed.
* `behavior` — The name of the behavior to be removed, as it was named in ct.IDE.

### `behaviors.has(target, behaviorName): boolean`

Tells whether the specified object has a behavior applied to it.

* `target` — A room or a copy to test against.
* `behavior` — The behavior to look for.