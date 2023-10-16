let userName : string = "John"
let age : number = 18
// console.log(userName, age)

const dispalyInfo = (name:string,age:number): void =>{
    console.log(`Name: ${name}, age: ${age}`)
}

dispalyInfo(userName,age)

let test : any = 123
let isAdult : boolean = age >= 18
console.log(`${test} ${isAdult}`)

let test_2 : unknown = 12 // any

let test_3 : never = true // error

let test_4 : null = null // null
let test_5 : undefined = undefined // undefined

let test_6 : bigint = 9007199254740991 // big numbers

let test_7 : symbol = Symbol("VALUE") // symbols

let fruits : string[] = ["apple,grape,mellon"] // arrey/list
fruits.push("orange")

let fruits_2 : readonly string[] = ["apple,grape,mellon"] // can't be changed

let data : {
    name:"John"
    age:15
}

interface data_2 {
    name:"John"
    age:15
}