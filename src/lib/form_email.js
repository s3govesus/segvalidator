const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  isRequired: false,
  max: undefined,
  min: undefined,
  size: undefined,
  pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
};

//
module.exports.checkFormEmail = (value, type, options) => {
  const result = {
    value,
    valueAsArray: [],
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form e-mail address`;
  options = options !== undefined ? options : {};
  options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : defaultOptions.isRequired;
  options.max = options.max !== undefined ? options.max : defaultOptions.max;
  options.min = options.min !== undefined ? options.min : defaultOptions.min;
  options.size = options.size !== undefined ? options.size : defaultOptions.size;
  options.pattern = options.pattern !== undefined ? options.pattern : defaultOptions.pattern; // uses a regex for the RFC 5322 standard by default

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
  try {
    result.valueAsArray = result.value.split(`,`);
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attempting to parse the ${type} as an array.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the max spec
  try {
    if (options.max !== undefined) {
      // check an array if necessary
      if (result.valueAsArray.length > 1) {
        for (let i in result.valueAsArray) {
          if (result.valueAsArray[i].length > Number(options.max)) {
            const err = {
              code: 104,
              error: `The value for the ${type} - '${result.valueAsArray[i]}' - failed to meet the specification for the maximum number of characters (${options.max}).`,
            };
            result.errors.push(err);
            result.errstr += `${err.error}\r\n`;
          }
        }
      } else {
        // check a single email if there's only one email address instead of an array
        if (result.value.length > Number(options.max)) {
          const err = {
            code: 104,
            error: `The value for the ${type} failed to meet the specification for the maximum number of characters (${options.max}).`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 105,
      error: `An exception error occurred while attempting to check if the ${type} met the specification for the maximum number of characters.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the min spec
  try {
    if (options.min !== undefined) {
      // check an array if necessary
      if (result.valueAsArray.length > 1) {
        for (let i in result.valueAsArray) {
          if (result.valueAsArray[i].length < Number(options.min)) {
            const err = {
              code: 106,
              error: `The value for the ${type} - '${result.valueAsArray[i]}' - failed to meet the specification for the minimum number of characters (${options.min}).`,
            };
            result.errors.push(err);
            result.errstr += `${err.error}\r\n`;
          }
        }
      } else {
        // check a single email if there's only one email address instead of an array
        if (result.value.length < Number(options.min)) {
          const err = {
            code: 106,
            error: `The value for the ${type} failed to meet the specification for the minimum number of characters (${options.min}).`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 107,
      error: `An exception error occurred while attempting to check if the ${type} met the specification for the minimum number of characters.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the size spec
  try {
    if (options.size !== undefined) {
      // check an array if necessary
      if (result.valueAsArray.length > 1) {
        for (let i in result.valueAsArray) {
          if (result.valueAsArray[i].length === Number(options.size)) {
            const err = {
              code: 108,
              error: `The value for the ${type} - '${result.valueAsArray[i]}' - failed to meet the specification for the required number of characters (${options.size}).`,
            };
            result.errors.push(err);
            result.errstr += `${err.error}\r\n`;
          }
        }
      } else {
        // check a single email if there's only one email address instead of an array
        if (result.value.length === Number(options.size)) {
          const err = {
            code: 108,
            error: `The value for the ${type} failed to meet the specification for the required number of characters (${options.size}).`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 109,
      error: `An exception error occurred while attempting to check if the ${type} met the specification for the required number of characters.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the pattern regex spec
  try {
    if (options.pattern !== undefined) {
      // check an array if necessary
      if (result.valueAsArray.length > 1) {
        for (let i in result.valueAsArray) {
          // check each individual email
          if (options.pattern.test(result.valueAsArray[i]) === false) {
            const err = {
              code: 110,
              error: `The value for the ${type} - '${result.valueAsArray[i]}' - failed to meet the specified pattern requirements.`,
            };
            result.errors.push(err);
            result.errstr += `${err.error}\r\n`;
          }
        }
      } else {
        // check a single email if there's only one email address instead of an array
        if (options.pattern.test(result.value) === false) {
          const err = {
            code: 110,
            error: `The value for the ${type} failed to meet the specified pattern requirements.`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 111,
      error: `An exception error occurred while attempting to check if the ${type} met the specified pattern requirements.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};