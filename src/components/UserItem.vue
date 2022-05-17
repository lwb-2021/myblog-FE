<template>
  <t-list-item>
    <t-list-item-meta>
      <template #title>
        {{username}}
      </template>

      <template #description>
        用户介绍暂未实现
      </template>
    </t-list-item-meta>
    <template #action>
      <t-button shape="square" @click="() => clickHandler(option)" variant="text" v-for="option in options">
        <t-tooltip :content="option.content">
          <icon-font :name="option.icon" />
        </t-tooltip>
      </t-button>
<!--      <t-dropdown :options="more_options" @click="clickHandler">-->
<!--        <t-button variant="text">-->
<!--          <more-icon />-->
<!--        </t-button>-->
<!--      </t-dropdown>-->
    </template>

  </t-list-item>


</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue-next';
import {toRefs} from "vue";
import {useRouter} from "vue-router";
import {IconFont, MoreIcon} from "tdesign-icons-vue-next";
import axios from "axios";
import {getUserHeaders} from "../utils/utils";
const props = defineProps(["id", "username", "avatar"])
const _props = toRefs(props)
let options = [
];

options.push({
  content: "锁定",
  value: 1,
  icon: "lock-on"
})
options.push({
  content: "解锁",
  value: 2,
  icon: "lock-off"
})
const router = useRouter()
const clickHandler = (data) => {
  switch (data.value){
    case 1:
      axios.post("/api/admin/lock", {
        "id": props.id
      }, {
        headers: getUserHeaders()
      }).then(
          (result) => {
            MessagePlugin.success("锁定成功")
          }
      )
      break
    case 2:
      axios.post("/api/admin/unlock", {
        "id": props.id
      }, {
        headers: getUserHeaders()
      }).then(
          (result) => {
            MessagePlugin.success("解锁成功")
          }
      )
      break
    default:
      MessagePlugin.error("现在还不支持" + data.content + "功能")
  }
};
</script>
<script>
export default {
  name: "UserItem",
  created() {
  }

}
</script>

<style>
</style>