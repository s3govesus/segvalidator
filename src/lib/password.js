const {
  checkEmpty, checkShort, checkLong, toBoolean,
} = require(`./sublib/misc`);

/******************************************************************************/

// checks the frontend password input to make sure it's a valid password
// PARAMETERS
// value : the string value being checked
// options :
// const exOptions = {
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
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        min: 7,
        max: 255,
        regex: undefined,
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = true;
      } else {
        options.isRequired = toBoolean(options.isRequired);
      }
      if (options.min === undefined) {
        options.min = 7;
      } else {
        options.min = Number(options.min);
      }
      if (options.max === undefined) {
        options.max = 255;
      } else {
        options.max = Number(options.max);
      }
      if (options.regex !== undefined) {
        options.regex = undefined;
      } else if (typeof options.regex === `string`) {
        options.regex = new RegExp(options.regex);
      } else if (typeof options.regex === `object`) {
        // DO NOTHING
      } else {
        options.regex = undefined;
      }
    }

    value = String(value);
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the password for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/\s\t\r\n/g, ``) === ``) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(result.value, { type: `password` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedShort = checkShort(result.value, { type: `password`, min: options.min, filterWhitespace: false });
  if (checkedShort) {
    result.errors.push(checkedShort);
    result.errstr += `${checkedShort.error}\r\n`;
  }

  const checkedLong = checkLong(result.value, { type: `password`, max: options.max, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  if (options.regex !== undefined) {
    try {
      if (options.regex.test(result.value) === false) {
        const error = {
          error: `The password failed to meet criteria provided by the server and is considered invalid.`,
        };
        result.errors.push(error);
        result.errstr += `${error.error}\r\n`;
      }
    } catch (ex) {
      // exception error!
      const error = {
        error: `An exception error occurred while attempting to check if the password met criteria provided by the server.`,
        exception: ex.message,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
      return result;
    }
  }

  return result;
};

/******************************************************************************/

// check the password confirmation to make sure it matches the password and isn't empty
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: true
// };
module.exports.checkPasswordConfirm = (value, confirm, options) => {
  const result = {
    value: confirm,
    errors: [],
    errstr: ``,
  };

  try {
    // get the options data, or fill it with defaults if missing anything
    if (options === undefined) {
      options = {
        isRequired: true,
      };
    } else if (options.isRequired === undefined) {
      options.isRequired = true;
    } else {
      options.isRequired = toBoolean(options.isRequired);
    }

    // attempt to reformat the value data if specified to do so by the options
    value = String(value);
    confirm = String(confirm);
    result.value = confirm;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the password confirmation for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/\s\t\r\n/g, ``) === ``) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(confirm, { type: `password confirmation` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedMismatch = checkMismatch(result.value, confirm);
  if (checkedMismatch) {
    result.errors.push(checkedMismatch);
    result.errstr += `${checkedMismatch.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// check two inputs to make sure they match
function checkMismatch(password, confirm) {
  let result;
  try {
    if (password !== confirm) {
      result = {
        error: `The password and its confirmation do not match!`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the password and confirmation matched.`,
      exception: ex.message,
    };
  }
  return result;
}
