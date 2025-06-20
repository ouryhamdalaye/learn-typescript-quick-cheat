const greet = (name: string): string => {
    return `Hello, ${name}! 🎉`;
};
  
console.log(greet("ODI"));

/* Some basic typing */
const aString: string = 'Hello world'
const aNumber: number = 10
const aBoolean: boolean = true
const aNull: null = null
const aVoid: void = undefined // useful for functions that don't return a value
const anUndefined: undefined = undefined
const aSymbol: symbol = Symbol('symbol')
const aBigInt: bigint = BigInt(10)
const aDate: Date = new Date()

/* Special types */
const anAny: any = 'any' // avoid using this type, you can put anything you want in it but you never know what you're getting during runtime
const anUnknown: unknown = 'unknown' // this is a special type that is used to represent a value that is not known
const aNever: never = 'never' as never // this is a special type that is used to represent a value that is never

/* Arrays */
const anArray: Array<number> = [1, 2, 3]
const arr: string[] = ['John', 'Jane', 'Jim'] //this is another way to declare an array
const aTuple: [string, number] = ['John', 30] // this is a tuple, it's like an array but with a fixed length and type

/* Objects */
const aGenericObject: object = { name: 'John', age: 30 } // this is a generic object
const aSpecificObject: { name: string, age: number } = { name: 'John', age: 30 } // you can add '?' to make the property optional and '!' to make the property required
const aSpecificObjectWithInfiniteProperties: {name: string, [key: string]: any } = { name: 'John', age: 30, city: 'New York' } // this is a specific object with infinite properties, the [key: string] is a key that can be any string and the any is the value that can be any type

/* Functions */
const aFunction: (name: string) => string = (name: string): string => {
    return `Hello, ${name}! 🎉`;
}
const aFunctionWithOptionalParameters: (name: string, age?: number) => string = (name: string, age?: number): string => {
    return `Hello, ${name}! 🎉`;
}
function aFunctionWithDefaultParameters(name: string, age: number = 30): string { //default parameters only works on functions not arrow functions
    return `Hello, ${name}! 🎉`;
}
const cb: Function = (e: unknown) : void => {
    console.log(e)
}

// Function is a very generic type, TypeScript can't help much. better use the bellow approach with a specific signature (e: unknown) => void for example
// Bear in mind that when you specify void as a return type, it means that we don't care about the return value, but we can still return a value. see the example below
const aFunctionThatReturnsVoid : (e: unknown) => void = (e: unknown) : number => {
    return 3;
}

// const aFunctionThatReturnsVoid variableName :
// (e: unknown) => void signature (type) =
//  (e: unknown) : number => {...} implementation
console.log(aFunctionThatReturnsVoid(null))

function aFunctionThatTakesMultipleTypes(a: string | number, b: string | number) : string | number {
    // this is also what we call type narrowing. we are narrowing the type of the variable based on the value of the variable. this helps typescript to understand the type of the variable and avoid errors.
    if (typeof a === "string" && typeof b === "string") {
        return a + b;
    }
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    if (typeof a === "string" && typeof b === "number") {
        return a + b;
    }
    // up there : this is so fun because even though we are doing exactly the same thing in each if statement, typescript is happy because we did a type narrowing. Look at the part of type narrowing below.
    return "Invalid types";
}
console.log(aFunctionThatTakesMultipleTypes(1, 2)) // this will work
console.log(aFunctionThatTakesMultipleTypes("1", "2")) // this will work
console.log(aFunctionThatTakesMultipleTypes(1, "2")) // this will not work

/* Type narrowing */
// a few examples of type type narrowing coupled with typescript intelligence
// example 1 : with conditional access
const obj1: {foo: {tren:number}, bar: {tren:number}} = {foo: {tren:1}, bar: {tren:2}}
const checkIfExists = (param: typeof obj1 | null) => {
    const exists = param?.foo?.tren // here typescripts knows that exists is either a number or undefined
    if(exists){
        console.log("exists", exists); // here typescript knows that exists is a number
    }
}
checkIfExists(obj1)
// example 2 : with type guard
const isString = (param: string | number): param is string => {
    return typeof param === "string";
}
const isNumber = (param: string | number): param is number => {
    return typeof param === "number";
}
// example 3 : with typeof
function printId(id: string | number) {

    //console.log(id * id) // not working as typescript doesn't know if id is either a string or a number
    if(typeof id === "string"){
        console.log(id.toUpperCase())
    }
    if(typeof id === "number"){
        console.log(id * id)
    }
}
printId(1)
printId("1")

// example 4 : an extension of previous example
function printId2(id: string | boolean, id2: string | number) {
   if(id === id2){
    console.log(`${id} and ${id2} are the same`) // here typescript knows that id and id2 are string because this what is common between the two types
   }
}
printId2("1", "1")
function printId3(id: string | boolean, id2: string | number | boolean) {
    if(id === id2){
     console.log(`${id} and ${id2} are the same`) // here typescript knows that id and id2 are string because this what is common between the two types
    }
 }
 printId3(true, false) // it works lol


