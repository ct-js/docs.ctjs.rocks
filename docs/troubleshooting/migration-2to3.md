# Migration guide for ct.js v3.0.

Ct.js v3, though massive in improvements, is actually pretty compatible with older projects. Projects will be converted to the new events system and room editor automatically. Still, there are two edge cases.

## Old custom properties added to copies in the room editor are not displayed

They exist logically but are not displayed. You may need to recreate them.

Previously, ct.js saved properties coming from modules and game developers in one place; now they are separated, but it is hard to distinguish which is which during the conversion process.

## Sometimes older placeholder textures break

This is rare and will probably happen to those who used ct.js Nightly before v3 release.

Sometimes textures, generated with ct.js, will break project loading or room editor. You can fix it by opening your project's `img` folder, and removing `}` symbol in placeholder textures' filenames.

If you need help, write to our [Discord server](https://discord.gg/CggbPkb)!
