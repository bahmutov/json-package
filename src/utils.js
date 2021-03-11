// @ts-check
const la = require('lazy-ass')
const is = require('check-more-types')

function startsWith (prefix, str) {
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

const isFuzzyMatch = (str) => {
  // if the string includes our special word separators
  // then we will use "fuzzy" matching
  if (str.includes('-') || str.includes(':')) {
    return true
  }
  // if the user wants to end with specific suffix,
  // use "." at the end
  if (str.endsWith('.')) {
    return true
  }
  return false
}

const splitToWords = (str) => {
  if (str.endsWith('.')) {
    str = str.slice(0, str.length - 1)
  }
  return str.split(/[-:]/g)
}

const findFuzzyMatches = (str, scripts) => {
  la(is.unemptyString(str), 'expected an unempty string', str)
  const parts = splitToWords(str)

  const scriptNames = Object.keys(scripts)
  return scriptNames.filter(scriptName => {
    const scriptParts = splitToWords(scriptName)
    if (parts.length > scriptParts.length) {
      // if the script name has fewer words than the prefix words
      // then for sure it is not what we are looking for
      return false
    }

    return parts.every((part, k) => {
      return startsWith(part, scriptParts[k])
    })
  })
}

module.exports = {
  isFuzzyMatch,
  splitToWords,
  findFuzzyMatches,
  startsWith,
  matchesExactly
}
