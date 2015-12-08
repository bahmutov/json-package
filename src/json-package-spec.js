const la = require('lazy-ass')
const check = require('check-more-types')

/*
require = require('really-need')
require('./package.json', {
  post: () => {
    return {
      name: 'fake',
      version: '1.2.3'
    }
  }
})
*/

/* global describe, it */
describe('jso', () => {
  const jso = require('./json-package').jsonPackage
  it('is a function', () => la(check.fn(jso)))
})
