import fs from 'fs';
import ttfMeta from '../lib/index.js';
// import ttfMeta from '../index.js';
// ttfMeta.ttfInfo('/storage/media/fonts/external/BURMA___.TTF', function(err, info) {
//       console.log('error',err);
//       console.log('info',info);
// });



ttfMeta.promise('/storage/media/fonts/external/-BURMA___.TTF').then(
      e=>console.log('result',e)
).catch(
      e=>console.log('error',e)
)

// fs.readFile('/storage/media/fonts/external/BURMA___.TTF',function(err, buffer) {
//       if (err){
//             console.log('err',err);
//       } else {
//             // console.log('buffer',buffer);
//             ttfMeta(buffer,function(err,info){
//                   console.log('error',err);
//                   // console.log('info',info);
//             })
//       }
//       // console.log('error',err);
//       // console.log('info',info);
// })