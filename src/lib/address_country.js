const { checkEmpty, toBoolean } = require(`./sublib/misc`);

// check to make sure the country is one of the 2-digit ISO country codes
//
// OPTIONS EXAMPLE
// const options = {
//   isRequired: true,
//   trim: true,
//   toUpperCase: true
// };
module.exports.checkAddressCountry = (value, options) => {
  const result = {
    value,
    errors: [],
    errstr: ``,
  };

  // try to clean up the input
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
      error: `An exception error occurred while attempting to reformat the country for error-checking.`,
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

  const checkedEmpty = checkEmpty(result.value, { type: `country` });
  if (checkedEmpty) {
    result.errors.push(checkedEmpty);
    result.errstr += `${checkedEmpty.error}\r\n`;
  }

  // check if the string value matches one in the list of valid countries
  const checkedValid = checkValid(result.value);
  if (checkedValid) {
    result.errors.push(checkedValid);
    result.errstr += `${checkedValid.error}\r\n`;
  }

  return result;
};

/******************************************************************************/

// look through the list of 2-digit ISO country codes and check to see if the value string matches one of them
function checkValid(value) {
  let result;
  // attempt to iterate through the list of country codes looking for a match
  try {
    let matchFound = false;
    const countriesLength = this.countries.length;
    for (let i = 0; i < countriesLength; i++) {
      if (this.countries[i].code === value) {
        matchFound = true;
        break;
      }
    }
    if (matchFound === false) {
      result = {
        error: `The country is invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error: `An exception error occurred while attempting to check if the country was valid.`,
      exception: ex.message,
    };
  }
  return result;
}

/******************************************************************************/

module.exports.countries = [
  {
    name: `United States`,
    code: `US`,
  },
  {
    name: `Canada`,
    code: `CA`,
  },
  {
    name: `Afghanistan`,
    code: `AF`,
  },
  {
    name: `Akrotiri and Dhekelia`,
    code: `GB`,
  },
  {
    name: `Aland Islands`,
    code: `AX`,
  },
  {
    name: `Albania`,
    code: `AL`,
  },
  {
    name: `Algeria`,
    code: `DZ`,
  },
  {
    name: `American Samoa`,
    code: `AS`,
  },
  {
    name: `Andorra`,
    code: `AD`,
  },
  {
    name: `Angola`,
    code: `AO`,
  },
  {
    name: `Anguilla`,
    code: `AI`,
  },
  {
    name: `Antarctica`,
    code: `AQ`,
  },
  {
    name: `Antigua and Barbuda`,
    code: `AG`,
  },
  {
    name: `Argentina`,
    code: `AR`,
  },
  {
    name: `Armenia`,
    code: `AM`,
  },
  {
    name: `Aruba`,
    code: `AW`,
  },
  {
    name: `Ashmore and Cartier Islands`,
    code: `AU`,
  },
  {
    name: `Australia`,
    code: `AU`,
  },
  {
    name: `Austria`,
    code: `AT`,
  },
  {
    name: `Azerbaijan`,
    code: `AZ`,
  },
  {
    name: `Bahamas`,
    code: `BS`,
  },
  {
    name: `Bahrain`,
    code: `BH`,
  },
  {
    name: `Bangladesh`,
    code: `BD`,
  },
  {
    name: `Barbados`,
    code: `BB`,
  },
  {
    name: `Belarus`,
    code: `BY`,
  },
  {
    name: `Belgium`,
    code: `BE`,
  },
  {
    name: `Belize`,
    code: `BZ`,
  },
  {
    name: `Benin`,
    code: `BJ`,
  },
  {
    name: `Bermuda`,
    code: `BM`,
  },
  {
    name: `Bhutan`,
    code: `BT`,
  },
  {
    name: `Bolivia`,
    code: `BO`,
  },
  {
    name: `Bonaire, Sint Eustatius, and Saba`,
    code: `BQ`,
  },
  {
    name: `Bosnia and Herzogovina`,
    code: `BA`,
  },
  {
    name: `Botswana`,
    code: `BW`,
  },
  {
    name: `Bouvet Island`,
    code: `BV`,
  },
  {
    name: `Brazil`,
    code: `BR`,
  },
  {
    name: `British Indian Ocean Territory`,
    code: `IO`,
  },
  {
    name: `British Virgin Islands`,
    code: `VG`,
  },
  {
    name: `Brunei Darussalam`,
    code: `BN`,
  },
  {
    name: `Bulgaria`,
    code: `BG`,
  },
  {
    name: `Burkina Faso`,
    code: `BF`,
  },
  {
    name: `Burma`,
    code: `MM`,
  },
  {
    name: `Burundi`,
    code: `BI`,
  },
  {
    name: `Cabo Verde`,
    code: `CV`,
  },
  {
    name: `Cambodia`,
    code: `KH`,
  },
  {
    name: `Cameroon`,
    code: `CM`,
  },
  {
    name: `Canada`,
    code: `CA`,
  },
  {
    name: `Cape Verde`,
    code: `CV`,
  },
  {
    name: `Caribbean Netherlands`,
    code: `BQ`,
  },
  {
    name: `Cayman Islands`,
    code: `KY`,
  },
  {
    name: `Central African Republic`,
    code: `CF`,
  },
  {
    name: `Chad`,
    code: `TD`,
  },
  {
    name: `Chile`,
    code: `CL`,
  },
  {
    name: `China`,
    code: `CN`,
  },
  {
    name: `Christmas Island`,
    code: `CX`,
  },
  {
    name: `Clipperton Island`,
    code: `FR`,
  },
  {
    name: `Cocos (Keeling) Islands`,
    code: `CC`,
  },
  {
    name: `Colombia`,
    code: `CO`,
  },
  {
    name: `Comoros`,
    code: `KM`,
  },
  {
    name: `Congo (the Democratic Republic of the)`,
    code: `CD`,
  },
  {
    name: `Congo (the)`,
    code: `CG`,
  },
  {
    name: `Cook Islands`,
    code: `CK`,
  },
  {
    name: `Coral Sea Islands`,
    code: `AU`,
  },
  {
    name: `Costa Rica`,
    code: `CR`,
  },
  {
    name: `Cote d'Ivoire`,
    code: `CI`,
  },
  {
    name: `Croatia`,
    code: `HR`,
  },
  {
    name: `Cuba`,
    code: `CU`,
  },
  {
    name: `Curacao`,
    code: `CW`,
  },
  {
    name: `Cyprus`,
    code: `CY`,
  },
  {
    name: `Czechia`,
    code: `CZ`,
  },
  {
    name: `Democratic Republic of the Congo`,
    code: `CD`,
  },
  {
    name: `Denmark`,
    code: `DK`,
  },
  {
    name: `Djibouti`,
    code: `DJ`,
  },
  {
    name: `Dominica`,
    code: `DM`,
  },
  {
    name: `Dominican Republic`,
    code: `DO`,
  },
  {
    name: `East Timor`,
    code: `TL`,
  },
  {
    name: `Ecuador`,
    code: `EC`,
  },
  {
    name: `Egypt`,
    code: `EG`,
  },
  {
    name: `El Salvador`,
    code: `SV`,
  },
  {
    name: `England`,
    code: `GB`,
  },
  {
    name: `Equatorial Guinea`,
    code: `GQ`,
  },
  {
    name: `Eritrea`,
    code: `ER`,
  },
  {
    name: `Estonia`,
    code: `EE`,
  },
  {
    name: `Eswatini`,
    code: `SZ`,
  },
  {
    name: `Ethiopia`,
    code: `ET`,
  },
  {
    name: `Falkland Islands`,
    code: `FK`,
  },
  {
    name: `Faroe Islands`,
    code: `FO`,
  },
  {
    name: `Fiji`,
    code: `FJ`,
  },
  {
    name: `Finland`,
    code: `FI`,
  },
  {
    name: `France`,
    code: `FR`,
  },
  {
    name: `French Guiana`,
    code: `GF`,
  },
  {
    name: `French Polynesia`,
    code: `PF`,
  },
  {
    name: `French Southern Territories`,
    code: `TF`,
  },
  {
    name: `Gabon`,
    code: `GA`,
  },
  {
    name: `Gambia`,
    code: `GM`,
  },
  {
    name: `Georgia`,
    code: `GE`,
  },
  {
    name: `Germany`,
    code: `DE`,
  },
  {
    name: `Ghana`,
    code: `GH`,
  },
  {
    name: `Gibraltar`,
    code: `GI`,
  },
  {
    name: `Great Britain`,
    code: `GB`,
  },
  {
    name: `Greece`,
    code: `GR`,
  },
  {
    name: `Greenland`,
    code: `GL`,
  },
  {
    name: `Grenada`,
    code: `GD`,
  },
  {
    name: `Guadeloupe`,
    code: `GP`,
  },
  {
    name: `Guam`,
    code: `GU`,
  },
  {
    name: `Guatemala`,
    code: `GT`,
  },
  {
    name: `Guernsey`,
    code: `GG`,
  },
  {
    name: `Guinea`,
    code: `GN`,
  },
  {
    name: `Guinea-Bissau`,
    code: `GW`,
  },
  {
    name: `Guyana`,
    code: `GY`,
  },
  {
    name: `Haiti`,
    code: `HT`,
  },
  {
    name: `Hawaiian Islands`,
    code: `US`,
  },
  {
    name: `Heard Island and McDonald Islands`,
    code: `HM`,
  },
  {
    name: `Holy See`,
    code: `VA`,
  },
  {
    name: `Honduras`,
    code: `HN`,
  },
  {
    name: `Hong Kong`,
    code: `HK`,
  },
  {
    name: `Hungary`,
    code: `HU`,
  },
  {
    name: `Iceland`,
    code: `IS`,
  },
  {
    name: `India`,
    code: `IN`,
  },
  {
    name: `Indonesia`,
    code: `ID`,
  },
  {
    name: `Iran`,
    code: `IR`,
  },
  {
    name: `Iraq`,
    code: `IQ`,
  },
  {
    name: `Ireland`,
    code: `IE`,
  },
  {
    name: `Isle of Man`,
    code: `IM`,
  },
  {
    name: `Israel`,
    code: `IL`,
  },
  {
    name: `Italy`,
    code: `IT`,
  },
  {
    name: `Ivory Coast`,
    code: `CI`,
  },
  {
    name: `Jamaica`,
    code: `JM`,
  },
  {
    name: `Jan Mayen`,
    code: `SJ`,
  },
  {
    name: `Japan`,
    code: `JP`,
  },
  {
    name: `Jersey`,
    code: `JE`,
  },
  {
    name: `Jordan`,
    code: `JO`,
  },
  {
    name: `Kazakhstan`,
    code: `KZ`,
  },
  {
    name: `Kenya`,
    code: `KE`,
  },
  {
    name: `Kiribati`,
    code: `KI`,
  },
  {
    name: `Kuwait`,
    code: `KW`,
  },
  {
    name: `Kyrgyzstan`,
    code: `KG`,
  },
  {
    name: `Lao People's Democratic Republic`,
    code: `LA`,
  },
  {
    name: `Latvia`,
    code: `LV`,
  },
  {
    name: `Lebanon`,
    code: `LB`,
  },
  {
    name: `Lesotho`,
    code: `LS`,
  },
  {
    name: `Liberia`,
    code: `LR`,
  },
  {
    name: `Libya`,
    code: `LY`,
  },
  {
    name: `Liechtenstein`,
    code: `LI`,
  },
  {
    name: `Lithuania`,
    code: `LT`,
  },
  {
    name: `Luxembourg`,
    code: `LU`,
  },
  {
    name: `Macao`,
    code: `MO`,
  },
  {
    name: `North Macedonia`,
    code: `MK`,
  },
  {
    name: `Madagascar`,
    code: `MG`,
  },
  {
    name: `Malawi`,
    code: `MW`,
  },
  {
    name: `Malaysia`,
    code: `MY`,
  },
  {
    name: `Maldives`,
    code: `MV`,
  },
  {
    name: `Mali`,
    code: `ML`,
  },
  {
    name: `Malta`,
    code: `MT`,
  },
  {
    name: `Marshall Islands`,
    code: `MH`,
  },
  {
    name: `Martinique`,
    code: `MQ`,
  },
  {
    name: `Mauritania`,
    code: `MR`,
  },
  {
    name: `Mauritius`,
    code: `MU`,
  },
  {
    name: `Mayotte`,
    code: `YT`,
  },
  {
    name: `Mexico`,
    code: `MX`,
  },
  {
    name: `Micronesia`,
    code: `FM`,
  },
  {
    name: `Moldova`,
    code: `MD`,
  },
  {
    name: `Monaco`,
    code: `MC`,
  },
  {
    name: `Mongolia`,
    code: `MN`,
  },
  {
    name: `Montenegro`,
    code: `ME`,
  },
  {
    name: `Montserrat`,
    code: `MS`,
  },
  {
    name: `Morocco`,
    code: `MA`,
  },
  {
    name: `Mozambique`,
    code: `MZ`,
  },
  {
    name: `Myanmar`,
    code: `MM`,
  },
  {
    name: `Namibia`,
    code: `NA`,
  },
  {
    name: `Nauru`,
    code: `NR`,
  },
  {
    name: `Nepal`,
    code: `NP`,
  },
  {
    name: `Netherlands`,
    code: `NL`,
  },
  {
    name: `New Caledonia`,
    code: `NC`,
  },
  {
    name: `New Zealand`,
    code: `NZ`,
  },
  {
    name: `Nicaragua`,
    code: `NI`,
  },
  {
    name: `Niger`,
    code: `NE`,
  },
  {
    name: `Nigeria`,
    code: `NG`,
  },
  {
    name: `Niue`,
    code: `NU`,
  },
  {
    name: `Norfolk Island`,
    code: `NF`,
  },
  {
    name: `North Korea`,
    code: `KP`,
  },
  {
    name: `Northern Ireland`,
    code: `GB`,
  },
  {
    name: `Northern Mariana Islands`,
    code: `MP`,
  },
  {
    name: `Norway`,
    code: `NO`,
  },
  {
    name: `Oman`,
    code: `OM`,
  },
  {
    name: `Pakistan`,
    code: `PK`,
  },
  {
    name: `Palau`,
    code: `PW`,
  },
  {
    name: `Palestine`,
    code: `PS`,
  },
  {
    name: `Panama`,
    code: `PA`,
  },
  {
    name: `Papua New Guinea`,
    code: `PG`,
  },
  {
    name: `Paraguay`,
    code: `PY`,
  },
  {
    name: `Peru`,
    code: `PE`,
  },
  {
    name: `Philippines`,
    code: `PH`,
  },
  {
    name: `Pitcairn`,
    code: `PN`,
  },
  {
    name: `Poland`,
    code: `PL`,
  },
  {
    name: `Portugal`,
    code: `PT`,
  },
  {
    name: `Puerto Rico`,
    code: `PR`,
  },
  {
    name: `Qatar`,
    code: `QA`,
  },
  {
    name: `Reunion`,
    code: `RE`,
  },
  {
    name: `Romania`,
    code: `RO`,
  },
  {
    name: `Russian Federation`,
    code: `RU`,
  },
  {
    name: `Rwanda`,
    code: `RW`,
  },
  {
    name: `Saba`,
    code: `BQ`,
  },
  {
    name: `Sahrawi Arab Democratic Republic`,
    code: `EH`,
  },
  {
    name: `Saint Barthelemy`,
    code: `BL`,
  },
  {
    name: `Saint Helena, Ascension Island, and Tristan da Cunha`,
    code: `SH`,
  },
  {
    name: `Saint Kitts and Nevis`,
    code: `KN`,
  },
  {
    name: `Saint Lucia`,
    code: `LC`,
  },
  {
    name: `Saint Martin (French)`,
    code: `MF`,
  },
  {
    name: `Saint Pierre and Miquelon`,
    code: `PM`,
  },
  {
    name: `Saint Vincent and the Grenadines`,
    code: `VC`,
  },
  {
    name: `Samoa`,
    code: `WS`,
  },
  {
    name: `San Marino`,
    code: `SM`,
  },
  {
    name: `Sao Tome and Principe`,
    code: `ST`,
  },
  {
    name: `Saudi Arabia`,
    code: `SA`,
  },
  {
    name: `Scotland`,
    code: `GB`,
  },
  {
    name: `Senegal`,
    code: `SN`,
  },
  {
    name: `Serbia`,
    code: `RS`,
  },
  {
    name: `Seychelles`,
    code: `SC`,
  },
  {
    name: `Sierra Leone`,
    code: `SL`,
  },
  {
    name: `Singapore`,
    code: `SG`,
  },
  {
    name: `Sint Eustatius`,
    code: `BQ`,
  },
  {
    name: `Sint Maarten (Dutch)`,
    code: `SX`,
  },
  {
    name: `Slovakia`,
    code: `SK`,
  },
  {
    name: `Slovenia`,
    code: `SI`,
  },
  {
    name: `Solomon Islands`,
    code: `SB`,
  },
  {
    name: `Somalia`,
    code: `SO`,
  },
  {
    name: `South Africa`,
    code: `ZA`,
  },
  {
    name: `South Georgia and the South Sandwich Islands`,
    code: `GS`,
  },
  {
    name: `South Korea`,
    code: `KR`,
  },
  {
    name: `South Sudan`,
    code: `SS`,
  },
  {
    name: `Spain`,
    code: `ES`,
  },
  {
    name: `Sri Lanka`,
    code: `LK`,
  },
  {
    name: `Sudan`,
    code: `SD`,
  },
  {
    name: `Suriname`,
    code: `SR`,
  },
  {
    name: `Svalbard and Jan Mayen`,
    code: `SJ`,
  },
  {
    name: `Sweden`,
    code: `SE`,
  },
  {
    name: `Switzerland`,
    code: `CH`,
  },
  {
    name: `Syrian Arab Republic`,
    code: `SY`,
  },
  {
    name: `Taiwan`,
    code: `TW`,
  },
  {
    name: `Tajikistan`,
    code: `TJ`,
  },
  {
    name: `Tanzania`,
    code: `TZ`,
  },
  {
    name: `Thailand`,
    code: `TH`,
  },
  {
    name: `Timor-Leste`,
    code: `TL`,
  },
  {
    name: `Togo`,
    code: `TG`,
  },
  {
    name: `Tokelau`,
    code: `TK`,
  },
  {
    name: `Tonga`,
    code: `TO`,
  },
  {
    name: `Trinidad and Tobago`,
    code: `TT`,
  },
  {
    name: `Tunisia`,
    code: `TN`,
  },
  {
    name: `Turkey`,
    code: `TR`,
  },
  {
    name: `Turkmenistan`,
    code: `TM`,
  },
  {
    name: `Turks and Caicos Islands`,
    code: `TC`,
  },
  {
    name: `Tuvalu`,
    code: `TV`,
  },
  {
    name: `Uganda`,
    code: `UG`,
  },
  {
    name: `Ukraine`,
    code: `UA`,
  },
  {
    name: `United Arab Emirates`,
    code: `AE`,
  },
  {
    name: `United Kingdom`,
    code: `GB`,
  },
  {
    name: `United States`,
    code: `US`,
  },
  {
    name: `United States Virgin Islands`,
    code: `US`,
  },
  {
    name: `Uruguay`,
    code: `UY`,
  },
  {
    name: `Uzbekistan`,
    code: `UZ`,
  },
  {
    name: `Vanuatu`,
    code: `VU`,
  },
  {
    name: `Vatican City`,
    code: `VA`,
  },
  {
    name: `Venezuela`,
    code: `VE`,
  },
  {
    name: `Vietnam`,
    code: `VN`,
  },
  {
    name: `Virgin Islands (British)`,
    code: `VG`,
  },
  {
    name: `Virgin Islands (U.S.)`,
    code: `VI`,
  },
  {
    name: `Wales`,
    code: `GB`,
  },
  {
    name: `Wallis and Futuna`,
    code: `WF`,
  },
  {
    name: `Western Sahara`,
    code: `EH`,
  },
  {
    name: `Yemen`,
    code: `YE`,
  },
  {
    name: `Zambia`,
    code: `ZM`,
  },
  {
    name: `Zimbabwe`,
    code: `ZW`,
  },
];
