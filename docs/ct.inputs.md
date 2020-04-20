# ct.inputs, ct.actions

This module (`ct.inputs`) allows to manipulate [Actions](/actions.html). You can create new actions during the game, modify or delete them.

`ct.actions` stores existing actions. If you have created an action `Move`, then it will be available at `ct.actions.Move`. Each of them is an instance of JS class `CtAction`.

Here is a generic example on how to use actions in your game:

```js
/**
 * Move the copy around.
 * See Settings > Edit actions panel
 * and "Actions" in the docs.
 */
this.hspeed = 8 * ct.actions.MoveX.value; // Move by X axis
this.vspeed = 8 * ct.actions.MoveY.value; // Move by Y axis
if (ct.actions.Shoot.pressed) {
    ct.types.copy('Bullet', this.x, this.y);
}
```

## Actions' methods and properties

### ctAction.value ⇒ <code>Number</code>

A scalar value between -1 and 1. 0 means that there is no input at the current frame, e.g. all the gamepad's thumbsticks are in the resting position or all buttons were released. When used with keyboard and mouse, actions' values will alternate between 0, 1, and -1 (if multipliers were used). Gamepad thumbsticks and other custom manipulators may produce other values.

### ctAction.pressed ⇒ <code>Boolean</code>
Returns whether the action became active in the current frame, either by a button just pressed or by using a scalar input.

**Returns**: <code>Boolean</code> – `true` for being pressed and `false` otherwise 

### ctAction.released ⇒ <code>Boolean</code>
Returns whether the action became inactive in the current frame,
either by releasing all buttons or by resting all scalar inputs.

**Returns**: <code>Boolean</code> – `true` for being released and `false` otherwise 

### ctAction.down ⇒ <code>Boolean</code>
Returns whether the action is active, e.g. by a pressed button
or a currently used scalar input

**Returns**: <code>Boolean</code> – `true` for being active and `false` otherwise 

### ctAction.methodExists(code) ⇒ <code>Boolean</code>
Checks whether the current action listens to a given input method.
This *does not* check whether this input method is supported by ct.

**Returns**: <code>Boolean</code> – `true` if it exists, `false` otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | The code to look up. |

### ctAction.addMethod(code, [multiplier]) ⇒ <code>void</code>
Adds a new input method to listen.

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | The input method's code to listen to. Must be unique per action. |
| [multiplier] | <code>Number</code> | An optional multiplier, e.g. to flip its value. Often used with two buttons to combine them into a scalar input identical to joysticks |

### ctAction.removeMethod(code) ⇒ <code>void</code>
Removes the provided input method from an action.

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | The input method to remove. |

### ctAction.setMultiplier(code, multiplier) ⇒ <code>void</code>
Changes the multiplier for an input method with the provided code.
This method will produce a warning if one is trying to change an input method that is not listened by this action.

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | The input method's code to change |
| multiplier | <code>Number</code> | The new value |

### ctAction.update() ⇒ <code>Number</code>
Recalculates the digital value of an action.

**Returns**: <code>Number</code> – A scalar value between -1 and 1.

## Creating and removing new actions programmatically

### ct.inputs.addAction(name, methods) ⇒ <code>CtAction</code>

Adds a new action and puts it into `ct.actions`.

| Param | Type | Description |
| --- | --- | --- |
name|String|The name of an action, as it will be used in `ct.actions`.
methods|Array\<Object\>|A list of input methods. This list can be changed later.

**Returns:** `CtAction` – The created action

**Example:**

```js
ct.inputs.addAction('Move', [{
    code: 'keyboard.ArrowLeft',
    multiplier: -1
}, {
    code: 'keyboard.ArrowRight'
}, {
    code: 'keyboard.KeyA',
    multiplier: -1
}, {
    code: 'keyboard.KeyD'
}]);
```

### ct.inputs.removeAction(name, methods) ⇒ <code>void</code>

Removes an action with a given name.


| Param | Type | Description |
| --- | --- | --- |
name|String|The name of an action

**Returns:** `void` 

## Creating new actions without adding it to ct.actions

### new CtAction(name)
Creates a new ct action.

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the new action. |

