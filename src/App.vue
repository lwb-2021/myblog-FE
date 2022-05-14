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
#app {
  width: 100%;
  height: 100%;
}
:root,
body{
  width: 100%;
  height: 100%;
  background: #f3f4f6;
}
div.view{
  padding-top: 10px;
}
</style>