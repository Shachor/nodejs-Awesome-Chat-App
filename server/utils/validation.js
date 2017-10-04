//=============================================================================
// VALIDATION FUNCTIONS
//=============================================================================


// STRING VALIDATION
var isRealString = (string) => {
   return typeof string === 'string' && string.trim().length > 0;
};


// EXPORT
module.exports = {isRealString};
