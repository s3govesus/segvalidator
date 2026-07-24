# segvalidator
This project is designed to handle validating input and provide fairly detailed and formatted error data.

## Installation
use `npm install --save s3govesus/segvalidator` in the root of your Node.js project.  This assumes you already have Node.js and NPM installed, with a NPM project already set up.


## Usage
The segvalidator! can be implemented in one of two ways:
1. use the universal `check()` function:
```
const { check } = require('segvalidator');

let foo = '123 Main St.'; // the value to be validated
let checkedFoo = check('address line 1', foo, { type: 'address line 1' });

// resulting object:
// checkedFoo = {
//   value: '123 Main St.',
//   errors: [],
//   errstr: ''
// }
```

The `check()` function always takes __**at least**__ 3 parameters
- the kind of validation you're attempting
- the value you're checking
- an options object with various properties defining rules for the validation process, which varies

2. use the validation functions directly:
```
const { checkAddressLine1 } = require('segvalidator);

let foo = '123 Main St.'; // the value to be validated
let checkedFoo = checkAddressLine1(foo, { type: 'address line 1' });

// resulting object:
// checkedFoo = {
//   value: '123 Main St.',
//   errors: [],
//   errstr: ''
// }
```

An example which would result in errors:
```
const { check } = require('segvalidator');

let foo = 'err###@___.com '; // an example of an invalid e-mail address (also take note of the space at the end)
let checkedFoo = check('email address', foo);

// resulting object:
// checkedFoo = {
//   value: 'err###@___.com', // note the whitespace at the end was trimmed by default (use options parameter to change this)
//   errors: [{ error: "The e-mail address is invalid."}], // if an exception had occurred, there would also be an exception property with the exception thrown's message property for its value
//   errstr: 'The e-mail address is invalid.\r\n' // '\r\n' is escape characters and not actually visible in the string
// }
```

As you can see in the above examples, using either the universal `check()` function or the individual validation functions, such as `checkAddressLine1()`, always returns a data object with at least three properties:
- the `value` value, which is the original value that you were validating, often with some extra filtering applied (which can be turned off in the options parameter but is usually on by default)
- the `errors` array, which contains an array of objects made up of one or two properties - `error` and possibly `exception` if an exception error occurred
- the `errstr` value, which contains a string of all the values from the `errors.error` properties, concatenated with `\r\n` after each error, attempting to structure the errors in a presentable list format

See the 'options' section below for more information on the `options` property for each validation function.

Exceptions to this are:
1. The `checkBool()` function, which returns a data object with four properties instead:
  * the `value` value, same as above
  * the `intVal` value, which provides a numeric representation of the boolean value (0 for false, 1 for true)
  * the `errors` array, same as above
  * the `errstr` value, same as above

2. The `checkCardNumber()` function, which returns a data object with four properties instead:
  * the `value` value, same as above
  * the `errors` array, same as above
  * the `errstr` value, same as above
  * the `type` value, which provides a name as to what type of card it was - 'Visa', 'Mastercard', 'American Express', 'Diners Club', 'Discover', or 'JCB'


## OPTIONS
### TODO: write this
