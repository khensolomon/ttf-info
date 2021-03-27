export default {
  data: () => ({
    filelist: []
  }),
  components: {},
  methods: {

    onChange() {
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

      // this.filelist = [...evt.target.files];
      this.filelist = [...this.$refs.file.files];
      for (const e of this.filelist) {
        // console.log('a',e,this.formatBytes(e.size));

        // var blob = e.slice(3, 9);
        // console.log(blob);
        // var sizeInMB = (e.size / (1024*1024)).toFixed(2);
        // console.log('a',e,sizeInMB + 'MB');
        // console.log(sizeInMB + 'MB');

        // const reader = new FileReader();
        // reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        // reader.readAsDataURL(e);
        // function toBuffer(ab) {
        //     var buf = new Buffer.alloc(ab.byteLength);
        //     var view = new Uint8Array(ab);
        //     for (var i = 0; i < buf.length; ++i) {
        //         buf[i] = view[i];
        //     }
        //     return buf;
        // }
        // function toBuffer(str) {
        //   let data = 'c3RhY2thYnVzZS5jb20=';
        //   let buff = Buffer.from(str, 'hex');
        //   return buff.toString('ascii');
        // }
        // reader.onload = function(){}
        // reader.readAsArrayBuffer(e);
        // reader.readAsBinaryString(e);

        var reader = new FileReader();

        reader.onload = function(evt) {
            var arrayBuffer =  evt.target.result;
            var data = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);

            window.ttfMeta.promise(data).then(
              e => console.log(e)
            ).catch(
              e=>console.log('error',e)
            )

            // for (var i = 0; i < numTables; ++i) {

            //   var o = TABLE_HEAD_OFFSET + i * TABLE_HEAD_SIZE, t = data.buffer.slice(o, o + CONTENTS_PTR_SIZE);

            //   // console.log(typeof tag);
            //   // var enc = new TextDecoder("utf-8");
            //   // var arr = new Uint8Array(t);
            //   var tag = new TextDecoder("utf-8").decode(new Uint16Array(t))
            //   console.log(tag,o,o + CONTENTS_PTR_SIZE);

            //   // var abc = String.fromCharCode.apply(null, new Uint16Array(tag));
            //   // const buffer = new ArrayBuffer(16)
            //   // console.log(abc);

            // }

        }

        reader.readAsArrayBuffer(e);
        // reader.readAsBinaryString(e);
      }
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(evt) {
      evt.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!evt.currentTarget.classList.contains('bg-green-300')) {
        evt.currentTarget.classList.remove('bg-gray-100');
        evt.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(evt) {
      // Clean up
      evt.currentTarget.classList.add('bg-gray-100');
      evt.currentTarget.classList.remove('bg-green-300');
    },
    drop(evt) {
      evt.preventDefault();
      this.$refs.file.files = evt.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      evt.currentTarget.classList.add('bg-gray-100');
      evt.currentTarget.classList.remove('bg-green-300');
    },
    formatBytes(a,b=2){
      if (0===a) return"0 Byte";
      const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
      return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
    }
  },
  // computed: {},
  // beforeCreate() {},
  // async created() {},
  // destroyed () {},
  // mounted () {}
};
