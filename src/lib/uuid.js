const { checkEmpty, toBoolean } = require(`./sublib/misc`);

//
//
// const exOptions = {
//   isRequired: true,
//   version: 1,
//   trim: true,
//   toLowerCase: true,
//   type: `account ID`
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
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        version: 1,
        trim: true,
        toLowerCase: true,
        type: `account ID`,
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = true;
      } else {
        options.isRequired = toBoolean(options.isRequired);
      }
      if (options.version === undefined) {
        options.version = 1;
      } else {
        options.version = Number(options.version);
      }
      if (options.trim === undefined) {
        options.trim = true;
      } else {
        options.trim = toBoolean(options.trim);
      }
      if (options.toLowerCase === undefined) {
        options.toLowerCase = true;
      } else {
        options.toLowerCase = toBoolean(options.toLowerCase);
      }
      if (options.type === undefined) {
        options.type = `account ID`;
      } else if (options.type.indexOf(`ID`) < 0) {
        options.type = `${String(options.type)} ID`;
      } else {
        options.type = String(options.type);
      }
    }

    // attempt to reformat the data in 'value' if options specify to do so
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/\s\t\r\n/g, ``) === ``) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(result.value, { type: options.type });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  const checkedInvalid = checkInvalid(result.value, options.type, options.version);
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
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        uuidExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        break;
      case 6:
      case 7:
        uuidExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}=[0-9a-f]{4}-[0-9a-f]{12}$/i;
        break;
      default:
        uuidExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
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
