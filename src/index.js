'use strict';
var mixed = require('./mixed')
  , bool = require('./boolean')
  , Ref = require('./util/reference');

var isSchema = schema => schema && !!schema.__isYupSchema__;

module.exports = {
  mixed:   mixed,
  string:  require('./string'),
  number:  require('./number'),
  boolean: bool,
  bool:    bool,
  date:    require('./date'),
  object:  require('./object'),
  array:   require('./array'),

  reach: require('./util/reach'),

  ValidationError: require('./util/validation-error'),
  ref: (key, options) => new Ref(key, options),

  isSchema,

  addMethod(schemaType, name, fn) {
    if ( !schemaType || !isSchema(schemaType.prototype))
      throw new TypeError('You must provide a yup schema constructor function')

    if ( typeof name !== 'string') throw new TypeError('A Method name must be provided')
    if ( typeof fn !== 'function') throw new TypeError('Method function must be provided')

    schemaType.prototype[name] = fn
  }
}
