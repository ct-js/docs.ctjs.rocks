# Strings

A collection of common string things...

## Replacing Text

```
* to convert this //const ext=".wsav,.txt,.json";
* to this //const allowedExtensions = ['.txt', '.json', '.wsav'];
* const allowedExtensions = ext.split(',');

// all occurances (/g)
let text = "Please visit Microsoft and Microsoft!";
let newText = text.replace(/Microsoft/g, "W3Schools");

// case insensetive (/i)
let text = "Please visit Microsoft!";
let newText = text.replace(/MICROSOFT/i, "W3Schools");
```

## string literals

```
let firstName = "John";
let lastName = "Doe";

let text = `Welcome ${firstName}, ${lastName}!`;
```

## JSON

* JSON.stringify(t_w)
* JSON.parse(t_w)
* const dataSize = Object.keys(t_w).length;
* values[w]=t_w[String(w)];// convert JSON object to array

## keyboard

```
var akey=ct.keyboard.lastKey();
var keycode=akey.charCodeAt(0);
```

## PIXI Text

```
this.scoreLabel = new PIXI.Text('Score: ' + String(TheScore), ct.styles.get('ScoreText'));
this.scoreLabel=this.addChild(this.scoreLabel);

// to update score
this.scoreLabel.text = 'Score: ' + TheScore;
```


