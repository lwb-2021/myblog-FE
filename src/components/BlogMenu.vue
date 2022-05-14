<template>
  <div>
    <t-head-menu v-model="menuValue" theme="light" @change="changeHandler">
      <template #logo>

      </template>
      <t-menu-item value="home"> 主页 </t-menu-item>
      <t-menu-item value="blog"> 博客 </t-menu-item>

      <template #operations>
        <a href="javascript:void(0)"
           @click="this.$router.push('/blog/search')"><t-icon class="t-menu__operations-icon"
                                                              name="search"/></a>
        <a href="javascript:void(0)"
           @click="this.$router.push('/blog/create')"><t-icon class="t-menu__operations-icon"
                                                              name="edit"/></a>
        <a href="javascript:void(0)"
           @click="this.$router.push('/blog/login')"><t-icon class="t-menu__operations-icon" name="login" /></a>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuValue = ref('item2');


</script>
<script>

export default {
  name: "BlogMenu",
  methods:{
    changeHandler(active){
      console.log('change', active);
      this.$router.push("/"+active)
    }
  }
}
</script>

<style>

</style>