# Loops

## Do-While

### While

```
var i=0;
while (i < 10) {
	console.log( "The number is " + i);
	i++;
}
```

### Do

```
var i=0;
do {
	console.log("The number is " + i);
	i++;
}
while (i < 10); 
```

### Differences

if we set i=11 in both examples above,
the first example will skip the console.log
while the second will not

## For Loops

general syntax
```
for(let n=0;n<42;n++){
	if(n<5){continue;}	// skips rest of code
	console.log(n);
	if(n>10){break;}	// exits the loop
}
```

### Nested For

```
for(let xx=0;xx<42;xx++){
	for(let yy=0;yy<42;yy++){
		// place code here
	}
}
```

## Objects

including arrays ...

```
for (key in object) {
	// code block to be executed
}
const cars = ["BMW", "Volvo", "Mini"];

let text = "";
for (let x of cars) {
	text += x;
}
let language = "JavaScript";

let text = "";
for (let x of language) {
	text += x;
}
// scanning for an object
for (var aboss of ct.templates.list['obj_enemy']) {
	this.target=undefined;
	if ((aboss.isboss>0) && (aboss.boss<7)){
		this.target=aboss;
		//console.log("found aboss");
		break;
	}
}
```