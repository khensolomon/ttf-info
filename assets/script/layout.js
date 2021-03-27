export default {
  data: () => ({
    filelist: []
  }),
  components: {},
  methods: {
    onChange() {
      // this.filelist = [...evt.target.files];
      this.filelist = [...this.$refs.file.files];
      for (const e of this.filelist) {
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
        reader.readAsArrayBuffer(e);
      }
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    /**
     * Add some visual fluff to show the user can drop its files
     * @param {*} evt
     */
    dragover(evt) {
      // evt.preventDefault();
      if (!evt.currentTarget.classList.contains('bg-green-300')) {
        evt.currentTarget.classList.remove('bg-gray-100');
        evt.currentTarget.classList.add('bg-green-300');
      }
    },
    /**
     * @param {*} evt
     * Clean up
     */
    dragleave(evt) {
      evt.currentTarget.classList.add('bg-gray-100');
      evt.currentTarget.classList.remove('bg-green-300');
    },
    drop(evt) {
      // evt.preventDefault();
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
