const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// checks an alphanumeric key for issues
//
// EXAMPLE OPTIONS
// const exOptions = {
//   isRequired: true,
//   trim: true,
//   size: 20,
//   isCaseSensitive: false,
//   type: `confirmation`
// };
module.exports.checkKey = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  try {
    // get the options data or fill it with defaults if necessary
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        trim: true,
        size: 20,
        isCaseSensitive: false,
        type: `confirmation`,
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
        options.size = 20;
      } else {
        options.size = Number(options.size);
      }
      if (options.isCaseSensitive === undefined) {
        options.isCaseSensitive = false;
      } else {
        options.isCaseSensitive = toBoolean(options.isCaseSensitive);
      }
      if (options.type === undefined) {
        options.type = `confirmation`;
      } else {
        options.type = String(options.type);
      }
    }

    // attempt to reformat the data in 'value' if options specify to do so
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.isCaseSensitive === false) {
      value = value.toUpperCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} key for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (options.isRequired === true) {
    const checkedEmpty = checkEmpty(result.value, { type: `${options.type} key` });
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

  const checkedInvalid = checkInvalid(result.value, options.type, options.size, options.isCaseSensitive);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

function checkInvalid(key, type, size, isCaseSensitive) {
  let result;
  try {
    let keyExp;
    if (isCaseSensitive === true) {
      keyExp = new RegExp(`^[0-9a-zA-Z]{${size}}$`); // some sketchy-ass lookin' shit here
    } else {
      keyExp = new RegExp(`^[0-9A-Z]{${size}}$`);
    }
    if (keyExp.test(key) === false) {
      result = {
        error: `The ${type} key is not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} key was a valid alphanumeric key.`,
      exception: ex.message,
    };
  }
  return result;
}
