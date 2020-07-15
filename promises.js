/*
Introduction to promises - Asynchronous operations

In web development, asynchronous programming is notorious for being a challenging topic.

An asynchronous operation is one that allows the computer to “move on” to other tasks while waiting for the asynchronous operation to complete. 
Good examples of asynchronous operations are making a network request or querying a database. It must happen without halting the program.

*/

/*
Promises

Promises are objects that represent the eventual outcome of an asynchronous operation. A Promise object can be in one of three states:

-   Pending: The initial state — the operation has not completed yet.
-   Fulfilled: The operation has completed successfully and the promise now has a resolved value. For example, a request’s promise might resolve with a JSON object as it's value.
-   Rejected: The operation has failed and the promise has a reason for the failure. 
*/

const executorFunction = (resolve, reject) => { };
const myFirstPromise = new Promise(executorFunction);

/*
The executor function has two function parameters, usually referred to as the resolve() and reject() functions. 
The resolve() and reject() functions aren’t defined by the programmer. 
When the Promise constructor runs, JavaScript will pass its own resolve() and reject() functions into the executor function.
Take a look at the example below:
*/

const executorFunction = (resolve, reject) => {
  if (someCondition) {
    resolve('Resolved!');
  } else {
    reject('Rejected!');
  }
}
const myFirstPromise = new Promise(executorFunction);

/*
  - We declared a variable called 'myFirstPromise'
  - 'myFirstPromise' is constructed using 'new Promise()' which is the promise constructor method.
  - 'executorFunction()' is passed to the constructor and has two functions as parameters: resolve and reject.
  - If someCondition evaluates to true, resolve() will be invoked with the string 'Resolved!'
  - If not, we invoke reject() with the string 'Rejected!'
*/

/*
The Node setTimeout() Function

setTimeout() is a Node API that uses callback functions to schedule tasks to be performed after a delay. 
setTimeout() has two parameters: a callback function and a delay in milliseconds.

Take a look at the example below:
*/

const delayedHello = () => {
  console.log('Hi! This is an asynchronous greeting!');
};

setTimeout(delayedHello, 2000);

/*
Here, we invoke setTimeout() with the callback function delayedHello() and 2000.
In at least two seconds delayedHello() will be invoked.
This delay is performed asynchronously. The rest of our program won’t stop executing during the delay. 
Asynchronous JavaScript uses something called the event-loop.
After two seconds, delayedHello() is added to a line of code waiting to be run. 
Before it can run, any synchronous code from the program will run. 
Next, any code in front of it in the line will run. 
This means it might be more than two seconds before delayedHello() is actually executed.
*/

/*
The onFulfilled and onRejected Functions

To handle a “successful” promise, or a promise that resolved, we invoke .then() on the promise, passing in a success handler callback function:
*/

let prom = new Promise((resolve, reject) => {
  let num = Math.random();
  if (num < .5 ){
    resolve('Yay!');
  } else {
    reject('Ohhh noooo!');
  }
});

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectionReason) => {
  console.log(rejectionReason);
};

prom.then(handleSuccess, handleFailure);

/*
prom is a promise which will randomly either resolve with 'Yay!'or reject with 'Ohhh noooo!'.
We pass two handler functions to .then(). 
The first will be invoked with 'Yay!' if the promise resolves, and the second will be invoked with 'Ohhh noooo!' if the promise rejects.
*/

/*
Using catch() with Promises

The .catch() function takes only one argument, onRejected.
In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. 
Using .catch() accomplishes the same thing as using a .then() with only a failure handler.
*/

prom
  .then((resolvedValue) => {
    console.log(resolvedValue);
  })
  .catch((rejectionReason) => {
    console.log(rejectionReason);
  });

// We pass a success handler to .then() and a failure handler to .catch().

/*
Chaining Multiple Promises

One common pattern of asynchronous programming is multiple operations which depend on each other to execute or that must be executed in a certain order. 
We might make one request to a database and use the data returned to us to make another request and so on.
The process of chaining promises together is called composition. 
Promises are designed with composition in mind! 
Here’s a simple promise chain in code:
*/

firstPromiseFunction()
.then((firstResolveVal) => {
  return secondPromiseFunction(firstResolveVal);
})
.then((secondResolveVal) => {
  console.log(secondResolveVal);
});

/*
- We invoke a function firstPromiseFunction() which returns a promise.
- We invoke .then() with an anonymous function as the success handler.
- Inside the success handler we return a new promise— the result of invoking a second function, secondPromiseFunction() with the first promise’s resolved value.
- We invoke a second .then() to handle the logic for the second promise settling.
- Inside that .then(), we have a success handler which will log the second promise’s resolved value to the console.
*/

/*
Avoid Common Mistakes!!!!!!!!!!!

Mistake 1- Nesting promises instead of chaining them.
*/
returnsFirstPromise()
.then((firstResolveVal) => {
  return returnsSecondValue(firstResolveVal)
    .then((secondResolveVal) => {
      console.log(secondResolveVal);
    })
})

// Mistake 2 - Forgetting to return a promise.
returnsFirstPromise()
.then((firstResolveVal) => {
  returnsSecondValue(firstResolveVal)
})
.then((someVal) => {
  console.log(someVal);
})

/*
Using Promise.all()

What if we’re dealing with multiple promises, but we don’t care about the order?
To maximize efficiency we should use concurrency, multiple asynchronous operations happening together.
With promises, we can do this with the function Promise.all().

Promise.all() accepts an array of promises as its argument and returns a single promise. 

That single promise will settle in one of two ways:

1 - If every promise in the argument array resolves, the single promise returned from Promise.all() will resolve with an array containing the resolve value from each promise in the argument array.
2 - If any promise from the argument array rejects, the single promise returned from Promise.all() will immediately reject with the reason that promise rejected. 
** This behavior is referred to as 'failing fast' **

Take a look at the example below:
*/

let myPromises = Promise.all([returnsPromOne(), returnsPromTwo(), returnsPromThree()]);

myPromises.then((arrayOfValues) => {
    console.log(arrayOfValues);
  }).catch((rejectionReason) => {
    console.log(rejectionReason);
  });


/*
We declare myPromises assigned to invoking Promise.all().
We invoke Promise.all() with an array of three promises — the returned values from functions.
We invoke .then() with a success handler which will print the array of resolved values if each promise resolves successfully.
We invoke .catch() with a failure handler which will print the first rejection message if any promise rejects.
*/