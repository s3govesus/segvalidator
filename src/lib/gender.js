const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check a gender for errors
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: false,
//   trim: true,
//   toLowerCase: true
// };
// TODO make this more PC to optionally allow specific non-binary genders instead of simply `other`
module.exports.checkGender = (value, options) => {
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
        isRequired: false,
        trim: true,
        toLowerCase: true,
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = false;
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
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `The value for the gender is undefined.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }

    // attempt to reformat the data in 'value' if options specify to do so
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
      error: `An exception error occurred while attempting to reformat the gender for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `gender` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedInvalid = checkInvalid(result.value);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

function checkInvalid(gender) {
  let result;
  try {
    if (gender !== `none` && gender !== `male` && gender !== `female` && gender !== `other`) {
      result = {
        error: `The gender is not one of the available options.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the gender was one of the available options.`,
      exception: ex.message,
    };
  }
  return result;
}
