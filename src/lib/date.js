const { checkEmpty, toBoolean } = require(`./sublib/misc`);

/******************************************************************************/

// ?
//
// OPTIONS EXAMPLE
// const options = {
//   type: `date`,
//   isRequired: true,
//   trim: true,
//   mustBe13: false,
//   mustBe18: false,
//   sourceFormat: `yyyy/mm/dd`,
//   targetFormat: `yyyy/mm/dd`
// };
//
// date format is yyyy/mm/dd
// date regex is /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
module.exports.checkDate = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
  try {
    // get the options data, or fill it with defaults where necessary
    options = options !== undefined && typeof options === `object` ? options : {};
    options.type = options.type !== undefined ? options.type.toString() : `date`;
    options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : true;
    options.trim = options.trim !== undefined ? toBoolean(options.trim) : true;
    options.mustBe18 = options.mustBe18 !== undefined ? toBoolean(options.mustBe18) : false;
    options.mustBe13 = options.mustBe13 !== undefined ? toBoolean(options.mustBe13) : false;
    options.sourceFormat = options.sourceFormat !== undefined ? options.sourceFormat.toString().replace(`/[-_ .]/g`, `/`) : `yyyy/mm/dd`;
    options.targetFormat = options.targetFormat !== undefined ? options.targetFormat.toString().replace(`/[-_ .]/g`, `/`) : `yyyy/mm/dd`;

    // if no value is provided and a value is required, early return with an error
    if (value === undefined && options.isRequired === true) {
      const error = {
        error: `No value was provided for the ${options.type || `date`}.`,
      };
      result.errors.push(error);
      result.errstr += error.error;
      return result;
    }
    if (value === undefined && options.isRequired === false) {
      return result;
    }

    // attempt to reformat the data in 'value' however defined by 'options'
    value = value !== undefined ? String(value) : ``;
    if (options.trim === true) {
      value = value.trim();
    }
    value = value.replace(/[\s\t\r\n]/g, `-`);

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

  // if the value isn't required and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/[\s\t\r\n]/g, ``) === ``) {
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

  if (options.mustBe18 === true) {
    const checkedYoung = checkYoung(result.value, options.type, 18);
    if (checkedYoung) {
      result.errors.push(checkedYoung);
      result.errstr += `${checkedYoung.error}\r\n`;
    }
  }

  if (options.mustBe13 === true) {
    const checkedYoung = checkYoung(result.value, options.type, 13);
    if (checkedYoung) {
      result.errors.push(checkedYoung);
      result.errstr += `${checkedYoung.error}\r\n`;
    }
  }

  const checkedFormat = checkFormat(result.value, options.type, options.sourceFormat);
  if (checkedFormat) {
    result.errors.push(checkedFormat);
    result.errstr += `${checkedFormat.error}\r\n`;
  }

  // convert the format of the date, if the source and target formats are different
  if (options.sourceFormat !== options.targetFormat) {
    const conversion = this.convertDate(result.value, { sourceFormat: options.sourceFormat, targetFormat: options.targetFormat });
    if (conversion.success === false) {
      result.errors.push({ error: `An error occurred while attempting to convert the ${options.type} from '${options.sourceFormat}' to '${options.targetFormat}' : ${conversion.error}` });
      result.errstr += `An error occurred while attempting to convert the ${options.type} from '${options.sourceFormat}' to '${options.targetFormat}' : ${conversion.error}\r\n`;
    } else {
      result.value = conversion.value;
    }
  }

  return result;
};

/******************************************************************************/

