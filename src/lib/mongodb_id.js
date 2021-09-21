const { checkEmpty, toBoolean } = require(`./sublib/misc`);

//
//
// const exOptions = {
//   type: `MongoDB`,
//   isRequired: true,
//   trim: true,
//   toLowerCase: true,
// };
module.exports.checkMongodbID = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data, or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    // get the type or clean it up to reduce redundancies in error messages created by appending 'object ID' after the type in the error strings
    options.type = options.type !== undefined ? options.type.toString() : `MongoDB`;
    options.type = options.type.toLowerCase().lastIndexOf(`object id`) === (options.type.length - 9) ? options.type.slice(0, options.type.toLowerCase().lastIndexOf(`object id`)) : options.type;
    options.type = options.type[options.type.length - 1] === ` ` ? options.type.slice(0, options.type.length - 1) : options.type;
    // get the rest of the options
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.toLowerCase = options.toLowerCase !== undefined ? toBoolean(options.toLowerCase) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `MongoDB`} object ID.`,
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
      error: `An exception error occurred while attempting to reformat the ${options.type || `MongoDB`} object ID for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (
    options.isRequired === false
    && result.value.replace(/[\s\t\r\n]/g, ``) === ``
  ) {
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
};

/******************************************************************************/

// make sure the mongodb object ID matches the specifications of a regex checking that the string is a valid 96-bit hexadecimal string
function checkInvalid(id, type) {
  let result;
  try {
    const idExp = /^[0-9a-fA-F]{24}$/;
    if (idExp.test(id) === false) {
      result = {
        error: `The ${type} object ID was not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} object ID was a valid object ID value.`,
      exception: ex.message,
    };
  }
  return result;
}
