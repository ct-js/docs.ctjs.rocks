# ct.timer

`ct.timer` allows for making timers, optionally running a function when the timer reaches a certain amount of time.

Examples:

```js
// Add a timer
ct.timer.add(1000, 'test');
// Or:
new CtTimer(1000, 'test');

// Create a new timer and remember it in a variable `timer`
// Log "Done!" when it gets to 2.5 seconds
// This is an equivalent to `new CtTimer(2500, 'test')`
var timer = ct.timer.add(2500, 'test').then(() => {
    console.log('Done!');
});

// Log the timer's time count
console.log(timer.time);

// Remove the timer
ct.timer.removeTimer('test');
```

## ct.timer methods

### ct.timer.add(timeMs, name) ⇒ <code>void</code>
Creates a new timer that runs in gameplay time scale and is affected by time acceleration/deceleration.

| Param | Type | Description |
| --- | --- | --- |
| timeMs | <code>Number</code> | The length of the timer, **in milliseconds** |
| [name] | <code>String</code> | The timer's name, which will be used to access from `ct.timer.timers`. |

### ct.timer.addUi(timeMs, name) ⇒ <code>void</code>
Creates a new timer that runs in UI time scale.

| Param | Type | Description |
| --- | --- | --- |
| timeMs | <code>Number</code> | The length of the timer, **in milliseconds** |
| [name] | <code>String</code> | The timer's name, which will be accessible from `timer.name`. |

## Timer properties

### CtTimer.time ⇒ <code>Number</code>

The amount of time the timer has been active, in milliseconds.

### CtTimer.timeLeft ⇒ <code>Number</code>

The amount of time left until it gets to `timeMs`. Defaults to `0`.

### CtTimer.uiDelta ⇒ <code>Boolean</code>

If `true`, it will use `ct.deltaUi` for counting time. if `false`, it will use `ct.delta` for counting time.

### CtTimer.promise ⇒ <code>Promise</code>

The promise used to execute callbacks when the timer has finished. You can use it with other promises and [`Promise` methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to create complex asynchronous chains.

### CtTimer.resolve ⇒ <code>Function</code>

Instantly triggers the promise, calling its callback.

### CtTimer.reject ⇒ <code>Function</code>

Stops the timer by rejecting the internal promise.

### CtTimer.rejected ⇒ <code>Boolean</code>

If true, the timer was rejected.

### CtTimer.done ⇒ <code>Boolean</code>

If true, the timer was resolved.

### CtTimer.settled ⇒ <code>Boolean</code>

If true, the timer was either rejected or resolved.

## Timer methods

### CtTimer.then ⇒ <code>void</code>

Mirrors `CtTimer.promise.then()`.

Attaches callbacks for the resolution and/or rejection of the internal Promise.

| Param | Type | Description |
| --- | --- | --- |
| onfulfilled | <code>Any</code> | The callback to execute when the Promise is resolved. |
| [onrejected] | <code>Any</code> | The callback to execute when the Promise is rejected. |

### CtTimer.catch ⇒ <code>void</code>

Mirrors `CtTimer.promise.catch()`.

Attaches callbacks for the rejection of the internal Promise.

| Param | Type | Description |
| --- | --- | --- |
| onfulfilled | <code>Any</code> | The callback to execute when the Promise is resolved. |
| [onrejected] | <code>Any</code> | The callback to execute when the Promise is rejected. |