const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check and validate a card security code (CVC/CVV/etc)
// ! while this is generally a 3 or 4-digit number, the data type is a string
//
// OPTIONS EXAMPLE
// const options = {
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
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        trim: true,
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
    }

    // attempt to reformat the value data if specified to do so by the options
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the card security code for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `card security code` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  // check to make sure the card security code is a 3-digit or 4-digit number
  const checkedValid = checkValid(result.value);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// check to make sure the card security code is a 3-digit or 4-digit number
function checkValid(code) {
  let result;
  //
  try {
    const regex = /^([0-9]{3})$|^([0-9]{4})$/g;
    if (regex.test(code) === false) {
      result = {
        error: `The card security code is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the card security code was valid.`,
      exception: ex.message,
    };
  }
  return result;
}
