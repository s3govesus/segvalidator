const { checkEmpty, toBoolean } = require(`./sublib/misc`);
const { states } = require(`./sublib/states`);
module.exports.states = states;

// check to make sure the state is one of the US state 2-digit ISO codes
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: true,
//   trim: true,
//   toUpperCase: true
// };
module.exports.checkAddressState = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  //
  try {
    // get the options data, or fill it with defaults if missing anything
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `state code`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.toUpperCase = options.toUpperCase !== undefined ? toBoolean(options.toUpperCase) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `state code`}.`,
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
      error: `An exception error occurred while attempting to reformat the ${options.type || `state code`} for error-checking.`,
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

  // check if the string value matches one in the list of valid states
  const checkedValid = checkValid(result.value, options.type);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// look through the list of 2-digit ISO state codes and see if the string value matches one of them
function checkValid(state, type) {
  let result;
  // attempt to iterate through the list of state codes looking for a match
  try {
    let matchFound = false;
    const l = states.length;
    for (let i = 0; i < l; i += 1) {
      if (states[i].code === state) {
        matchFound = true;
        break;
      }
    }
    if (matchFound === false) {
      result = {
        error: `The state is invalid.`,
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
