const { checkAddressCity } = require(`./lib/address_city`);
const { checkAddressCountry, countries } = require(`./lib/address_country`);
const { checkAddressState, states } = require(`./lib/address_state`);
const { checkAddressLine1, checkAddressLine2 } = require(`./lib/address_street`);
const { checkAddressZip } = require(`./lib/address_zip`);
const { checkBool } = require(`./lib/bool`);
const { checkCardCode } = require(`./lib/card_code`);
const { checkCardExpirationMonth, checkCardExpirationYear } = require(`./lib/card_expiration`);
const { checkCardNumber } = require(`./lib/card_number`);
const { checkCheckbox } = require(`./lib/checkbox`);
const { checkColumnName } = require(`./lib/column_name`);
const { checkDate } = require(`./lib/date`);
const { checkEmailAddress } = require(`./lib/email_address`);
const { checkFormCheckbox } = require(`./lib/form_checkbox`);
const { checkFormColor } = require(`./lib/form_color`);
const { checkFormDate } = require(`./lib/form_date`);
const { checkFormEmail } = require(`./lib/form_email`);
const { checkFormNumber } = require(`./lib/form_number`);
const { checkFormPassword } = require(`./lib/form_password`);
const { checkFormSelect } = require(`./lib/form_select`);
const { checkFormText } = require(`./lib/form_text`);
const { checkFormTextArea } = require(`./lib/form_text_area`);
const { checkGender } = require(`./lib/gender`);
const { checkHash } = require(`./lib/hash`);
const { checkKey } = require(`./lib/key`);
const { checkName } = require(`./lib/name`);
const { checkNumber } = require(`./lib/number`);
const { checkPassword } = require(`./lib/password`);
const { checkString } = require(`./lib/string`);
const { checkUUID } = require(`./lib/uuid`);
const { checkMongodbID } = require(`./lib/mongodb_id`);
const { checkWebAddress } = require(`./lib/web_address`);

// grab the sublib functions to be exposed later
const {
  checkEmpty,
  checkLong,
  checkShort,
  checkRegex,
  toBoolean,
  hexToLatin,
  latinToHex,
} = require(`./lib/sublib/misc`);

/******************************************************************************/

// a more universal function, alternative to calling each individual check function
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
    case `web address`:
    case `webaddress`:
      result = checkWebAddress(arg1, arg2);
      break;
    default:
      throw new Error(`Validation failed to find a suitable case.`);
  }

  return result;
};

/******************************************************************************/

module.exports = {
  checkAddressCity,
  checkAddressCountry,
  countries,
  checkAddressState,
  states,
  checkAddressLine1,
  checkAddressLine2,
  checkAddressZip,
  checkBool,
  checkCardCode,
  checkCardExpirationMonth,
  checkCardExpirationYear,
  checkCardNumber,
  checkCheckbox,
  checkColumnName,
  checkDate,
  checkEmailAddress,
  checkFormCheckbox,
  checkFormColor,
  checkFormDate,
  checkFormEmail,
  checkFormNumber,
  checkFormPassword,
  checkFormSelect,
  checkFormText,
  checkFormTextArea,
  checkGender,
  checkHash,
  checkKey,
  checkName,
  checkNumber,
  checkPassword,
  checkString,
  checkUUID,
  checkMongodbID,
  checkWebAddress,
  checkEmpty,
  checkLong,
  checkShort,
  checkRegex,
  toBoolean,
  hexToLatin,
  latinToHex,
};
