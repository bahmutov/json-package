// @ts-check
const la = require('lazy-ass')
const is = require('check-more-types')
const { isFuzzyMatch, findFuzzyMatches, matchesExactly, startsWith } = require('./utils')

/**
 * Returns matching scripts keys. The match is done by prefix or
 * by prefix in each word. When dealing with several words, you can
 * separate using ":" or "-" characters
 *
 * @example findScripts('t', { test: 'mocha' }) // ["test"]
 * @example findScripts('t:r', { test: 'mocha', 'test:record': '...' }) // ["test:record"]
 * @example findScripts('t-r', { test: 'mocha', 'test:record': '...' }) // ["test:record"]
 * @param {string} prefix Prefix to search for
 * @param {object} scripts Scripts object from the package.json
 * @returns string[]
 */
function findScripts (prefix, scripts) {
  la(is.unemptyString(prefix), 'expected unempty string prefix', prefix)
  la(is.object(scripts), 'expected an object of scripts', scripts)

  if (isFuzzyMatch(prefix)) {
    return findFuzzyMatches(prefix, scripts)
  }

  const labels = Object.keys(scripts)
  const matchesExactlyPrefix = matchesExactly.bind(null, prefix)
  const exactMatches = labels.filter(matchesExactlyPrefix)
  if (exactMatches.length === 1) {
    return exactMatches
  }

  const startsWithPrefix = startsWith.bind(null, prefix)
  const matchingScripts = labels.filter(startsWithPrefix)
  return matchingScripts
}

module.exports = findScripts
