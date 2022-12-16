const { checkEmpty, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// check a payment card number for errors
// ! note that the number is actually a string
//
// OPTIONS EXAMPLE
// const options = {
//   type: `payment card number`,
//   isRequired: true,
//   trim: true,
//   clean: true
// };
function checkCardNumber(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
    type: ``,
  };

  try {
    // get the options data, or fill it with defaults where necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `payment card number`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.clean = options.clean !== undefined ? toBoolean(options.clean) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was proivded for the ${options.type || `payment card number`}.`,
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
    if (options.clean === true) {
      value = value.replace(/[\s\t\r\n-]/g, ``);
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to reformat the ${options.type || `payment card number`} for error-checking.`,
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
    let isValid = false;
    // TODO add an option to restrict error-checking to require a specific pre-defined card type
    if (checkVisa(result.value) === true) {
      result.type = `Visa`;
      isValid = true;
    } else if (checkMasterCard(result.value) === true) {
      result.type = `Mastercard`;
      isValid = true;
    } else if (checkAmericanExpress(result.value) === true) {
      result.type = `American Express`;
      isValid = true;
    } else if (checkDinersClub(result.value) === true) {
      result.type = `Diners Club`;
      isValid = true;
    } else if (checkDiscover(result.value) === true) {
      result.type = `Discover`;
      isValid = true;
    } else if (checkJCB(result.value) === true) {
      result.type = `JCB`;
      isValid = true;
    }

    if (isValid === false) {
      const error = {
        error: `The ${options.type} is not a valid payment card number.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to check if the ${options.type} was valid.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  return result;
}

/******************************************************************************/

// checks if the given credit card number is a valid Visa card number, returns true or false
// TODO improve these to optionally allow hyphens where applicable
function checkVisa(number) {
  const reg = /^4[0-9]{12}(?:[0-9]{3})?$/;
  return reg.test(number);
}

/******************************************************************************/

// checks if the given credit card number is a valid MasterCard card number, returns true or false
function checkMasterCard(number) {
  const reg = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
  return reg.test(number);
}

/******************************************************************************/

// checks if the given credit card number is a valid American Express card number, returns true or false
function checkAmericanExpress(number) {
  const reg = /^3[47][0-9]{13}/;
  return reg.test(number);
}

/******************************************************************************/

// checks if the given credit card number is a valid Diners Club card number, returns true or false
function checkDinersClub(number) {
  const reg = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
  return reg.test(number);
}

/******************************************************************************/

// checks if the given credit card number is a valid Discover card number, returns true or false
function checkDiscover(number) {
  const reg = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  return reg.test(number);
}

/******************************************************************************/

// checks if the given credit card number is a valid JCB card number, returns true or false
function checkJCB(number) {
  const reg = /^(?:2131|1800|35\d{3})\d{11}$/;
  return reg.test(number);
}

/******************************************************************************/

module.exports = {
  checkCardNumber,
};
