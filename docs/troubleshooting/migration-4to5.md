# Migration guide for ct.js v5.0.

The transition from v4 to v5 should be pretty easy: the only breaking change comes with conversion of Font assets into Typefaces.

## Font to Typeface transition

* When opening a v4 project in ct.js v5, your Font assest will be automatically converted to Typefaces. Typefaces are collections of font files that can be directly linked in styles.
* If you have used custom fonts in Style assets, go to those Styles and select the needed Typeface in the new field in the style editors' Font tab.
* If you were creating text labels through code, the font family of those text labels must match the name of the Typeface. Make sure you are also using correct weight.

If you need help with transitioning your project to v5, ask a question in our [Discord server](https://comigo.games/discord).