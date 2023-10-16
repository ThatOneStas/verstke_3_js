var userName = "John";
var age = 18;
// console.log(userName, age)
var dispalyInfo = function (name, age) {
    console.log("Name: ".concat(name, ", age: ").concat(age));
};
dispalyInfo(userName, age);
var test = 123;
var isAdult = age >= 18;
console.log("".concat(test, " ").concat(isAdult));
var test_2 = 12; // any
var test_3 = true; // error
var test_4 = null; // null
var test_5 = undefined; // undefined
var test_6 = 9007199254740991; // big numbers
var test_7 = Symbol("VALUE"); // symbols
var fruits = ["apple,grape,mellon"]; // arrey/list
fruits.push("orange");
var fruits_2 = ["apple,grape,mellon"]; // can't be changed
var data;
