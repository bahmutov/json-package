#!/usr/bin/env node --harmony

'use strict'

const help = [
  'USE: jso <property name prefix>',
  '    "jso v" === "cat package.json | grep version"'
].join('\n')

const path = require('path')
const jsonPackage = require('..').jsonPackage

require('simple-bin-help')({
  minArguments: 3,
  packagePath: path.join(__dirname, '..', 'package.json'),
  help: help,
  noExit: true,
  onFail: function () {
    jsonPackage()
    process.exit(0)
  }
})

const prefix = process.argv[2]
jsonPackage(prefix)
