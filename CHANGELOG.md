## CHANGELOG

### 17 : undefined checking
- implemented error-checking for undefined values for all functions

### 16 : fill for card expiration
- implemented the `fill` property on the options parameter for `checkCardExpirationMonth()`
- implemented the `fill` property on the options parameter for `checkCardExpirationYear()`

### 15 : .length fix in checkNumber()
- changed an instance where I tried to access the `count` property on an array in `checkNumber()` to instead use the correct `length` property

### 14 : checkKey to alphanumeric key
- made some minor adjustments to the error messages and the options interpretation so that the default `options.type` is now `alphanumeric key` or ` key` is always appended to the `options.type` if it doesn't contain `key` in the string already

### 13 : reversion
- reverted the changes from patch # 12, as I misunderstood what was going on there

### 12 : card number result.type fix
- fixed an issue where `checkCardNumber()` was frequently trying to access the `type` property on `result` instead of `options`

### 11 : cardExpirationYear fix
- fixed a minor typo bug in `checkCardExpirationYear()` where the last try/catch block was trying to push an error to `result.error` instead of `result.errors`

### 10 : bool checkRequired fix
- fixed a minor issue with `checkRequired()` in '/lib/bool.js' where a conditional was meant to be assessing the `type` parameter to determine an appropriate possible error message, but instead was assessing the `value` parameter

### 9 : tests and fixes
- rewrote the '/tests.js' file completely to exemplify use-case scenarios for each function
- fixed an issue with `checkBool()` where it was calling the `checkInvalid()` function, which didn't exist for some reason
- fixed an issue with `toBoolean()` in '/lib/sublib/misc.js' where it wasn't throwing an exception error on unknown string values
- moved `countries` and `states` lists to their own files in '/lib/sublib/' and now import them where necessary to fix issues with their values not being available when necessary due to the lists being after the functions that utilize them for error-checking, and updated any references where necessary
- fixed some regular expressions involved in checking for whitespace characters
- fixed an issue with `checkEmailConfirm()` where I foolishly assigned `result.value` to the same value as the `confirm` parameter before it ever checks to make sure `value` and `confirm` match
- made it so '/index.js' will export `checkEmailAddressConfirm()` in addition to the shorter `checkEmailConfirm()`
- modified the `size` property on the `options` parameter for `checkHash()` to use the number of characters in the string instead of the total bit size of the hexadecimal hash
- removed the `mustBeFloat` option from `checkNumber()` as it was unnecessary
- fixed an issue where I foolishly assigned `confirm` to `result.value` before checking for mismatch
- removed the `short` and `long` properties from the options parameter for `checkString()`, now these will be assuming if the `min` or `max` properties are greater than or equal to 0 (use a negative number to skip checking these; `-1` is assigned as the defaults)
- added distinct regular expressions for testing each version of UUID, as well as `0` for a more generic UUID
- made the default `version` for `checkUUID()` `0`

### 8 : name.js
- changed the filename of '/lib/name_general.js' to just '/lib/name.js' and updated any references accordingly

### 7 : checkMongodbID()
- changed the name of `checkID()` to `checkMongodbID()` to better match the filename

### 6 : boolean trigger
- added 'boolean' as a possible trigger for `checkBool()`

### 5 : fix isRequired
- fixed all check functions to properly return the result early if isRequired is false and the value is blank

### 4 : mongodb catch errstr
- fixed an issue where the input value reformat try/catch block in `checkID()` for mongodb IDs wasn't appending the error message to the `errstr` property on the returned value if an exception is thrown and the catch is called

### 3 : mongodb id check
- added a function for checking the validity of mongodb object IDs
- removed some slight redundancy in the error message for checking a UUID

### 2 : string long fix
- fixed an issue where `checkString()` was converting the `options.max` value to a boolean

### 1 : initial commit
- initial commit

---

## TODO

### TODO : improve address
- improved address validation regex
