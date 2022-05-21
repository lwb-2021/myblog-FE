<template>
  <t-list :split="true">
    <div class="item" v-for="blog in blogs">
      <blog-item :title="blog.title" :subtitle="blog.created" :preview-text="blog.content.slice(0, 50)"
                :author-id="blog.authorId" :id="blog.id" :tags="blog.tags.split(';')"/>
    </div>
  </t-list>



</template>

<script>
import BlogItem from "./BlogItem";
export default {
  name: "BlogList",
  components: {BlogItem},
  props: ["blogs"],
}

</script>
