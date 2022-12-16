const { toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

//
function checkFormDate(value, type, options) {
  const result = {
    value,
    valueAsDate: undefined,
    valueAsNumber: undefined,
    valueAsNumberUnix: undefined, // divides the value by 1000 to get a more unix-esque timestamp
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  try {
    type = type !== undefined ? type : `form date`;
    options = options !== undefined ? options : {};
    options.required = options.required !== undefined ? toBoolean(options.required) : false;
    options.min = options.min !== undefined ? options.min : undefined;
    options.max = options.max !== undefined ? options.max : undefined;
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

  // possibly reformat the value, calculate valueAsDate, valueAsNumber, and valueAsNumberUnix
  try {
    result.valueAsDate = typeof result.value === `number` ? new Date(result.value).toString() : new Date(result.value);
    result.valueAsNumber = new Date(result.value).getTime();
    result.valueAsNumberUnix = new Date(result.value).getTime() / 1000;
    if (Number.isNaN(result.valueAsNumber)) {
      const err = {
        code: 103,
        error: `The value for "${type}" is not a valid date.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 104,
      error: `An exception error occurred while attempting to convert "${type}" to different data types.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the min spec (yyyy-mm-dd)
  try {
    if (options.min !== undefined) {
      let minTime = new Date(options.min).getTime();
      if (result.valueAsNumber < minTime) {
        const err = {
          code: 105,
          error: `"${type}" failed to meet the minimum date specification.`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    }
  } catch (ex) {
    const err = {
      code: 106,
      error: `An exception error occurred while attempting to check if "${type}" met the minimum date restriction.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the max spec (yyyy-mm-dd)
  try {
    let maxTime = new Date(options.max).getTime();
    if (result.valueAsNumber > maxTime) {
      const err = {
        code: 107,
        error: `"${type}" failed to meet the maximum date specification.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 108,
      error: `An exception error occurred while attempting to check if "${type}" met the maximum date restriction.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

module.exports = {
  checkFormDate,
};
