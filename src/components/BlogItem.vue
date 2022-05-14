<template>
    <t-list-item :subtitle="subtitle">
      <t-list-item-meta @click="this.$router.push('/blog/view/' + id)">
        <template #title>
          {{title}}
        </template>

        <template #description>
          {{previewText}}
        </template>
      </t-list-item-meta>
      <template #action>
        <t-button shape="square" @click="() => clickHandler(option)" variant="text" v-for="option in options">
          <t-tooltip :content="option.content">
            <icon-font :name="option.icon" />
          </t-tooltip>
        </t-button>
        <t-dropdown :options="more_options" @click="clickHandler">
          <t-button variant="text">
            <more-icon />
          </t-button>
        </t-dropdown>
      </template>

    </t-list-item>


</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue-next';
import {isUser} from "../utils/utils";
import {toRefs} from "vue";
import {useRouter} from "vue-router";
import {IconFont, MoreIcon} from "tdesign-icons-vue-next";
const props = defineProps(["id", "title", "subtitle", "previewText", "authorId"])
const _props = toRefs(props)
let options = [
];
if(isUser(_props.authorId.value)){
  options.push({
    content: "编辑",
    value: 1,
    icon: "edit"
  })
  options.push({
    content: "删除",
    value: 2,
    icon: "delete"
  })
}
let more_options = []
more_options.push({
  content: "举报",
  value: 3
})

const router = useRouter()
const clickHandler = (data) => {
  switch (data.value){
    case 1:
      if(isUser(_props.authorId.value)){
        router.push("/blog/edit/"+ _props.id.value)
      }
      break
    case 2:
      if(isUser(_props.authorId.value)){
        router.push("/blog/delete/"+ _props.id.value)
      }
      break
    default:
      MessagePlugin.error("现在还不支持" + data.content + "功能")
  }
};
</script>
<script>
export default {
  name: "BlogItem",
  created() {
    // console.log([this.id, this.title, this.subtitle, this.previewText, this.authorId])
  }

}
</script>

<style>
</style>