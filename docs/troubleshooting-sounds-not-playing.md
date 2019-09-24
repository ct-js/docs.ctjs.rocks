# Sounds don't play at startup under certain (or "completely random") conditions

You may notice that sound effects or music don't play at startup sometimes. This is due to browsers' behavior: they won't let you play any sound unless a user interacted with a game. Moving a mouse pointer over a game is enough, so it looks like it works in one case and not in the others. That's not something ct.js can change, and not exclusive to ct.js as well, but there are a number of workarounds to spawn sounds reliably:

- Create a splash screen with your logo or such;
- Create a starting room in which players can either enable sounds or not;
- On itch.io, select "Click to launch in fullscreen" in your project's Embed options
- Add anything that requires interaction before your actual game starts :)