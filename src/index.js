const { checkAddressCity } = require(`./lib/address_city`);
module.exports.checkAddressCity = checkAddressCity;
const { checkAddressCountry, countries } = require(`./lib/address_country`);
module.exports.checkAddressCountry = checkAddressCountry;
module.exports.countries = countries;
const { checkAddressState, states } = require(`./lib/address_state`);
module.exports.checkAddressState = checkAddressState;
module.exports.states = states;
const { checkAddressLine1, checkAddressLine2 } = require(`./lib/address_street`);
module.exports.checkAddressLine1 = checkAddressLine1;
module.exports.checkAddressLine2 = checkAddressLine2;
const { checkAddressZip } = require(`./lib/address_zip`);
module.exports.checkAddressZip = checkAddressZip;
const { checkBool } = require(`./lib/bool`);
module.exports.checkBool = checkBool;
const { checkCardCode } = require(`./lib/card_code`);
module.exports.checkCardCode = checkCardCode;
const { checkCardExpirationMonth, checkCardExpirationYear } = require(`./lib/card_expiration`);
module.exports.checkCardExpirationMonth = checkCardExpirationMonth;
module.exports.checkCardExpirationYear = checkCardExpirationYear;
const { checkCardNumber } = require(`./lib/card_number`);
module.exports.checkCardNumber = checkCardNumber;
const { checkCheckbox } = require(`./lib/checkbox`);
module.exports.checkCheckbox = checkCheckbox;
const { checkColumnName } = require(`./lib/column_name`);
module.exports.checkColumnName = checkColumnName;
const { checkDate } = require(`./lib/date`);
module.exports.checkDate = checkDate;
const { checkEmailAddress } = require(`./lib/email_address`);
module.exports.checkEmailAddress = checkEmailAddress;
const { checkFormCheckbox } = require(`./lib/form_checkbox`);
module.exports.checkFormCheckbox = checkFormCheckbox;
const { checkFormColor } = require(`./lib/form_color`);
module.exports.checkFormColor = checkFormColor;
const { checkFormDate } = require(`./lib/form_date`);
module.exports.checkFormDate = checkFormDate;
const { checkFormEmail } = require(`./lib/form_email`);
module.exports.checkFormEmail = checkFormEmail;
const { checkFormNumber } = require(`./lib/form_number`);
module.exports.checkFormNumber = checkFormNumber;
const { checkFormPassword } = require(`./lib/form_password`);
module.exports.checkFormPassword = checkFormPassword;
const { checkFormSelect } = require(`./lib/form_select`);
module.exports.checkFormSelect = checkFormSelect;
const { checkFormText } = require(`./lib/form_text`);
module.exports.checkFormText = checkFormText;
const { checkFormTextArea } = require(`./lib/form_text_area`);
module.exports.checkFormTextArea = checkFormTextArea;
const { checkGender } = require(`./lib/gender`);
module.exports.checkGender = checkGender;
const { checkHash } = require(`./lib/hash`);
module.exports.checkHash = checkHash;
const { checkKey } = require(`./lib/key`);
module.exports.checkKey = checkKey;
const { checkName } = require(`./lib/name`);
module.exports.checkName = checkName;
const { checkNumber } = require(`./lib/number`);
module.exports.checkNumber = checkNumber;
const { checkPassword } = require(`./lib/password`);
module.exports.checkPassword = checkPassword;
const { checkString } = require(`./lib/string`);
module.exports.checkString = checkString;
const { checkUUID } = require(`./lib/uuid`);
module.exports.checkUUID = checkUUID;
const { checkMongodbID } = require(`./lib/mongodb_id`);
module.exports.checkMongodbID = checkMongodbID;
const { checkWebAddress } = require(`./lib/web_address`);
module.exports.checkWebAddress = checkWebAddress;

// expose the sublib functions
const {
  checkEmpty,
  checkLong,
  checkShort,
  checkRegex,
  toBoolean,
  hexToLatin,
  latinToHex,
} = require(`./lib/sublib/misc`);
module.exports.checkEmpty = checkEmpty;
module.exports.checkLong = checkLong;
module.exports.checkShort = checkShort;
module.exports.checkRegex = checkRegex;
module.exports.toBoolean = toBoolean;
module.exports.hexToLatin = hexToLatin;
module.exports.latinToHex = latinToHex;

/******************************************************************************/