// check to make sure the person is 18 or older
function checkYoung(date, type, age) {
  let result;
  try {
    const dateUnixTime = Math.round(new Date(date).getTime() / 1000);
    const currentTime = Math.round(new Date().getTime() / 1000);
    // gregorian year is 365.2425 days, which equates to 31,556,952 seconds
    if (currentTime - dateUnixTime < (31556952 * age)) {
      result = {
        error: `You must be at least ${age} years of age or older.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} was too young.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

// make sure the date format is valid (yyyy-mm-dd)
function checkFormat(date, type, format) {
  let result;
  try {
    format = format.toLowerCase();
    let regex;
    if (format === `yyyy/mm/dd`) {
      regex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
    } else if (format === `mm/dd/yyyy`) {
      regex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
    } else if (format === `dd/mm/yyyy`) {
      regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    }
    if (regex.test(date) === false) {
      result = {
        error: `The ${type} was not in a valid format of '${format}'.`,
      };
    }
    // let t = /^(?=.+([\/.-])..\1)(?=.{10}$)(?:(\d{4}).|)(\d\d).(\d\d)(?:.(\d{4})|)$/;
    // dob.replace(t, function ($, _, y, m, d, y2) {
    //   $ = new Date(y = y || y2, m, d);
    //   t = $.getFullYear() != y || $.getMonth() != m || $.getDate() != d;
    // });
    // return !t;
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the ${type} was in a valid date format.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

// EXAMPLE OPTIONS
// const options = {
//   sourceFormat: `YYYY/MM/DD`,
//   targetFormat: `MM/DD/YYYY`,
//   trim: true
// };
//
// RESULT OBJECT
// const result = {
//   value: `09/29/1985`, // the value as a string
//   timestamp: 496818000, // the value as a 32-bit UNIX timestamp
//   timestamp64: 496818000000, // the value as a 64-bit JavaScript timestamp
//   success: true // whether or not the process completed successfully
// };
module.exports.convertDate = (date, options) => {
  const result = {
    value: ``,
    timestamp: 0,
    timestamp64: 0,
    success: true,
    error: undefined,
  };

  // get the options or set defaults
  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        sourceFormat: `yyyy/mm/dd`,
        targetFormat: `mm/dd/yyyy`,
        trim: true,
      };
    } else {
      if (options.sourceFormat === undefined) {
        options.sourceFormat = `yyyy/mm/dd`;
      } else {
        options.sourceFormat = options.sourceFormat.toString().toLowerCase();
      }
      if (options.targetFormat === undefined) {
        options.targetFormat = `mm/dd/yyyy`;
      } else {
        options.targetFormat = options.targetFormat.toString().toLowerCase();
      }
      if (options.trim === undefined) {
        options.trim = true;
      } else {
        options.trim = toBoolean(options.trim);
      }
    }
  } catch (ex) {
    result.success = false;
    result.error = new Error(`An exception error occurred while attempting to retrieve the options data for converting the date : ${ex.message}`);
    return result;
  }

  // clean up the input
  try {
    result.value = date.toString();
    if (options.trim === true) {
      result.value = result.value.trim();
    }
  } catch (ex) {
    result.success = false;
    result.error = new Error(`An exception error occurred while attempting to parse the date value into a string : ${ex.message}`);
  }

  // actual logic
  if (options.sourceFormat === `unknown` || options.sourceFormat === ``) {
    // run regex tests to try to figure out the format
  }
  if (options.sourceFormat === `yyyy/mm/dd`) {
    if (options.targetFormat === `mm/dd/yyyy`) {
      const part1 = `${result.value.substring(5, 7)}/`;
      const part2 = `${result.value.substring(8, 10)}/`;
      const part3 = result.value.substring(0, 4);
      result.value = part1 + part2 + part3;
    } else if (options.targetFormat === `dd/mm/yyyy`) {
      const part1 = `${result.value.substring(8, 10)}/`;
      const part2 = `${result.value.substring(5, 7)}/`;
      const part3 = result.value.substring(0, 4);
      result.value = part1 + part2 + part3;
    } else if (options.targetFormat === `yyyy/dd/mm`) {
      const part1 = `${result.value.substring(0, 5)}/`;
      const part2 = `${result.value.substring(8, 10)}/`;
      const part3 = result.value.substring(5, 7);
      result.value = part1 + part2 + part3;
    } else {
      result.success = false;
      result.error = new Error(`The target format for the date conversion was not understood.`);
    }
  } else if (options.sourceFormat === `mm/dd/yyyy`) {
    if (options.targetFormat === `yyyy/mm/dd`) {
      const part1 = `${result.value.substring(6, 10)}/`;
      const part2 = `${result.value.substring(0, 2)}/`;
      const part3 = result.value.substring(3, 5);
      result.value = part1 + part2 + part3;
    } else if (options.targetFormat === `dd/mm/yyyy`) {
      const part1 = `${result.value.substring(3, 5)}/`;
      const part2 = `${result.value.substring(0, 2)}/`;
      const part3 = result.value.substring(6, 10);
      result.value = part1 + part2 + part3;
    } else if (options.targetFormat === `yyyy/dd/mm`) {
      const part1 = `${result.value.substring(6, 10)}/`;
      const part2 = `${result.value.substring(3, 5)}/`;
      const part3 = result.value.substring(0, 2);
      result.value = part1 + part2 + part3;
    } else {
      result.success = false;
      result.error = new Error(`The target format for the date conversion was not understood.`);
    }
  } else if (options.sourceFormat === `dd/mm/yyyy`) {
    if (options.targetFormat === `yyyy/mm/dd`) {
      const part1 = `${result.value.substring(6, 10)}/`;
      const part2 = `${result.value.substring(3, 5)}/`;
      const part3 = result.value.substring(0, 2);
      result.value = part1 + part2 + part3;
    } else if (options.targetFormat === `mm/dd/yyyy`) {
      const part1 = `${result.value.substring(3, 5)}/`;
      const part2 = `${result.value.substring(0, 2)}/`;
      const part3 = result.value.substring(6, 10);
      result.value = part1 + part2 + part3;
    } else if (options.targetFormat === `yyyy/dd/mm`) {
      const part1 = `${result.value.substring(6, 10)}/`;
      const part2 = `${result.value.substring(0, 2)}/`;
      const part3 = result.value.substring(3, 5);
      result.value = part1 + part2 + part3;
    }
  } else {
    result.success = false;
    result.error = new Error(`The source format for the date conversion was not understood.`);
  }

  return result;
};
