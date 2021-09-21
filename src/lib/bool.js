const { toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// check a boolean value to see if it's valid, also check if it's required
// ! note that the `isRequired` property on the options for this function is somewhat different from most
// ! on this function it checks to make sure the boolean value is whatever the value for `mustBe` is
//
// OPTIONS EXAMPLE
// const options = {
//   type: `form checkbox`,
//   isRequired: false,
//   mustBe: true, // this defines the value that is required, if the boolean is required to have a specific value (isRequired === true)
// };
module.exports.checkBool = (value, options) => {
  const result = {
    value,
    intVal: 0,
    errors: [],
    errstr: ``,
  };

  try {
    // get the options data, or fill it with defaults if missing anything
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `form checkbox`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : false;
    options.mustBe = options.mustBe !== undefined ? toBoolean(options.mustBe) : true;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `form checkbox`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    value = value !== undefined ? toBoolean(value) : false;
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the '${options.type || `form checkbox`}' boolean value for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  if (result.value === true) {
    result.intVal = 1;
  }

  if (options.isRequired === true) {
    const checkedRequired = checkRequired(result.value, options.type, options.mustBe);
    if (checkedRequired) {
      result.errors.push(checkedRequired);
      result.errstr += `${checkedRequired.error}\r\n`;
    }
  }

  return result;
};

/******************************************************************************/

// returns true, indicating the presence of an error, if the value for the ToS agreement is false, suggesting the user did not agree to the ToS
function checkRequired(value, type, mustBe) {
  let result;
  try {
    if (mustBe === true) {
      if (value !== true) {
        if (type.toLowerCase().indexOf(`agreement`) > -1) {
          result = {
            error: `You must agree to the ${type}.`,
          };
        } else {
          result = {
            error: `The boolean value for the ${type} is false but is required to be true.`,
          };
        }
      }
    } else if (value === true) {
      result = {
        error: `The boolean value for the ${type} is true but is required to be false.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} had the correct required value.`,
      exception: ex.message,
    };
  }
  return result;
}
