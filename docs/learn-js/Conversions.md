# Conversions

```
// math conversions (0b not supported in ms-exp)
var bin = 0b1111;    // bin will be set to 15
var oct = 0o17;      // oct will be set to 15
var oxx = 017;       // oxx will be set to 15
var hex = 0xF;       // hex will be set to 15
// note: bB oO xX are all valid
// note: add a n suffix to mark as "BigInt" data type ...
var big_hex = 0xFFFFFFFFFFFn; 
var big_oct = 0o77777n // is not valid, does not work with octal
// note: you cannot do math with standard numbers and bigint numbers...
```

# Operators
```
Operator 	Description
+ 			Addition
- 			Subtraction
* 			Multiplication
** 			Exponentiation (ES2016)
/ 			Division
% 			Modulus (Division Remainder)
++ 			Increment
-- 			Decrement

Operator	Example		Same As
= 			x = y 		x = y
+= 			x += y 		x = x + y
-= 			x -= y 		x = x - y
*= 			x *= y 		x = x * y
/= 			x /= y 		x = x / y
%= 			x %= y 		x = x % y
**= 		x **= y 	x = x ** y
```

# Comparators
```
var health = 63,
    maxHealth = 100,
    mana = 100,
    maxMana = 100;

health < maxHealth; // true
mana > maxMana; // false
mana >= maxMana; // true
health <= maxHealth; // true
health === maxHealth; // are they equal? false
health !== maxHealth; // they aren't equal, right? true(!= also)

var cat = 'Albert',
    dog = 'Snowball';
cat === dog; // false
cat !== dog; // true
&&	AND
||	OR
!	NOT
?	Conditional ..... let voteable = (age < 18) ? "Too young":"Old enough";
variablename = (condition) ? value1:value2 

```

# BitWise
```
Operator 	Name 	Description
& 			AND 	Sets each bit to 1 if both bits are 1
| 			OR 		Sets each bit to 1 if one of two bits is 1
^ 			XOR 	Sets each bit to 1 if only one of two bits is 1
~ 			NOT 	Inverts all the bits
<< 			Zero fill left shift 	Shifts left by pushing zeros in from the right and let the leftmost bits fall off
>> 			Signed right shift 	Shifts right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off
>>> 		Zero fill right shift 	Shifts right by pushing zeros in from the left, and let the rightmost bits fall off
```