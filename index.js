const fs            = require('fs'),
  nameTable     = require('./tableName'),
  postTable     = require('./tablePost'),
  os2Table      = require('./tableOS2');

/**
 * @param {any} data
 */
function ttfInfo(data) {
  try {
    return {
      tables: {
        name: nameTable(data),
        post: postTable(data),
        os2: os2Table(data)
      }
    };
  } catch(e) {
    throw(e);
  }
}

/**
 * @param {any} data
 * @param {CallableFunction} callback
 */
function fn(data, callback) {
  callback(null, data);
}

/**
 * @param {string | number | Buffer | URL} pathOrData
 * @param {{(error:NodeJS.ErrnoException,meta?:{tables:{name:any,post:any,os2:{version:any,weightClass:any}}}):void}} callback
 */
module.exports = function(pathOrData, callback) {
  (pathOrData instanceof Buffer ? fn : fs.readFile)(pathOrData, function(err, data) {
    if (err) return callback(new Error(err.message));
    try {
      fn(ttfInfo(data),callback);
    } catch(err) {
      callback(new Error(err.message));
    }
  });
};
