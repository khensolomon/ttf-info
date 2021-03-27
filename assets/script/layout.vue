<template>
<div>
  <div class="bar">
    <div>
      <h1>ttf<span>Meta</span></h1>
    </div>
    <div>
      ...
    </div>
  </div>
  <div class="wrapper">
    <div class="container">
      <div>
        <form method="post" action="#" enctype="multipart/form-data">
          <div @dragover="dragover" @dragleave="dragleave" @drop="drop" @change="onChange">
            <input type="file" name="files[]" id="file" ref="file" multiple style="display:none;" />
            <label for="file">Choose <span>fonts</span></label> file <em>or</em> drop it here.
          </div>
        </form>
      </div>
      <div class="result">
        <div>
          <ul v-if="this.filelist.length" v-cloak>
            <li v-for="file in filelist" v-bind:key="file">
              see console.log <span v-html="file.name"></span> <button type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    ...
  </div>
</div>
</template>
<script src="./layout.js"></script>
