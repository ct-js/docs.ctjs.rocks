# ct.js Docs [![Creative Commons Attribution 4.0 International](https://i.creativecommons.org/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/3e703edc-cd75-4b76-a580-35bc19cbbd55/deploy-status)](https://app.netlify.com/sites/clever-shaw-0cdd72/deploys)

Nice to meet you! This repo includes the official documentation of [ct.js game engine](https://ctjs.rocks/). The documentation site runs on [Vuepress](https://vuepress.vuejs.org/) and is hosted on [docs.ctjs.rocks](https://docs.ctjs.rocks/).

In this repo, you can:

* [open an issue](https://github.com/ct-js/docs.ctjs.rocks/issues/new) to highlight errors in docs, or send a pull request that will fix them;
* add a new tutorial;
* improve docs with better explanations and other stuff.

## Creating pull requests

Please organize your commits so each one changes, deletes or adds one subject: a tutorial, a function, a new module, a tip, etc. Examples:

* Adding one tutorial is a commit;
* Adding a tip or improving a paragraph is a commit;
* Changing an old variable to a new one across multiple documents is a commit.

## Editing & running a dev server

A dev server will allow you to preview your changes with live reloading. You will need to [install node.js](https://nodejs.org/en/download/), if you don't have it.

1. Clone the repo with `git clone https://github.com/ct-js/docs.ctjs.rocks.git`;
2. `cd ./docs.ctjs.rocks/`
3. run `npm install` in it;
4. run `npm run dev` to launch the server.

Then edit `*.md` files in the `./docs` folder.

New entries can be added at `.vuepress/config.js` → `themeConfig` → `sidebar` field.

## Naming convention

Use [Gitmoji-flavored Comigoji guide](https://comigo.gitlab.io/comigoji#gitmoji) for commit messages.

## License

Except where otherwise noted, content is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
