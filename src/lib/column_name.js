const { checkEmpty, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// TODO modify this to provide an option for specifying the type of SQL database and using the appropriate error-checking regex for that type

// check a string to see if it would be a valid mySQL column name
//
// OPTIONS EXAMPLE
// const options = {
//   type: `column name`,
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
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `column name`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.clean = options.clean !== undefined ? toBoolean(options.clean) : false;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `column name`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' however defined by 'options'
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.clean === true) {
      value = value.replace(/[\s\r\n\t]/g, `_`);
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `column name`} '${result.value}' for error-checking.`,
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

  const checkedInvalid = checkInvalid(result.value, options.type);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

function checkInvalid(name, type) {
  let result;
  try {
    // TODO add sql-reserved names to the regex
    const nameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{1,64}$/;
    if (nameRegex.test(name) === false) {
      result = {
        error: `The ${type} '${name}' is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} '${name}' was a valid database column name.`,
      exception: ex.message,
    };
  }
  return result;
}
