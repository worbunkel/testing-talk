import { isEmailAddressValid } from './isEmailAddressValid';
import testEmailAddresses from './testEmailAddresses.json';

describe('isEmailAddressValid()', () => {
  testEmailAddresses.invalid.forEach((emailAddress) => {
    it(`should determine "${emailAddress}" to be an invalid email address`, () => {
      expect(isEmailAddressValid(emailAddress)).toBe(false);
    });
  });

  testEmailAddresses.valid.forEach((emailAddress) => {
    it(`should determine "${emailAddress}" to be a valid email address`, () => {
      expect(isEmailAddressValid(emailAddress)).toBe(true);
    });
  });
});
