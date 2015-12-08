const join = require('path').join
const findup = require('findup')

function findPackage () {
  try {
    var fullPath = findup.sync(process.cwd(), 'package.json')
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

}

module.exports = {
  loadJson: loadJson,
  jsonPackage: jsonPackage,
  find: require('./find-scripts')
}
