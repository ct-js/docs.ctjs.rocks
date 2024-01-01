# sounds

`sounds` namespace stores methods that let you play sound effects in your game, apply filters to them, and change their volume. The sound editor also allows you to set ranged values for filters (pitch, distortion, reverb, etc.) to add some variety. For example, it's useful to slightly change the pitch of step or coin sounds to make them less repetitive and monotonous.
Besides, you now can add variant(s) to a sound so, when a sound is played, one of the variants will be randomly played.

:::tip Technical information
Since v4, ctjs uses [`pixi-sound`](https://pixijs.io/sound/examples/) under the hood. You can get instances of the Sound class in `res.pixiSounds` dictionary.
:::

## Playing and working with sounds

Most of the time, you will play a sound like this:
::: code-tabs#reference
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
::: code-tabs#reference
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
`options.start` | `number` | Start time offset, in seconds.
`options.end` | `number` | End time, in seconds.
`options.loop` | `boolean` | Whether to loop the sound or not.
`options.filters` | `filters.Filter[]` | `pixi-sound` filters to apply.
`options.complete` | `Function` | A callback that is called when the sound has finished playing.
`options.loaded` | `Function` | If the sound is not already preloaded, this function will be called when the sound asset finishes loading.
`options.muted` | `boolean` | If sound instance is muted by default.
`options.singleInstance` | `boolean` | Setting `true` will stop any playing instances.
`options.speed` | `number` | Override playback speed; defaults to the Sound's speed setting.
`options.volume` | `number` | Override the sound's volume.

**Returns** Either a sound instance, or a promise that resolves into a sound instance.
See [`IMediaInstance`](https://pixijs.io/sound/docs/IMediaInstance.html).

### `sounds.playAt(name: string, position: {x: number, y: number}, options?: object)`

Plays a 3D sound in the specified position. You can set the `position` argument to a copy, and the sound will follow the copy when it moves. To make the sound immovable, pass an object with unchanging `x`, `y` keys. The options object is the same as for `sounds.play` method.

#### Example: Play a 3D sound that follows the current copy

::: code-tabs#reference
@tab JavaScript
```js
sounds.playAt('MySound', this);
```
@tab CoffeeScript
```coffee
sounds.playAt 'MySound', this
```
:::

#### Example: Play a 3D sound under the current copy, but don't follow it

::: code-tabs#reference
@tab JavaScript
```js
sounds.playAt('MySound', {x: this.x, y: this.y});
```
@tab CoffeeScript
```coffee
pos =
  x: @x
  y: @y
sounds.playAt 'MySound', pos
```
:::

### `sounds.stop(name?: string | IMediaInstance)`

Stops the specified sound if a name is specified. Otherwise, it stops all the sounds in a game.

### `sounds.pause(name?: string)`

Pauses the specified sound if a name is specified. Otherwise, it pauses all the sounds in a game.

### `sounds.resume(name?: string)`

Resumes the specified sound if a name is specified. Otherwise, it resumes all the sounds in a game.

**Returns** Boolean.

### `sounds.playing(name?: string)`

Returns whether a sound is currently playing if a name is specified, otherwise if any sound is currently playing.

**Returns** Boolean.

### `sounds.volume(name: string | IMediaInstance, volume?: number)`

Get or set the volume for a sound, where `volume` is a value from 0 to 1, with 1 being 100% volume. If `volume` is not specified, it will return the existing volume instead.

**Returns** Number. The current/new volume of the sound.

### `sounds.globalVolume(value: number)`

Set the global volume for all sounds. `volume` is a value from 0 to 1, with 1 being 100% volume.

### `sounds.speed(name: string | IMediaInstance, value?: number)`

Set the speed (playback rate) of a sound, where 1 is 100%.
If `value` is not specified, it will return the existing speed.

**Returns** Number. The current/new speed of the sound.

### `sounds.speedAll(value: number)`

Same as above but for all sounds.

### `sounds.toggleMuteAll()`

Toggle muted property for all sounds.

**Returns** Boolean. `true` if all sounds are muted.

### `sounds.togglePauseAll()`

Toggle paused property for all sounds.

**Returns** Boolean. `true` if all sounds are paused.

### `sounds.fade(name?: string | IMediaInstance | SoundLibrary, newVolume?, duration?)`

Fades a sound to a given volume. Can affect either a specific instance or the whole group.
Argument | Type | Description
-|-|-
`name` | `string` | Sound's name or instance to affect. If null, all sounds are faded.
`newVolume` | `number` | *(optional)* The new volume where 1 is 100%. Default is 0.
`duration` | `number` | *(optional)* The duration of transition, in milliseconds. Default is 1000.

::: code-tabs#reference
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

::: code-tabs#reference
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

## Adding filters to sounds

### `sounds.addDistortion(sound: string, amount: number)`

Adds a distortion filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of the sound to affect. If set to `false`, applies the filter globally.
`amount` | `number` | The amount of distortion from 0 to 1. Default is 0.

### `sounds.addEqualizer(sound: string, f32: number, f64: number, f125: number, f250: number, f500: number, f1k: number, f2k: number, f4k: number, f8k: number, f16k: number)`

Adds an equalizer filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of the sound to affect. If set to `false`, applies the filter globally.
`Band frequences` | `number` | Default gain for each band frequence. Default is 0. Recommended values range from -40 to 40.

### `sounds.addMonoFilter(sound: string)`

Combine all channels into mono channel.
Argument | Type | Description
-|-|-
`name` | `string` | The name of the sound to affect. If set to `false`, applies the filter globally.

### `sounds.addReverb(sound: string, seconds: number, decay: number, reverse: boolean)`

Adds a reverb filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of the sound to affect. If set to `false`, applies the filter globally.
`seconds` | `number` | Seconds for reverb. Default is 3.
`decay` | `number` | The decay length. Default is 2.
`reverse` | `boolean` | Reverse reverb. Default is false.

### `sounds.addStereoFilter(sound: string, pan: number)`

Adds a filter for stereo panning.
Argument | Type | Description
-|-|-
`name` | `string` | The name of the sound to affect. If set to `false`, applies the filter globally.
`pan` | `number` | The amount of panning, -1 is left, 1 is right, 0 is centered. Default is 0.

### `sounds.addTelephone(sound: string)`

Adds a telephone-sound filter.
Argument | Type | Description
-|-|-
`name` | `string` | The name of the sound to affect. If set to `false`, applies the filter globally.

NB: You can add several filters to the same sound.

::: code-tabs#reference
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

### `sounds.removeFilter(name: string, filter?: string)`

Remove a filter to the specified sound or to all sounds if name is set to false.
Also, if `filter` is omitted, all filters are removed.

## Misc methods

### `sounds.exists(name: string)`

Returns whether a sound with the specified name was added to the game.
This doesn't tell whether it is fully loaded or not, it only checks for existance of sound's metadata in your game.

### `sounds.load(name: string)`

Preloads a sound. This is usually applied to music files before playing that are not preloaded by default.

**Returns**  A promise that resolves into the name of the loaded sound asset.

#### Example: Preloading the background music before switching to a room

::: code-tabs#reference
@tab JavaScript
```js
sounds.load('BackgroundMusic')
.then(() => {
    rooms.switch('MainRoom');
});
```
@tab CoffeeScript
```coffee
sounds.load 'BackgroundMusic'
.then =>
    rooms.switch 'MainRoom'
```
:::

#### Example: Preloading several sound assets before switching to a room

::: code-tabs#reference
@tab JavaScript
```js
var soundsToLoad = [],
    soundsNames = ['AmbientMusic', 'BattleMusic', 'VictoryMusic'];

for (var sound of soundNames) {
    soundsToLoad.push(sounds.load(sound));
}

Promise.all(soundsToLoad).then(() => {
    rooms.switch('MainRoom');
});
```
@tab CoffeeScript
```coffee
soundsToLoad = []

for sound in ['AmbientMusic', 'BattleMusic', 'VictoryMusic']
    soundsToLoad.push sounds.load sound

Promise.all soundsToLoad
.then =>
    rooms.switch 'MainRoom'
```
:::
