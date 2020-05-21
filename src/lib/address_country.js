const { checkEmpty, toBoolean } = require(`./sublib/misc`);
const { countries } = require(`./sublib/countries`);
module.exports.countries = countries;

// check to make sure the country is one of the 2-digit ISO country codes
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: true,
//   trim: true,
//   toUpperCase: true
// };
module.exports.checkAddressCountry = (value, options) => {
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
        toUpperCase: true,
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
      if (options.toUpperCase === undefined) {
        options.toUpperCase = true;
      } else {
        options.toUpperCase = toBoolean(options.toUpperCase);
      }
    }

    // attempt to reformat the value data if specified to do so by the options
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.toUpperCase === true) {
      value = value.toUpperCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the country for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `country` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  // check if the string value matches one in the list of valid countries
  const checkedValid = checkValid(result.value);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// look through the list of 2-digit ISO country codes and check to see if the value string matches one of them
function checkValid(value) {
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
      error: `An exception error occurred while attempting to check if the country was valid.`,
      exception: ex.message,
    };
  }
  return result;
}
