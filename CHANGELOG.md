## TODO

### TODO : improve address
- improved address validation regex

---

## CHANGELOG

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