module.exports.check = (mode, arg1, arg2, arg3) => {
  let result;

  mode = mode.toString();
  mode = mode.trim();
  mode = mode.toLowerCase();
  switch (mode) {
    case `address city`:
    case `addresscity`:
      result = checkAddressCity(arg1, arg2);
      break;
    case `address country`:
    case `addresscountry`:
      result = checkAddressCountry(arg1, arg2);
      break;
    case `address state`:
    case `addressstate`:
      result = checkAddressState(arg1, arg2);
      break;
    case `address line 1`:
    case `addressline1`:
    case `address1`:
    case `address 1`:
      result = checkAddressLine1(arg1, arg2);
      break;
    case `address line 2`:
    case `addressline2`:
    case `address 2`:
    case `address2`:
      result = checkAddressLine2(arg1, arg2);
      break;
    case `address zip code`:
    case `addresszipcode`:
    case `address zip`:
    case `addresszip`:
      result = checkAddressZip(arg1, arg2);
      break;
    case `bool`:
    case `boolean`:
      result = checkBool(arg1, arg2);
      break;
    case `card code`:
    case `cardcode`:
      result = checkCardCode(arg1, arg2);
      break;
    case `card expiration month`:
    case `cardexpirationmonth`:
      result = checkCardExpirationMonth(arg1, arg2);
      break;
    case `card expiration year`:
    case `cardexpirationyear`:
      result = checkCardExpirationYear(arg1, arg2);
      break;
    case `card number`:
    case `cardnumber`:
      result = checkCardNumber(arg1, arg2);
      break;
    case `checkbox`:
      result = checkCheckbox(arg1, arg2);
      break;
    case `column name`:
    case `columnname`:
      result = checkColumnName(arg1, arg2);
      break;
    case `date`:
      result = checkDate(arg1, arg2);
      break;
    case `email address`:
    case `emailaddress`:
      result = checkEmailAddress(arg1, arg2);
      break;
    case `formcheckbox`:
    case `form checkbox`:
      result = checkFormCheckbox(arg1, arg2, arg3);
      break;
    case `formcolor`:
    case `form color`:
      result = checkFormColor(arg1, arg2, arg3);
      break;
    case `formdate`:
    case `form date`:
      result = checkFormDate(arg1, arg2, arg3);
      break;
    case `formemail`:
    case `form email`:
      result = checkFormEmail(arg1, arg2, arg3);
      break;
    case `formnumber`:
    case `form number`:
      result = checkFormNumber(arg1, arg2, arg3);
      break;
    case `formpassword`:
    case `form password`:
      result = checkFormPassword(arg1, arg2, arg3);
      break;
    case `formselect`:
    case `form select`:
      result = checkFormSelect(arg1, arg2, arg3);
      break;
    case `formtextarea`:
    case `form textarea`:
    case `form text area`:
      result = checkFormTextArea(arg1, arg2, arg3);
      break;
    case `formtext`:
    case `form text`:
      result = checkFormText(arg1, arg2, arg3);
      break;
    case `game csv id`:
    case `gamecsvid`:
    case `game id`:
    case `gameid`:
      result = checkNumber(arg1, {
        mustBeInt: true,
        type: `game ID`,
      });
      break;
    case `game rating`:
    case `gamerating`:
      result = checkNumber(arg1, {
        type: `game rating`,
      });
      break;
    case `gender`:
      result = checkGender(arg1, arg2);
      break;
    case `hash`:
      result = checkHash(arg1, arg2);
      break;
    case `key`:
      result = checkKey(arg1, arg2);
      break;
    case `name`:
      result = checkName(arg1, arg2);
      break;
    case `first name`:
    case `name first`:
    case `firstname`:
      result = checkName(arg1, {
        type: `first name`,
      });
      break;
    case `middle name`:
    case `name middle`:
    case `middlename`:
      result = checkName(arg1, {
        type: `middle name`,
      });
      break;
    case `last name`:
    case `name last`:
    case `lastname`:
      result = checkName(arg1, {
        type: `last name`,
      });
      break;
    case `surname`:
      result = checkName(arg1, {
        type: `surname`,
      });
      break;
    case `number`:
      result = checkNumber(arg1, arg2);
      break;
    case `password`:
      result = checkPassword(arg1, arg2);
      break;
    case `string`:
      result = checkString(arg1, arg2);
      break;
    case `uuid`:
      result = checkUUID(arg1, arg2);
      break;
    case `mongo id`:
    case `mongodb id`:
    case `mongoid`:
    case `mongodbid`:
      result = checkMongodbID(arg1, arg2);
      break;
    default:
      throw new Error(`Validation failed to find a suitable case.`);
  }

  return result;
};
