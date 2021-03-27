import fs from 'fs';
import ttfMeta from '../lib/index.js';

// response = await this.view_response(e.tables.name);
// import ttfMeta from '../index.js';
// ttfMeta.ttfInfo('./test/font.ttf', function(err, info) {
//       console.log('error',err);
//       console.log('info',info);
// });
// var fontFile = '/storage/media/fonts/secondary/winuniiw.ttf';
// var fontFile = './assets/font/Myanmar3.ttf';
var fontFile = './assets/font/ttfmeta.ttf';
// var fontFile = '/storage/media/fonts/secondary/m-myanmar1.TTF';
// var fontFile = '/Windows/Fonts/AdobeHeitiStd-Regular.otf';
// var fontFile = '/Windows/Fonts/BirchStd.otf';

/**
 * send file
 */
ttfMeta.promise(fontFile).then(
  e => console.log(e)
).catch(
  e=>console.log('error',e)
)

// fs.readFile(fontFile,function(err, buffer) {
//   console.log('error',err);
//   console.log('info',buffer);
// })

/**
 * custom read and send buffer for callback
 */
fs.readFile(fontFile,function(err, buffer) {
  if (err){
    console.log('err',err);
  } else {
    ttfMeta.ttfInfo(buffer,function(err,info){
      console.log('error',err);
      console.log('info',info);
    })
  }
})

/**
 * custom read and send buffer for promise
 */
fs.readFile(fontFile,function(err, buffer) {
  if (err){
    console.log('err',err);
  } else {
    ttfMeta.promise(buffer).then(
      e => console.log(e)
    ).catch(
      e=>console.log('error',e)
    )
  }
})
