const join = require('path').join
const findup = require('findup')

const printNames = require('./print-names')
const findScripts = require('./find-scripts')

function printAllProperties (pkg) {
  printNames('Available properties are',
    Object.keys(pkg))
}

function findPackage () {
  let fullPath
  try {
    fullPath = findup.sync(process.cwd(), 'package.json')
  } catch (e) {
    console.error('Cannot find package.json in the current folder and its ancestors')
    process.exit(-1)
  }
  const pkg = require(join(fullPath, 'package.json'))
  return pkg
}

function loadJson (filename) {
  if (!filename) {
    return findPackage()
  }
  return require(filename)
}

function jsonPackage (prefix) {
  const pkg = loadJson()

  if (!prefix) {
    printAllProperties(pkg)
    return
  }

  const candidates = findScripts(prefix, pkg)
  if (!candidates.length) {
    console.error('Cannot find any properties starting with "%s"', prefix)
    printAllProperties(pkg)
    process.exit(-1)
  }
  if (candidates.length > 1) {
    printNames('Several properties start with ' + '"' + prefix + '"',
      candidates)
    console.error('Be more specific')
    process.exit(-1)
  }

  console.log(JSON.stringify(pkg[candidates[0]], null, 2))
}

module.exports = {
  loadJson: loadJson,
  jsonPackage: jsonPackage,
  find: findScripts,
  printNames: printNames
}
