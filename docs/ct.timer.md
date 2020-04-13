# ct.timer

This module (`ct.timer`) allows for making timers, optionally running a function when the timer reaches a certain amount of time.

Examples:

```js
// Add a timer
ct.timer.addTimer("test");

// Log the timer's time count
console.log(ct.timer.timers["test"].time);

// Remove the timer
ct.timer.removeTimer("test");

// Add a timed timer that prints "Done!" when it gets to 2.5 seconds
ct.timer.addTimedTimer("test2", 2500, function () { console.log("Done!") });

// Log the timed timer's time count
console.log(ct.timer.timedTimers["test2"].time);

// Remove the timer
ct.timer.removeTimer("test2");
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

### ct.timer.timedTimers ⇒ <code>Object`<CtTimedTimer>`</code>

An object of timers. Access them by their name.

Example: 
```js
// Access a timer called "myTimer"
ct.timer.timedTimers["myTimer"];
// Or
ct.timer.timedTimers.myTimer;
```

## ct.timer methods

### ct.timer.addTimer(name, [uiDelta], [startTime]) ⇒ <code>void</code>
Adds a new timer to `ct.timer.timers`.

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The timer's name, which will be used to access from `ct.timer.timers`. |
| [uiDelta=false] | <code>Boolean</code> | If `true`, it will use `ct.deltaUi` for counting time. if `false`, it will use `ct.delta` for counting time. |
| [startTime=0] | <code>Number</code> | The amount of time to start at, in milliseconds. |

### ct.timer.addTimedTimer(name, length, callback, [uiDelta], [startTime]) ⇒ <code>void</code>
Adds a new timer to `ct.timer.timedTimers`.

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The timer's name, which will be used to access from `ct.timer.timedTimers`. |
| length | <code>Number</code> | The length for the timed timer, in milliseconds |
| callback | <code>Function</code> | The function to call when the timer ends. |
| [uiDelta=false] | <code>Boolean</code> | If `true`, it will use `ct.deltaUi` for counting time. if `false`, it will use `ct.delta` for counting time. |
| [startTime=0] | <code>Number</code> | The amount of time to start at, in milliseconds. |

### ct.timer.removeTimer(name) ⇒ <code>void</code>
Adds a new timer to `ct.timer.timedTimers`.

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The timer's name, which was used to access from `ct.timer.timedTimers`. |

## Timer properties

### CtTimer.time ⇒ <code>Number</code>

The amount of time the timer has been active, in milliseconds.

## Timed timer properties 

Includes [timer properties](#timer-properties).

### CtTimedTimer.length ⇒ <code>Number</code>

The amount of time the timer will be active, in milliseconds.

### CtTimedTimer.callback ⇒ <code>Function</code>

The function that will be called when the timer reaches `CtTimedTimer.length`.

### CtTimedTimer.done ⇒ <code>Boolean</code>

If `true`, the timer is done and `CtTimedTimer.time` will not increase. If `false`, the timer is not done and time will still increase.