const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check to make sure the 2-digit month on a payment card is a valid value between 01 and 12
// ! while this is typically a 2-digit number, the data type is a string
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: true,
//   trim: true
// }
// TODO add an option to fill zeroes before single digit months
module.exports.checkCardExpirationMonth = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data, or fill it with defaults where necessary
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

    // attempt to reformat the data in 'value' however defined by 'options'
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to reformat the card expiration month for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (
    options.isRequired === false &&
    result.value.replace(/[\s\t\r\n]/g, ``) === ``
  ) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(
    result.value,
    { type: `card expiration month` },
  );
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  try {
    const regex = /^(0[1-9])|(1[012])$/g;
    if (regex.test(result.value) === false) {
      const error = {
        error: `The card expiration month is not a valid month.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to check if the card expiration month was a valid month.`,
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
//   isRequired: true,
//   trim: true
// };
module.exports.checkCardExpirationYear = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  try {
    // get the options data, or fill it with defaults where necessary
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

    // attempt to reformat the data in 'value' however defined by 'options'
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to reformat the card expiration year for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (options.isRequired === true) {
    const checkedEmpty = checkEmpty(
      result.value,
      { type: `card expiration year` },
    );
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
        error: `The card expiration year is not a valid year.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to check if the card expiration year was a valid year.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  return result;
};
