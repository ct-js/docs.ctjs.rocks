# Camera

## Wrapping

```
if (this.x < 0) { // Have the ship crossed the left border?
	this.x = ct.camera.width; // Go back to the right border
}
if (this.x > ct.camera.width) { // Have the ship crossed the right border?
	this.x = 0; // Go back to the left border
}
if (this.y < 0) { // Have the ship crossed the top border?
	this.y = ct.camera.height; // Go back to the bot border
}
if (this.y > ct.camera.height) { // Have the ship crossed the bot border?
	this.y = 0; // Go back to the top border
}
```