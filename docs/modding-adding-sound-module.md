# Making your own sound module

The core of ct.js no longer provides a built-in sound system. Since v2, a game developer is required to enable one of the sound modules in order for sounds to work, otherwise `ct.res` will throw an error if there are sounds in the project.

If you want to create your own sound system, you need to know that when the game starts, `ct.res` expects to find a method `ct.sound.init`, and this method is called with three arguments:

1) The name of the sound as it is defined in ct.IDE (a string);
2) An object with three properties showing which formats were provided:
    * `wav` — the relative path to the sound's WAV file, if there is any.
    * `mp3` — same as above but for MP3 files.
    * `ogg` — same as above but for OGG files.
3) Additional properties inside an object:
    * `poolSize` — the maximum number of sounds played together.
    * `isMusic` — whether or not the sound was marked as a music file in ct.IDE. You can do some heuristics based on this value, like lazy-loading music files to quicken the project loading process.
