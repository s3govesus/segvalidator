const { checkEmpty, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// checks an alphanumeric key for issues
//
// EXAMPLE OPTIONS
// const exOptions = {
//   type: `confirmation`,
//   isRequired: true,
//   trim: true,
//   size: 20,
//   isCaseSensitive: false,
// };
// TODO add a `clean` option that removes any hyphens or whitespace between characters
// TODO add more specific error messages for things like length - don't rely only on a regular expression to check for validity
// TODO make it so there's a `toLowerCase` option instead of having the result automatically convert it to lowercase if `isCaseSensitive` is false
function checkKey(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    // get the type or clean it up to reduce redundancies in error messages created by appending 'key' after the type in the error strings
    options.type = options.type !== undefined ? options.type.toString() : `confirmation`;
    options.type = options.type.toLowerCase().lastIndexOf(`key`) === (options.type.length - 3) ? options.type.slice(0, options.type.toLowerCase().lastIndexOf(` key`)) : options.type;
    // get the rest of the options
    options.type = options.type[options.type.length - 1] === ` ` ? options.type.slice(0, options.type.length - 1) : options.type;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.size = options.size !== undefined ? Number(options.size) : 20;
    options.isCaseSensitive = options.isCaseSensitive !== undefined ? toBoolean(options.isCaseSensitive) : false;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `confirmation`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' if options specify to do so
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.isCaseSensitive === false) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} key for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (
    options.isRequired === false
    && result.value.replace(/[\s\t\r\n]/g, ``) === ``
  ) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(
    result.value,
    { type: `${options.type}` },
  );
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedInvalid = checkInvalid(
    result.value,
    options.type,
    options.size,
    options.isCaseSensitive,
  );
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

function checkInvalid(key, type, size, isCaseSensitive) {
  let result;
  try {
    let keyExp;
    if (isCaseSensitive === true) {
      keyExp = new RegExp(`^[0-9a-zA-Z]{${size}}$`); // some sketchy-ass lookin' shit here
    } else {
      keyExp = new RegExp(`^[0-9a-z]{${size}}$`);
    }
    if (keyExp.test(key) === false) {
      result = {
        error: `The ${type} key is not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} key was a valid alphanumeric key.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

module.exports = {
  checkKey,
};
