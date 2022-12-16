const { toBoolean } = require(`./sublib/misc`);

// check a server address for errors
//
// EXAMPLE OPTIONS
// const options = {
//   type: `web`,
//   isRequired: true,
//   trim: true,
//   mode: `either`, // or `ip` or `domain`
// };
function checkWebAddress(value, options) {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data or fill it with defaults if necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    // get the type or clean it up to reduce redundancies in error messages created by appending 'address' after the type in the error strings
    options.type = options.type !== undefined ? options.type.toString() : `web`;
    options.type = options.type.toLowerCase().lastIndexOf(`address`) === (options.type.length - 7) ? options.type.slice(0, options.type.toLowerCase().lastIndexOf(`address`)) : options.type;
    options.type = options.type[options.type.length - 1] === ` ` ? options.type.slice(0, options.type.length - 1) : options.type;
    // get the rest of the options
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.mode = options.mode !== undefined ? options.mode.toString() : `either`;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type} address.`,
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
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} address for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required, and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/[\s\t\r\n]/g, ``) === ``) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  // check if the value provided meets certain criteria
  const checkedInvalid = checkInvalid(value, options.type, options.mode);
  if (checkedInvalid) {
    result.errors.push(checkedInvalid);
    result.errstr += `${checkedInvalid.error}\r\n`;
  }

  return result;
}

/******************************************************************************/

//
function checkInvalid(value, type, mode) {
  let result;
  try {
    let regex;
    switch (mode) {
      case `ip`:
        regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/;
        break;
      case `ipv4`:
        regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        break;
      case `ipv6`:
        regex = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/;
        break;
      case `domain`:
        regex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
        break;
      default:
        regex = /^((?!-)[A-Za-z0-9-]{1, 63}(?<!-)\\.)+[A-Za-z]{2, 6}$|^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
        break;
    }
    if (regex.test(value) === false) {
      // change the error message depending on what the `mode` was
      switch (mode) {
        case `ip`:
          result = {
            error: `The ${type} address is not a valid IP address.`,
          };
          break;
        case `ipv4`:
          result = {
            error: `The ${type} address is not a valid IPv4 address.`,
          };
          break;
        case `ipv6`:
          result = {
            error: `The ${type} address is not a valid IPv6 address.`,
          };
          break;
        case `domain`:
          result = {
            error: `The ${type} address is not a valid domain.`,
          };
          break;
        default:
          result = {
            error: `The ${type} address is not valid.`,
          };
          break;
      }
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} address was valid.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

module.exports = {
  checkWebAddress,
};
