<template>
  <div class="editor">
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="form">
      <t-form :data="formData" @submit="onSubmit" :rules="rules">
        <t-form-item style="width: 100%; margin: auto auto" label="标题" name="title">
          <t-input v-model="formData.title" placeholder="请输入标题" :maxlength="100" :suffix="suffix"/>
        </t-form-item>
        <t-form-item style="width: 100%; margin: auto 0" label="内容" name="content">
          <v-md-editor v-model="formData.content" height="300px"></v-md-editor>
        </t-form-item>
        <t-form-item style="padding-top: 8px">
          <div class="button">
            <t-button block theme="primary" type="submit" style="margin:auto 0">提交</t-button>
          </div>
        </t-form-item>
      </t-form>
    </div>
  </div>


</template>

<script setup>
const rules = {
  title:[
    {required: true, message: "标题不能为空", type: "error"},
    {min: 4, message: "标题至少要四个字", type: "error"},
  ],
  content:[
    {required: true, message: "内容不能为空", type: "error"}
  ]
}
</script>
<script>
import {computed} from "vue";
import axios from "axios";
import {getUserHeaders} from "../utils/utils";
import {MessagePlugin} from "tdesign-vue-next";

export default {
  name: "BlogEditor",
  props: ["formData", "title", "submitInterface"],
  data(){
    const suffix = computed(() => {
      return `${this.formData.title.length}/100`;
    })
    return {
      suffix: suffix
    }
  },
  methods: {
    onSubmit(context){
      const self = this
      const submit_interface = this.submitInterface
      if(context.validateResult === true){
        console.log(context)
        console.log(self.formData)
        axios.post("/api/blog/"+submit_interface, {
              "newTitle": self.formData.title,
              "newBlogContent": self.formData.content,
              "blogId": self.$route.params.id
            },
            {
              headers: getUserHeaders()
            }).then(
            (result) => {
              if(result.data.code < 0){
                MessagePlugin.error(result.data.message)
              }else {
                MessagePlugin.success(result.data.message)
              }
            }
        )
      }else {
        MessagePlugin.error(context.firstError !== undefined? context.firstError : "")
      }
    },
  },
}

</script>

<style>
div.editor{
  background: white;
  margin: 10px auto auto;
  width: 90%;
  height: 100%;
}
div.title{
  background: white;
}
h1{
  padding-top: 5px;
  width: 100%;
  text-align: center;
}
div.form{
  background: white;
  margin: auto auto;
  width: 95%;
}
</style>