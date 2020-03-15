const {
  checkEmpty, checkLong, checkShort, checkRegex, toBoolean,
} = require(`./sublib/misc`);

/******************************************************************************/

// TODO add some means of replacing characters according to a regex
// a generic and versatile function for error-checking a string
//
// const exOptions = {
//   isRequired: true,
//   long: false, // check if the string is too long
//   max: 255, // maximum number of characters for checking long
//   short: false, // check if the string is too short
//   min: 0, // minimum number of characters for checking minshort
//   regex: undefined, // a custom regex to check (returns an 'invalid' error if failed)
//   list: [], // an array of possible strings to check for
//   whitespace: false, // whether or not to remove all whitespace from inside the string
//   toLowerCase: false, // whether or not to reformat the string to lowercase
//   toUpperCase: false, // whether or not to reformat the string to uppercase
//   trim: true, // whether or not to trim the string
//   type: `character string` // an identifier used primarily in error messages
// };
module.exports.checkString = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input values
  try {
    // set up defaults for the options or fill in any missing settings with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        long: false,
        max: 255,
        short: false,
        min: 0,
        regex: undefined,
        list: [],
        whitespace: false,
        toLowerCase: false,
        toUpperCase: false,
        trim: true,
        type: `character string`,
      };
    } else {
      if (options.isRequired === undefined) {
        options.isRequired = true;
      } else {
        options.isRequired = toBoolean(options.isRequired);
      }
      if (options.long === undefined) {
        options.long = false;
      } else {
        options.long = toBoolean(options.long);
      }
      if (options.max === undefined) {
        options.max = 255;
      } else {
        options.max = Number(options.max);
      }
      if (options.short === undefined) {
        options.short = false;
      } else {
        options.short = toBoolean(options.short);
      }
      if (options.min === undefined) {
        options.min = 0;
      } else {
        options.min = Number(options.min);
      }
      if (options.list === undefined) {
        options.list = [];
      } else {
        const newList = [];
        for (const i in options.list) {
          newList.push(String(options.list[i]));
        }
        options.list = newList;
      }
      if (typeof options.list === `string`) {
        options.list = [options.list];
      }
      if (options.whitespace === undefined) {
        options.whitespace = false;
      } else {
        options.whitespace = toBoolean(options.whitespace);
      }
      if (options.toLowerCase === undefined) {
        options.toLowerCase = false;
      } else {
        options.toLowerCase = toBoolean(options.toLowerCase);
      }
      if (options.toUpperCase === undefined) {
        options.toUpperCase = false;
      } else {
        options.toUpperCase = toBoolean(options.toUpperCase);
      }
      if (options.trim === undefined) {
        options.trim = true;
      } else {
        options.trim = toBoolean(options.trim);
      }
      if (options.type === undefined) {
        options.type = `character string`;
      } else if (options.type.indexOf(`string`) < 0) {
        options.type = `${String(options.type)} character string`;
      } else {
        options.type = String(options.type);
      }
    }

    // apply any string formatting defined by the options
    value = String(value);
    if (options.whitespace === true) {
      value = value.replace(/\s\t\r\n/g, ``);
    }
    if (options.toLowerCase === true) {
      value = value.toLowerCase();
    }
    if (options.toUpperCase === true) {
      value = value.toUpperCase();
    }
    if (options.trim === true) {
      value = value.trim();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the ${options.type} for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // check if the string is empty, if necessary
  if (options.isRequired === true) {
    const checkedEmpty = checkEmpty(result.value, { type: options.type });
    if (checkedEmpty) {
      result.errors.push(checkedEmpty);
      result.errstr += `${checkedEmpty.error}\r\n`;
    }
  } else if (result.value.replace(/\s\t\r\n/g, ``) === ``) {
    result.value = ``;
  }

  if (result.value === `` && options.isRequired === false) {
    return result;
  }

  // check if the string is too long, if necessary
  if (options.long === true) {
    const checkedLong = checkLong(result.value, { type: options.type, max: options.max, filterWhitespace: false });
    if (checkedLong) {
      result.errors.push(checkedLong);
      result.errstr += `${checkedLong.error}\r\n`;
    }
  }

  // check if the string is too short, if necessary
  if (options.short === true) {
    const checkedShort = checkShort(result.value, { type: options.type, min: options.min, filterWhitespace: false });
    if (checkedShort) {
      result.errors.push(checkedShort);
      result.errstr += `${checkedShort.error}\r\n`;
    }
  }

  // check if the string is in a list
  if (options.list.length > 0) {
    let listFound = false;
    for (const i in options.list) {
      if (options.list[i] === result.value) {
        listFound = true;
        break;
      }
    }
    if (listFound === false) {
      const error = {
        error: `The ${options.type} value did not match any of the possible values from a predefined list.`,
      };
      result.errors.push(error);
      result.errstr += `${error.error}\r\n`;
    }
  }

  // check if the string matches the requirements of a regular expression, if necessary
  if (options.regex !== undefined) {
    const checkedRegex = checkRegex(result.value, options.regex, { type: options.type });
    if (checkedRegex) {
      result.errors.push(checkedRegex);
      result.errstr += `${checkedRegex.error}\r\n`;
    }
  }

  return result;
};
