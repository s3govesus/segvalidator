const { toBoolean } = require(`./sublib/misc`);

// check a string to see if it can be converted into a valid number
//
// const exOptions = {
//   type: `provided`,
//   isRequired: true,
//   min: undefined,
//   max: undefined,
//   mustBeInt: false,
//   mustBePositive: false,
//   mustBeNegative: false,
//   mustBeOdd: false,
//   mustBeEven: false,
//   list: [],
// };
function checkNumber(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    // get the type or clean it up to reduce redundancies in error messages created by appending 'number' after the type in the error strings
    options.type = options.type !== undefined ? options.type.toString() : `provided`;
    options.type = options.type.toLowerCase().lastIndexOf(`number`) === (options.type.length - 6) ? options.type.slice(0, options.type.toLowerCase().lastIndexOf(`number`)) : options.type;
    options.type = options.type[options.type.length - 1] === ` ` ? options.type.slice(0, options.type.length - 1) : options.type;
    // get the rest of the options
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.min = options.min !== undefined ? Number(options.min) : undefined;
    options.max = options.max !== undefined ? Number(options.max) : undefined;
    options.mustBeInt = options.mustBeInt !== undefined ? toBoolean(options.mustBeInt) : false;
    options.mustBePositive = options.mustBePositive !== undefined ? toBoolean(options.mustBePositive) : false;
    options.mustBeNegative = options.mustBeNegative !== undefined ? toBoolean(options.mustBeNegative) : false;
    options.mustBeEven = options.mustBeEven !== undefined ? toBoolean(options.mustBeEven) : false;
    options.mustBeOdd = options.mustBeOdd !== undefined ? toBoolean(options.mustBeOdd) : false;
    // parse the list as numbers or replace it with an empty array if necessary
    if (options.list === undefined) {
      options.list = [];
    } else {
      // reparse the data with every item being forced into a number
      const newList = [];
      for (let i = 0; i < options.list.length; i += 1) {
        newList.push(Number(options.list[i]));
      }
      options.list = newList;
    }

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `provided`} number.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
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
    value = value !== undefined ? Number(value) : undefined;
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type || `provided`} number for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (Number.isNaN(result.value)) {
    const error = {
      error: `The value for the ${options.type} number is not a valid numerical value.`,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
  }

  if (options.min !== undefined) {
    if (result.value < options.min) {
      const error = {
        error: `The ${options.type} number value is not greater than the required minimum value of '${options.min}'.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  if (options.max !== undefined) {
    if (result.value > options.max) {
      const error = {
        error: `The ${options.type} number value is not less than the required maximum value of '${options.max}'.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // handle error-checking for mustBeInteger and mustBeFloat options
  if (options.mustBeInt === true) {
    if (Number.isInteger(result.value) === false) {
      const error = {
        error: `The ${options.type} number value must be an integer (whole number).`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // handle error-checking for mustBePositive and mustBeNegative options
  if (options.mustBePositive === true) {
    if (result.value < 0) {
      const error = {
        error: `The ${options.type} number value must be a positive number greater than or equal to zero.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } else if (options.mustBeNegative === true) {
    if (result.value > 0) {
      const error = {
        error: `The ${options.type} number value must be a negative number less than or equal to zero.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // handle error-checking for mustBeOdd and mustBeEven options
  if (options.mustBeOdd === true) {
    if (result.value % 2 !== 1) {
      const error = {
        error: `The ${options.type} number value must be an odd number.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  } else if (options.mustBeEven === true) {
    if (result.value % 2 !== 0) {
      const error = {
        error: `The ${options.type} number value must be an even number.`,
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
        error: `The ${options.type} number value did not match any of the possible values from a predefined list.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  return result;
}

/******************************************************************************/

module.exports = {
  checkNumber,
};
