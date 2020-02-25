const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check a gender for errors
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: false,
//   trim: true,
//   toLowerCase: true
// };
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

  if (options.isRequired === true) {
    const checkedEmpty = checkEmpty(result.value, { type: `gender` });
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