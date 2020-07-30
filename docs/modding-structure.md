# Making your own ct.js modules: directory structure and manifest

Ct.js is moddable, and the process of making new modules is pretty easy! Modules, or catmods, can put new code into ct.js framework, hack on built-in events and procedures, add new project settings and editable fields for game assets.

Any module is a directory with a following structure, placed at `ct.js/data/ct.libs`:

```
mycatmod
  |
  |  (Core files)
  |-- index.js
  |-- module.json (required)
  |
  |  (Documents shown in a module's panel)
  |-- README.md
  |-- DOCS.md
  |-- CHANGELOG.md
  |-- LICENSE (plain text, strongly recommended)
  |
  |-- includes
  |   \-- (files to be copied to a resulting game)
  |
  \-- injects
      \-- (injections go here)
```
(more about injections [here](modding-events-and-injections.html))

* `module.json` allows your module to be discoverable by ct.IDE, and contains basic info, list of authors and description of module settings.

* `index.js` usually represents the main code of your module, and is bundled with all the remaining code of compiled game. A rule of thumb is to pack all your dependencies in one file. If your dependency is an another ct module, you can list this module as such in `module.json`. (See below for examples.) This file supports [templating](modding-events-and-injections.html#templating).

* `README.md` is a markdown file with general info, examples, special notes, etc. It is showed on the 'Info' tab in ct.IDE's modules section.

* `DOCS.md` is shown on the 'Documentation' tab in ct.IDE's modules section and is a markdown file too.

* `CHANGELOG.md` should contain a history of changes, if any.

## Structure of `module.json`

`module.json` is the only required file for your modules. Its minimal version has the following format:

```json
{
    "main": {
        "name": "Module's name",
        "version": "1.0.0",
        "authors": [{
            "name": "Cosmo Myzrail Gorynych",
            "mail": "admin@nersta.ru"
        }, {
            ...
        }]
    }
}
```

### Listing dependencies <badge>new in v1.3</badge>

Currently, catmods may express their dependency in other module with fields `dependencies` and `optionalDependencies` inside `module.json`. It allows ct.IDE to warn users about missing (disabled) modules. Please write info about getting custom modules in the "readme" section.

```json {9,10}
{
    "main": {
        "name": "An example module json with dependencies",
        "version": "1.0.0",
        "authors": [
            ...
        ]
    },
    "dependencies": ["tween"],
    "optionalDependencies": ["place"]
}
```

## Writing a mod

Depending on your needs, you will probably need to:

* Write your core logic in `index.js` file;
* [Inject custom code](modding-events-and-injections.html) into ct.js' events and procedures;
* [Add settings to your module](modding-events-and-injections.html) editable from ct.IDE and read them back though injections;
* [Add new editable fields](modding-events-and-injections.html) for types and other few asset types;
* [Implement new input methods](modding-input-methods.html) to integrate them into [Actions system](actions.html);
* [Add typings](modding-typings-and-intellisense.html) for smart autocompletion and type checks.

Follow the links to find the examples and references on further implementation.