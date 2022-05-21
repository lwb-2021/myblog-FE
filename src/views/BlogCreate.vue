<template>
  <blog-editor :form-data="formData" title="创建博客" submit-interface="create"/>
</template>
<script>
import {ref} from "vue";

export default {
  data(){
    const INITIAL_DATA = {
      title: "",
      tags: "",
      content: ""
    }
    const formData = ref({...INITIAL_DATA})
    return {
      formData: formData,
    }
  }
}
</script>