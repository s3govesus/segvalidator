const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  isRequired: false,
  max: undefined,
  min: undefined,
  size: undefined,
  pattern: undefined,
};

//
module.exports.checkFormPassword = (value, type, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form password`;
  options = options !== undefined ? options : {};
  options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : defaultOptions.isRequired;
  options.max = options.max !== undefined ? options.max : defaultOptions.max;
  options.min = options.min !== undefined ? options.min : defaultOptions.min;
  options.size = options.size !== undefined ? options.size : defaultOptions.size;
  options.pattern = options.pattern !== undefined ? options.pattern : defaultOptions.pattern;

  // if the value is empty and required, make an early return
  if (options.isRequired === true && (result.value === undefined || result.value === `` || result.value.trim() === ``)) {
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

  // check to make sure the value meets the max spec
  try {
    if (options.max !== undefined && result.value.length > Number(options.max)) {
      const err = {
        code: 102,
        error: `The value for the ${type} failed to meet the specification for the maximum number of characters (${options.max}).`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attempting to check if the ${type} met the specification for the maximum number of characters.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the min spec
  try {
    if (options.min !== undefined && result.value.length < Number(options.min)) {
      const err = {
        code: 104,
        error: `The value for the ${type} failed to meet the specification for the minimum number of characters (${options.min}).`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 105,
      error: `An exception error occurred while attempting to check if the ${type} met the specification for the minimum number of characters.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the size spec
  try {
    if (options.size !== undefined && result.value.length !== Number(options.size)) {
      const err = {
        code: 106,
        error: `The value for the ${type} failed to meet the specification for the required exact character count (${options.size}).`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 107,
      error: `An exception error occurred while attempting to check if the ${type} met the specification for the required exact character count.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the pattern regex spec
  try {
    if (options.pattern !== undefined && options.pattern.test(result.value) === false) {
      const err = {
        code: 108,
        error: `The value for the ${type} failed to meet the required pattern specification and was considered invalid.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 109,
      error: `An exception error occurred while attempting to check if the ${type} met the required pattern specification.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};
