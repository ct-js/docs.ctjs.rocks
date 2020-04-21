# ct.timer

This module (`ct.timer`) allows for making timers, optionally running a function when the timer reaches a certain amount of time.

Examples:

```js
// Add a timer
ct.timer.addTimer("test");
// Or:
new CtTimer("test");

// Log "Done!" when it gets to 2.5 seconds
// Note: `ct.timer.addTimer` also supports this.
new CtTimer("test", 2500).then(() => {
    console.log("Done!");
});

// Log the timer's time count
console.log(ct.timer.timers["test"].time);

// Remove the timer
ct.timer.removeTimer("test");
```

## ct.timer properties

### ct.timer.timers ⇒ <code>Object`<CtTimer>`</code>

An object of timers. Access them by their name.

Example: 
```js
// Access a timer called "myTimer"
ct.timer.timers["myTimer"];
// Or
ct.timer.timers.myTimer;
```

## ct.timer methods

### ct.timer.addTimer(name, [timeMs], [uiDelta]) ⇒ <code>void</code>
Adds a new timer to `ct.timer.timers`.

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The timer's name, which will be used to access from `ct.timer.timers`. |
| [timeMs=0] | <code>Number</code> | The length of the timer, **in milliseconds** |
| [uiDelta=false] | <code>Boolean</code> | If `true`, it will use `ct.deltaUi` for counting time. if `false`, it will use `ct.delta` for counting time. |

### ct.timer.removeTimer(name) ⇒ <code>void</code>
Adds a new timer to `ct.timer.timedTimers`.

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The timer's name, which was used to access from `ct.timer.timers`. |

## Timer properties

### CtTimer.time ⇒ <code>Number</code>

The amount of time the timer has been active, in milliseconds.

### CtTimer.timeLeft ⇒ <code>Number</code>

The amount of time left until it gets to `timeMs`. Defaults to `0`.

### CtTimer.uiDelta ⇒ <code>Boolean</code>

If `true`, it will use `ct.deltaUi` for counting time. if `false`, it will use `ct.delta` for counting time.

### CtTimer.promise ⇒ <code>Promise</code>

The promise used to execute callbacks when the timer has finished.

### CtTimer.resolve ⇒ <code>Function</code>

Resolves the promise. Not recommended as it will stop the timer from counting.

### CtTimer.reject ⇒ <code>Function</code>

Rejects the promise. Not recommended as it will stop the timer from counting.

### CtTimer.rejected ⇒ <code>Boolean</code>

If true, the timer was rejected. **If you call `CtTimer.reject` by yourself, it will not update.**

### CtTimer.done ⇒ <code>Boolean</code>

If true, the timer was resolved. **If you call `CtTimer.resolve` by yourself, it will not update.**

## Timer methods

### CtTimer.then ⇒ <code>void</code>

Mirrors `CtTimer.promise.then()`.

Attaches callbacks for the resolution and/or rejection of the Promise.

| Param | Type | Description |
| --- | --- | --- |
| onfulfilled | <code>Any</code> | The callback to execute when the Promise is resolved. |
| [onrejected] | <code>Any</code> | The callback to execute when the Promise is rejected. |