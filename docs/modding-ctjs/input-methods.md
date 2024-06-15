# Adding new input methods to ct.js

Ct.js uses Actions system for managing inputs from mouse, keyboard, gamepads, etc. If you are making a module with a new input method, you should do a couple of things.

## 1. Provide a list of available input signals (aka "input methods")

With this list, users will be able to select your new input methods in ct.IDE, with the Actions editor. To do so, you should add a new entry `inputMethods` to your `module.json`:

```json
{
    "main": {
        "name": "A catmod for a new input method",
        "version": "0.0.0",
        "authors": [{/*...*/}]
    },
    "inputMethods": {
        "Code1": "The name of the first button, axis, etc.",
        "Code2": "The name of the second button, axis, etc.",
        "Code3": "The name of the third button, axis, etc."
    }
}
```

## 2. Write a code that updates `ct.inputs.registry`

Next, you should write your module so that it updates the `ct.inputs.registry`. It is a map-like object with keys equal to your module name + signal code and numerical values from `-1` to `1`.

Here, `0` means that there is no signal (e.g. a button is not pressed or a gamepad's thumb is in its resting position). Analog sticks will use a full range of `(-1, 1)`, when buttons will usually alternate between `0` and `1`.

```js
ct.inputs.registry['keyboard.keyW'] = 1;
ct.inputs.registry['gamepad.LeftThumbX'] = 0.2;
```

Depending on the input method you are implementing and its native API, you may need checking them at each frame with [injections](./events-and-injections.html), or listen to their events.

## Examples

There are no generic examples for new input methods, but you can check `mouse`, `keyboard`, `gamepad` and `vkeys` modules at `ct.js/data/ct.libs` folder — they all solve their tasks differently.
