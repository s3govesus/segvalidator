const { toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

//
function checkFormText(value, label, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  try {
    label = label !== undefined ? label : `form field`;
    options = options !== undefined ? options : {};
    options.required = options.required !== undefined ? toBoolean(options.required) : false;
    options.maxlength = options.maxlength !== undefined ? Number(options.maxlength) : undefined;
    options.minlength = options.minlength !== undefined ? Number(options.minlength) : undefined;
    options.pattern = options.pattern !== undefined ? options.pattern : undefined;
  } catch (ex) {
    const err = {
      code: 101,
      error: `An exception error occurred while attempting to parse the options for handling the "${label}"'s error-checking.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // if the value is empty and required, make an early return
  if (options.required === true && (result.value === undefined || result.value === ``)) {
    const err = {
      code: 102,
      error: `No value was provided for the "${label}" field.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
    return result;
  }
  // early return if a value is not required and the value is empty
  if (options.required === false && (result.value === undefined || result.value === ``)) {
    return result;
  }

  // possibly reformat the value
  if (options.trim !== undefined && toBoolean(options.trim) === true) {
    result.value = result.value.trim();
  }
  if (options.toLowerCase !== undefined && toBoolean(options.toLowerCase) === true) {
    result.value = result.value.toLowerCase();
  }
  if (options.toUpperCase !== undefined && toBoolean(options.toUpperCase) === true) {
    result.value = result.value.toUpperCase();
  }

  // check to make sure the value meets the maxlength length spec
  if (options.maxlength !== undefined) {
    try {
      if (result.value.length > Number(options.maxlength)) {
        const err = {
          code: 103,
          error: `The value for "${label}" is too long (maxlength ${options.maxlength} characters).`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 104,
        error: `An exception error occurred while attempting to check if the value for "${label}" is too long.`,
        exception: ex.message,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  }

  // check to make sure the value meets the minlength length spec
  if (options.minlength !== undefined) {
    try {
      if (result.value.length < Number(options.minlength)) {
        const err = {
          code: 105,
          error: `The value for "${label}" is too short (minlength ${options.minlength} characters).`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 106,
        error: `An exception error occurred while attempting to check if the value for "${label}" is too short.`,
        exception: ex.message,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  }

  // check to make sure the value meets the pattern regex spec
  if (options.pattern !== undefined) {
    try {
      if (options.pattern.test(result.value) === false) {
        const err = {
          code: 107,
          error: `The value for "${label}" doesn't meet the specified pattern requirements.`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 108,
        error: `An exception error occurred while attempting to check if the value for "${label}" meets the specified pattern requirements.`,
        exception: ex.message,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  }

  // check to make sure the value meets the size spec
  if (options.size !== undefined) {
    try {
      if (result.value.length !== Number(options.size)) {
        const err = {
          code: 109,
          error: `The value for "${label}" isn't the correct number of characters (${options.size})`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 110,
        error: `An exception error occurred while attempting to check if the value for "${label}" is the correct number of characters.`,
        exception: ex.message,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  }

  return result;
}

/******************************************************************************/

module.exports = {
  checkFormText,
};
