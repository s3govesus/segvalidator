const { checkEmpty, checkLong, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// check and validate a city name
//
// OPTIONS EXAMPLE
// const options = {
//   type: `city name`,
//   isRequired: true,
//   trim: true,
// }
function checkAddressCity(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `city name`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the value data if the options specify to do so
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} for error-checking.`,
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

  // check to make sure the city name isn't empty
  const checkedEmpty = checkEmpty(result.value, { type: options.type });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  // check to make sure the city name isn't too long
  const checkedLong = checkLong(result.value, { type: options.type, max: 50, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

module.exports = {
  checkAddressCity,
};
