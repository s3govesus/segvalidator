const {
  checkEmpty, checkLong, checkShort, toBoolean,
} = require(`./sublib/misc`);

/******************************************************************************/

// check a name for errors
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: true,
//   trim: true,
//   type: `name`,
//   min: 1,
//   max: 50
// };
module.exports.checkName = (value, options) => {
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
        isRequired: true,
        trim: true,
        type: `name`,
        min: 1,
        max: 50,
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
      if (options.type === undefined) {
        options.type = `name`;
      } else if (options.type.indexOf(`name`) < 0) {
        options.type = `${String(options.type)} name`;
      } else {
        options.type = String(options.type);
      }
      if (options.min === undefined) {
        options.min = 1;
      } else {
        options.min = Number(options.min);
      }
      if (options.max === undefined) {
        options.max = 50;
      } else {
        options.max = Number(options.max);
      }
    }

    // attempt to reformat the data in 'value' if options specify to do so
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} for error-checking.`,
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

  const checkedShort = checkShort(result.value, { type: options.type, min: options.min, filterWhitespace: false });
  if (checkedShort) {
    result.errors.push(checkedShort);
    result.errstr += `${checkedShort.error}\r\n`;
  }

  const checkedLong = checkLong(result.value, { type: options.type, max: options.max, filterWhitespace: false });
  if (checkedLong) {
    result.errors.push(checkedLong);
    result.errstr += `${checkedLong.error}\r\n`;
  }

  return result;
};
