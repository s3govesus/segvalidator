const { toBoolean } = require(`./sublib/misc`);

// check a server address for errors
//
// EXAMPLE OPTIONS
// const options = {
//   isRequired: true,
//   trim: true,
//   mode: `either`, // or `ip` or `domain`
//   type: `server`,
// };
module.exports.checkWebAddress = (value, options) => {
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
        trim: true,
        mode: `either`
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = true;
      } else {
        options.isRequired = toBoolean(options.isRequired);
      }
      if (options.trim === undefined) {
        options.trim = true;
      } else {
        options.trim = toBoolean(options.trim);
      }
      if (options.mode === undefined) {
        options.mode = `either`;
      } else {
        options.mode = String(options.mode);
      }
      if (options.type === undefined) {
        options.type = `server`;
      } else {
        options.type = String(options.type);
      }
      if (value === undefined && options.isRequired === true) {
        const error = {
          error: `The ${options.type} address is undefined.  A value must be provided for the ${options.type} address.`
        };
        result.errors.push(error);
        result.errstr += error.error;
        return result;
      }
      if (value === undefined) {
        value = ``;
      }

      // attempt to reformat the data in 'value' if options specify to do so
      value = String(value);
      if (options.trim === true) {
        value = value.trim();
      }
      result.value = value;
    }
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
            error: `The ${type} IP address is invalid.`,
          };
          break;
        case `ipv4`:
          result = {
            error: `The ${type} IPv4 address is invalid.`,
          };
          break;
        case `ipv6`:
          result = {
            error: `The ${type} IPv6 address is invalid.`,
          };
          break;
        case `domain`:
          result = {
            error: `The ${type} web address is invalid.`,
          };
          break;
        default:
          result = {
            error: `The ${type} address is invalid.`,
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
