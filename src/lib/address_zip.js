const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check a zip code for any errors
// ! while this is usually a number (zip5), the data type is a string to be compatible with zip9
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: true,
//   trim: true
// }
module.exports.checkAddressZip = (value, options) => {
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
    // if the zip is in zip+4 format but all numbers without a dash, insert a dash in the appropriate place
    const regexZip = /(^[0-9]{9}$)/g;
    if (regexZip.test(value) === true) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the zip code for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `zip code` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedValid = checkValid(result.value);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// check if the zip code is a valid 5 digit zip code or 10-character/9-digit zip+4 code
// ! note that the checkAddressZip function automatically inserts a hyphen if one is missing from the 9-digit string
function checkValid(zip) {
  let result;
  try {
    const regex = /(^[0-9]{5}$)|(^[0-9]{5}-[0-9]{4}$)/g;
    if (regex.test(zip) === false) {
      result = {
        error: `The zip code is not a valid five-digit or nine-digit zip+4 value.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the zip code was a valid zip code or zip+4 code.`,
      exception: ex.message,
    };
  }
  return result;
}
