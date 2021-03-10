# json-package

> Fetches any property from package.json using short prefix
> `jso dep` is same as `cat package.json | grep dependencies`

[![NPM][json-package-icon] ][json-package-url]

[![ci status][ci image]][ci url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)
[![standard style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install and use

    npm install -g json-package

Installs shortcuts "jso" and "j"

Then use `jso <property name prefix>` to show any property from `package.json`

Example: show version

    jso v
    j v

If there are multiple properties starting with the same prefix, the `jso` will show choices

## Show in action

[![asciicast](https://asciinema.org/a/31447.png)](https://asciinema.org/a/31447)

## Differences from `npm view <package name> [property]`

There is a command [npm view](https://docs.npmjs.com/cli/view) that can do the same -
and more. I prefer using `json-package` for these reasons

* `json-package` only does the local lookup, thus faster and less typing
* `json-package` matches property by prefix, again less typing

## Related

* [npm-quick-run](https://github.com/bahmutov/npm-quick-run) - run NPM script command by prefix
* [json](https://www.npmjs.com/package/json) - powerful display and processig for JSON files

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/json-package/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[json-package-icon]: https://nodei.co/npm/json-package.png?downloads=true
[json-package-url]: https://npmjs.org/package/json-package
[ci image]: https://github.com/bahmutov/json-package/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/json-package/actions
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
