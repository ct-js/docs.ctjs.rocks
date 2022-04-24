# Streamline texture import with magic numbers

Ct.js has a bit of heuristic that helps to import groups of assets at once.

Firstly, it names an asset by the basename of the imported file. For example, if you have a file `Player_Walk.png`, then the asset will be named as `Player_Walk`. If you correctly name your files, you won't have to rename them to ct.js.

Secondly, you can add magic suffixes to the file's name to automatically divide them into frames. There are two variants:

* `Name_NxM.format`, e.g. `Asteroid_3x2.png`, `Player_Running_8x1.png`. Here, N is the number of columns, and M is the number of rows. `Player_Running_8x1.png` will turn into `Player_Running` split into 8 columns and 1 row.
* `Name_NxM@U.format`, e.g. `SmokeParticles_3x2@5.png`, `Player_Girl_8x5@37.png`. Here U stands for the number of frames used inside ct.js, which is helpful for large grids that are not 100% filled with frames or tiles. `Player_Girl_8x5@37.png` will be imported as a sprite split into 8 columns, 5 rows, and using 37 frames in total. Without the last parameter, it would use all the 40 frames, though the last 3 could be empty.