const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  isRequired: false, // if isRequired === true, the checkbox value must be check, but false doesn't require unchecked
};

//
module.exports.checkFormCheckbox = (value, type, options) => {
  const result = {
    value, // this will be a bool by default
    valueAsBool: undefined,
    valueAsString: undefined,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form checkbox`;
  options = options !== undefined ? options : {};
  options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : defaultOptions.isRequired;

  // possibly reformat the value
  // assign valueAsString and valueAsBool
  try {
    result.valueAsBool = toBoolean(result.value);
    result.valueAsString = toBoolean(result.value).toString();
  } catch (ex) {
    const err = {
      code: 101,
      error: `An exception error occurred while attempting to convert the ${type} value to different data types.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // if the value is required, check to make sure the value is true
  try {
    if (options.isRequired !== undefined && options.isRequired === true && result.valueAsBool === false) {
      const err = {
        code: 102,
        error: `The ${type} must be checked.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attempting to check if the ${type} was required and checked.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};
