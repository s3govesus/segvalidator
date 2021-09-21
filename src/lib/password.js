const {
  checkEmpty, checkShort, checkLong, toBoolean,
} = require(`./sublib/misc`);

/******************************************************************************/

// checks the frontend password input to make sure it's a valid password
// PARAMETERS
// value : the string value being checked
// options :
// const exOptions = {
//   type: `password`,
//   isRequired: true,
//   min: 7,
//   max: 255,
//   regex: undefined
// };
module.exports.checkPassword = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  try {
    // if the options are undefined or not a valid object type, use defaults
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `password`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.min = options.min !== undefined ? Number(options.min) : 7;
    options.max = options.max !== undefined ? Number(options.max) : 255;
    options.regex = options.regex !== undefined && typeof options.regex === `object` ? options.regex : undefined;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `password`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    value = value !== undefined ? String(value) : ``;
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `password`} for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/[\s\t\r\n]/g, ``) === ``) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(result.value, { type: options.type });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedShort = checkShort(result.value, { type: options.type, min: options.min, filterWhitespace: false });
  if (checkedShort) {
    result.errors.push(checkedShort);
    result.errstr += `${checkedShort.error}\r\n`;
  }

  const checkedLong = checkLong(result.value, { type: options.type, max: options.max, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  if (options.regex !== undefined) {
    try {
      if (options.regex.test(result.value) === false) {
        const error = {
          error: `The ${options.type} failed to meet criteria provided by the server and is considered invalid.`,
        };
        result.errors.push(error);
        result.errstr += `${error.error}\r\n`;
      }
    } catch (ex) {
      // exception error!
      const error = {
        error: `An exception error occurred while attempting to check if the $ met criteria provided by the server.`,
        exception: ex.message,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
      return result;
    }
  }

  return result;
};
