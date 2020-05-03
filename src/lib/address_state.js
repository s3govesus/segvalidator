const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check to make sure the state is one of the US state 2-digit ISO codes
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: true,
//   trim: true,
//   toUpperCase: true
// };
module.exports.checkAddressState = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  //
  try {
    // get the options data, or fill it with defaults if missing anything
    if (options === undefined || typeof options !== `object`) {
      options = {
        isRequired: true,
        trim: true,
        toUpperCase: true,
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
      if (options.toUpperCase === undefined) {
        options.toUpperCase = true;
      } else {
        options.toUpperCase = toBoolean(options.toUpperCase);
      }
    }

    // attempt to reformat the value data if specified to do so by the options
    value = String(value);
    if (options.trim === true) {
      value = value.trim();
    }
    if (options.toUpperCase === true) {
      value = value.toUpperCase();
    }
    result.value = value;
  } catch (ex) {
    const error = {
      error: `An exception error occurred while attempting to reformat the state for error-checking.`,
      exception: ex.message,
    };
    result.errors.push(error);
    result.errstr += `${error.error}\r\n`;
    return result;
  }

  // if the value isn't required and it's empty, just return nothing-ish
  if (options.isRequired === false && result.value.replace(/\s\t\r\n/g, ``) === ``) {
    result.value = ``;
  }
  if (options.isRequired === false && result.value === ``) {
    return result;
  }

  const checkedEmpty = checkEmpty(result.value, { type: `state` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  // check if the string value matches one in the list of valid states
  const checkedValid = checkValid(result.value);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// look through the list of 2-digit ISO state codes and see if the string value matches one of them
function checkValid(state) {
  let result;
  // attempt to iterate through the list of state codes looking for a match
  try {
    let matchFound = false;
    const l = this.states.length;
    for (let i = 0; i < l; i += 1) {
      if (this.states[i].code === state) {
        matchFound = true;
        break;
      }
    }
    if (matchFound === false) {
      result = {
        error: `The state is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the state was valid.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

module.exports.states = [
  {
    name: `Alabama`,
    code: `AL`,
  },
  {
    name: `Alaska`,
    code: `AK`,
  },
  {
    name: `Arizona`,
    code: `AZ`,
  },
  {
    name: `Arkansas`,
    code: `AR`,
  },
  {
    name: `California`,
    code: `CA`,
  },
  {
    name: `Colorado`,
    code: `CO`,
  },
  {
    name: `Connecticut`,
    code: `CT`,
  },
  {
    name: `Delaware`,
    code: `DE`,
  },
  {
    name: `Florida`,
    code: `FL`,
  },
  {
    name: `Georgia`,
    code: `GA`,
  },
  {
    name: `Hawaii`,
    code: `HI`,
  },
  {
    name: `Idaho`,
    code: `ID`,
  },
  {
    name: `Illinois`,
    code: `IL`,
  },
  {
    name: `Indiana`,
    code: `IN`,
  },
  {
    name: `Iowa`,
    code: `IA`,
  },
  {
    name: `Kansas`,
    code: `KS`,
  },
  {
    name: `Kentucky`,
    code: `KY`,
  },
  {
    name: `Louisiana`,
    code: `LA`,
  },
  {
    name: `Maine`,
    code: `ME`,
  },
  {
    name: `Maryland`,
    code: `MD`,
  },
  {
    name: `Massachusetts`,
    code: `MA`,
  },
  {
    name: `Michigan`,
    code: `MI`,
  },
  {
    name: `Minnesota`,
    code: `MN`,
  },
  {
    name: `Mississippi`,
    code: `MS`,
  },
  {
    name: `Missouri`,
    code: `MO`,
  },
  {
    name: `Montana`,
    code: `MT`,
  },
  {
    name: `Nebraska`,
    code: `NE`,
  },
  {
    name: `Nevada`,
    code: `NV`,
  },
  {
    name: `New Hampshire`,
    code: `NH`,
  },
  {
    name: `New Jersey`,
    code: `NJ`,
  },
  {
    name: `New Mexico`,
    code: `NM`,
  },
  {
    name: `New York`,
    code: `NY`,
  },
  {
    name: `North Carolina`,
    code: `NC`,
  },
  {
    name: `North Dakota`,
    code: `ND`,
  },
  {
    name: `Ohio`,
    code: `OH`,
  },
  {
    name: `Oklahoma`,
    code: `OK`,
  },
  {
    name: `Oregon`,
    code: `OR`,
  },
  {
    name: `Pennsylvania`,
    code: `PA`,
  },
  {
    name: `Rhode Island`,
    code: `RI`,
  },
  {
    name: `South Carolina`,
    code: `SC`,
  },
  {
    name: `South Dakota`,
    code: `SD`,
  },
  {
    name: `Tennessee`,
    code: `TN`,
  },
  {
    name: `Texas`,
    code: `TX`,
  },
  {
    name: `Utah`,
    code: `UT`,
  },
  {
    name: `Vermont`,
    code: `VT`,
  },
  {
    name: `Virginia`,
    code: `VA`,
  },
  {
    name: `Washington`,
    code: `WA`,
  },
  {
    name: `West Virginia`,
    code: `WV`,
  },
  {
    name: `Wisconsin`,
    code: `WI`,
  },
  {
    name: `Wyoming`,
    code: `WY`,
  },
  {
    name: `District of Columbia`,
    code: `DC`,
  },
  {
    name: `American Samoa`,
    code: `AS`,
  },
  {
    name: `Guam`,
    code: `GU`,
  },
  {
    name: `Northern Mariana Islands`,
    code: `MP`,
  },
  {
    name: `Puerto Rico`,
    code: `PR`,
  },
  {
    name: `U.S. Minor Outlying Islands`,
    code: `UM`,
  },
  {
    name: `Virgin Islands, U.S.`,
    code: `VI`,
  },
];
