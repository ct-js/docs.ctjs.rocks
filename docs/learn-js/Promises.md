# Promises

Dealing with promises and async libs in CT.JS
can be confusing.. To simplify the idea of async code,
place wrapper function in the global scope 
** Project - Custom Scripts **

## Example problem

You have a code library you wish to import into CT.JS
that uses an async function called someFunction(someVars).
You cannot directly call this function within an object
because you need to use an **await** keyword.

## Solution

* Create Wrapper in ** Custom Scrips **
	```
	async function myFunction(someVars,passCallback,failCallback,alwaysCallback){
	try{
		const reply=await someFunction(someVars);
		passCallback(reply);
	}
	catch(error){
		failCallback("Error: "+error.message);
	}
	finally(){
		alwaysCallback(someVars);
	}
	```
* Create callback functions in object's **Creation** event
	```
	this.myPass=function(myVar){
		console.log(myVar);
	}
	this.myFail=function(myError){
		console.log(myError);
	}
	this.myAlway=function(myVar){
		console.log(myVar);
	}
	```
* Now you can call your Wrapper from your copy
	`myFunction("SomeCoolData",this.myPass,this.myFail,this.myAlway);`
	
## Summary

Notice when calling `myFunction` from the copy, you do not need
to use **await** as that is managed in the global function.
And be aware the although the myAlway function is always called,
it may be called either before or after the myPass/myFail functions. 