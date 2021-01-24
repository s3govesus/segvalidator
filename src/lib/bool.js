const { toBoolean } = require(`./sublib/misc`);

// check a boolean value to see if it's valid, also check if it's required
// ! note that the `isRequired` property on the options for this function is somewhat different from most
// ! on this function it checks to make sure the boolean value is whatever the value for `mustBe` is
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: false,
//   mustBe: true, // this defines the value that is required, if the boolean is required to have a specific value (isRequired === true)
//   type: `form checkbox`
// };
module.exports.checkBool = (value, options) => {
  const result = {
    value,
    intVal: 0,
    errors: [],
    errstr: ``,
  };

  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: false,
        mustBe: true,
        type: `form checkbox`,
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = false;
      } else {
        options.isRequired = toBoolean(options.isRequired);
      }
      if (options.mustBe === undefined) {
        options.mustBe = true;
      } else {
        options.mustBe = toBoolean(options.mustBe);
      }
      if (options.type === undefined) {
        options.type = `form checkbox`;
      } else {
        options.type = options.type.toString();
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

    value = toBoolean(value);
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the '${options.type}' boolean value for error-checking.`,
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
