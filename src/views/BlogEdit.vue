<template>
  <blog-editor :form-data="formData" title="编辑博客" submit-interface="edit"/>
</template>
<script>
import axios from "axios";
import {computed, ref} from "vue";
import {LoadingPlugin, MessagePlugin} from "tdesign-vue-next";
import {getUserHeaders, isUser} from "../utils/utils";
import BlogEditor from "../components/BlogEditor";

export default {
  name: "BlogEdit",
  components: {BlogEditor},
  data(){
    const INITIAL_DATA = {
      title: "",
      content: ""
    }
    const formData = ref({...INITIAL_DATA})
    const suffix = computed(() => {
      return `${formData.value.title.length}/100`;
    })
    return {
      formData: formData,
      suffix: suffix
    }
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
        async (result) => {
          console.log(result)
          if(await isUser(result.data.data.authorId)){
            this.formData.title = result.data.data.title
            this.formData.content = result.data.data.content
            loading.hide()
            await MessagePlugin.success("成功加载", 2000)
          }else {
            loading.hide()
            await MessagePlugin.error("您不是作者，没有权限编辑", 2000)
            await this.$router.push("/blog")
          }
        }
    )
  }
}
</script>

