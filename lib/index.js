import * as fs from 'fs';

const TABLE_COUNT_OFFSET  = 4,
      TABLE_HEAD_OFFSET   = 12,
      TABLE_HEAD_SIZE     = 16,
      TAG_OFFSET          = 0,
      TAG_SIZE            = 4,
      CHECKSUM_OFFSET     = TAG_OFFSET + TAG_SIZE,
      CHECKSUM_SIZE       = 4,
      CONTENTS_PTR_OFFSET = CHECKSUM_OFFSET + CHECKSUM_SIZE,
      CONTENTS_PTR_SIZE   = 4,
      LENGTH_OFFSET       = TABLE_HEAD_SIZE + CONTENTS_PTR_OFFSET;

/**
 * org: count
 * @param {*} data 
 */
function offsetCount(data) {
  return data.readUInt16BE(TABLE_COUNT_OFFSET);
}

/**
 * org: offset
 * @param {*} data 
 * @param {string} name 
 */
function offsetContent(data, name) {
  return offsetData(data, name).contents;
}

/**
 * @param {*} data 
 * @param {string} name 
 * @returns {{tag:any,checksum:any,contents:any,length:any}}
 */
function offsetData(data, name) {
  var numTables = offsetCount(data);
  var header={
    tag: '',
    checksum: '',
    contents: '',
    length: ''
  };

  for (var i = 0; i < numTables; ++i) {
    var o = TABLE_HEAD_OFFSET + i * TABLE_HEAD_SIZE,
        tag = data.slice(o, o + CONTENTS_PTR_SIZE).toString();

    if (tag === name) {
      header.tag= tag,
      header.checksum= data.readUInt32BE(o + CHECKSUM_OFFSET),
      header.contents= data.readUInt32BE(o + CONTENTS_PTR_OFFSET),
      header.length= data.readUInt32BE(o + LENGTH_OFFSET)
      return header;
    }
  }
  return header
}

/**
 * org: tableName.js
 * @param {*} data 
 */
function name(data) {
  var ntOffset = offsetContent(data, 'name'),
      offsetStorage = data.readUInt16BE(ntOffset+4),
      numberNameRecords = data.readUInt16BE(ntOffset+2);

  var storage = offsetStorage + ntOffset;

  /**
   * @type {any}
   */
  var info = {};
  for (var j = 0; j < numberNameRecords; j++) {
    var o = ntOffset + 6 + j*12;
    
    /**
     * @type {string}
     */
    // var platformId = data.readUInt16BE(o);

    /**
     * @type {string}
     */
    var nameId = data.readUInt16BE(o+6);
    /**
     * @type {number}
     */
    var stringLength = data.readUInt16BE(o+8);
    /**
     * @type {string}
     */
    var stringOffset = data.readUInt16BE(o+10);

    
    if (!info.hasOwnProperty(nameId)) {
      info[nameId] = '';

      for (var k = 0; k < stringLength; k++) {
        var charCode = data[storage+stringOffset+k];
        if (charCode === 0) continue;
        info[nameId] += String.fromCharCode(charCode);
      }
    }
  }
  return info;
}

const VERSION_OFFSET      = 0,
      WEIGHT_CLASS_OFFSET = 4;

/**
 * org: tableOS2.js
 * @param {*} data 
 */
function os2(data) {
  var o = offsetContent(data, 'OS/2');
  return {
    version : data.readUInt16BE(o+VERSION_OFFSET),
    weightClass       : data.readUInt16BE(o+WEIGHT_CLASS_OFFSET)
  };
}

const FORMAT_OFFSET               = 0,
      ITALIC_ANGLE_OFFSET         = FORMAT_OFFSET + 4,
      UNDERLINE_POSITION_OFFSET   = ITALIC_ANGLE_OFFSET + 8,
      UNDERLINE_THICKNESS_OFFSET  = UNDERLINE_POSITION_OFFSET + 2,
      IS_FIXED_PITCH_OFFSET       = UNDERLINE_THICKNESS_OFFSET + 2,
      result                      = {
        tables: {
          name: {},
          post: {},
          os2: {
            version:'',weightClass:''
          }
        }
      }


/**
 * @param {*} fixed 
 */
function fixed16dot16(fixed) {
  if (fixed & 0x80000000) {
    // negative number is stored in two's complement
    fixed = -(~fixed + 1);
  }

  return fixed / 65536;
}

/**
 * org: tablePost.js
 * @param {*} data 
 */
function post(data) {
  var o = offsetContent(data, 'post');
  return {
    format            : fixed16dot16(data.readUInt32BE(o+FORMAT_OFFSET)),
    italicAngle       : fixed16dot16(data.readUInt32BE(o+ITALIC_ANGLE_OFFSET)),
    underlinePosition : data.readInt16BE(o+UNDERLINE_POSITION_OFFSET),
    underlineThickness: data.readInt16BE(o+UNDERLINE_THICKNESS_OFFSET),
    isFixedPitch      : data.readUInt32BE(o+IS_FIXED_PITCH_OFFSET),
    minMemType42      : data.readUInt32BE(o+7),
    maxMemType42      : data.readUInt32BE(o+9),
    minMemType1       : data.readUInt32BE(o+11),
    maxMemType1       : data.readUInt32BE(o+13)
  };
}

/**
 * @param {any} data
 * param {CallableFunction} callback
 */
function resultTables(data) {
  return result.tables = {
    name: name(data),
    post: post(data),
    os2: os2(data)
  }
}

/**
 * @namespace
 * @param {string | number | Buffer | URL} pathOrData
 * @param {{(error:any,meta?:{tables:{name:any,post:any,os2:{version:any,weightClass:any}}}):void}} callback
 */
export function ttfInfo(pathOrData, callback) {
  try {
    if (pathOrData instanceof Buffer){
      resultTables(pathOrData);
      callback(null,result);
    } else {
      fs.readFile(pathOrData, function(error, data) {
        if (error) {
          callback(error.message || error.toString());
        } else {
          resultTables(data);
          callback(null,result);
        }
      });
    } 
  } catch (error) {
    callback(error.message || error.toString());
  }
}

/**
 * @param {string | number | Buffer | URL} pathOrData
 */
function promise(pathOrData){
  return new Promise(function(res,rej){
    ttfInfo(pathOrData, function(e,d){
      if (e){
        rej(e);
      } else {
        res(d);
      }
    })
  })
}

export default {ttfInfo, promise};
