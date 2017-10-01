// REQUIRE PACKAGES
const expect = require('expect');

// REQUIRE OBJECTS
var {generateMessage, generateLocationMessage} = require('./message');



//=============================================================================
// TEST generateMessage
//=============================================================================
describe('Generate Message', () => {
   it('should generate correct message object', () => {
      var from = 'Me';
      var text = 'This is the text of the message';
      // store res in variable
      var result = generateMessage(from, text);
      // assert from match

      // This works, but we can check the entire object at once
      // expect(result.from).toBe(from);
      // expect(result.text).toBe(text);
      expect(result).toMatchObject({
         from,    // ES6 version of {from: from}
         text
      });

      expect(typeof result.createdAt).toBe('number');
      // assert text match
      // assert createdAt is number
   });
});
//=============================================================================



//=============================================================================
// TEST generateLocationMessage
//=============================================================================
describe('Generate Location Message', () => {
   it('should generate correct location object', () => {
      var from = 'Me';
      var lat = 1;
      var long = 1;

      var result = generateLocationMessage(from, lat, long);

      expect(result).toMatchObject({
         from,
         url: 'https://www.google.com/maps?q=1,1'
      });
      expect(typeof result.createdAt).toBe('number');
   });
});







//=============================================================================
