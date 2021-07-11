const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// checks an alphanumeric key for issues
//
// EXAMPLE OPTIONS
// const exOptions = {
//   isRequired: true,
//   trim: true,
//   size: 20,
//   isCaseSensitive: false,
//   type: `confirmation`
// };
// TODO add a `clean` option that removes any hyphens or whitespace between characters
// TODO add more specific error messages for things like length - don't rely only on a regular expression to check for validity
// TODO make it so there's a `toLowerCase` option instead of having the result automatically convert it to lowercase if `isCaseSensitive` is false
module.exports.checkKey = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  try {
    // get the options data or fill it with defaults if necessary
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        trim: true,
        size: 20,
        isCaseSensitive: false,
        type: `alphanumeric key`,
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = true;
      } else {
        options.isRequired = toBoolean(options.isRequired);
      }
      if (options.trim === undefined) {
        options.trim = true;
      } else {
        options.trim = toBoolean(options.trim);
      }
      if (options.size === undefined) {
        options.size = 20;
      } else {
        options.size = Number(options.size);
      }
      if (options.isCaseSensitive === undefined) {
        options.isCaseSensitive = false;
      } else {
        options.isCaseSensitive = toBoolean(options.isCaseSensitive);
      }
      if (options.type === undefined) {
        options.type = `alphanumeric key`;
      } else if (options.type.indexOf(`key`) < 0) {
        options.type = `${options.type} key`;
      } else {
        options.type = options.type.toString();
      }
    }
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `The value for the ${options.type} is undefined.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }

    // attempt to reformat the data in 'value' if options specify to do so
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.isCaseSensitive === false) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} for error-checking.`,
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
};

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
        error: `The ${type} is not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} was a valid alphanumeric key.`,
      exception: ex.message,
    };
  }
  return result;
}
