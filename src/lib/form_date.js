const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  isRequired: false,
  min: undefined,
  max: undefined,
};

//
module.exports.checkFormDate = (value, type, options) => {
  const result = {
    value,
    valueAsDate: undefined,
    valueAsNumber: undefined,
    valueAsNumberUnix: undefined, // divides the value by 1000 to get a more unix-esque timestamp
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form date`;
  options = options !== undefined ? options : {};
  options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : defaultOptions.isRequired;
  options.min = options.min !== undefined ? options.min : defaultOptions.min;
  options.max = options.max !== undefined ? options.max : defaultOptions.max;

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

  // possibly reformat the value, calculate valueAsDate, valueAsNumber, and valueAsNumberUnix
  try {
    result.valueAsDate = typeof result.value === `number` ? new Date(result.value).toString() : new Date(result.value);
    result.valueAsNumber = new Date(result.value).getTime();
    result.valueAsNumberUnix = new Date(result.value).getTime() / 1000;
    if (Number.isNaN(result.valueAsNumber)) {
      const err = {
        code: 102,
        error: `The value for the ${type} is not a valid date.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attempting to convert the ${type} to different data types.`,
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
          code: 104,
          error: `The ${type} failed to meet the minimum date specification.`,
        };
        result.errors.push(err);
        result.errstr += `${err.error}\r\n`;
      }
    }
  } catch (ex) {
    const err = {
      code: 105,
      error: `An exception error occurred while attempting to check if the ${type} met the minimum date restriction.`,
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
        code: 106,
        error: `The ${type} failed to meet the maximum date specification.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 107,
      error: `An exception error occurred while attempting to check if the ${type} met the maximum date restriction.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};
