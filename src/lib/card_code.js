const { checkEmpty, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// check and validate a card security code (CVC/CVV/etc)
// ! while this is generally a 3 or 4-digit number, the data type is a string
//
// OPTIONS EXAMPLE
// const options = {
//   type: `card security code`,
//   isRequired: true,
//   trim: true
// }
module.exports.checkCardCode = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data, or fill it with defaults if missing anything
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `card security code`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `card security code`}.`,
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
      error: `An exception error occurred while attempting to reformat the ${options.type || `card security code`} for error-checking.`,
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

  // check to make sure the card security code is a 3-digit or 4-digit number
  const checkedValid = checkValid(result.value, options.type);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// check to make sure the card security code is a 3-digit or 4-digit number
function checkValid(code, type) {
  let result;
  //
  try {
    const regex = /^([0-9]{3})$|^([0-9]{4})$/g;
    if (regex.test(code) === false) {
      result = {
        error: `The ${type} is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} was valid.`,
      exception: ex.message,
    };
  }
  return result;
}
