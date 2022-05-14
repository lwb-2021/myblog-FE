<template>
  <div class="delete-button">
    <t-popconfirm v-model="deleted" theme="danger" content="确认删除吗" @confirm="this.delete">
      <t-button block theme="danger">删除博客</t-button>
    </t-popconfirm>
  </div>
</template>

<script>
import {LoadingPlugin, MessagePlugin} from "tdesign-vue-next";
import axios from "axios";
import {getUserHeaders, isUser} from "../utils/utils";

export default {
  name: "BlogDelete",
  created() {
    const loading = LoadingPlugin({
      fullscreen: true,
      attach: "body",
      preventScrollThrough: true,
    })
    axios.post("/api/blog/get", {
      "id": this.$route.params.id
    }).then(
        async (result) => {
          if(await isUser(result.data.data.authorId)){
            loading.hide()
            await MessagePlugin.success("验证成功", 2000)
          }else {
            loading.hide()
            await MessagePlugin.error("您不是作者，没有权限删除", 2000)
            await this.$router.push("/blog")
          }
        }
    )
  },
  methods:{
    delete(){
      const message = MessagePlugin.loading("正在删除")
      axios.post("/api/blog/delete", {
        "id": this.$route.params.id
      },{
        headers: getUserHeaders()
      }).then(
          async (result) => {
            if(result.data.code >= 0){
              await MessagePlugin.success("删除成功", 2000);
            }
            (await message).close()
          }
      )
    }
  }
}
</script>

<style scoped>

</style>