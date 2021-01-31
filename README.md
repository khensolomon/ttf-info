# font-Info

... is forked from [trevordixon/ttfinfo][forked-from] and improve, add test

- [x] has TypeScript declarations
- [x] support both ESM and CommonJs including browser
- [x] mocha
- [x] Auto-load
- [x] webpack

... Changed the package name `ttfinfo` to *ttf-info*

## Web

> In your web Application point `ttf-info`...

```js
<script src="https://unpkg.com/ttf-info@latest/min.js"></script>
```

> ... then

```js
fontInfo.promise(Buffer).then(function(info){

  // return info should be
  info:{
    tables: {
      name: {
        '0': string,
        '1': string,
        // and so on...
      },
      post: {
        format: number,
        italicAngle: number,
        underlinePosition: number,
        underlineThickness: number,
        isFixedPitch: number,
        minMemType42: number,
        maxMemType42: number,
        minMemType1: number,
        maxMemType1: number
      },
      os2: {
        version: number,
        weightClass: number
      }
    }
  }
});
```

## Node.js

> Install `npm i ttf-info` then require... and get the result returned as Object if there is a sense in get query, otherwise empty Object (`{}`) return.

## ESM

```js
import fontInfo from 'ttf-info';

fontInfo.promise(Buffer).then(
  info=>{

  }
).catch(
  error=>{

  }
);

fontInfo.ttfInfo('fontFile', function(err, info) {
});

import {ttfInfo} from 'ttf-info';

ttfInfo('fontFile', function(err, info) {
});

```

## Commonjs

```js
const fontInfo = require('ttf-info');


fontInfo.promise(Buffer).then(
  info => {

  }
).catch(
  error => {

  }
);

fontInfo.ttfInfo('fontFile', function(err, info) {
});

const {ttfInfo} = require('ttf-info');

ttfInfo('fontFile', function(err, info) {
});
```

> NOTE: `type` attribute in package should be `commonjs` before publishing to npm, but the package itself is a module so testing, developing must be alway `module`.

[![License: MIT][license]][license-url]

[forked-from]: https://github.com/trevordixon/ttfinfo
[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-check]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true
[webpack-url]: https://unpkg.com/myanmar-notation@latest/min.js
[travis]: https://travis-ci.com/khensolomon/myanmar-notation.svg
[travis-url]: https://travis-ci.com/khensolomon/myanmar-notation
[npm-download]: https://img.shields.io/npm/dt/myanmar-notation.svg
[npm-dl-url]: https://www.npmjs.com/package/myanmar-notation
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?longCache=true&style=popout-square
[license-url]: https://opensource.org/licenses/MIT
