const { checkEmpty, checkLong, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// check an e-mail address for any errors
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: true,
//   trim: true
//   toLowerCase: true
// };
module.exports.checkEmailAddress = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        trim: true,
        toLowerCase: true,
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
      if (options.toLowerCase === undefined) {
        options.toLowerCase = true;
      } else {
        options.toLowerCase = toBoolean(options.toLowerCase);
      }
    }

    // attempt to reformat the data in 'value' if the options specify to do so
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the e-mail address for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (options.isRequired === true) {
    const checkedEmpty = checkEmpty(result.value, { type: `email address` });
    if (checkedEmpty) {
      result.errors.push(checkedEmpty);
      result.errstr += `${checkedEmpty.error}\r\n`;
    }
  } else if (result.value.replace(/\s\t\r\n/g, ``) === ``) {
    result.value = ``;
  }

  if (result.value === `` && options.isRequired === false) {
    return result;
  }

  const checkedInvalid = checkInvalid(result.value);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  // ! an e-mail address should have at least 6 non-whitespace characters : 't@r.io'

  const checkedLong = checkLong(result.value, { type: `e-mail address`, max: 255, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// check an e-mail address and its confirmation value to make sure they match
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: true,
//   trim: true,
//   toLowerCase: true
// };
module.exports.checkEmailAddressConfirm = this.checkEmailConfirm;
module.exports.checkEmailConfirm = (value, confirm, options) => {
  const result = {
    value: confirm,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    if (options === undefined) {
      options = {
        isRequired: true,
        trim: true,
        toLowerCase: true,
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
      if (options.toLowerCase === undefined) {
        options.toLowerCase = true;
      } else {
        options.toLowerCase = toBoolean(options.toLowerCase);
      }
    }

    // attempt to reformat the value data if the options specify to do so
    value = String(value);
    confirm = String(confirm);
    if (options.trim === true) {
      value = value.trim();
      confirm = confirm.trim();
    }
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
      confirm = confirm.toLowerCase();
    }
    result.value = confirm;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the e-mail address confirmation for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (options.isRequired === true) {
    const checkedEmpty = checkEmpty(result.value, { type: `e-mail address confirmation` });
    if (checkedEmpty) {
      result.errors.push(checkedEmpty);
      result.errstr += `${checkedEmpty.error}\r\n`;
    }
  } else if (result.value.replace(/\s\t\r\n/g, ``) === ``) {
    result.value = ``;
  }

  if (result.value === `` && options.isRequired === false) {
    return result;
  }

  if (result.value !== confirm) {
    const error = {
      error: `The value for the e-mail address and its confirmation do not match!`,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// check if the e-mail address is a valid e-mail address
function checkInvalid(emailAddress) {
  let result;
  try {
    const emailExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (emailExp.test(emailAddress) === false) {
      result = {
        error: `The e-mail address is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the e-mail address was a valid e-mail address.`,
      exception: ex.message,
    };
  }
  return result;
}
