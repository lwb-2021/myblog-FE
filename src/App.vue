<template>
  <BlogMenu />
  <div class="view">
    <router-view />
  </div>

</template>

<script>

export default {

}

</script>
<style>
:root,
#app {
  width: 100%;
  height: 100%;
}
body{
  width: 100%;
  height: 100%;
  background: #f3f4f6;
}
div.view{
  padding-top: 10px;
  width: 100%;
  height: 100%;
}
</style>