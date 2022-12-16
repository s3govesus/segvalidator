const { toBoolean } = require(`./sublib/misc`);

// checks a hexidecimal hash for issues
//
// EXAMPLE OPTIONS
// const options = {
//   type: `cryptographic`,
//   isRequired: true,
//   trim: true,
//   size: 128,
//   isCompressed: false,
//   toLowerCase: true
// };
// TODO add more specific error-checking with specific error messages, like for length
function checkHash(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    // get the type or clean it up to reduce redundancies in error messages created by appending 'hash' after the type in the error strings
    options.type = options.type !== undefined ? String(options.type) : `cryptographic`;
    options.type = options.type.toLowerCase().lastIndexOf(`hash`) === (options.type.length - 4) ? options.type.slice(0, options.type.toLowerCase().lastIndexOf(`hash`)) : options.type;
    options.type = options.type[options.type.length - 1] === ` ` ? options.type.slice(0, options.type.length - 1) : options.type;
    // get the rest of the options
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.size = options.size !== undefined ? Number(options.size) : 128;
    options.isCompressed = options.isCompressed !== undefined ? toBoolean(options.isCompressed) : false;
    options.toLowerCase = options.toLowerCase !== undefined ? toBoolean(options.toLowerCase) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `cryptographic`}.`,
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
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `cryptographic`} hash for error-checking.`,
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

  const checkedInvalid = checkInvalid(result.value, options.type, options.size, options.isCompressed);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

// check if the hash is valid
function checkInvalid(hash, type, size, isCompressed) {
  let result;
  try {
    let regex;
    if (isCompressed === true) {
      regex = new RegExp(`^[\S\s]{${size}}$`);
    } else {
      regex = new RegExp(`^[a-f0-9]{${size}}$`);
    }

    if (regex.test(hash) === false) {
      result = {
        error: `The ${type} hash is not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} hash was a valid cryptographic hash.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

module.exports = {
  checkHash,
};
