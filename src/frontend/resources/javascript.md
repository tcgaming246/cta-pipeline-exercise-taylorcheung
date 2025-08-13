# JavaScript (JS)

## Table of Contents

- [What is JavaScript](#what-is-javascript)
- [Variables - let / const / var](#variables---let--const--var)
- [Scope](#scope)
  - [Block Scope](#block-scope)
  - [Function Scope](#function-scope)
  - [Recap Scope](#recap-scope)
- [Functions: Arrow Functions & Callbacks](#functions-arrow-functions--callbacks)
  - [Traditional Function](#traditional-function)
  - [Arrow Functions](#arrow-functions)
  - [Callbacks](#callbacks)
  - [Recap Functions](#recap-functions)
- [JavaScript Events & DOM Manipulation](#javascript-events--dom-manipulation)
  - [What is the DOM](#what-is-the-dom)
  - [Selecting DOM Elements](#selecting-dom-elements)
  - [Modifying DOM Elements](#modifying-dom-elements)
  - [Reacting to Events: Listening for Button Clicks](#reacting-to-events-listening-for-button-clicks)
  - [Dynamically Adding Children](#dynamically-adding-children)
  - [Removing Children on Click](#removing-children-on-click)
  - [Summary of Key Methods For DOM Manipulation](#summary-of-key-methods-for-dom-manipulation)
  - [Common Gotchas](#common-gotchas)
  - [Recap JavaScript Events and DOM Manipulation](#recap-javascript-events-and-dom-manipulation)
- [Destructuring & Spread](#destructuring--spread)
  - [Why Learn These?](#why-learn-these)
  - [Destructuring Objects](#destructuring-objects)
  - [Destructuring Arrays](#destructuring-arrays)
  - [Spread Syntax](#spread-syntax)
  - [Common use cases](#common-use-cases)
  - [Recap Destructuring and Spread](#recap-destructuring-and-spread)
- [Import/Export Modules](#importexport-modules)
  - [What is a module?](#what-is-a-module)
  - [Exports](#exports)
  - [Recap Import/Export Modules](#recap-importexport-modules)
- [Async JS: Promises & async/wait](#async-js-promises--asyncwait)
  - [What is asynchronous JavaScript?](#what-is-asynchronous-javascript)
  - [What does async JavaScript solve for?](#what-does-async-javascript-solve-for)
  - [Promises: The Foundation of Modern Async JS](#promises-the-foundation-of-modern-async-js)
    - [What is a promise?](#what-is-a-promise)
    - [Error Handling for Async/Await](#error-handling-for-asyncawait)
  - [Combining Multiple Async Calls](#combining-multiple-async-calls)
  - [Recap Async](#recap-async)
- [Additional Resources](#additional-resources)

## What is JavaScript

Where HTML is like the structure of a webpage (the bones), and CSS is the styling (the skin and clothes), JavaScript is what makes the webpage come alive, allowing it to respond to what users do. For example, when you click a button and a menu opens, type in a form and see live feedback, or scroll and see things animate—that’s JavaScript in action.  

While JavaScript can be used for both front-end and back-end coding, we are going to focus our attention on the front-end aspects, particularly those concepts which pair well with React.

## Variables - let / const / var

```let``` - When you want to reassign a variable's value

```JS
let counter = 0;
counter = 1; // ✅ This works
```

```const``` - aka constant.  Use when you want to ensure your variable is never reassigned

```JS
const greeting = "Hello";
// greeting = "Hi"; // ❌ Error: Assignment to constant variable
```

But! Objects/arrays inside a const variable can be mutated:

```JS
const nums = [1, 2, 3];
nums.push(4);    // ✅ Works: [1, 2, 3, 4]
// nums = [4, 5]; // ❌ Error: Assignment to constant variable
```

```var``` (Old way -- avoid!)

- Hoisted (can be used before it's declared)
- Function scoped (not block-scoped) - leads to tricky bugs
- Not recommended in modern JS—just recognize it.

```JS
var name = "Alice";
name = "Bob";
```

## Comparison

Summary Table

|Operator|Meaning|Example|Result|
|---------|-------|---------|------|
|==| Equals (allows conversion)| 5 == '5'| true |
|===| Strict equals (type + value) |5 === '5'| false|
|>| Greater than |10 > 7 |true|
|<| Less than |3 < 6| true|
|>=| Greater than or equal to| 5 >= 5| true|
|<=| Less than or equal to |4 <= 2| false|

### Comparison Recap

- always prefer === over == for checking equality.

## Scope

Scope determines the accessibility of variables, objects, and functions from different parts of the code.

### Block Scope

- ```let``` and ```const``` are **block-scoped**
- a "block" exists in between curly braces ```{ ... }```

```js
if (true) {
  let a = 5;
  const b = 10;
  // Both exist here
}
// console.log(a); // ❌ ReferenceError
// console.log(b); // ❌ ReferenceError
```

### Function Scope

```var``` is NOT block-scoped, but function-scoped:

between hoisting and function scope, things can get pretty confusing

```js
x = 2; // no var declaration here, but this is valid JS when you don't use let or const
console.log(x); // 2

if (true) {
  var x = 'toast';
  console.log(x); // 'toast'

  var x = 'whoops';
}
console.log(x); // 'whoops'  -- because var "leaks" out of the block
```

### Recap Scope

- Use let for variables you plan to reassign.
- Use const whenever possible for safety, especially with arrays/objects.
- let and const are block-scoped: only exist in { ... }.
- var is function-scoped and should be avoided in new code.

## Functions: Arrow Functions & Callbacks

Functions are EVERYWHERE in JS and React

### Traditional Function

```JS
// Traditional function
function add(a, b) {
  return a + b;
}
```

- similar to var, these leverage hoisting and can be called before being declared
- can take advantage of more advanced JS concepts like ```this```, ```args```, and ```super``` (not part of this class)

### Arrow Functions

```JS
// Arrow function — can be shorter!
const add = (a, b) => a + b;

// Block body for complex logic & return
const triple = (n) => {
    const result = n * 3;
    return result; // Must use 'return' in block body!
}

// What if no parameters are passed in?  Use empty parenthesis.
const sayHi = () => console.log("Hi!");
```

- React uses arrow functions for callbacks, event handlers, and props!
- arrow functions are deliberately missing access to some more advanced JS functionality such as ```this```, ```args```, and ```super``` for simplification but that won't be an issue for 99% of your use cases in React projects.

### Callbacks

A callback is a function passed to another function to be “called back” later.

```JS
const greet = (name, callback) => {
    const fullGreeting = `Welcome, ${name}!`;
    alert(fullGreeting);
    callback(fullGreeting);
}

greet('Jane', (n) => console.log(n); // → Welcome, Jane!
```

Common Example: Array Methods

```JS
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // Arrow function as callback!
console.log(doubled); // [2, 4, 6] 
console.log(nums); // [1, 2, 3] -- unchanged
```

- map, filter, and forEach all take a callback!
- Caution: map and filter return a new array, but forEach changes the original. Check your documentation!

```JS
// filter for numbers greater than 2
const nums = [1, 2, 3];
const largeNumbers = nums.filter(n => n > 2); 
console.log(largeNumbers); // [3]
```

### Recap Functions

- Traditional functions - leverage hoisting and other advanced JS concepts such as ```this```
- Arrow functions – concise, great for callbacks.
- Callbacks – functions you pass as arguments.
  - Used for: array methods, event handlers, React props, async code.

## JavaScript Events & DOM Manipulation

### What is the DOM

- DOM = Document Object Model.
- The browser’s JS-friendly tree of all your HTML elements.
- With JS, you can select, create, change, or remove elements.
- Enables dynamic, interactive UIs!

### Selecting DOM Elements

```HTML
<p id='description'>You have 3 items!</p>
<ul id='grocery-list'>
    <li class='list-item'>Apples</li>
    <li class='list-item'>Oranges</li>
    <li class='list-item'>Bananas</li>
</ul>
```

```JS
const description = document.getElementById('description');
const listElement = document.getElementById('grocery-list');
const listItems = document.querySelectorAll('.list-item');
```

### Modifying DOM Elements

```JS
listElement.style.backgroundColor = 'yellow';
description.textContent = 'You have 4 items!';
```

### Reacting to Events: Listening for Button Clicks

```HTML
<button id="addBtn">Add Item</button>
<ul id="my-list"></ul>
```

```JS
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
  // code here runs every time button is clicked
  console.log('Button clicked!');
});
```

### Dynamically Adding Children

Suppose we want to add a new li every time the button is clicked:

```JS
addBtn.addEventListener('click', () => {
  const list = document.getElementById('my-list');
  const newItem = document.createElement('li');
  newItem.textContent = 'New List Item';
  list.appendChild(newItem);
});
```

- ```document.createElement('li')``` creates a new ```<li>```.
- ```appendChild``` adds it as the last child of the list.

### Removing Children on Click

Let's let users remove items—not just add them!

Add a Remove Button to Each List Item:

```JS
addBtn.addEventListener('click', function() {
  const list = document.getElementById('my-list');
  const newItem = document.createElement('li');
  newItem.textContent = 'New List Item ';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';

  // Add remove functionality
  removeBtn.addEventListener('click', function() {
    list.removeChild(newItem);
  });

  newItem.appendChild(removeBtn);
  list.appendChild(newItem);
});
```

What’s Happening:

- When "Add Item" is clicked, an ```<li>``` appears, with a "Remove" button inside.
- Clicking "Remove" removes only that list item.

### Summary of Key Methods For DOM Manipulation

|Purpose| Method|
|-------|---------|
|Select one |getElementById, querySelector|
|Select many |querySelectorAll|
|Create element |document.createElement()|
|Add to parent |parent.appendChild(child)|
|Remove element |parent.removeChild(child)|
|Set content |element.textContent = ...|

### Common Gotchas

- Only append your new child to the proper parent!
- You must remove an element from its parent node, not just by itself.
- If you re-select your list or buttons inside an event handler, they always reflect current DOM state.

### Recap JavaScript Events and DOM Manipulation

- **DOM** = Document Object Model - the browser's JS representation of your HTML elements
- **Selection**: Use `getElementById()` for single elements, `querySelectorAll()` for multiple
- **Modification**: Change content with `textContent`, styling with `element.style.property`
- **Event Handling**: Use `addEventListener()` to respond to user interactions (clicks, etc.)
- **Dynamic Creation**: `document.createElement()` creates new elements
- **Adding Elements**: `appendChild()` adds elements to the DOM tree
- **Removing Elements**: `removeChild()` removes elements from their parent
- **Key Pattern**: Select → Create/Modify → Append/Remove → Add Event Listeners
- Remember: Always append and remove from the correct parent node

*Pause for hands-on lesson*

---

## Import/Export Modules

### What is a module?

A module is a file containing JavaScript code that is isolated from other files, except for what it explicitly exports. Modules let you split large codebases into reusable, maintainable pieces.

### Exports

You can export named values and functions

```JS
// mathUtils.js

export const PI = 3.14;

export function add(a, b) {
  return a + b;
}
```

You can also have one default export (matters more when you import)

```JS
// greet.js
export default function greet(name) {
  return `Hello, ${name}`;
}
```

You can then import named exports

```JS
// in another file
import { PI, add } from './mathUtils'; // importing named exports

console.log(add(2, 3)); // 5
```

You can then import default exports (you can even rename them)

```JS
// in another file
import greet_renamed from './greet.js'; // importing default export

console.log(greet_renamed('Alex')); // 'Hello, Alex'
```

You can also import everything as an Object

```JS
import * as math from './mathUtils';

console.log(math.PI);      // 3.14
console.log(math.add(1,2));// 3
```

### Recap Import/Export Modules

- A module is just a JS file.
- Use ```export``` to share code, ```import``` to bring it in.
- Default export: ```export default ...``` & ```import name from ...```
- Named export: ```export const ...``` & ```import { name } from ...```

---

## Destructuring & Spread

### Why Learn These?

- You'll encounter objects and arrays everywhere in React: props, state, API data.
- Destructuring and spread syntax let you write cleaner, more readable code.

### Destructuring Objects

Motivation: Cleaner Extraction of Values

Imagine you have this user and you want to pull out its properties:

```JS
const user = { name: 'Alex', age: 25, city: 'Richmond', employer: 'CarMax' };
```

Without destructuring:

```JS
const name = user.name;
const age = user.age;
const city = user.city;
const employer = user.employer;
```

With destructuring:

```JS
const { name, age, city, employer } = user; 
```

Renaming while destructuring:

```JS
const { name: userName, age, city, employer } = user;
console.log(userName) // 'Alex'
```

### Destructuring Arrays

Extract positions by order:

```JS
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'
console.log(colors); // ['red', 'green', 'blue']
```

Skip values:

```JS
const colors = ['red', 'green', 'blue'];
const [,, third] = colors;
console.log(third); // 'blue'
```

With functions that return arrays:

```JS
function getLocation() {
  return [40.7128, -74.0060];
}

const [latitude, longitude] = getLocation();
console.log(latitude, longitude); // '40.7128', '-74.0060'
```

---

### Spread Syntax

Shorthand for listing out the properties/values in the object/collection

Copy & Merge Arrays

```JS
const nums = [1, 2, 3];
const moreNums = [...nums, 4, 5];
console.log(moreNums); // [1, 2, 3, 4, 5]
```

Copy, Add, and Replace Properties to Objects

```JS
const user = { name: 'Alex', hairColor: 'brown', age: 25 };
const updatedUser = { ...user, age: 26, location: 'Plano, TX' }; // taking all properties, replacing age, adding location
console.log(updatedUser); // { name: 'Alex', hairColor: 'brown', age: 26, location: 'Plano, TX' }
```

- Note: Later values override earlier ones.

Extract some, keep the rest

```JS
const user = {name: 'Alex', age: 25, hairColor: 'brown'}
const { name, ...others } = user;
console.log(name);     // 'Alex'
console.log(others);   // { age: 25, hairColor: 'brown' }
```

With Arrays

```JS
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]
```

### Common use cases

Copying Objects without changing the original

```JS
// customer starts with a partial address and starts to update their address in a form, but cancels before finishing.
const address = { street: '11844 West Broad', zipCode: '23233' };
const updatedAddress = { ...address }; // Let's copy the object first
updatedAddress.street2 = 'Apt 123'; // customer updates street2
// user cancels update before saving.  
// No worries as we did not change the original "address" object
```

### Recap Destructuring and Spread

- Object/Array destructuring helps extract values quickly.
- Spread (...) for copying and updating objects/arrays immutably (no mutation).
- These patterns are everywhere in React!

## Async JS: Promises & async/wait

### What is asynchronous JavaScript?

- Most things take time: Fetching data from APIs, loading files, waiting for user action.
- JS is single-threaded: “Blocking” the code while you wait would freeze the webpage.
- Async JS = ways to wait for things without stopping the rest of your code.

### What does async JavaScript solve for?

Callback Nightmares.  Previously you would have nested callbacks.  One API call would run after the previous and on and on.  This was very difficult to troubleshoot issues especially if the callbacks were spread across different modules.

```JS
// Callback hell example
setTimeout(function() {
  console.log('Step 1');
  setTimeout(function() {
    console.log('Step 2');
    setTimeout(function() {
      console.log('Step 3');
      setTimeout(function() {
        console.log('Step 4');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```

### Promises: The Foundation of Modern Async JS

#### What is a promise?

An object that represents a future value:  pending ⇒ fulfilled (resolved) or rejected (failed).

```JS
const promise = new Promise((resolve, reject) => {
    // some async work...
    if(true) {
        resolve("Finished!"); // ...if done
    } else {
        reject("Something went wrong"); // or reject if error
    }
});
```

Chaining with .then() and .catch()

```JS
promise.then(result => {
    console.log(result); // 'Finished!'
}).catch(error => {
    console.error(error);
});
```

Real Example

```JS
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())   // parse JSON body
    .then(data => console.log(data))     // use the data
    .catch(error => console.error(error));
```

### Async/Await -- Syntactic Sugar for Promises

- makes async code look like regular, readable code
- async function always returns a promise

```JS
const getTodos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
}

const todoList = getTodos();
```

- await pauses the function until the promise resolves.
- *Cleaner than chaining many .then() calls.*

#### Error Handling for Async/Await

Use ```try...catch``` blocks

```JS
async function getTodoSafe() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Failed to fetch:", error);
    }
}
getTodoSafe();
```

- This helps avoid application crashes and handle error messages gracefully.

### Combining Multiple Async Calls

- Sometimes you need many things, and want to do something after all of them finish.

```JS
async function fetchAll() {
    const [user, post] = await Promise.all([
        fetch('/api/user/1').then(r => r.json()),
        fetch('/api/post/1').then(r => r.json())
    ]);
    console.log(user, post);
}
```

### Recap Async

- Promises solve "what if this takes a while?" and replace callback nightmares.
- .then/.catch can be chained.
- async/await makes async code look clean—but always inside an async function.
- async/await error handling: Use try...catch.

## Additional Resources

| Name                |  Description                                                        |
|--------------------------|-------------------------------------------------------------------------|
| [Code Pen](https://codepen.io/pen/)|online playground for coding HTML, CSS, and JS with real-time rendering and feedback|
| [Mozilla's JavaScript  Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)| Robust documentation of JavaScript's features compiled by the creators of Firefox|
| [You don't know JS - 2nd Edition](https://github.com/getify/You-Dont-Know-JS)    | This series of short books goes into all the nitty gritty details of JavaScript to make you understand the deep inner workings of the language.  This knowledge will greatly enhance your JS career.  Note: parts of the 2nd edition are still in draft.  You can read this for free by clicking the link.  |
| [You don't know JS - 1st Edition](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/README.md)                 | The completed first edition.  You can also read this for free by clicking the link.|
| [Promise Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) | Mozilla Docs detailing promise chaining |
