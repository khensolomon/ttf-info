# ttfmeta

... is forked from [trevordixon/ttfinfo][forked-from] and improve, add test

[![Build Status][travis]][travis-url]
[![npm][npm-download]][npm-dl-url]
[![Webpack][webpack-check]][webpack-url]
![Mocha][test-mocha]

- [x] has TypeScript declarations
- [x] support both ESM and CommonJS including browser
- [x] mocha
- [x] Auto-load
- [x] webpack

... Changed the package name `ttfinfo` to *ttfmeta*

## Web

> In your web Application point `ttfmeta`...

```js
<script src="https://unpkg.com/ttfmeta@latest/min.js"></script>
```

> ... then

```js
ttfMeta.promise(Buffer).then(function(info){

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

> Install `npm i ttfmeta` then require... and get the result returned as Object if there is a sense in get query, otherwise empty Object (`{}`) return.

## ESM

```js
import fontMeta from 'ttfmeta';

fontMeta.promise(Buffer).then(
  info=>{

  }
).catch(
  error=>{

  }
);

fontMeta.ttfInfo('fontFile', function(err, info) {
});

import {ttfInfo} from 'ttfmeta';

ttfInfo('fontFile', function(err, info) {
});

```

## CommonJS

```js
const fontMeta = require('ttfmeta');


fontMeta.promise(Buffer).then(
  info => {

  }
).catch(
  error => {

  }
);

fontMeta.ttfInfo('fontFile', function(err, info) {
});

const {ttfInfo} = require('ttfmeta');

ttfInfo('fontFile', function(err, info) {
});
```

> NOTE: `type` attribute in package should be `CommonJS` before publishing to npm, but the package itself is a module so testing, developing must be alway `module`.

[![License: MIT][license]][license-url]

[forked-from]: https://github.com/trevordixon/ttfinfo
[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-check]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true
[webpack-url]: https://unpkg.com/ttfmeta@latest/min.js
[travis]: https://travis-ci.com/khensolomon/ttfmeta.svg
[travis-url]: https://travis-ci.com/khensolomon/ttfmeta
[npm-download]: https://img.shields.io/npm/dt/ttfmeta.svg
[npm-dl-url]: https://www.npmjs.com/package/ttfmeta
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?longCache=true&style=popout-square
[license-url]: https://opensource.org/licenses/MIT
