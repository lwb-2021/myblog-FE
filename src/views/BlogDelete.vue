<template>

</template>

<script>
import {LoadingPlugin, MessagePlugin} from "tdesign-vue-next";
import axios from "axios";
import {isUser} from "../utils/utils";

export default {
  name: "BlogDelete",
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
            loading.hide()
            await MessagePlugin.success("成功加载", 2000)
          }else {
            loading.hide()
            await MessagePlugin.error("您不是作者，没有权限删除", 2000)
            await this.$router.push("/blog")
          }
        }
    )
  }
}
</script>

<style scoped>

</style>