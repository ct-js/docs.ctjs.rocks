# Functions

## Definition

```
// using a variable as a function
var myFunction=function(somevar){
	console.log(somevar);
}

// samething ....
function myFunction(somevar){
	console.log(somevar);
}

// add two numbers
function addAB(a,b){
	return a+b;
}
```

## Optional Parameters

```
// with optional parameters
function addAB(a,b=0){
	return a+b;
}
console.log(addAB(2));// gives 2

// using an array
function addAB(a=[1,0]){
	return a[0]+a[1];
}
console.log(addAB());// gives 1

// using an object
var optPars={
	a: 1,
	b: 2
}
function addAB(p=optPars){
	return p.a+p.b
}
console.log(addAB({b:2}); // gives 3

// Object Destructuring with Default Values: (best method)
function addAB({a=0,b=4}={}){
	return a+b;
}
console.log(addAB());// gives 4
console.log(addAB({a:23});// gives 27
console.log(addAB({b:23});// gives 23

```

## Operator Overloading

very fancy stuff to follow
```
function addAB( pars ){
	switch(typof(pars)){
		case 'string':
			console.log("Hello "+pars);
			return Number(pars);
		case 'object':
			const {a=1,b=2}=pars;
			return a+b;
		case 'array':
			let mysum=0;
			for(van n of pars){
				mysum += n;
			}
			return mysum;
		case 'number':
			return pars;
		default:
			console.log(typof(pars)+" what is this "+string(pars);
			return 0;
	}
}
console.log(addAB());	// 	returns 0
console.log(addAB({b:2});// 		3
console.log(addAB([1,2,3,4]);// 	10
console.log(addAB(7));//			7
```

## Special Case (this)

Sometimes, you need to pass a function between objects. Concider these objects:

### Object A

```
// creation event
this.index=42
this.myCallback=function(){
	console.log(this.index);
}
// click event
object_b.showDialog(this.myCallback.bind(this));
```

### object B

```
// creation event
this.showDialog=function(aCallback){
	// some code here
	aCallback();
}
```

### Summary

The showDialog could be a global function, or be anywhere...
By adding `.bind(this)` to the function name, JS will maintain the context
of binding `this` to objectA when the callback happens. Failure could result
in `this.index == undefined` because JS may bind `this` to the global scope.

