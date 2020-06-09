const { toBoolean } = require(`./sublib/misc`);

// check a string to see if it can be converted into a valid number
//
// const exOptions = {
//   isRequired: true,
//   min: undefined,
//   max: undefined,
//   mustBeInt: false,
//   mustBePositive: false,
//   mustBeNegative: false,
//   mustBeOdd: false,
//   mustBeEven: false,
//   list: [],
//   type: `number`
// };
module.exports.checkNumber = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        min: undefined,
        max: undefined,
        mustBeInt: false,
        mustBePositive: false,
        mustBeNegative: false,
        mustBeOdd: false,
        mustBeEven: false,
        list: [],
        type: `number`,
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = true;
      } else {
        options.isRequired = toBoolean(options.isRequired);
      }
      if (options.min !== undefined) {
        options.min = Number(options.min);
      }
      if (options.max !== undefined) {
        options.max = Number(options.max);
      }
      if (options.mustBeInt === undefined) {
        options.mustBeInt = false;
      } else {
        options.mustBeInt = toBoolean(options.mustBeInt);
      }
      if (options.mustBePositive === undefined) {
        options.mustBePositive = false;
      } else {
        options.mustBePositive = toBoolean(options.mustBePositive);
      }
      if (options.mustBeNegative === undefined) {
        options.mustBeNegative = false;
      } else {
        options.mustBeNegative = toBoolean(options.mustBeNegative);
      }
      if (options.mustBeOdd === undefined) {
        options.mustBeOdd = false;
      } else {
        options.mustBeOdd = toBoolean(options.mustBeOdd);
      }
      if (options.list !== undefined) {
        options.list = [];
      } else {
        // reparse the data with every item being forced into a number
        const newList = [];
        for (let i = 0; i < options.list.length; i += 1) {
          newList.push(Number(options.list[i]));
        }
        options.list = newList;
      }
      if (options.type === undefined) {
        options.type = `number`;
      } else if (options.type.indexOf(`number`) < 0) {
        options.type = `${String(options.type)} number`;
      } else {
        options.type = String(options.type);
      }
    }
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `The value for the ${options.type} is undefined.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }

    // if the value isn't required and it's empty, just return nothing-ish
    if (
      options.isRequired === false
      && result.value.toString().replace(/[\s\t\r\n]/g, ``) === ``
    ) {
      result.value = ``;
    }
    if (options.isRequired === false && result.value === ``) {
      return result;
    }

    // attempt to reformat the data in 'value' to force it to be a number
    value = Number(value);
    result.value = value;
  } catch (ex) {
    const error = {
      error:
        `An exception error occurred while attempting to reformat the ${options.type} for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (isNaN(result.value)) {
    const error = {
      error:
        `The value for the ${options.type} is not a valid numerical value.`,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
  }

  if (options.min !== undefined) {
    if (result.value < options.min) {
      const error = {
        error:
          `The ${options.type} value is not greater than the required minimum value of '${options.min}'.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  if (options.max !== undefined) {
    if (result.value > options.max) {
      const error = {
        error:
          `The ${options.type} value is not less than the required maximum value of '${options.max}'.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // handle error-checking for mustBeInteger and mustBeFloat options
  if (options.mustBeInt === true) {
    if (Number.isInteger(result.value) === false) {
      const error = {
        error: `The ${options.type} value must be an integer (whole number).`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // handle error-checking for mustBePositive and mustBeNegative options
  if (options.mustBePositive === true) {
    if (result.value < 0) {
      const error = {
        error:
          `The ${options.type} value must be a positive number greater than or equal to zero.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } else if (options.mustBeNegative === true) {
    if (result.value > 0) {
      const error = {
        error:
          `The ${options.type} value must be a negative number less than or equal to zero.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // handle error-checking for mustBeOdd and mustBeEven options
  if (options.mustBeOdd === true) {
    if (result.value % 2 !== 1) {
      const error = {
        error: `The ${options.type} value must be an odd number.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } else if (options.mustBeEven === true) {
    if (result.value % 2 !== 0) {
      const error = {
        error: `The ${options.type} value must be an even number.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // if there are items in the list property in the options parameter, check to make sure the value matches something in that list
  if (options.list.length > 0) {
    let valueFound = false;
    for (let i = 0; i < options.list.length; i += 1) {
      if (options.list[i] === result.value) {
        valueFound = true;
        break;
      }
    }
    if (valueFound === false) {
      const error = {
        error:
          `The ${options.type} value did not match any of the possible values from a predefined list.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  return result;
};
