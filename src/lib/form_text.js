const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  isRequired: false,
  max: undefined,
  min: undefined,
  pattern: undefined,
};

//
module.exports.checkFormText = (value, type, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form field`;
  options = options !== undefined ? options : {};
  options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : defaultOptions.isRequired;
  options.max = options.max !== undefined ? options.max : defaultOptions.max;
  options.min = options.min !== undefined ? options.min : defaultOptions.min;
  options.pattern = options.pattern !== undefined ? options.pattern : defaultOptions.pattern;

  // if the value is empty and required, make an early return
  if (options.isRequired === true && (result.value === undefined || result.value === ``)) {
    const err = {
      code: 101,
      error: `The value for the ${type} was empty.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
    return result;
  }
  // early return if a value is not required and the value is empty
  if (options.isRequired === false && (result.value === undefined || result.value === ``)) {
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

  // check to make sure the value meets the max length spec
  if (options.max !== undefined) {
    try {
      if (result.value.length > Number(options.max)) {
        const err = {
          code: 102,
          error: `The value for the ${type} is too long (max ${options.max} characters).`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 103,
        error: `An exception error occurred while attempting to check if the value for the ${type} is too long.`,
        exception: ex.message,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  }

  // check to make sure the value meets the min length spec
  if (options.min !== undefined) {
    try {
      if (result.value.length < Number(options.min)) {
        const err = {
          code: 104,
          error: `The value for the ${type} is too short (min ${options.min} characters).`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 105,
        error: `An exception error occurred while attempting to check if the value for the ${type} is too short.`,
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
          code: 106,
          error: `The value for the ${type} doesn't meet the specified pattern requirements.`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 107,
        error: `An exception error occurred while attempting to check if the value for the ${type} meets the specified pattern requirements.`,
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
          code: 108,
          error: `The value for the ${type} isn't the correct number of characters (${options.size})`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    } catch (ex) {
      const err = {
        code: 109,
        error: `An exception error occurred while attempting to check if the value for the ${type} is the correct number of characters.`,
        exception: ex.message,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  }

  return result;
};
