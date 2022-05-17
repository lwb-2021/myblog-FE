<template>
  <t-list :split="true">
    <div class="item" v-for="user in users">
      <user-item :id="user.id" :username="user.username" :avatar="user.avatar"/>
    </div>
  </t-list>
</template>

<script>
import UserItem from "./UserItem";
export default {
  name: "UserList",
  props: ["users"],
  components:{UserItem}
}
</script>

<style>
</style>