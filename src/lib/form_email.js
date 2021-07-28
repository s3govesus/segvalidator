const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  required: false,
  maxlength: undefined,
  minlength: undefined,
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
  options.required = options.required !== undefined ? toBoolean(options.required) : defaultOptions.required;
  options.maxlength = options.maxlength !== undefined ? options.maxlength : defaultOptions.maxlength;
  options.minlength = options.minlength !== undefined ? options.minlength : defaultOptions.minlength;
  options.size = options.size !== undefined ? options.size : defaultOptions.size;
  options.pattern = options.pattern !== undefined ? options.pattern : defaultOptions.pattern; // uses a regex for the RFC 5322 standard by default

  // if the value is empty and required, make an early return
  if (options.required === true && (result.value === undefined || result.value === ``)) {
    const err = {
      code: 101,
      error: `The value for "${type}" was empty.`,
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
  try {
    result.valueAsArray = result.value.split(`,`);
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attempting to parse "${type}" as an array.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the maxlength spec
  try {
    if (options.maxlength !== undefined) {
      // check an array if necessary
      if (result.valueAsArray.length > 1) {
        for (let i in result.valueAsArray) {
          if (result.valueAsArray[i].length > Number(options.maxlength)) {
            const err = {
              code: 104,
              error: `The value for "${type}" - '${result.valueAsArray[i]}' - failed to meet the specification for the maximum number of characters (${options.maxlength}).`,
            };
            result.errors.push(err);
            result.errstr += `${err.error}\r\n`;
          }
        }
      } else {
        // check a single email if there's only one email address instead of an array
        if (result.value.length > Number(options.maxlength)) {
          const err = {
            code: 104,
            error: `The value for "${type}" failed to meet the specification for the maximum number of characters (${options.maxlength}).`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 105,
      error: `An exception error occurred while attempting to check if "${type}" met the specification for the maximum number of characters.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the minlength spec
  try {
    if (options.minlength !== undefined) {
      // check an array if necessary
      if (result.valueAsArray.length > 1) {
        for (let i in result.valueAsArray) {
          if (result.valueAsArray[i].length < Number(options.minlength)) {
            const err = {
              code: 106,
              error: `The value for "${type}" - '${result.valueAsArray[i]}' - failed to meet the specification for the minimum number of characters (${options.minlength}).`,
            };
            result.errors.push(err);
            result.errstr += `${err.error}\r\n`;
          }
        }
      } else {
        // check a single email if there's only one email address instead of an array
        if (result.value.length < Number(options.minlength)) {
          const err = {
            code: 106,
            error: `The value for "${type}" failed to meet the specification for the minimum number of characters (${options.minlength}).`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 107,
      error: `An exception error occurred while attempting to check if "${type}" met the specification for the minimum number of characters.`,
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
              error: `The value for "${type}" - '${result.valueAsArray[i]}' - failed to meet the specification for the required number of characters (${options.size}).`,
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
            error: `The value for "${type}" failed to meet the specification for the required number of characters (${options.size}).`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 109,
      error: `An exception error occurred while attempting to check if "${type}" met the specification for the required number of characters.`,
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
              error: `The value for "${type}" - '${result.valueAsArray[i]}' - failed to meet the specified pattern requirements.`,
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
            error: `The value for "${type}" failed to meet the specified pattern requirements.`,
          };
          result.errors.push(err);
          result.errstr += `${err.error}\r\n`;
        }
      }
    }
  } catch (ex) {
    const err = {
      code: 111,
      error: `An exception error occurred while attempting to check if "${type}" met the specified pattern requirements.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};
