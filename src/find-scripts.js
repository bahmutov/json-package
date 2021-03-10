const la = require('lazy-ass')
const is = require('check-more-types')

function startsWith(prefix, str) {
  console.assert(typeof str === 'string', 'expected string', str)
  return str.indexOf(prefix) === 0
}

function sameLength (a, b) {
  return a.length === b.length
}

function matchesExactly (prefix, str) {
  return startsWith(prefix, str) &&
    sameLength(prefix, str)
}

function findScripts(prefix, scripts) {
  la(is.unemptyString(prefix), 'expected unempty string prefix', prefix)

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
