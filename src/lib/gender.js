const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check a gender for errors
//
// EXAMPLE OPTIONS
// const options = {
//   type: `gender`,
//   isRequired: false,
//   trim: true,
//   toLowerCase: true
// };
// TODO make this more PC to optionally allow specific non-binary genders instead of simply `other`
function checkGender(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `gender`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : false;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.toLowerCase = options.toLowerCase !== undefined ? toBoolean(options.toLowerCase) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `gender`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' if options specify to do so
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `gender`} for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
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

  const checkedInvalid = checkInvalid(result.value, options.type);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

function checkInvalid(gender, type) {
  let result;
  try {
    if (gender !== `none` && gender !== `male` && gender !== `female` && gender !== `other`) {
      result = {
        error: `The value provided for the ${type} is not one of the available options.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the value provided for the ${type} was one of the available options.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

module.exports = {
  checkGender,
};
