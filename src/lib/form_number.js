const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  required: false,
  max: undefined,
  min: undefined,
  step: undefined,
};

//
module.exports.checkFormNumber = (value, type, options) => {
  const result = {
    value, // this will be a number type by default
    valueAsNumber: undefined,
    valueAsString: undefined,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form number`;
  options = options !== undefined ? options : {};
  options.required = options.required !== undefined ? toBoolean(options.required) : defaultOptions.required;
  options.max = options.max !== undefined ? options.max : defaultOptions.max;
  options.min = options.min !== undefined ? options.min : defaultOptions.min;
  options.step = options.step !== undefined ? options.step : defaultOptions.step;

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

  // define valueAsNumber and valueAsString
  try {
    result.valueAsNumber = Number(result.value);
    result.valueAsString = `${result.value}`;
    if (Number.isNaN(result.valueAsNumber)) {
      const err = {
        code: 102,
        error: `The value for "${type}" is not a number.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attempting to convert "${type}" to different data types.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the max spec
  try {
    if (options.max !== undefined && result.valueAsNumber > Number(options.max)) {
      const err = {
        code: 104,
        error: `The value for "${type}" was greater than the maximum value specification (${options.max}).`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 105,
      error: `An exception error occurred while attempting to check if "${type}" met the maximum value specification.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value meets the min spec
  try {
    if (options.min !== undefined && result.valueAsNumber < Number(options.min)) {
      const err = {
        code: 106,
        error: `The value for "${type}" was less than the minimum value specification (${options.min}).`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 107,
      error: `An exception error occurred while attempting to check if "${type}" met the minimum value specification.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  // check to make sure the value is a multiple of the step spec
  try {
    if (options.step !== undefined && result.valueAsNumber % Number(options.step) > 0) {
      const err = {
        code: 108,
        error: `The value for "${type}" was not a multiple of the specified stepping (${options.step}).`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 109,
      error: `An exception error occurred while attempting to check if "${type}" was a multiple of the specified stepping.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};
