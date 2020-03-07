const { checkAddressCity, checkEmailAddress, check } = require(`./index`);

const invalidCity = `   22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222`;
const validCity = `Denver`;

const checkedInvalidCity = checkAddressCity(invalidCity);
console.log(`checkedInvalidCity : ${JSON.stringify(checkedInvalidCity)}`);

const checkedValidCity = checkAddressCity(validCity);
console.log(`checkedValidCity : ${JSON.stringify(checkedValidCity)}`);

const checkedEmailAddress = checkEmailAddress(`err###@___.com `);
console.log(JSON.stringify(checkedEmailAddress));

const dob = ``;
const checkedDOBEmpty = check(`date`, dob, {
  sourceFormat: `mm/dd/yyyy`,
  targetFormat: `mm/dd/yyyy`,
});
console.log(checkedDOBEmpty);

const middleNameEmpty = ``;
const checkedMiddleNameEmpty = check(`name`, middleNameEmpty, {
  type: `middle`,
  isRequired: false,
});
console.log(checkedMiddleNameEmpty);

const hash = `12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678`;
const checkedHash = check(`hash`, hash, {
  isRequired: true,
  trim: true,
  size: 512,
  type: `password`,
  toLowerCase: true,
});
console.log(JSON.stringify(checkedHash));
