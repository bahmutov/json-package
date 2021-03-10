/* global describe, context, it */
const la = require('lazy-ass')
describe('find-scripts', function () {
  const find = require('./find-scripts')
  const scripts = {
    foo: 'foo',
    bar: 'bar',
    barMore: 'bar-more',
    baz: 'baz'
  }

  it('is a function', function () {
    console.assert(typeof find === 'function')
  })

  context('prefixes', () => {
    it('finds nothing', function () {
      const found = find('a', scripts)
      console.assert(Array.isArray(found))
      console.assert(found.length === 0)
    })

    it('finds 1 partial match', function () {
      const found = find('f', scripts)
      console.assert(Array.isArray(found))
      console.assert(found.length === 1)
      console.assert(found[0] === 'foo')
    })

    it('finds 1 full match', function () {
      const found = find('foo', scripts)
      console.assert(Array.isArray(found))
      console.assert(found.length === 1)
      console.assert(found[0] === 'foo')
    })

    it('finds several', function () {
      const found = find('b', scripts)
      console.assert(Array.isArray(found))
      console.assert(found.length === 3)
    })

    it('finds an exact match if possible', function () {
      const found = find('bar', scripts)
      console.assert(Array.isArray(found))
      console.assert(found.length === 1, found)
      console.assert(found[0] === 'bar')
    })
  })

  context('fuzzy match', () => {
    it('finds matches using -', () => {
      const scripts = {
        'cy:open': 'cypress open',
        'cy:run': 'cypress run'
      }
      const found = find('c-o', scripts)
      la(Array.isArray(found), 'expected an array', found)
      la(found.length === 1, 'expected one result', found)
      la(found[0], 'expected cy:open', found)
    })
  })
})
