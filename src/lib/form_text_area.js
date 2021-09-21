const { toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

//
module.exports.checkFormTextArea = (value, type, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  try {
    type = type !== undefined ? type : `form field`;
    options = options !== undefined ? options : {};
    options.required = options.required !== undefined ? toBoolean(options.required) : false;
    options.maxlength = options.maxlength !== undefined ? Number(options.maxlength) : undefined;
    options.minlength = options.minlength !== undefined ? Number(options.minlength) : undefined;
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
          error: `The value for "${type}" is too long (maxlength ${options.maxlength} characters).`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 104,
        error: `An exception error occurred while attempting to check if the value for "${type}" is too long.`,
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
          error: `The value for "${type}" is too short (minlength ${options.minlength} characters).`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 106,
        error: `An exception error occurred while attempting to check if the value for "${type}" is too short.`,
        exception: ex.message,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  }

  return result;
};
