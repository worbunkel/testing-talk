import { isEmailAddressValid } from './isEmailAddressValid';
import testEmailAddresses from './testEmailAddresses.json';

describe('isEmailAddressValid()', () => {
  it('should determine all these invalid email addresses to be invalid', () => {
    testEmailAddresses.invalid.forEach((emailAddress) => {
      expect(isEmailAddressValid(emailAddress)).toBe(false);
    });
  });

  it('should determine all these valid email addresses to be valid', () => {
    testEmailAddresses.valid.forEach((emailAddress) => {
      expect(isEmailAddressValid(emailAddress)).toBe(true);
    });
  });
});
