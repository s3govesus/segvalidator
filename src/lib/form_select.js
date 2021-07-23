const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  required: false,
  options: undefined,
};

//
module.exports.checkFormSelect = (value, type, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form select`;
  options = options !== undefined ? options : {};
  options.required = options.required !== undefined ? toBoolean(options.required) : defaultOptions.required;
  options.options = options.options !== undefined ? options.options : defaultOptions.options;

  // if the value is empty and required, make an early return
  if (options.required === true && (result.value === undefined || result.value === ``)) {
    const err = {
      code: 101,
      error: `The value for the ${type} was empty.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
    return result;
  }
  // early return if a value is not required and the value is empty
  if (options.required === false && (result.value === undefined || result.value === ``)) {
    return result;
  }

  // check to make sure the value is one of the possible options
  try {
    if (options.options !== undefined && options.options.length > 0) {
      let found = false;
      for (let i in options.options) {
        if (options.options[i].value === result.value) {
          found = true;
        }
      }
      if (found === false) {
        const err = {
          code: 102,
          error: `The value for the ${type} failed to be found in the list of possible options.`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    }
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attempting to check if the ${type} was one of the provided possible values.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};
