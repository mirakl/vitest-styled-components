// Backward compatibility shim
const styleSheetSerializer = require('../dist/cjs/styleSheetSerializer')

module.exports.styleSheetSerializer = styleSheetSerializer
module.exports.setStyleSheetSerializerOptions = styleSheetSerializer.setStyleSheetSerializerOptions;
