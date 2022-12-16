const {
  checkEmpty, checkLong, checkShort, toBoolean,
} = require(`./sublib/misc`);

/******************************************************************************/

// check a name for errors
//
// EXAMPLE OPTIONS
// const options = {
//   type: `user`,
//   isRequired: true,
//   trim: true,
//   min: 1,
//   max: 50
// };
function checkName(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    // get the type or clean it up to reduce redundancies in error messages created by appending 'name' after the type in the error strings
    options.type = options.type !== undefined ? options.type.toString() : `user`;
    options.type = options.type.toLowerCase().lastIndexOf(`name`) === (options.type.length - 4) ? options.type.slice(0, options.type.toLowerCase().lastIndexOf(`user`)) : options.type;
    options.type = options.type[options.type.length - 1] === ` ` ? options.type.slice(0, options.type.length - 1) : options.type;
    // get the rest of the options
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.min = options.min !== undefined ? Number(options.min) : 1;
    options.max = options.max !== undefined ? Number(options.max) : 50;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `user`} name.`,
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
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `user`} name for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `${options.type} name` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedShort = checkShort(result.value, { type: `${options.type} name`, min: options.min, filterWhitespace: false });
  if (checkedShort) {
    result.errors.push(checkedShort);
    result.errstr += `${checkedShort.error}\r\n`;
  }

  const checkedLong = checkLong(result.value, { type: `${options.type} name`, max: options.max, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

module.exports = {
  checkName,
};
