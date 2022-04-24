# Scaled copies or particles have dirty edges in ct.js game! What should I do?

You may notice bleeding/leaking artifacts on your textures, especially while using strongly scaled textures. It is particularly common for particle systems. This effect may be subtle or strong depending on how you use your textures, and how they are packed for a game.

Here is an example of how it can look in particle systems (note the darker vertical lines — they were not intended to be present):

![](./images/ts_LeakingPixels_bad.png)

This is solved by increasing the padding of an affected texture by a few pixels. Open the texture, and find the "Padding" field:

![](./images/ts_LeakingPixels_solution.png)

You may need to set it to only 2 pixels (this was enough in my case), but, the more the texture is scaled, the more it requires larger padding. Still, aim for the lowest needed value as big values may increase the number of texture atlases in your game, which affects performance if overused.

![](./images/ts_LeakingPixels_good.png)

Note that if you have issues with backgrounds, you most surely have a different issue, which is [described here](troubleshooting-teared-background.html).