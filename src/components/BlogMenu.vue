<template>
  <div>
    <t-head-menu v-model="menuValue" theme="light" @change="changeHandler">
      <template #logo>

      </template>
      <t-menu-item value="home"> 主页 </t-menu-item>
      <t-menu-item value="blog"> 博客 </t-menu-item>
      <t-menu-item value="admin" :disabled="!isAdmin"> 管理 </t-menu-item>

      <template #operations>
        <router-link to="/blog/search">
          <t-icon class="t-menu__operations-icon" name="search" />
        </router-link>
        <router-link to="/blog/create">
          <t-icon class="t-menu__operations-icon" name="edit" />
        </router-link>
        <router-link :to="avatar_ref">
          <t-avatar :image="avatar_image" alt="加载失败" @click="clickHandler"></t-avatar>
        </router-link>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuValue = ref('item2');


</script>
<script>

import {getUserInfo, isAdmin} from "../utils/utils";

export default {
  name: "BlogMenu",
  data(){
    return {
      isAdmin: false,
      avatar_image: "/api/image/default_avatar.png",
      avatar_ref: "/login"
    }
  },
  methods:{
    changeHandler(active){
      this.$router.push("/"+active)
    },
    clickHandler(){
      getUserInfo().then(
          (user_info) => {
            if(user_info){
              this.avatar_image = "/api" + user_info.data.avatar
              this.avatar_ref = "/user/" + user_info.data.id
            }
          })
    }
  },
  created() {
    isAdmin().then(
        (result) => {
          this.isAdmin = result
        }
    )
  }
}
</script>

<style>

</style>