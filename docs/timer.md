# timer

`timer` allows for making timers, optionally running a function when the timer reaches a certain amount of time.

Examples:

::: code-tabs#tutorial
@tab JavaScript
```js
// Add a timer
timer.add(1000, 'test');
// Or:
new CtTimer(1000, 'test');
```
@tab CoffeeScript
```coffee
# Add a timer
timer.add 1000, 'test'
# Or:
new CtTimer 1000, 'test'

```
:::

::: code-tabs#tutorial
@tab JavaScript
```js
// Create a new timer and remember it in a variable `timer`
// Log "Done!" when it gets to 2.5 seconds
var timer = timer.add(2500, 'test');
timer.then(() => {
    // Do something useful
    hero.invincible = false;
    console.log('Done!');
})
// The `catch` part is not necessary. Without it, though, you will
// see errors in the console when timers got interrupted,
// either manually or when you switch rooms
.catch(e => {
    console.log('Timer removed', e);
    // You can add code here so that important stuff still
    // gets executed on room switch:
    hero.invincible = false;
});

// Log how much time left
console.log(timer.time);

// Stop the timer. It won't call the code inside `then(() => {})` clause
timer.reject();

// Trigger the timer manually
timer.resolve();
```
@tab CoffeeScript
```coffee
# Create a new timer and remember it in a variable `timer`
# Log "Done!" when it gets to 2.5 seconds
timer = timer.add 2500, 'test'
timer.then =>
    # Do something useful
    hero.invincible = false
    console.log 'Done!'
.catch (e) =>
    # You can add code here so that important stuff still
    # gets executed on room switch:
    console.log 'Timer removed', e
    hero.invincible = false

# Log how much time left
console.log timer.time

# Stop the timer. It won't call the code inside `then => …` clause
timer.reject()

# Trigger the timer manually
timer.resolve()
```
:::

## timer methods

### timer.add(timeMs, name) ⇒ <code>void</code>
Creates a new timer that runs in gameplay time scale and is affected by time acceleration/deceleration.

| Param | Type | Description |
| --- | --- | --- |
| timeMs | <code>Number</code> | The length of the timer, **in milliseconds** |
| [name] | <code>String</code> | The timer's name, which will be accessible from `timer.name`. |

### timer.addUi(timeMs, name) ⇒ <code>void</code>
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

### CtTimer\.name ⇒ <code>String|false</code>

The given name of a timer, or `false` if no name was given.

### CtTimer.uiDelta ⇒ <code>Boolean</code>

If `true`, it will use `u.timeUi` for counting time. if `false`, it will use `u.time` for counting time.

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
