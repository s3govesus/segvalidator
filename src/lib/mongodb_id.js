const { checkEmpty, toBoolean } = require(`./sublib/misc`);

//
//
// const exOptions = {
//   isRequired: true,
//   trim: true,
//   toLowerCase: true,
//   type: `mongodb object ID`,
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
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        trim: true,
        toLowerCase: true,
        type: `mongodb object ID`,
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
      if (options.toLowerCase === undefined) {
        options.toLowerCase = true;
      } else {
        options.toLowerCase = toBoolean(options.toLowerCase);
      }
      if (options.type === undefined) {
        options.type = `mongodb object ID`;
      } else {
        options.type = options.type.toString();
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
      error:
        `An exception error occurred while attempting to reformat the ${options.type} for error-checking.`,
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
        error: `The ${type} was not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error:
        `An exception error occurred while attempting to check if the ${type} was a valid ID value.`,
      exception: ex.message,
    };
  }
  return result;
}
