const {
  checkAddressCity,
  checkAddressCountry,
  checkAddressState,
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
  checkEmailConfirm,
  checkFormCheckbox,
  checkFormColor,
  checkFormDate,
  checkFormEmail,
  checkFormNumber,
  checkFormPassword,
  checkFormSelect,
  checkFormTextArea,
  checkFormText,
  checkGender,
  checkHash,
  checkKey,
  checkMongodbID,
  checkName,
  checkNumber,
  checkPassword,
  checkPasswordConfirm,
  checkString,
  checkUUID,
  checkWebAddress,
  hexToLatin,
  latinToHex,
} = require(`./index`);
const { checkEmailAddressConfirm } = require(`./lib/email_address`);

console.log(`running tests...\r\n`);

function testAddressCity() {
  console.log(
    `/******************************************************************************/\r\n`,
  );

  console.log(`tests for checkAddressCity()...\r\n`);

  const a = `    Poopville   `;
  const checkedA = checkAddressCity(a, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `    Poopville   `;
  const checkedB = checkAddressCity(b, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `    Poopville                                                                                                                                               `;
  const checkedC = checkAddressCity(c, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `    Poopville                                                                                                                                               `;
  const checkedD = checkAddressCity(d, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  const e = ``;
  const checkedE = checkAddressCity(e, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedE | value : ${JSON.stringify(checkedE)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testAddressCity();

/******************************************************************************/

function testAddressCountry() {
  console.log(`tests for checkAddressCountry()...\r\n`);

  const a = `US`;
  const checkedA = checkAddressCountry(a, {
    isRequired: true,
    trim: true,
    toUpperCase: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `us`;
  const checkedB = checkAddressCountry(b, {
    isRequired: true,
    trim: true,
    toUpperCase: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `us`;
  const checkedC = checkAddressCountry(c, {
    isRequired: true,
    trim: true,
    toUpperCase: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `US   `;
  const checkedD = checkAddressCountry(d, {
    isRequired: true,
    trim: false,
    toUpperCase: true,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testAddressCountry();

/******************************************************************************/

function testAddressState() {
  console.log(`tests for checkAddressState()...\r\n`);

  const a = `TX`;
  const checkedA = checkAddressState(a, {
    isRequired: true,
    trim: true,
    toUpperCase: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `TX       `;
  const checkedB = checkAddressState(b, {
    isRequired: true,
    trim: true,
    toUpperCase: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `tx       `;
  const checkedC = checkAddressState(c, {
    isRequired: true,
    trim: false,
    toUpperCase: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `tx       `;
  const checkedD = checkAddressState(d, {
    isRequired: true,
    trim: false,
    toUpperCase: true,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testAddressState();

/******************************************************************************/

function testAddressLine1() {
  console.log(`tests for checkAddressLine1()...\r\n`);

  const a = `123 Poop St.`;
  const checkedA = checkAddressLine1(a, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `     123 Poop St.    `;
  const checkedB = checkAddressLine1(b, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `     123 Poop St.    `;
  const checkedC = checkAddressLine1(c, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testAddressLine1();

/******************************************************************************/

function testAddressLine2() {
  console.log(`tests for checkAddressLine2()...\r\n`);

  const a = `Apt. P00`;
  const checkedA = checkAddressLine2(a, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `     Apt. P00          `;
  const checkedB = checkAddressLine2(b, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `     Apt. P00    `;
  const checkedC = checkAddressLine2(c, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testAddressLine2();

/******************************************************************************/

function testAddressZip() {
  console.log(`tests for checkAddressZip()...\r\n`);

  const a = `12345`;
  const checkedA = checkAddressZip(a, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `     12345     `;
  const checkedB = checkAddressZip(b, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `     12345     `;
  const checkedC = checkAddressZip(c, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `123456`;
  const checkedD = checkAddressZip(d, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  const e = `P00PS`;
  const checkedE = checkAddressZip(e, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedE | value : ${JSON.stringify(checkedE)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testAddressZip();

/******************************************************************************/

function testBool() {
  const a = `true`;
  console.log(`a        | value : '${a.toString()}' | type : ${typeof a}`);
  const checkedA = checkBool(a);
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = 1;
  console.log(`b        | value : '${b.toString()}' | type : ${typeof b}`);
  const checkedB = checkBool(b);
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = false;
  console.log(`c        | value : '${c.toString()}' | type : ${typeof c}`);
  const checkedC = checkBool(c);
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `hello`;
  console.log(`d        | value : '${d.toString()}' | type : ${typeof d}`);
  const checkedD = checkBool(d);
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testBool();

/******************************************************************************/

function testCardCode() {
  console.log(`tests for checkCardCode()...\r\n`);

  const a = `123`;
  const checkedA = checkCardCode(a, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `    123     `;
  const checkedB = checkCardCode(b, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `    123     `;
  const checkedC = checkCardCode(c, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `12345`;
  const checkedD = checkCardCode(d, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testCardCode();

/******************************************************************************/

function testCardExpirationMonth() {
  console.log(`tests for checkCardExpirationMonth()...\r\n`);

  const a = `11`;
  const checkedA = checkCardExpirationMonth(a, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `    11     `;
  const checkedB = checkCardExpirationMonth(b, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `    11     `;
  const checkedC = checkCardExpirationMonth(c, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `    43     `;
  const checkedD = checkCardExpirationMonth(d, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  const e = `1`;
  const checkedE = checkCardExpirationMonth(e, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedE | value : ${JSON.stringify(checkedE)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testCardExpirationMonth();

/******************************************************************************/

function testCardExpirationYear() {
  console.log(`tests for checkCardExpirationYear()...\r\n`);

  const a = `2025`;
  const checkedA = checkCardExpirationYear(a, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `    2025     `;
  const checkedB = checkCardExpirationYear(b, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `    2025     `;
  const checkedC = checkCardExpirationYear(c, {
    isRequired: true,
    trim: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `    25     `;
  const checkedD = checkCardExpirationYear(d, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  const e = `25`;
  const checkedE = checkCardExpirationYear(e, {
    isRequired: true,
    trim: true,
  });
  console.log(`checkedE | value : ${JSON.stringify(checkedE)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testCardExpirationYear();

/******************************************************************************/

function testCardNumber() {
  console.log(`tests for checkCardNumber()...\r\n`);

  const a = `4000-1234-1234-1234`;
  const checkedA = checkCardNumber(a, {
    isRequired: true,
    trim: true,
    clean: true, // remove hyphens from the string
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `4000-1234-1234-1234`;
  const checkedB = checkCardNumber(b, {
    isRequired: true,
    trim: true,
    clean: false,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `   4000-1234-1234-12345    `;
  const checkedC = checkCardNumber(c, {
    isRequired: true,
    trim: true,
    clean: true,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testCardNumber();

/******************************************************************************/

function testCheckbox() {
  console.log(`tests for checkCheckbox()...\r\n`);

  const a = true;
  const checkedA = checkCheckbox(a, {
    isRequired: true,
    mustBe: true,
    type: `I agree to the terms of service.`,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = false;
  const checkedB = checkCheckbox(b, {
    isRequired: true,
    mustBe: true,
    type: `I agree to the terms of service.`,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testCheckbox();

/******************************************************************************/

function testColumnName() {
  console.log(`tests for checkColumnName()...\r\n`);

  const a = `accountsID`;
  const checkedA = checkColumnName(a, {
    isRequired: true,
    trim: true,
    clean: true, // replaces whitespace characters with underscores
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `accounts \rID`;
  const checkedB = checkColumnName(b, {
    isRequired: true,
    trim: true,
    clean: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `   accounts ID     `;
  const checkedC = checkColumnName(c, {
    isRequired: true,
    trim: true,
    clean: false,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `                                    accounts_ID                               `;
  const checkedD = checkColumnName(d, {
    isRequired: true,
    trim: false,
    clean: false,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testColumnName();

/******************************************************************************/

function testDate() {
  console.log(`tests for checkDate()...\r\n`);

  const a = `1971/06/21`;
  const checkedA = checkDate(a, {
    isRequired: true,
    trim: true,
    type: `date`,
    mustBe13: false, // assumes you're checking a date of birth and makes sure it's at least 13 years ago
    mustBe18: false, // assumes you're checking a date of birth and makes sure it's at least 18 years ago
    sourceFormat: `yyyy/mm/dd`,
    targetFormat: `mm/dd/yyyy`,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `10/30/1980`;
  const checkedB = checkDate(b, {
    isRequired: true,
    trim: true,
    type: `date`,
    mustBe13: false,
    mustBe18: false,
    sourceFormat: `mm/dd/yyyy`,
    targetFormat: `yyyy/mm/dd`,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `1975/09/15`;
  const checkedC = checkDate(c, {
    isRequired: true,
    trim: true,
    type: `date`,
    mustBe13: false,
    mustBe18: false,
    sourceFormat: `yyyy/mm/dd`,
    targetFormat: `dd/mm/yyyy`,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  const d = `2010/01/01`;
  const checkedD = checkDate(d, {
    isRequired: true,
    trim: true,
    type: `date`,
    mustBe13: true,
    mustBe18: true,
    sourceFormat: `yyyy/mm/dd`,
    targetFormat: `yyyy/mm/dd`,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testDate();

/******************************************************************************/

function testEmailAddress() {
  console.log(`tests for checkEmailAddress()...\r\n`);

  const a = `MRPOOPFACE@EMAIL.COM`;
  const checkedA = checkEmailAddress(a, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `youeatpoo`;
  const checkedB = checkEmailAddress(b, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `   mrpoopface@email.com    `;
  const checkedC = checkEmailAddress(c, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testEmailAddress();

/******************************************************************************/

// test error-checking that checks to make sure an e-mail address and its confirmation field are identical and valid
function testEmailAddressConfirm() {
  console.log(`tests for checkEmailAddress()...\r\n`);

  const a = `mrpoopface@email.com`;
  const a2 = `mrpoopface@email.com`;
  const checkedA = checkEmailConfirm(a, a2, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `mrpoopface@email.com`;
  const b2 = `mrfartface@email.com`;
  const checkedB = checkEmailConfirm(b, b2, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `  mrpoopface@email.com  `;
  const c2 = `   mrpoopface@email.com        `;
  const checkedC = checkEmailConfirm(c, c2, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testEmailAddressConfirm();

/******************************************************************************/

function testGender() {
  console.log(`tests for checkGender()...\r\n`);

  const a = `male`;
  const checkedA = checkGender(a, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `bigboi`;
  const checkedB = checkGender(b, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  const c = `none`;
  const checkedC = checkGender(c, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testGender();

/******************************************************************************/

// test error-checking for hexadecimal hash strings, such as SHA-512 encryption hashes
function testHash() {
  console.log(`tests for checkHash()...\r\n`);

  const a = `0321043a292854a6f70faff746fbb5a1c6af35b98271b04abe83b6cc7046000f045c22ae5a8f06c709aaf1a2a00a468520049c1d4dd6cc22473fc0529dbeb985`;
  const checkedA = checkHash(a, {
    isRequired: true,
    trim: true,
    size: 128,
    type: `cryptographic`,
    toLowerCase: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * invalid due to this being 130 characters with a specified size option of 128 characters
  const b = `d953215f7c5e7c61413c766904c8a22a93fb95b1cfe422537edd2fc0b44037acac0002ea52366c18b705e678d80d89ee9b170f20b4bedd51f2a6d45afd94dd290b`;
  const checkedB = checkHash(b, {
    isRequired: true,
    trim: true,
    size: 128,
    type: `cryptographic`,
    toLowerCase: true,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  // * 64 characters
  const c = `ac0002ea52366c18b705e678d80d89ee9b170f20b4bedd51f2a6d45afd94dd29`;
  const checkedC = checkHash(c, {
    isRequired: true,
    trim: true,
    size: 64,
    type: `cryptographic`,
    toLowerCase: true,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  // * has a random 'h' thrown in, which is not a valid hexadecimal character
  const d = `0321043a292854a6f70faff746fhb5a1c6af35b98271b04abe83b6cc7046000f045c22ae5a8f06c709aaf1a2a00a468520049c1d4dd6cc22473fc0529dbeb985`;
  const checkedD = checkHash(d, {
    isRequired: true,
    trim: true,
    size: 128,
    type: `cryptographic`,
    toLowerCase: true,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  const e = `a1108fdd3f7ea1`;
  const eConversion = hexToLatin(e);
  const checkedE = checkHash(eConversion, {
    isRequired: true,
    trim: false,
    size: 7,
    type: `character`,
    toLowerCase: false,
  });
  console.log(`checkedE | value ${JSON.stringify(checkedE)}\r\n`);
  console.log(checkedE.value);
  console.log(checkedE.value.length);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testHash();

/******************************************************************************/

// test error-checking for alphanumeric key character strings
function testKey() {
  console.log(`tests for checkKey()...\r\n`);

  const a = `abcde12345`;
  const checkedA = checkKey(a, {
    isRequired: true,
    trim: true,
    size: 10,
    isCaseSensitive: false,
    type: `confirmation`,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * has 11 characters instead of the required size of 10
  const b = `abcde123456`;
  const checkedB = checkKey(b, {
    isRequired: true,
    trim: true,
    size: 10,
    isCaseSensitive: false,
    type: `confirmation`,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  // * has some random unacceptable characters
  const c = `_s3j+cv.f4`;
  const checkedC = checkKey(c, {
    isRequired: true,
    trim: true,
    size: 10,
    isCaseSensitive: false,
    type: `confirmation`,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  // * all the characters will retain their case, instead of being converted to all lowercase (will probably change how this works in the future)
  const d = `FArtFaRTfaRt`;
  const checkedD = checkKey(d, {
    isRequired: true,
    trim: true,
    size: 12,
    isCaseSensitive: true,
    type: `confirmation`,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testKey();

/******************************************************************************/

function testMongodbID() {
  console.log(`tests for checkMongodbID()...\r\n`);

  const a = `1e2a90d33b485c3129b9832e`;
  const checkedA = checkMongodbID(a, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
    type: `mongodb object ID`,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * has 11 characters instead of the required size of 10
  const b = `     1e2a90d33b485c3129b9832e      `;
  const checkedB = checkMongodbID(b, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
    type: `mongodb object ID`,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  // * has some random unacceptable characters
  const c = `     1e2a90d33b485c3129b9832e     `;
  const checkedC = checkMongodbID(c, {
    isRequired: true,
    trim: false,
    toLowerCase: true,
    type: `mongodb object ID`,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  // * mixture of uppercase and lowercase letters - toLowerCase option is true, so they'll all be converted to lowercase
  const d = `1E2a90D33b485C3129b9832E`;
  const checkedD = checkMongodbID(d, {
    isRequired: true,
    trim: true,
    toLowerCase: true,
    type: `mongodb object ID`,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testMongodbID();

/******************************************************************************/

function testName() {
  console.log(`tests for checkName()...\r\n`);

  const a = `        Bobediah        `;
  const checkedA = checkName(a, {
    isRequired: true,
    trim: true,
    type: `name`,
    min: 1,
    max: 50,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * is effectively empty and isRequired is true, so error
  const b = ``;
  const checkedB = checkName(b, {
    isRequired: true,
    trim: true,
    type: `**dumb** name`,
    min: 1,
    max: 50,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);
  console.log(`checkedB error length : ${checkedB.errors.length}`);

  // * is effectively empty, but the isRequired option is false, so it's okay
  const c = `     `;
  const checkedC = checkName(c, {
    isRequired: false,
    trim: true,
    type: `name`,
    min: 1,
    max: 50,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  // * too long, as the options specify a max of 50 characters and this is 51
  const d = `123456789012345678901234567890123456789012345678901`;
  const checkedD = checkName(d, {
    isRequired: true,
    trim: true,
    type: `name`,
    min: 1,
    max: 50,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testName();

/******************************************************************************/

function testNumber() {
  console.log(`tests for checkNumber()...\r\n`);

  const a = 3.14;
  const checkedA = checkNumber(a, {
    isRequired: true,
    min: 0.0,
    max: 10.0,
    mustBeInt: false,
    mustBeFloat: false,
    mustBePositive: false,
    mustBeNegative: false,
    mustBeOdd: false,
    mustBeEven: false,
    list: [],
    type: `number`,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * min is 0 but value is -7.4
  const b = -7.4;
  const checkedB = checkNumber(b, {
    isRequired: true,
    min: 0.0,
    max: 10.0,
    mustBeInt: false,
    mustBePositive: false,
    mustBeNegative: false,
    mustBeOdd: false,
    mustBeEven: false,
    list: [],
    type: `number`,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  // * max is 10 but value is 11
  const c = 11;
  const checkedC = checkNumber(c, {
    isRequired: true,
    min: 0.0,
    max: 10.0,
    mustBeInt: false,
    mustBePositive: false,
    mustBeNegative: false,
    mustBeOdd: false,
    mustBeEven: false,
    list: [],
    type: `number`,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  // * requires an integer but value is 1.1
  const d = 1.1;
  const checkedD = checkNumber(d, {
    isRequired: true,
    min: undefined,
    max: undefined,
    mustBeInt: true,
    mustBePositive: false,
    mustBeNegative: false,
    mustBeOdd: false,
    mustBeEven: false,
    list: [],
    type: `number`,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  // * requires a positive number but value is -5
  const e = -5;
  const checkedE = checkNumber(e, {
    isRequired: true,
    min: undefined,
    max: undefined,
    mustBeInt: false,
    mustBePositive: true,
    mustBeNegative: false,
    mustBeOdd: false,
    mustBeEven: false,
    list: [],
    type: `number`,
  });
  console.log(`checkedE | value : ${JSON.stringify(checkedE)}\r\n`);

  // * requires a negative number but value is 6
  const f = 6;
  const checkedF = checkNumber(f, {
    isRequired: true,
    min: undefined,
    max: undefined,
    mustBeInt: false,
    mustBePositive: false,
    mustBeNegative: true,
    mustBeOdd: false,
    mustBeEven: false,
    list: [],
    type: `number`,
  });
  console.log(`checkedF | value : ${JSON.stringify(checkedF)}\r\n`);

  // * requires an odd number but value is 6
  const g = 6;
  const checkedG = checkNumber(g, {
    isRequired: true,
    min: undefined,
    max: undefined,
    mustBeInt: false,
    mustBePositive: false,
    mustBeNegative: false,
    mustBeOdd: true,
    mustBeEven: false,
    list: [],
    type: `number`,
  });
  console.log(`checkedG | value : ${JSON.stringify(checkedG)}\r\n`);

  // * requires an even number but value is 7
  const h = 7;
  const checkedH = checkNumber(h, {
    isRequired: true,
    min: undefined,
    max: undefined,
    mustBeInt: false,
    mustBePositive: false,
    mustBeNegative: false,
    mustBeOdd: false,
    mustBeEven: true,
    list: [],
    type: `number`,
  });
  console.log(`checkedG | value : ${JSON.stringify(checkedH)}\r\n`);

  const i = 1;
  const checkedI = checkNumber(i, {
    isRequired: true,
    min: 0,
    max: 999999,
    mustBeInt: true,
    type: `some dumb number`,
  });
  console.log(`checkedI | value : ${JSON.stringify(checkedI)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testNumber();

/******************************************************************************/

function testPassword() {
  console.log(`tests for checkPassword()...\r\n`);

  // * min is 7 but value is 6 characters
  const a = `123456`;
  const checkedA = checkPassword(a, {
    isRequired: true,
    min: 7,
    max: 255,
    regex: undefined,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * currently there are no options for trimming, as it assumes it's all part of the password
  const b = `   fartfartfart    `;
  const checkedB = checkPassword(b, {
    isRequired: true,
    min: 7,
    max: 255,
    regex: undefined,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  // * testing the ol' regex out
  const c = `asdfSDFSsadfer`;
  const checkedC = checkPassword(c, {
    isRequired: true,
    min: 7,
    max: 255,
    regex: /[\s]/g,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testPassword();

/******************************************************************************/

function testPasswordConfirm() {
  console.log(`tests for checkPasswordConfirm()...\r\n`);

  const a = `password123!`;
  const a2 = `password123!`;
  const checkedA = checkPasswordConfirm(a, a2, {
    isRequired: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  const b = `password123!`;
  const b2 = `paswsord1234`;
  const checkedB = checkPasswordConfirm(b, b2, {
    isRequired: true,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedB)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testPasswordConfirm();

/******************************************************************************/

function testString() {
  console.log(`tests for checkString()...\r\n`);

  const a = `this is an example of a string`;
  const checkedA = checkString(a, {
    isRequired: true,
    max: -1, // maximum number of characters for checking lon
    min: -1, // minimum number of characters for checking minshort
    regex: undefined, // a custom regex to check (returns an 'invalid' error if failed)
    list: [], // an array of possible strings to check for
    whitespace: false, // whether or not to remove all whitespace from inside the string
    toLowerCase: false, // whether or not to reformat the string to lowercase
    toUpperCase: false, // whether or not to reformat the string to uppercase
    trim: true, // whether or not to trim the string
    type: `character string`, // an identifier used primarily in error messages
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * testing the minimum character requirement option
  const b = `fart`;
  const checkedB = checkString(b, {
    isRequired: true,
    max: -1,
    min: 5, // we use this to determine the minimum number of characters
    regex: undefined,
    list: [],
    whitespace: false,
    toLowerCase: false,
    toUpperCase: false,
    trim: true,
    type: `character string`,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  // * testing the maximum character count option
  const c = `1234567890`;
  const checkedC = checkString(c, {
    isRequired: true,
    max: 9, // this is taken into consideration now
    min: -1,
    regex: undefined,
    list: [],
    whitespace: false,
    toLowerCase: false,
    toUpperCase: false,
    trim: true,
    type: `character string`,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  // * testing the regular expression
  const d = `the regex is defined such that only non-whitespace \r\ncharacters are allowed, so this should have errors`;
  const checkedD = checkString(d, {
    isRequired: true,
    max: -1,
    min: -1,
    regex: RegExp(/^[\s]/g),
    list: [],
    whitespace: false,
    toLowerCase: false,
    toUpperCase: false,
    trim: true,
    type: `character string`,
  });
  console.log(`checkedD | value : ${JSON.stringify(checkedD)}\r\n`);

  // * testing to make sure the provided string value is in a pre-defined list - spoiler alert: it isn't
  const e = `leprechaun`;
  const checkedE = checkString(e, {
    isRequired: true,
    max: -1,
    min: -1,
    regex: undefined,
    list: [`fart`, `poop`, `pee`, `donkey`], // an array of possible strings to check for
    whitespace: false,
    toLowerCase: false,
    toUpperCase: false,
    trim: true,
    type: `character string`,
  });
  console.log(`checkedE | value : ${JSON.stringify(checkedE)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testString();

/******************************************************************************/

function testUUID() {
  console.log(`tests for checkUUID()...\r\n`);

  // * testing trim option
  const a = `     abcdef12-1cd4-ab34-12ab-abcdef123412     `;
  const checkedA = checkUUID(a, {
    isRequired: true,
    version: 0, // * version is mostly irrelevant (avoid using versions 6 and 7, as those are some nonsense I made for some of my projects)
    trim: true,
    toLowerCase: false,
    type: `account ID`,
  });
  console.log(`checkedA | value : ${JSON.stringify(checkedA)}\r\n`);

  // * testing toLowerCase option
  const b = `ABCDEF12-1CD4-AB34-12AB-ABCDEF123412`;
  const checkedB = checkUUID(b, {
    isRequired: true,
    version: 0,
    trim: true,
    toLowerCase: true,
    type: `account ID`,
  });
  console.log(`checkedB | value : ${JSON.stringify(checkedB)}\r\n`);

  // * general error testing
  const c = `1234567890`;
  const checkedC = checkUUID(c, {
    isRequired: true,
    version: 0,
    trim: true,
    toLowerCase: true,
    type: `account ID`,
  });
  console.log(`checkedC | value : ${JSON.stringify(checkedC)}\r\n`);

  console.log(
    `/******************************************************************************/\r\n`,
  );
}
testUUID();

/******************************************************************************/

function testWebAddress() {
  console.log(`testing checkWebAddress()...\r\n`);

  const a = `192.168.86.254`;
  const checkedA = checkWebAddress(a, {
    isRequired: true,
    trim: true,
    mode: `either`,
    type: `server`,
  });
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  const b = `www.google.com`;
  const checkedB = checkWebAddress(b, {
    isRequired: true,
    trim: true,
    mode: `ip`,
    type: `IP`,
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  const c = `www.google.com`;
  const checkedC = checkWebAddress(c, {
    isRequired: true,
    trim: true,
    mode: `domain`,
    type: `domain`,
  });
  console.log(`${JSON.stringify(checkedC)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testWebAddress();

/******************************************************************************/

function testHexToLatin() {
  console.log(`testing hexToLatin()...\r\n`);

  const a = `a1108fdd3f7ea1`;
  const aConversion = hexToLatin(a);
  console.log(`${a} : ${aConversion}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testHexToLatin();

/******************************************************************************/

function testLatinToHex() {
  console.log(`testing latinToHex()...\r\n`);

  const a = `this is a test`;
  const aConversion = latinToHex(a);
  console.log(`${a} : ${aConversion}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testLatinToHex();

/******************************************************************************/

function testFormCheckbox() {
  console.log(`testing checkFormCheckbox()...\r\n`);

  const a = true;
  const checkedA = checkFormCheckbox(a, `i agree to the thing`, {
    required: false,
  });
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  const b = false;
  const checkedB = checkFormCheckbox(b, `i agree to the thing`, {
    required: true,
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormCheckbox();

/******************************************************************************/

function testFormColor() {
  console.log(`testing checkFormColor()...\r\n`);

  const a = `#aabbcc`;
  const checkedA = checkFormColor(a, `Favorite Color`);
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  const b = `#aabbdcc`;
  const checkedB = checkFormColor(b, `Favorite Color`);
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormColor();

/******************************************************************************/

// test check form date
function testFormDate() {
  console.log(`testing checkFormDate()...\r\n`);

  const a = `1985-09-29`;
  const checkedA = checkFormDate(a, `Date of Birth`, {
    required: true,
    min: new Date(`1970-01-01`).getTime(),
    max: new Date(`2000-01-01`).getTime(),
  });
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  const b = `2001-01-01`;
  const checkedB = checkFormDate(b, `Date of Birth`, {
    required: true,
    min: new Date(`1970-01-01`).getTime(),
    max: new Date(`1999-01-01`).getTime(),
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  const c = `1980-02-02`;
  const checkedC = checkFormDate(c, `Date of Birth`, {
    required: true,
    min: new Date(`1985-03-04`).getTime(),
    max: new Date(`2002-04-05`).getTime(),
  });
  console.log(`${JSON.stringify(checkedC)}\r\n`);

  const d = undefined;
  const checkedD = checkFormDate(d, `Date of Birth`, {
    required: false,
  });
  console.log(`${JSON.stringify(checkedD)}\r\n`);

  const e = `fart fart fart`;
  const checkedE = checkFormDate(e, `Date of Birth`, {
    required: true,
  });
  console.log(`${JSON.stringify(checkedE)}\r\n`);

  const f = ``;
  const checkedF = checkFormDate(f, `Date of Birth`, {
    required: true,
  });
  console.log(`${JSON.stringify(checkedF)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormDate();

/******************************************************************************/

// test check form email
function testFormEmail() {
  console.log(`testing checkFormEmail()...\r\n`);

  const a = `thisis@atest.com`;
  const checkedA = checkFormEmail(a, `E-mail Address`); // use default options
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  // check invalid
  const b = `you eat poo`;
  const checkedB = checkFormEmail(b, `Dumb E-mail Address`);
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  // check min
  const c = `thisemailistooshort@iguess.com`;
  const checkedC = checkFormEmail(c, `Dumb E-mail Address`,
    {
      min: 200,
    });
  console.log(`${JSON.stringify(checkedC)}\r\n`);

  // check max
  const d = `johnsmith@email.com`;
  const checkedD = checkFormEmail(d, `Dumb Stuff`, {
    max: 10,
  });
  console.log(`${JSON.stringify(checkedD)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormEmail();

/******************************************************************************/

// TODO test check form number
function testFormNumber() {
  console.log(`testing checkFormNumber()...\r\n`);

  const a = 7;
  const checkedA = checkFormNumber(a, `Favorite Number`);
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  // test max
  const b = 101;
  const checkedB = checkFormNumber(b, `Favorite Number`, {
    max: 100,
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  // test min
  const c = -1;
  const checkedC = checkFormNumber(c, `Favorite Number`, {
    min: 0,
  });
  console.log(`${JSON.stringify(checkedC)}\r\n`);

  // test step
  const d = 4.5;
  const checkedD = checkFormNumber(d, `Favorite Number`, {
    step: 1,
  });
  console.log(`${JSON.stringify(checkedD)}\r\n`);

  // test invalid
  const e = `fart`;
  const checkedE = checkFormNumber(e, `Favorite Number`);
  console.log(`${JSON.stringify(checkedE)}]\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormNumber();

/******************************************************************************/

// test check form password
function testFormPassword() {
  console.log(`testing checkFormPassword()...\r\n`);

  // basic test
  const a = `somepassword`;
  const checkedA = checkFormPassword(a, `Account Password`);
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  // test min
  const b = `youeatfarts`;
  const checkedB = checkFormPassword(b, `Account Password`, {
    min: 13,
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  // test max
  const c = `thisisalongpasswordbutprobablynotthelongestever`;
  const checkedC = checkFormPassword(c, `Account Password`, {
    max: 10,
  });
  console.log(`${JSON.stringify(checkedC)}\r\n`);

  // test size
  const d = `b2d4e6r8a`;
  const checkedD = checkFormPassword(d, `Account Password`, {
    size: 10,
  });
  console.log(`${JSON.stringify(checkedD)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormPassword();

/******************************************************************************/

// test check form select
function testFormSelect() {
  console.log(`testing checkFormSelect()...\r\n`);

  // basic test
  const a = `foo`;
  const checkedA = checkFormSelect(a, `Favorite Thing`, {
    options: [
      {
        value: `foo`,
      },
      {
        value: `bar`,
      },
    ],
  });
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  // not in the list of options
  const b = `wub`;
  const checkedB = checkFormSelect(b, `Favorite Thing`, {
    options: [
      {
        value: `foo`,
      },
      {
        value: `bar`,
      },
    ],
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormSelect();

/******************************************************************************/

// test check form text area
function testFormTextArea() {
  console.log(`testing testFormTextArea()...\r\n`);

  const a = `This is a sample value for a text area.`;
  const checkedA = checkFormTextArea(a, `New Entry`);
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  // test min
  const b = `This is a test sample value for min limits.`;
  const checkedB = checkFormTextArea(b, `New Entry`, {
    min: 144,
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  // test max
  const c = `This is a test sample value for max limits.`;
  const checkedC = checkFormTextArea(c, `New Entry`, {
    max: 10,
  });
  console.log(`${JSON.stringify(checkedC)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormTextArea();

/******************************************************************************/

// test check form text
function testFormText() {
  console.log(`testing checkFormText()...\r\n`);

  const a = `This is a sample text input.`;
  const checkedA = checkFormText(a, `Favorite Phrase`);
  console.log(`${JSON.stringify(checkedA)}\r\n`);

  // test min
  const b = `This is a test for the min option.`;
  const checkedB = checkFormText(b, `Favorite Phrase`, {
    min: 100,
  });
  console.log(`${JSON.stringify(checkedB)}\r\n`);

  // test max
  const c = `This is a test for the max options.`;
  const checkedC = checkFormText(c, `Favorite Phrase`, {
    max: 11,
  });
  console.log(`${JSON.stringify(checkedC)}\r\n`);

  console.log(`/******************************************************************************/\r\n`);
}
testFormText();

/******************************************************************************/
