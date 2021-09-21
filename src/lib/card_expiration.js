const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// * note that this file contains two exported functions checkCardExpirationMonth and checkCardExpirationYear

/******************************************************************************/

// check to make sure the 2-digit month on a payment card is a valid value between 01 and 12
// ! while this is typically a 2-digit number, the data type is a string
//
// OPTIONS EXAMPLE
// const options = {
//   type: `card expiration month`,
//   isRequired: true,
//   trim: true,
//   fill: false
// }
module.exports.checkCardExpirationMonth = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data, or fill it with defaults where necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `card expiration month`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.fill = options.fill !== undefined ? toBoolean(options.fill) : false;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `card expiration month`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' however defined by 'options'
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.fill === true) {
      if (value.length < 2) {
        value = `0${value}`;
      }
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to reformat the ${options.type || `card expiration month`} for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: options.type });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  try {
    const regex = /^(0[1-9])|(1[012])$/g;
    if (regex.test(result.value) === false) {
      const error = {
        error: `The ${options.type} is not a valid month.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to check if the ${options.type} was a valid month.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  return result;
};

/******************************************************************************/

// check to make sure the 4-digit year on a payment card is a valid value between 1900 and 2199
//

// PARAMETERS
// value : the string value to be checked
// ! while this is typically a 4-digit number, the data type is a string
// options : an object containing extra instructions for handling the error-checking
//
// OPTIONS EXAMPLE
// const options = {
//   type: `card expiration year`,
//   isRequired: true, // whether or not an error will be retuned if the value is effectively empty
//   trim: true, // whether or not to trim any extra whitespace characters from the ends of the string - recommended : true
//   fill: false // whether or not to automatically add `20` in front of the value if it is only 2 characters in length - recommended : false
// };
module.exports.checkCardExpirationYear = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  try {
    // get the options data, or fill it with defaults where necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `card expiration year`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.fill = options.fill !== undefined ? toBoolean(options.fill) : false;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `card expiration year`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' however defined by 'options'
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.fill === true) {
      if (value.length === 2) {
        value = `20${value}`;
      }
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to reformat the ${options.type || `card expiration year`} for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (options.isRequired === true) {
    const checkedEmpty = checkEmpty(result.value, { type: options.type });
    if (checkedEmpty) {
      result.errors.push(checkedEmpty);
      result.errstr += `${checkedEmpty.error}\r\n`;
    }
  } else if (result.value.replace(/[\s\t\r\n]/g, ``) === ``) {
    result.value = ``;
  }

  if (result.value === `` && options.isRequired === false) {
    return result;
  }

  try {
    const regex = /^(19|20|21)\d\d$/g;
    if (regex.test(result.value) === false) {
      const error = {
        error: `The ${options.type} is not a valid year.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to check if the ${options.type} was a valid year.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  return result;
};
