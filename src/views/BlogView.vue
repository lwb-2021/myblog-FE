<template>
  <div class="blog">
    <div class="title">
      <h1>
        {{this.blogData? this.blogData.title: "加载中"}}
      </h1>
    </div>
    <hr />
    <div class="content" v-html="compiledMarkdown"/>
  </div>


</template>

<script>
import { marked } from "marked";
import {LoadingPlugin, MessagePlugin} from "tdesign-vue-next";
import axios from "axios";
import blogDelete from "./BlogDelete";
export default {
  name: "index",
  data(){
    return {
      blogData: undefined,
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.blogData? this.blogData.content: "")
    },
  },
  created() {
    const loading = LoadingPlugin({
      fullscreen: true,
      attach: 'body',
      preventScrollThrough: true,
    })
    axios.post("/api/blog/get", {
      "id": this.$route.params.id
    }).then(
        (result) => {
          console.log(result)
          this.blogData = result.data.data
          loading.hide()
          MessagePlugin.success("加载成功", 2000)
        }
    )
    console.log(this.blogData)
  }
};
</script>

<style>
div.blog{
  background: white;
  margin: auto auto;
  width: 50%;
  height: 100%;
}
div.title{
  background: white;
  width: 100%;
  padding-top: 5px;
  padding-left: 20px;
  text-align: left;
}
div.content{
  background: white;
  padding-top: 5px;
  padding-left: 20px;
  width: 100%;
}
</style>