# ttfmeta

A [Node.js](#nodejs) module and a [library](#browser) that extracted metadata from ttf font file or buffer. It is forked from [trevordixon/ttfinfo][forked-from] and improve, add test. Check [live Application][demo] is available...

[![workflows-badge]][workflows]
[![travis-badge]][travis]
[![npm-badge]][npm]
[![webpack-badge]][latest-min]
![test-mocha]

## Feature

- [x] has TypeScript declarations
- [x] support both ESM and CommonJS including browser
- [x] Reading from file (or) buffer
- [x] [Demo][demo]

## Usage

### Node.JS

`npm i ttfmeta` to install, and can be `require` or `import` from your Node.JS application. However `ttfmeta` is assuming that one day npm might force us to seperate ES and CommonJS module. Therefore, it is a good practice to start coding Node.JS application using ES6 module.

```js
// ES6
import ttfMeta from 'ttfmeta';
import {ttfInfo,promise} from 'ttfmeta';

// CommonJS
const ttfMeta = require('ttfmeta');
const {ttfInfo,promise} = require('ttfmeta');
```

### Browser

Include the file `ttfmeta@latest/min.js` in your web application. It is available on [UNPKG][unpkg].

```html
<script src="https://unpkg.com/ttfmeta@latest/min.js"></script>

<input type="file" name="files[]" multiple />
<script>
  // window.ttfMeta;
  var file = 'blob or arrayBuffer';

  var reader = new FileReader();
  reader.onload = function(evt) {
    var arrayBuffer =  evt.target.result;
    var data = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
    window.ttfMeta.promise(data).then(
      e => console.log(e)
    ).catch(
      e=>console.log('error',e)
    )
  }
  reader.readAsArrayBuffer(file);
</script>
```

## API

- [`ttfMeta.promise()`](#promise)
- [`ttfMeta.ttfInfo()`](#ttfInfo)
- [Result `{meta:{...}, tables:{...}}`](#result)

### Promise

the `ttfMeta.promise()`, `promise()`

```js
ttfMeta.promise('file.ttf').then(
  result => console.log(result)
).catch(
  err => console.log('error',err)
);

// or
promise('file.ttf (or) buffer').then(
  result => console.log(result)
).catch(
  err => console.log('error',err)
);
```

### ttfInfo

the `ttfMeta.ttfInfo()`, `ttfInfo()`

```js
ttfMeta.ttfInfo('file.ttf', (err, result) => {
  if (err) {
    console.log('error', err)
  } else {
    console.log('result', result)
  }
});

// or
ttfInfo('file.ttf (or) buffer', (err, result) => ...);
```

### Result

This orginal [trevordixon/ttfinfo][forked-from] does not contain formated meta property in result.

```js
{
  meta: {
    property: [
      { name: 'font-family', text: String },
      { name: 'font-subfamily', text: String },
      { name: 'unique-identifier', text: String },
      { name: 'full-name', text: String },
      { name: 'version', text: String },
      { name: 'postscript-name', text: String },
      { name: 'company', text: String },
      { name: 'author', text: String }
    ],
    description: [
      { name: 'title', text: String },
      { name: 'paragraph', text: String },
      ...
    ],
    license: [
      { name: 'title', text: String },
      { name: 'paragraph', text: String },
      ...
    ],
    reference: [
      { name: 'url', text: 'http://...' },
      ...
    ]
  },
  tables: {
    name: {
      '0': String,
      '1': String,
      '2': String,
      '3': String,
      '4': String,
      '5': String,
      '6': String,
      '7': String,
      '8': String,
      '9': String,
      ...
      '18': String
    },
    post: {
      format: Number,
      italicAngle: Number,
      underlinePosition: Number,
      underlineThickness: Number,
      isFixedPitch: Number,
      minMemType42: Number,
      maxMemType42: Number,
      minMemType1: Number,
      maxMemType1: Number
    },
    os2: { version: Number, weightClass: Number }
  }
}
```

## License

![shield-license]

[demo]: https://khensolomon.github.io/ttfmeta/
[workflows-badge]: https://github.com/khensolomon/ttfmeta/workflows/Node/badge.svg
[workflows]: https://github.com/khensolomon/ttfmeta/actions/workflows/node.yml
[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-badge]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true
[latest-min]: https://unpkg.com/ttfmeta@latest/min.js
[unpkg]: https://unpkg.com/
[travis-badge]: https://travis-ci.com/khensolomon/ttfmeta.svg
[travis]: https://travis-ci.com/khensolomon/ttfmeta
[npm-badge]: https://img.shields.io/npm/dt/ttfmeta.svg
[npm]: https://www.npmjs.com/package/ttfmeta
[shield-license]: https://img.shields.io/github/license/khensolomon/ttfmeta?style=social

[forked-from]: https://github.com/trevordixon/ttfinfo
