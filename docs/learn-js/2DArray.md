# 2DArray

```
//2d array
var myMap = [
    [1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1],
    [2, 0, 1, 1, 1],
    [1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0]
];
//myMap[2][0]. (This example would return 2)
}
```

# 1D Array Sorting

```
const points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b});
```

Works because the function is a "sort" function. When the sort() function compares two values, it sends the values to the compare function, and sorts the values according to the returned (negative, zero, positive) value.
```
If the result is negative, a is sorted before b.

If the result is positive, b is sorted before a.

If the result is 0, no changes are done with the sort order of the two values.
```
