const { checkEmpty, toBoolean } = require(`./sublib/misc`);
const { countries } = require(`./sublib/countries`);

// check to make sure the country is one of the 2-digit ISO country codes
//
// OPTIONS EXAMPLE
// const options = {
//   type: `country code`,
//   isRequired: true,
//   trim: true,
//   toUpperCase: true
// };
function checkAddressCountry(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data, or fill it with defaults if missing anything
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `country code`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.toUpperCase = options.toUpperCase !== undefined ? toBoolean(options.toUpperCase) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `country code`}.`,
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
    if (options.toUpperCase === true) {
      value = value.toUpperCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `country code`} for error-checking.`,
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

  // check if the string value matches one in the list of valid countries
  const checkedValid = checkValid(result.value, options.type);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

// look through the list of 2-digit ISO country codes and check to see if the value string matches one of them
function checkValid(value, type) {
  let result;
  // attempt to iterate through the list of country codes looking for a match
  try {
    let matchFound = false;
    const countriesLength = countries.length;
    for (let i = 0; i < countriesLength; i += 1) {
      if (countries[i].code === value) {
        matchFound = true;
        break;
      }
    }
    if (matchFound === false) {
      result = {
        error: `The country is invalid.`,
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

/******************************************************************************/

module.exports = {
  checkAddressCountry,
  countries,
};
