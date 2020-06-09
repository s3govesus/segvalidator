const { toBoolean } = require(`./sublib/misc`);

// checks a hexidecimal hash for issues
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: true,
//   trim: true,
//   size: 128,
//   type: `cryptographic`,
//   toLowerCase: true
// };
// TODO add more specific error-checking with specific error messages, like for length
module.exports.checkHash = (value, options) => {
  const result = {
    value,
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
        size: 128,
        type: `cryptographic`,
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
      if (options.size === undefined) {
        options.size = 128;
      } else {
        options.size = Number(options.size);
      }
      if (options.type === undefined) {
        options.type = `cryptograhpic`;
      } else {
        options.type = String(options.type);
      }
      if (options.toLowerCase === undefined) {
        options.toLowerCase = true;
      } else {
        options.toLowerCase = toBoolean(options.toLowerCase);
      }
    }
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `The value for the ${options.type} is undefined.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }

    // attempt to reformat the value data if the options specify to do so
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
      error: `An exception error occurred while attempting to reformat the ${options.type} hash for error-checking.`,
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

  if (result.value.replace(/[\s]/g, ``) === ``) {
    const error = {
      error: `A value must be entered for the ${options.type} hash.`,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  const checkedInvalid = checkInvalid(result.value, options.type, options.size);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// check if the hash is valid
function checkInvalid(hash, type, size) {
  let result;
  try {
    const regexHash = new RegExp(`^[a-f0-9]{${size}}$`); // /\b[A-Fa-f0-9]{128}\b/;
    if (regexHash.test(hash) === false) {
      result = {
        error: `The ${type} hash is not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} hash was a valid hash.`,
      exception: ex.message,
    };
  }
  return result;
}
