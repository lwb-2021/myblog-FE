<template>
  <div class="user">
    <t-row>
      <t-col flex="200px">
        <div class="avatar">
          <t-avatar class="t-button" :image="image" alt="加载失败" size="100px"></t-avatar>
        </div>
      </t-col>
      <t-col flex="auto">
        <div class="user-info">
          <div style="padding-top: 20px">
            <span>
              {{ user_name }}
            </span>
            <t-divider theme="vertical" />
            <span>
              Lv.{{level}}
            </span>
            <t-divider theme="vertical" />
            <span>
              {{ isAdmin? "管理员": "用户"}}
            </span>
          </div>
          <t-divider style="margin: 0 0"/>
          <div style="font-size: 60%; color: gray">
            用户描述未实现
          </div>
        </div>
      </t-col>
    </t-row>
  </div>

</template>

<script>
import {LoadingPlugin} from "tdesign-vue-next";
import {getUserInfo, isAdmin, isUser} from "../utils/utils";
import axios from "axios";

export default {
  name: "User",
  data(){
    return {
      isSelf: false,
      isAdmin: false,
      userInfo: null,
      image: "/api/image/default_avatar.png",
      user_name: "用户",
      level: 0
    }
  },
  async created() {
    const loading = LoadingPlugin({
      fullscreen: true,
      attach: "body",
      preventScrollThrough: true,
    })
    this.isSelf = await isUser(this.$route.params.id)
    this.isAdmin = await isAdmin()
    this.userInfo = (await axios.post("/api/user/get", {
      id: this.$route.params.id
    })).data.data
    this.image = "/api" + this.userInfo.avatar
    this.user_name = this.userInfo.username
    this.level = this.userInfo.level
    console.log(this.userInfo)
    loading.hide()
  }
}
</script>

<style>
div.user{
  background: white;
  margin: auto auto;
  width: 60%;
  height: 90%;
}
div.avatar{
  padding-top: 40px;
  padding-left: 40px;
}
div.user-info{
  width: 100%;
  padding-top: 40px;
  font-size: 200%;
  text-align: left;
}
</style>