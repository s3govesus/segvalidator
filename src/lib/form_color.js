const { toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

//
function checkFormColor(value, type, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // get the options data or fill it with defaults if necessary
  try {
    type = type !== undefined ? type : `form color`;
    options = options !== undefined ? options : {};
    options.required = options.required !== undefined ? toBoolean(options.required) : false;
    options.allow3 = options.allow3 !== undefined ? toBoolean(options.allow3) : false;
    options.allow4 = options.allow4 !== undefined ? toBoolean(options.allow4) : false;
    options.allow6 = options.allow6 !== undefined ? toBoolean(options.allow6) : true;
    options.allow8 = options.allow8 !== undefined ? toBoolean(options.allow8) : false;
  } catch (ex) {
    const err = {
      code: 101,
      error: `An exception error occurred while attempting to parse the options for handling the "${type}"'s error-checking.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // if the value is empty and required, make an early return
  if (options.required === true && (result.value === undefined || result.value === ``)) {
    const err = {
      code: 102,
      error: `No value was provided for the "${type}" field.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
    return result;
  }
  // early return if a value is not required and the value is empty
  if (options.required === false && (result.value === undefined || result.value === ``)) {
    return result;
  }

  // check to make sure the value is a valid hex color string
  try {
    let matchFound = false;

    if (options.allow3 === true) {
      let regex = /^#[0-9a-fA-F]{3}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }
    if (options.allow4 === true) {
      let regex = /^#[0-9a-fA-F]{4}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }
    if (options.allow6 === true) {
      let regex = /^#[0-9a-fA-F]{6}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }
    if (options.allow8 === true) {
      let regex = /^#[0-9a-fA-F]{8}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }

    if (matchFound === false) {
      const err = {
        code: 103,
        error: `The value for "${type}" was not a valid hexadecimal color string.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 104,
      error: `An exception error occurred while attemping to check if the value for "${type}" was a valid hexadecimal color string.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

module.exports = {
  checkFormColor,
};
