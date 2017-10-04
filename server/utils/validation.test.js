const expect = require('expect');


// import isRealString
const {isRealString} = require('./validation');


// is realstring
describe('isRealString Validation', () => {
   // should reject non-string values
   it('should reject non-string values', () => {
      var string = 1234;
      var result = isRealString(string);
      expect(result).toBeFalsy();
   });
   // should reject string with only spaces
   it('should reject string with only spaces', () => {
      var string = '      ';
      var result = isRealString(string);
      expect(result).toBeFalsy();
   });
   // should allow strings with non-space characters
   it('should allow strings with non-space characters', () => {
      var string = 'AWESOME!';
      var result = isRealString(string);
      expect(result).toBeTruthy();
   });
});
