# Creating custom events for ct.js

Custom events are a perfect way to make your library easier to learn and use. It lets your users simplify their scripts and avoid boilerplate code. You've already been using events in templates and rooms through the event list, and your events can be there, too.

But firstly you need to understand how such events work.

## Events' code targets

Each event writes additional code to ct.js' game loop or an asset's template. There are 8 valid code targets that can be utilized:

* `thisOnCreate` — the code that is called when you create an entity (a template's copy) or switch to the target room;
* `thisOnDestroy` — the code that is called when the currently edited entity (room/template) is destroyed. For rooms, it triggers when you switch from one room to another, or when you remove a UI room from the stage;
* `thisOnStep` — the "frame start" code for the currently edited entity (template/room);
* `thisOnDraw` — the "frame end" code for the currently edited entity (template/room).

These were the regular lifecycle code targets. They execute for each copy/room and `this` keyword points to the current entity. But sometimes you need to run code once for all rooms/copies, perhaps for property initialization or global gameplay rules. The events below are analogous but are executed by root rooms only. A root room is always `ct.room` — a room with which your game starts or switches to, and which can contain UI layers and other sub-rooms.

* `rootRoomOnCreate`
* `rootRoomOnStep`
* `rootRoomOnDraw`
* `rootRoomOnLeave`

The execution context is different here. `this` will point to `ct.room`, and you will have to work with your templates/rooms by reading variable substitutions from `/*%%ENTITY_TYPE%%*/` and `/*%%ENTITY_NAME%%*/`. Perhaps you will need `ct.templates.list` or `ct.rooms.list` to access your copies and rooms.

Note that using `rootRoom*` fields makes the behaviors using it static, increasing the game's bundle size and preventing a game developer from adding and removing this behavior dynamically in game runtime, and you should only use such events when you can't use `thisOn*` fields alone.

When the ct.IDE's exporter bakes a game, it combines all the events into `thisOnCreate`, `thisOnDestroy`, `thisOnStep`, and `thisOnDraw` for each template and room, and gathers events for the root rooms from all the scriptable entities. One user event can contribute to several code targets at once: for example, a timer would declare itself in `thisOnCreate` and check for execution in `thisOnStep`.

## Writing an event

Events must be declared in `module.json`, then their code should be either inlined into `module.json` or written in separate files in the `events` folder.

### Event declaration

Events are declared in an object `events` in `module.json`. Here is an excerpt from ct.place as an example with most events' fields:

```json
{
    "main": {
        "name": "ct.place",
        "version": "4.0.0",
        /*...*/
    },
    /* ... */
    "events": {
        "collisionTemplate": {
            /* The name of the event as shown in the event selector and event list */
            "name": "Collision with a template",
            /* An example of a localized name. `Ru` is a language code here. */
            "name_Ru": "Столкновение с шаблоном",

            /* Events with arguments, like this one, can have a special templated name for event lists.
               %%template%% matches with the value of the `template` argument below. */
            "parameterizedName": "Collision with %%template%% template",
            /* An example of a localized name. `Ru` is a language code here. */
            "parameterizedName_Ru": "Столкновение с шаблоном %%template%%",

            /* An event can also have expanded descriptions shown in the "Add event" menu.
               These can also be localized */
            /* "hint": "An example of a description", */

            /* The displayed icon of this event.
               See the list of icons in the Meta section of the main ct.js menu.*/
            "icon": "copy",
            /* If set to true, the event in event list editor will try to fetch a thumbnail
               of the first room, template, or texture in the arguments list and display it. */
            "useAssetThumbnail": true,

            /* A list of scriptable entities that support this event. Currently can include `template`, `room`. */
            "applicable": ["template"],

            /* If you design an event for templates only, write the supported
            base classes here, or don't use this field at all if you support all of them. */
            "baseClasses": ["AnimatedSprite", "NineSlicePlane", "Text"],

            /* The codename of the category in which this event will be displayed. */
            "category": "collisions",

            /* The list of arguments (optional) that an event needs. */
            "arguments": {
                /* The name of the field is the variable name in your template code */
                "template": {
                    /* Displayed name in argument editor */
                    "name": "Template",
                    /* An example of a localized name. `Ru` is a language code here. */
                    "name_Ru": "Шаблон",
                    /* The type of the argument. */
                    "type": "template"

                    /* Numerical and string arguments can also have a default value.
                       They prefill the argument list for new events. */
                    /* "default": 404 */
                }
            },

            /* The list of code targets from the first section of this page to which this event contributes. */
            "codeTargets": ["thisOnStep"],

            /* Local variables which your event provides to user code. */
            "locals": {
                /* Declares a variable `other` of type `Copy`. */
                "other": {
                    /* The type is passed to TypeScript as is. */
                    "type": "Copy",
                    /* Local vars are listed under the list of events with their descriptions */
                    "description": "The copy you collide with",
                    /* Descriptions for local vars are localizable, too */
                    "description_Ru": "Копия, с которой случилось столкновение"
                }
            }
        },
        "collisionCGroup": {
            "name": "Collision with a group",
            /* ...same structure */
        }
    },
    "eventCategories": {
        "collisions": {
            "name": "Collisions",
            "icon": "copy"
        }
    }
}
```

:::tip
Types in the `events.yourEventCode.locals` are TypeScript names. `Copy` is a ct.js copy, `Room` is a ct.js room (see the docs for these and other built-in classes).

Besides these simple values, you can use `boolean`, `number`, `string` as local variables' types, as well as any other valid for TypeScript type descriptor.
:::

#### Parameterized events and argument types

Any event that has at least one argument is a parameterized event. Compared to simple events, there can be several parameterized events of one type in one template or room.
You can use arguments to further narrow down the event, or to provide settings for a user. An example of a parameterized event is a collision event, where a user can add several collision events with different arguments — templates to check collisions against. A built-in ct.js example of a parameterized event is any action event: the action itself is an argument here.

Ct.js supports these types of arguments:

* `integer`;
* `float`;
* `string`;
* `boolean`;
* `template`;
* `room`;
* `sound`;
* `tandem`;
* `font`;
* `style`;
* `texture`;
* `action`.

### Creating event categories

You can also add categories inside `module.json` in `eventCategories` object, with which your events can populate custom categories instead of built-in ones.

If a category happens to be empty, it is not displayed.

The structure of the category object, as can be seen in a previous code example, is quite simple:

```json
{
    "main": {
        "name": "ct.place",
        "version": "4.0.0",
        /*...*/
    },
    /* ... */
    "eventCategories": {
        /* The codename of your category. You use it to link events to it. */
        "collisions": {
            /* The displayed name of the category */
            "name": "Collisions",
            /* An example of a localized name for Ru locale. */
            "name_Ru": "Столкновения",
            /* The displayed icon of this category.
               See the list of icons in the Meta section of the main ct.js menu.*/
            "icon": "copy"
        }
    }
}
```

:::tip
You can also use built-in categories for your events instead of creating new ones. Built-in category names include these:

* `lifecycle`;
* `actions`;
* `pointer`;
* `animation`;
* `misc` (the default one).
:::

### Writing event's code

There are two ways to define code for each code target of an event: by inlining it inside `module.json` or by placing it in files with paths `events/eventCode_codeTarget.js`. The first method is suitable for small boilerplates and is mainly used for built-in events.

:::warn
While writing events, make sure you don't leak any variables outside your event, as it may result in any unforeseen behavior in other modules' events or user's code. If you declare any variables, use `let` and `const` instead of `var`, and wrap your function into `{ }`.
:::

#### Inlining events

Here is an example of an inlined event code:

```json
{
    "name": "Action press",
    "parameterizedName": "%%action%% press",
    "applicable": ["template", "room"],
    "icon": "airplay",
    "category": {
        "key": "actions",
        "custom": false
    },
    "arguments": {
        "action": {
            "name": "Action",
            "type": "action"
        }
    },
    "codeTargets": ["thisOnStep"],
    "inlineCodeTemplates": {
        /* This matches with codeTargets with its keys*/
        "thisOnStep": "if (ct.actions[/*%%action%%*/].${prop}) {\n/*%%USER_CODE%%*/\n}"
    }
}
```

#### Writing event's code in separate files

Here is a structure of a module with two events, one of them having three code targets:

```
catmod
 |
 |- docs
 |- events
 |  |- complexEvent_thisOnStep.js
 |  |- complexEvent_thisOnDraw.js
 |  |- complexEvent_rootRoomOnLeave.js
 |  `- simpleEvent_thisOnStep.js
 |- index.js
 `- module.json
```

You write JS code into these files as is, without any wrappers.

#### Templating event's code

`/*%%USER_CODE%%*/` gets replaced with the code a user writes in your event.

You can use arguments values with `/*%%argumentName%%*/`. You will probably need to add a wrapper to keep JS syntax valid, for example: `var targetEnemy = [/*%%enemy%%*/][0];`.

There are also two additional templating tokens you can use: `/*%%ENTITY_TYPE%%*/` and `/*%%ENTITY_NAME%%*/` that are substituted with asset type (`'room'`, `'template'`) and this asset's name.

:::warning
String values are automatically wrapped into quotes, as well as **actions**', templates', and other entities' names.
:::

:::tip
Do you need more examples? Check out the `place` catmod inside your ct.js installation folder > data > ct.libs > place.
:::