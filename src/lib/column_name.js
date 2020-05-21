const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check a string to see if it would be a valid mySQL column name
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: true,
//   trim: true,
//   clean: false, // whether or not to replace whitespace characters with underscores
// }
module.exports.checkColumnName = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean the input a little
  try {
    // get the options data, or fill it with defaults where necessary
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        trim: true,
        clean: true,
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
      if (options.clean === undefined) {
        options.clean = false;
      } else {
        options.clean = toBoolean(options.clean);
      }
    }

    // attempt to reformat the data in 'value' however defined by 'options'
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.clean === true) {
      value = value.replace(/[\s\r\n\t]/g, `_`);
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the column name '${result.value}' for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `database column name` });
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

function checkInvalid(name) {
  let result;
  try {
    // TODO add sql-reserved names to the regex
    const nameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{1,64}$/;
    if (nameRegex.test(name) === false) {
      result = {
        error: `The column name '${name}' is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the column name '${name}' was a valid database column name.`,
      exception: ex.message,
    };
  }
  return result;
}
