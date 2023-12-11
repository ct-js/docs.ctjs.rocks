# sounds

`sounds` namespace stores methods that let you play sound effects in your game, apply filters to them, and change their volume.  
Since v4, ctjs uses [`pixi-sound`](https://pixijs.io/sound/examples/).  
Besides, you now can add variant(s) to a sound so, when a sound is played, one of the variants will be randomly played.  
The new sound editor also allows you to set ranged values for filters (pitch, distortion, reverb, etc.) to add some variety.  
For example, it's useful to slightly change the pitch of step or coin sounds to make them less repetitive and monotonous.

Most of the time, you will play a sound like this:  
::: code-tabs#tutorial
@tab JavaScript
```js
sounds.play('MySound');
```
@tab CoffeeScript
```coffee
sounds.play 'MySound'
```
:::

If the sound is a music track, you can loop it like this:
::: code-tabs#tutorial
@tab JavaScript
```js
sounds.play('MyTrack', { loop: true });
```
@tab CoffeeScript
```coffee
soundSettings =
    loop: true
sounds.play 'MyTrack', soundSettings
```
:::

### `sounds.play(name: string, options?: object)`

Plays a sound created in ctjs.
Argument | Type | Description
-|-|-
`name` | `string` | Sound's name
`options` | `object` | *(optional)* Options used for sound playback.
`options.complete` | `Function` | When completed.
`options.end` | `number` | End time in seconds.
`options.filters` | `filters.Filter[]` | Filters that apply to play.
`options.loaded` | `Function` | If not already preloaded, callback when finishes load.
`options.loop` | `boolean` | Override default loop, default to the Sound's loop setting.
`options.muted` | `boolean` | If sound instance is muted by default.
`options.singleInstance` | `boolean` | Setting true will stop any playing instances.
`options.speed` | `number` | Override default speed, default to the Sound's speed setting.
`options.start` | `number` | Start time offset in seconds.
`options.volume` | `number` | Override default volume.

**Returns** Either a sound instance, or a promise that resolves into a sound instance.  
See [`IMediaInstance`](https://pixijs.io/sound/docs/IMediaInstance.html).

### `stop(name?: string | IMediaInstance)`

Stops a sound if a name is specified, otherwise stops all sounds.

### `pause(name?: string)`

Pauses a sound if a name is specified, otherwise pauses all sound.

### `resume(name?: string)`

Resumes a sound if a name is specified, otherwise resumes all sound.

### `exists(name: string)`

Returns whether a sound with the specified name was added to the game.  
This doesn't tell whether it is fully loaded or not, it only checks for existance of sound's metadata in your game.

**Returns** Boolean.

### `playing(name?: string)`

Returns whether a sound is currently playing if a name is specified, otherwise if any sound is currently playing.

**Returns** Boolean.

### `volume(name: string | IMediaInstance, volume?: number)`

Get or set the volume (where 1 is 100%) for a sound.  
If `volume` is not specified, it will return the existing volume.

**Returns** Number. The current/new volume of the sound.

### `globalVolume(value: number)`

Set the global volume (where 1 is 100%) for all sounds.

### `fade(name?: string | IMediaInstance | SoundLibrary, newVolume?, duration?)`

Fades a sound to a given volume. Can affect either a specific instance or the whole group.
Argument | Type | Description
-|-|-
`name` | `string` | Sound's name or instance to affect. If null, all sounds are faded.
`newVolume` | `number` | *(optional)* The new volume where 1 is 100%. Default is 0.
`duration` | `number` | *(optional)* The duration of transition, in milliseconds. Default is 1000.

::: code-tabs#tutorial
@tab JavaScript
```js
// Fade-out all sounds to volume 0 (by default) in 1000 milliseconds (by default).
sounds.fade();
```
@tab CoffeeScript
```coffee
# Fade-out all sounds to volume 0 (by default) in 1000 milliseconds (by default).
sounds.fade
```
:::

::: code-tabs#tutorial
@tab JavaScript
```js
// Fade-in 'MySound' to volume 1 in 2000 milliseconds.
sounds.fade('MySound', 1, 2000);
```
@tab CoffeeScript
```coffee
# Fade-in 'MySound' to volume 1 in 2000 milliseconds.
sounds.fade 'MySound', 1, 2000
```
:::

### `addDistortion(sound: string, amount: number)`

Adds a distortion filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of a sound to affect. If set to false, applies the filter globally.
`amount` | `number` | The amount of distoration from 0 to 1. Default is 0.

### `addEqualizer(sound: string, f32: number, f64: number, f125: number, f250: number, f500: number, f1k: number, f2k: number, f4k: number, f8k: number, f16k: number)`

Adds an equalizer filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of a sound to affect. If set to false, applies the filter globally.
`Band frequences` | `number` | Default gain for each band frequence. Default is 0. Recommended value from -40 to 40.

### `addMonoFilter(sound: string)`

Combine all channels into mono channel.
Argument | Type | Description
-|-|-
`name` | `string` | The name of a sound to affect. If set to false, applies the filter globally.

### `addReverb(sound: string, seconds: number, decay: number, reverse: boolean)`

Adds a reverb filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of a sound to affect. If set to false, applies the filter globally.
``seconds`` | `number` | Seconds for reverb. Default is 3.
``decay`` | `number` | The decay length. Default is 2.
``reverse`` | `boolean` | Reverse reverb. Default is false.

### `addStereoFilter(sound: string, pan: number)`

Adds a filter for stereo panning.
Argument | Type | Description
-|-|-
`name` | `string` | The name of a sound to affect. If set to false, applies the filter globally.
`pan` | `number` | The amount of panning, -1 is left, 1 is right, 0 is centered. Default is 0.

### `addTelephone(sound: string)`

Adds a telephone-sound filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of a sound to affect. If set to false, applies the filter globally.

NB: You can add several filters to the same sound.

::: code-tabs#tutorial
@tab JavaScript
```js
sounds.addReverb('MySound', 5, 7);
// If the sound is not already playing, it won't be played until you use the 'play' method.
sounds.play('MySound');
```
@tab CoffeeScript
```coffee
sounds.addReverb 'MySound', 5, 7
# If the sound is not already playing, it won't be played until you use the 'play' method.
sounds.play 'MySound'
```
:::

### `removeFilter(name: string, filter?: string)`

Remove a filter to the specified sound or to all sounds if name is set to false.
Also, if `filter` is omitted, all filters are removed.

### `speed(name: string | IMediaInstance, value?: number)`

Set the speed (playback rate) of a sound, where 1 is 100%.  
If `value` is not specified, it will return the existing speed.

**Returns** Number. The current/new speed of the sound.

### `speedAll(value: number)`

Same as above but for all sounds.

### `toggleMuteAll()`

Toggle muted property for all sounds.

**Returns** Boolean. `true` if all sounds are muted.

### `togglePauseAll()`

Toggle paused property for all sounds.

**Returns** Boolean. `true` if all sounds are paused.