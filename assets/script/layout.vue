<template>
<div>
  <div class="bar">
    <div>
      <h1>ttf<span>Meta</span></h1>
    </div>
    <div>
      <a href="https://github.com/khensolomon/ttfmeta/discussions/new" class="link">discussions</a>
      <a target="_blank" class="badge github" href="https://github.com/khensolomon/ttfmeta/workflows/Node/badge.svg">
        <img src="https://github.com/khensolomon/ttfmeta/workflows/Node/badge.svg" alt="Github">
      </a>
      <a href="https://travis-ci.com/khensolomon/ttfmeta" class="badge travis">
        <img alt="Build Status" src="https://travis-ci.com/khensolomon/ttfmeta.svg">
      </a>
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
          <!-- <ul v-if="this.filelist.length">
            <li v-for="file in filelist" v-bind:key="file">
              see console.log <span v-html="file.name"></span> <button type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</button>
            </li>
          </ul> -->
          <ul v-if="this.metalist.length">
            <li v-for="file in metalist" v-bind:key="file">
              <h2><span type="button" @click="remove(metalist.indexOf(file))" title="Remove file" class="icon-cancel"></span> {{file.name}}</h2>
              <p v-if="file.msg" v-html="file.msg"></p>
              <div v-for="(value, name) in file.meta" v-bind:key="value">
                <h3>{{ name }}</h3>
                <pre>{{ value }}</pre>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div>
      <a href="https://github.com/khensolomon/ttfmeta/network">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/khensolomon/ttfmeta?style=social">
      </a>

      <a href="https://github.com/khensolomon/ttfmeta/stargazers">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/khensolomon/ttfmeta?style=social">
      </a>
      <a href="https://github.com/khensolomon/ttfmeta/discussions/new">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/khensolomon/ttfmeta?style=social">
      </a>
    </div>
    <div>
      <a href="https://github.com/khensolomon/ttfmeta/blob/master/LICENSE">
        <img alt="GitHub license" src="https://img.shields.io/github/license/khensolomon/ttfmeta?style=social">
      </a>
    </div>
  </div>
</div>
</template>
<script src="./layout.js"></script>
