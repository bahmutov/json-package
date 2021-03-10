/* global describe, context, it */
const la = require('lazy-ass')
const { expect } = require('chai')
const { splitToWords, findFuzzyMatches } = require('./utils')

describe('utils', () => {
  context('splitToWords', () => {
    it('splits by :', () => {
      const parts = splitToWords('c:r')
      expect(parts).to.deep.equal(['c', 'r'])
    })

    it('splits by : longer words', () => {
      const parts = splitToWords('cy:ru')
      expect(parts).to.deep.equal(['cy', 'ru'])
    })

    it('splits by -', () => {
      const parts = splitToWords('c-r')
      expect(parts).to.deep.equal(['c', 'r'])
    })
  })

  context('findFuzzyMatches', () => {
    it('matches single letters', () => {
      const scripts = {
        'cypress:open': 'cypress open',
        'cypress:run': 'cypress run'
      }
      const matched = findFuzzyMatches('c:r', scripts)
      expect(matched).to.deep.equal(['cypress:run'])
    })

    it('matches several letters', () => {
      const scripts = {
        'cypress:open': 'cypress open',
        'cypress:run': 'cypress run'
      }
      const matched = findFuzzyMatches('cy:run', scripts)
      expect(matched).to.deep.equal(['cypress:run'])
    })

    it('matches two first parts', () => {
      const scripts = {
        'cypress:open': 'cypress open',
        'cypress:run:there': 'cypress run'
      }
      const matched = findFuzzyMatches('c:r', scripts)
      expect(matched).to.deep.equal(['cypress:run:there'])
    })
  })
})
