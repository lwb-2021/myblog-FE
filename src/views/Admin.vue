<template>
  <t-tabs value="user-list" theme="card" @change="changeHandler">
    <t-tab-panel value="user-list">
      <template #label>
        <user-icon />
        用户列表
      </template>
      <user-search />
    </t-tab-panel>
  </t-tabs>
</template>

<script>
import {UserIcon} from "tdesign-icons-vue-next";
import UserSearch from "../components/UserSearch";
import {isAdmin} from "../utils/utils";
import {MessagePlugin} from "tdesign-vue-next";
import {LoadingPlugin} from "tdesign-vue-next";
export default {
  name: "Admin",
  components: {UserSearch, UserIcon},
  methods:{
    changeHandler(){

    },
  },
  async created() {
    const loading = LoadingPlugin({
      fullscreen: true,
      attach: 'body',
      preventScrollThrough: true,
    })
    if(await isAdmin()){
      loading.hide()
      await MessagePlugin.success("权限验证成功")
    }else {
      await this.$router.push("/home")
    }
  }
}
</script>
