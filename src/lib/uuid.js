const { checkEmpty, toBoolean } = require(`./sublib/misc`);

//
//
// const exOptions = {
//   type: `provided`,
//   isRequired: true,
//   version: 0,
//   trim: true,
//   toLowerCase: true,
// };
module.exports.checkUUID = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    // get the type or clean it up to reduce redundancies in error messages created by appending 'object ID' after the type in the error strings
    options.type = options.type !== undefined ? options.type.toString() : `provided`;
    options.type = options.type.toLowerCase().lastIndexOf(`id`) === (options.type.length - 2) ? options.type.slice(0, options.type.toLowerCase().lastIndexOf(`id`)) : options.type;
    options.type = options.type[options.type.length - 1] === ` ` ? options.type.slice(0, options.type.length - 1) : options.type;
    // get the rest of the options
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.version = options.version !== undefined ? Number(options.version) : 0;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.toLowerCase = options.toLowerCase !== undefined ? toBoolean(options.toLowerCase) : true;
    if (options.type === undefined) {
      options.type = `account ID`;
    } else if (options.type.indexOf(`ID`) < 0) {
      options.type = `${String(options.type)} ID`;
    } else {
      options.type = String(options.type);
    }

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type} ID.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' if options specify to do so
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} ID for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/[\s\t\r\n]/g, ``) === ``) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(result.value, { type: `${options.type} ID` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedInvalid = checkInvalid(result.value, `${options.type} ID`, options.version);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

function checkInvalid(uuid, type, version) {
  let result;
  try {
    let uuidExp;
    switch (version) {
      case 0: // generic
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
        break;
      case 1:
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        break;
      case 2:
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        break;
      case 3:
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        break;
      case 4:
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        break;
      case 5:
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        break;
      case 6: // avoid 6 and 7
      case 7:
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}-[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}=[0-9A-F]{4}-[0-9A-F]{12}$/i;
        break;
      default:
        uuidExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
        break;
    }
    if (uuidExp.test(uuid) === false) {
      result = {
        error: `The ${type} is not valid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} was a valid ID value.`,
      exception: ex.message,
    };
  }
  return result;
}
