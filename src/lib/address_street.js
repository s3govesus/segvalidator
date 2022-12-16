const { checkEmpty, checkLong, toBoolean } = require(`./sublib/misc`);

// TODO add options to restrict certain characters
// TODO add an option to check a regex
// TODO add an option to have a maximum length or a minimum length
// * note that this file contains two exported functions : checkAddressLine1 and checkAddressLine2

/******************************************************************************/

// check and validate an address line 1 on payment sources / shipping info
//
// OPTIONS EXAMPLE
// const options = {
//   type: `address line 1`,
//   isRequired: true,
//   trim: true
// };
function checkAddressLine1(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to reformat the address line 1 string, trimming any whitespace off the ends
  try {
    // get the options data, or fill it with defaults if missing anything
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `address line 1`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `address line 1`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the value data if specified to do so by the options
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `address line 1`} for error-checking.`,
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

  // check to make sure the address line 1 isn't just an empty string or whitespace characters
  const checkedEmpty = checkEmpty(result.value, { type: options.type });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  // check to make sure the address line 1 isn't too long
  const checkedLong = checkLong(result.value, { type: options.type, max: 128, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

// check and validate an address line 2 on payment sources / shipping info
//
// OPTIONS EXAMPLE
// const options = {
//   type: `address line 2`,
//   isRequired: false,
//   trim: true
// };
function checkAddressLine2(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // attempt to reformat the string, removing any whitespace characters from the ends
  try {
    // get the options data, or fill it with defaults if missing anything
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `address line 2`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : false;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `address line 2`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the value data if specified to do so by the options
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `address line 2`} for error-checking.`,
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

  if (result.value.replace(/\s/g, ``) === ``) {
    const error = {
      error: `A value must be entered for the ${options.type}.`,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  const checkedLong = checkLong(result.value, { type: options.type, max: 128, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  // TODO improve this - add error-checking for minimalistic inputs

  return result;
}

/******************************************************************************/

module.exports = {
  checkAddressLine1,
  checkAddressLine2,
};
