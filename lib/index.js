import * as fs from 'fs';
import * as ttf from './main.js';

/**
 * @namespace
 * @param {string | number | Buffer | URL} pathOrData
 * @param {{(error:string|null,meta?:typeof ttf.result):void}} callback
 */
export function ttfInfo(pathOrData, callback) {
  try {
    if (pathOrData instanceof Buffer){
      ttf.ttfInfo(pathOrData, callback)
    } else {
      fs.readFile(pathOrData, function(error, data) {
        if (error) {
          callback(error.message || error.toString());
        } else {
          ttf.ttfInfo(new DataView(data.buffer, 0, data.byteLength), callback)
        }
      });
    }
  } catch (error) {
    callback(error.message || error.toString());
  }
}

/**
 * @param {string | number | Buffer | URL} pathOrData
 * @returns {Promise<typeof ttf.result>}
 */
export function promise(pathOrData){
  return new Promise(function(res,rej){
    ttfInfo(pathOrData, function(e,d){
      if (d) {
        res(d);
      } else {
        rej(e);
      }
    })
  })
}

export default {ttfInfo, promise};
