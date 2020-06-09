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
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `The value for the state is undefined.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
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
      error: `An exception error occurred while attempting to reformat the state for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `state` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  // check if the string value matches one in the list of valid states
  const checkedValid = checkValid(result.value);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// look through the list of 2-digit ISO state codes and see if the string value matches one of them
function checkValid(state) {
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
      error: `An exception error occurred while attempting to check if the state was valid.`,
      exception: ex.message,
    };
  }
  return result;
}
