export default {
  data: () => ({
    filelist: [],
    metalist: []
  }),
  components: {},
  methods: {
    onChange() {
      // var files = evt.target.files;
      var files = this.$refs.file.files;
      // this.filelist = [...this.filelist,...files];
      var metalist = this.metalist;
      for (const e of files) {
        var reader = new FileReader();
        // var size = this.formatBytes(e.size);
        // console.log(e);
        reader.onload = function(evt) {
          var arrayBuffer =  evt.target.result, data = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
          // window.ttfMeta.ttfInfo(data,function(err,info){ console.log(err,info); })
          // console.log(arrayBuffer);
          window.ttfMeta.promise(data).then(
            meta => metalist.push({
              name:e.name,
              size:arrayBuffer.byteLength,
              meta:meta
            })
          ).catch(
            msg => metalist.push({
              name:e.name,
              msg:msg,
              meta:{}
            })
          )
        }
        reader.readAsArrayBuffer(e);
      }
    },
    remove(i) {
      this.metalist.splice(i, 1);
    },
    /**
     * Add some visual fluff to show the user can drop its files
     * @param {*} evt
     */
    dragover(evt) {
      evt.preventDefault();
      if (!evt.currentTarget.classList.contains('color-red')) {
        evt.currentTarget.classList.remove('color-blue');
        evt.currentTarget.classList.add('color-red');
      }
    },
    /**
     * @param {*} evt
     * Clean up
     */
    dragleave(evt) {
      evt.currentTarget.classList.add('color-blue');
      evt.currentTarget.classList.remove('color-red');
    },
    /**
     * @param {*} evt
     * onChange -> Trigger the onChange event manually
     * Clean up
     */
    drop(evt) {
      evt.preventDefault();
      this.$refs.file.files = evt.dataTransfer.files;
      this.onChange();
      evt.currentTarget.classList.add('color-blue');
      evt.currentTarget.classList.remove('color-red');
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
