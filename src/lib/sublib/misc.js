// check if the string is empty or contains only whitespace characters
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`
// };
module.exports.checkEmpty = (value, options) => {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
      };
    } else if (options.type === undefined) {
      options.type = `character string`;
    }

    const valueCheck = value;
    if (valueCheck.replace(/[\s\t\r\n]/g, ``).length === 0) {
      result = {
        error: `The value for the ${options.type} is effectively empty.`,
      };
    }
  } catch (ex) {
    result = {
      error:
        `An exception error occurred while attempting to check if the ${options.type} was empty.`,
      exception: ex.message,
    };
  }
  return result;
};

/******************************************************************************/

// check if a string is too many characters in length
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`,
//   max: 255,
//   filterWhitespace: false, // ignore whitespace characters when calculating string length
// };
module.exports.checkLong = (value, options) => {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
        max: 255,
        filterWhitespace: false,
      };
    } else {
      if (options.type === undefined) {
        options.type = `character string`;
      }
      if (options.max === undefined) {
        options.max = 255; // use 255 as it is the max length of a VARCHAR in SQL
      }
      if (options.filterWhitespace === undefined) {
        options.filterWhitespace = false;
      }
    }

    let valueCheck = value;
    if (options.filterWhitespace === true) {
      valueCheck = valueCheck.replace(/[\s\t\r\n]/g, ``);
    }
    if (valueCheck.length > options.max) {
      result = {
        error:
          `The ${options.type} is too long (max. ${options.max} characters).`,
      };
    }
  } catch (ex) {
    result = {
      error:
        `An exception error occurred while attempting to check if the ${options.type} was too long.`,
      exception: ex.message,
    };
  }
  return result;
};

/******************************************************************************/

// check if a string is too few characters in length
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`,
//   min: 1,
//   filterWhitespace: false,
// };
module.exports.checkShort = (value, options) => {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
        min: 1,
        filterWhitespace: false,
      };
    } else {
      if (options.type === undefined) {
        options.type = `character string`;
      } else {
        options.type = options.type.toString();
      }
      if (options.min === undefined) {
        options.min = 1;
      } else {
        options.min = Number(options.min);
      }
      if (options.filterWhitespace === undefined) {
        options.filterWhitespace = false;
      } else {
        options.filterWhitespace = this.toBoolean(options.filterWhitespace);
      }
    }

    let valueCheck = value;
    if (options.filterWhitespace === true) {
      valueCheck = valueCheck.replace(/[\s\t\r\n]/g, ``);
    }
    if (valueCheck.length < options.min) {
      result = {
        error:
          `The ${options.type} is too short (min. ${options.min} characters).`,
      };
    }
  } catch (ex) {
    try {
      return {
        error:
          `An exception error occurred while attempting to check if the ${options.type} was too short.`,
        exception: ex.message,
      };
    } catch (ex2) {
      return {
        error:
          `An exception error occurred while attempting to determine the configuration for checking if a character string was too short : ${ex2.message}`,
        exception: ex.message,
      };
    }
  }
  return result;
};

/******************************************************************************/

// checks to ensure that string meets the expectations of a regular expression
//
// EXAMPLE OPTIONS
// const options = {
//   type: `data value`,
// };
module.exports.checkRegex = (value, regex, options) => {
  let result;

  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `data value`,
      };
    } else if (options.type === undefined) {
      options.type = `data value`;
    } else {
      options.type = options.type.toString();
    }
    if (typeof regex !== `object`) {
      regex = new RegExp(regex);
    }
  } catch (ex) {
    // TODO ? nothing ?
    return {
      error:
        `An exception error occurred while attempting to determine the configuration for checking a data value against a regular expression : ${ex.message}`,
      exception: ex.message,
    };
  }

  try {
    if (regex.test(value) === false) {
      result = {
        error:
          `The ${options.type} failed to meet specific criteria defined by a regular expression and was determined to be invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error:
        `An exception error occurred while attempting to test the ${options.type} against a regular expression.`,
      exception: ex.message,
    };
  }

  return result;
};

/******************************************************************************/

// converts a string or numeric value to a boolean true or false
module.exports.toBoolean = (value) => {
  if (typeof value === `number`) {
    if (value === 1) {
      return true;
    }
    return false;
  }
  if (typeof value === `string`) {
    value = value.toLowerCase();
    if (
      value === `true` || value === `yes` || value === `1` || value === `on`
    ) {
      return true;
    }
    if (
      value === `false` || value === `no` || value === `0` || value === `off`
    ) {
      return false;
    }
    throw new Error(
      `Error attempting to parse ${
        JSON.stringify(value)
      } as a boolean value : unknown string value.`,
    );
  }
  if (typeof value === `boolean`) {
    return value;
  }
  throw new Error(
    `Error attempting to parse ${JSON.stringify(value)} as a boolean value.`,
  );
};
