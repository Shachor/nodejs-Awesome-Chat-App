// REQUIRE PACKAGES
const expect = require('expect');

// REQUIRE OBJECTS
var {generateMessage} = require('./message');



//=============================================================================
// TEST GENERATE MESSAGE
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
