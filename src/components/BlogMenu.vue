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
        <router-link to="/login">
          <t-icon class="t-menu__operations-icon" name="login" />
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

import {isAdmin} from "../utils/utils";

export default {
  name: "BlogMenu",
  data(){
    return {
      isAdmin: false
    }
  },
  methods:{
    changeHandler(active){
      this.$router.push("/"+active)
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