// example 5 : with instanceof
function printDate(date: Date | string) {
    if(date instanceof Date){
        console.log(date.toISOString())
    }
    else{
        console.log(date.toUpperCase())
    }
}
printDate(new Date())
printDate("2025-01-01")

// example 6 : with in
function printId4(id: String | Boolean) {
    if ("toUpperCase" in id) { 
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
    // Note : TypeScript 5.x (depending on config) tightened in checks to only work on object types — so if you have a primitive type in the parameters type position, you'll need to use a type guard to check if the property exists.
}
printId4("1")

// example 7 : you get a never type
function handleValue(val: string | number) {
    if (typeof val === "string") {
      console.log(val.toUpperCase());
    } else if (typeof val === "number") {
      console.log(val * 2);
    } else {
      // Should never happen!
      const check: never = val;
      console.log(check); // this is a never type, it means that the value is never going to be reached.
    }
}
handleValue("1")


const displayAlltheTypes = (): void => {
    console.log("aString", aString, typeof aString)
    console.log("aNumber", aNumber, typeof aNumber)
    console.log("aBoolean", aBoolean, typeof aBoolean)
    console.log("aNull", aNull, typeof aNull)
    console.log("aVoid", aVoid, typeof aVoid)
    console.log("anUndefined", anUndefined, typeof anUndefined)
    console.log("aSymbol", aSymbol, typeof aSymbol)
    console.log("aBigInt", aBigInt, typeof aBigInt)
    console.log("aDate", aDate, typeof aDate)
    console.log("anAny", anAny, typeof anAny)
    console.log("anUnknown", anUnknown, typeof anUnknown)
    console.log("aNever", aNever, typeof aNever)
    console.log("anArray", anArray, typeof anArray)
    console.log("arr", arr, typeof arr)
    console.log("aTuple", aTuple, typeof aTuple)
    console.log("aGenericObject", aGenericObject, typeof aGenericObject)
    console.log("aSpecificObject", aSpecificObject, typeof aSpecificObject)
    console.log("aSpecificObjectWithInfiniteProperties", aSpecificObjectWithInfiniteProperties, typeof aSpecificObjectWithInfiniteProperties)
    console.log("aFunction", aFunction, typeof aFunction)
}
displayAlltheTypes();

/* Type inference */
// TypeScript is intelligent enough to infer the type of the variable based on the value assigned to it.
// see the example below
const inferredType = 'Hello' // inferredType is a string
console.log("inferredType", inferredType, typeof inferredType)
const inferredType2 = 10 // inferredType2 is a number
console.log("inferredType2", inferredType2, typeof inferredType2)
const inferredType3 = true // inferredType3 is a boolean
console.log("inferredType3", inferredType3, typeof inferredType3)
const inferredType4 = null // inferredType4 is null
console.log("inferredType4", inferredType4, typeof inferredType4)

// also look at this wonderful example
const user: { name: string, age: number } = { name: "bob", age: 30 }
const a = "bob";
//console.log(user[a]) // this won't work but
const b = "name";
console.log(user[b]) // this will work
// all that said, it's better to type the object properties explicitly. this will reduce errors and improve readability and avoid marginal cases. see the example below
//const compteur = document.querySelector('#compteur') // if you pass your mouse over compteur you'll see typescript inferring Element | null. that because typescript doesn't know the type of the element.
//const compteur2 = document.querySelector('#compteur') as HTMLInputElement // this is a way to tell typescript that the element is an HTMLInputElement
//const compteur3 = <HTMLInputElement>document.querySelector('#compteur') // this is another way to tell typescript that the element is an HTMLInputElement

/* Aliases & Generics */
// the following is a type alias. it's a way to give a name to a type.
// it's useful when you want to reuse a type multiple times.
// it will not be outputted in the javascript code.
type User = {
    id: number | string;
    name: string;
    age: number;
}

const user2: User = { id: 1, name: "bob", age: 30 }
console.log(user2)
// we can also do this
type P = keyof User
const p: P = "name"
const p2: P = "age"
//console.log(p)
//console.log(p2)
// this is a keyof operator. it's a way to get the keys of an object.
// it's useful when you want to get the keys of an object.
// it will be outputted in the javascript code.
type UserKeys = keyof User
const userKeys: UserKeys = "name"
const userKeys2: UserKeys = "age"
//console.log(userKeys)
// also you can do
type userID = User['id']
// here we are getting the type of the id property of the User type. and if in the future we add a type for this property, it will be reflected in the userID type.
// also you can do this
type UserType = {
    [K in keyof User]: User[K]
}
const user3: UserType = { id: 1, name: "bob", age: 30 }
console.log(user3)
// here we are telling typescript that the type of the user3 object should be one of the same as the User type.
// you can also use typeof to get the type of an object.
type UserType2 = typeof user2
const user4: UserType2 = { id: 1, name: "bob", age: 30 }
console.log(user4)


// the following is a generic type. it's a way to create a type that can be used with different types.
// it's useful when you want to create a type that can be used with different types.
// it will be outputted in the javascript code.
// understand the case
function identity(arg: any): any {
    return arg;
}
const aa = identity("bob") // even though it's a string we loose its signature because it refers to the function signature.
// so we need to use a generic type to tell him that this function takes an input of type T and returns an output of type T.
const identity2 = <ArgType>(arg: ArgType): ArgType => {
    return arg;
}

const identityType = identity2<string>("bob")
const identityTypeBis = identity2("bob") // this is a type inference. typescript will infer the type of the argument based on the value of the argument. And it works too.
const identityType2 = identity2<number>(1)
const identityType3 = identity2<boolean>(true)
const identityType4 = identity2<string[]>(["bob", "john"])
const identityType5 = identity2<{name: string, age: number}>({name: "bob", age: 30}) // and so on
// for multiple types arrays
const bb: Array<string | number> = ["bob", "john", 1, 2, 3]
// we can also have a type that takes multiple generic types
function merge<T, U>(a: T, b: U): T & U {
    return { ...a, ...b };
}
const merged = merge({name: "bob"}, {age: 30})
console.log(merged)


// another cool example
// here we are saying that the type must have a length property and that the length property must be a number.
function consoleSize<Type extends {length: number}>(arg: Type): Type {
    console.log(arg.length)
    return arg;
}
consoleSize([1, 2, 3])
consoleSize("Hello")
consoleSize({length: 10})
//consoleSize(10) // this will not work because 10 is not an object with a length property

/* Readonly */
// the following is a readonly type. it's a way to make a type readonly.
// it's useful when you want to make a type readonly.
// it will be outputted in the javascript code.

function reverse<T>(arg: readonly T[]): T[] {
    //return arg.reverse(); // it is know that in JS reverse mutates the array. so to prevent that we can set a readonly type that protects the array from being mutated. so this line won't work.
    // but if we do this
    return [...arg].reverse(); // this will work because we are creating a new array and not mutating the original one.
}
const reversed = reverse(["Hello", "World"])
console.log(reversed)


/* Classes */
class Person {
    private name: string //typescript allows you to specify the visibility of the property. private property are only accessible within the class.
    protected age: number //protected property are accessible within the class and its subclasses.
    // we can also specify the visibility of the constructor.
    public email: string // public property are accessible everywhere. This is the default.
    
    public constructor(name: string, age: number, email: string) {
        this.name = name // by the way, this is a type that refers to the instance of the class. This is classic in OOP.
        this.age = age
        this.email = email
    }

    getName() {
        return this.name
    }
    // we can also specify the visibility of the method.
    public getAge() {
        return this.age
    }
}
class Employee extends Person {
    constructor(name: string, age: number, email: string) {
        super(name, age, email)
    }

    getEmployeeAge() {
        return this.age
    }
}
const personInstance = new Person('John', 30, 'john@example.com')
const employeeInstance = new Employee('Jane', 25, 'jane@example.com')
//console.log(personInstance.name) // this will not work because name is private
console.log(personInstance.getAge()) // this will work because getAge is public
console.log(employeeInstance.getAge()) // this will work because getAge is public

// Note that private, protected and public keywords are TS-only features. they exist for developer guidance and error-checking during development. Not used as runtime security, TypeScript uses these to enforce access rules during compilation only.
// See the example below
// no access modifiers
class User2 {
    name: string;
    password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    login(input: string): boolean {
        return input === this.password;
    }
}

const user2Instance = new User2('John', '123456')

//later in another file or team member's code
user2Instance.password = 'hacked' // ❌ No warning
// The password field is fully exposed — anyone can change it, even by mistake, and you might not notice until production!
// in ES2022 (ES13) we can use the # symbol to make a property private.
class User3 {
    #name: string;
    #password: string;
    
    constructor(name: string, password: string) {
        this.#name = name;
        this.#password = password;
    }

    login(input: string): boolean {
        return input === this.#password;
    }
}
const user3Instance = new User3('John', '123456')
console.log(user3Instance.login('123456'))

//user3Instance.password = 'hacked' // not working
// moving on. we can also set the access modifiers on the constructor.
class User4 {

    constructor(public name: string, private password: string) {
        this.name = name;
        this.password = password;
    }

}

const user4Instance = new User4('John', '123456')
console.log(user4Instance.name)
//console.log(user4Instance.password) // not working

// we can also create generic classes
class Collection<T> {
    constructor(private items: T[]) {
       
    }

    first(): T | null {
        return this.items[0] || null;
    }
}

const collection = new Collection<string>(['Hello', 'World'])
console.log(collection.first())




/* Interfaces */
// the following is an interface. it's a way to define a type.
// it's useful when you want to define a type that can be used with different types.
// it will be outputted in the javascript code.
interface UserInterface {
    name: string;
    age: number;
}







