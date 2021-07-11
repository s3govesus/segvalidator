const { toBoolean } = require(`./sublib/misc`);

const defaultOptions = {
  isRequired: false,
  allow3: false, // allow shortened 3 character values
  allow4: false, // allow shortened 4 character with opacity values
  allow6: true, // this is the standard format for html color input
  allow8: false, // allow full length 6 character with opacity values
};

//
module.exports.checkFormColor = (value, type, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // assign some basic default values if necessary
  type = type !== undefined ? type : `form color`;
  options = options !== undefined ? options : {};
  options.isRequired = options.isRequired !== undefined ? toBoolean(options.isRequired) : defaultOptions.isRequired;
  options.allow3 = options.allow3 !== undefined ? options.allow3 : defaultOptions.allow3;
  options.allow4 = options.allow4 !== undefined ? options.allow4 : defaultOptions.allow4;
  options.allow6 = options.allow6 !== undefined ? options.allow6 : defaultOptions.allow6;
  options.allow8 = options.allow8 !== undefined ? options.allow8 : defaultOptions.allow8;

  // if the value is empty and required, make an early return
  if (options.isRequired === true && (result.value === undefined || result.value === ``)) {
    const err = {
      code: 101,
      error: `The value for the ${type} was empty.`,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
    return result;
  }
  // early return if a value is not required and the value is empty
  if (options.isRequired === false && (result.value === undefined || result.value === ``)) {
    return result;
  }

  // check to make sure the value is a valid hex color string
  try {
    let matchFound = false;

    if (options.allow3 === true) {
      let regex = /^#[0-9a-fA-F]{3}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }
    if (options.allow4 === true) {
      let regex = /^#[0-9a-fA-F]{4}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }
    if (options.allow6 === true) {
      let regex = /^#[0-9a-fA-F]{6}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }
    if (options.allow8 === true) {
      let regex = /^#[0-9a-fA-F]{8}$/;
      if (regex.test(result.value) === true) {
        matchFound = true;
      }
    }

    if (matchFound === false) {
      const err = {
        code: 102,
        error: `The value for the ${type} was not a valid hexadecimal color string.`,
      };
      result.errors.push(err);
      result.errstr += `${err.error}\r\n`;
    }
  } catch (ex) {
    const err = {
      code: 103,
      error: `An exception error occurred while attemping to check if the value for the ${type} was a valid hexadecimal color string.`,
      exception: ex.message,
    };
    result.errors.push(err);
    result.errstr += `${err.error}\r\n`;
  }

  return result;
};
