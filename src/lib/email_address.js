const { checkEmpty, checkLong, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// check an e-mail address for any errors
//
// EXAMPLE OPTIONS
// const options = {
//   type: `e-mail address`,
//   isRequired: true,
//   trim: true
//   toLowerCase: true
// };
function checkEmailAddress(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `e-mail address`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.toLowerCase = options.toLowerCase !== undefined ? toBoolean(options.toLowerCase) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `e-mail address`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' if the options specify to do so
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `e-mail address`} for error-checking.`,
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

  const checkedInvalid = checkInvalid(result.value, options.type);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  // ! an e-mail address should have at least 6 non-whitespace characters : 't@r.io'

  const checkedLong = checkLong(result.value, { type: options.type, max: 255, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

// check if the e-mail address is a valid e-mail address
function checkInvalid(emailAddress, type) {
  let result;
  try {
    const emailExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (emailExp.test(emailAddress) === false) {
      result = {
        error: `The ${type} is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} was a valid e-mail address.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

module.exports = {
  checkEmailAddress,
};
