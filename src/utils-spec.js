/* global describe, context, it */
const { expect } = require('chai')
const { splitToWords, findFuzzyMatches, isFuzzyMatch } = require('./utils')

describe('utils', () => {
  context('isFuzzyMatch', () => {
    it('flags :', () => {
      expect(isFuzzyMatch('t:f')).to.equal(true)
      expect(isFuzzyMatch('t:')).to.equal(true)
    })

    it('flags -', () => {
      expect(isFuzzyMatch('t-f')).to.equal(true)
      expect(isFuzzyMatch('t-')).to.equal(true)
    })

    it('skips =', () => {
      expect(isFuzzyMatch('t=f')).to.equal(false)
    })

    it('uses . at the end', () => {
      expect(isFuzzyMatch('c-r.')).to.equal(true)
      // means we ONLY expect "c" script to match
      expect(isFuzzyMatch('c.')).to.equal(true)
      // this is not a fuzzy match - there are no separators
      // and the dot is NOT at the end
      expect(isFuzzyMatch('c.e')).to.equal(false)
    })
  })

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

    it('removes . at the end', () => {
      const parts = splitToWords('c-r.')
      expect(parts).to.deep.equal(['c', 'r'])
    })

    it('ignores . in the middle', () => {
      const parts = splitToWords('c.r.')
      expect(parts).to.deep.equal(['c.r'])
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

    it('returns multiple matches', () => {
      const scripts = {
        'cypress:open': 'cypress open',
        'cypress:run': 'cypress run',
        'cypress:run:record': 'cypress run --record'
      }
      const matched = findFuzzyMatches('c:r', scripts)
      expect(matched).to.deep.equal(['cypress:run', 'cypress:run:record'])
    })

    it('returns multiple matches without single', () => {
      const scripts = {
        cy: 'cypress open',
        cypress: 'cypress open',
        'cypress:open': 'cypress open',
        'cypress:run': 'cypress run',
        'cypress:run:record': 'cypress run --record'
      }
      const matched = findFuzzyMatches('c:', scripts)
      // not that "cy" and "cypress" are single workds
      // so they are not in the returned list
      expect(matched).to.deep.equal([
        'cypress:open', 'cypress:run', 'cypress:run:record'
      ])
    })

    it('returns all matches', () => {
      const scripts = {
        cy: 'cypress open',
        cypress: 'cypress open',
        'cypress:open': 'cypress open',
        'cypress:run': 'cypress run',
        'cypress:run:record': 'cypress run --record'
      }
      const matched = findFuzzyMatches('c', scripts)
      expect(matched).to.deep.equal(Object.keys(scripts))
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

    it('matches using -', () => {
      const scripts = {
        'cy:open': 'cypress open',
        'cy:run': 'cypress run'
      }
      const matched = findFuzzyMatches('c-r', scripts)
      expect(matched).to.deep.equal(['cy:run'])
    })

    it('allows scripts to have -', () => {
      const scripts = {
        'cy-open': 'cypress open',
        'cy-run': 'cypress run'
      }
      const matched = findFuzzyMatches('c-r', scripts)
      expect(matched).to.deep.equal(['cy-run'])
    })

    it('finds nothing', () => {
      const scripts = {
        'cypress:open': 'cypress open',
        'cypress:run': 'cypress run'
      }
      // should not crash and return nothing
      const matched = findFuzzyMatches('c:r:r', scripts)
      expect(matched).to.deep.equal([])
    })

    it('finds test-foo by t:f', () => {
      const scripts = {
        test: 'mocha',
        'test-foo': 'mocha ./foo'
      }
      const matched = findFuzzyMatches('t:f', scripts)
      expect(matched).to.deep.equal(['test-foo'])
    })

    describe('stopper', () => {
      it('matches the number of words', () => {
        const scripts = {
          cypress: 'cypress -help',
          'cypress:open': 'cypress open',
          'cypress:run': 'cypress run'
        }
        const matched = findFuzzyMatches('c-r.', scripts)
        expect(matched, 'cypress:run matches c-r.').to.deep.equal(['cypress:run'])

        const matched2 = findFuzzyMatches('cy:op.', scripts)
        expect(matched2, 'cypress:open matches cy:op.').to.deep.equal(['cypress:open'])

        const matched3 = findFuzzyMatches('c.', scripts)
        expect(matched3, 'cypress matches c.').to.deep.equal(['cypress'])
      })
    })
  })
})
