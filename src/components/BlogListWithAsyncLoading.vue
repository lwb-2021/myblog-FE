<template>
  <t-list :split="true" :async-loading="async_loading" @load-more="page">
    <div class="item" v-for="blog in blogs">
      <blog-item :title="blog.title" :subtitle="blog.created" :preview-text="blog.content.slice(0, 50)"
                :author-id="blog.authorId" :id="blog.id"/>
    </div>
  </t-list>



</template>

<script>
import BlogItem from "./BlogItem";
import axios from "axios";
export default {
  name: "BlogListWithAsyncLoading",
  components: {BlogItem},
  data(){
    return{
      blogs: null,
      currentPage: 0,
      loading: false,
      total: 0,
      loaded: 0
    }
  },
  async created(){
    this.total = await this.count()
    this.page()
  },
  methods: {
    page() {
      if(this.loaded >= this.total){
        return
      }
      this.loading = true
      const self = this
      axios.get("api/blog/list?currentPage=" + (this.currentPage + 1)).then(res => {
        const data = res.data.data
        console.log(data)
        self.blogs = data.records
        self.currentPage = data.current
        self.loaded += data.size
        this.loading = false
      })
    },
    async count(){
      let count;
      await axios.post("/api/blog/total").then(
          (response) => {
            count = response.data.data
          }
      )
      return count
    }
  },
  computed:{
    async_loading(){
      if(this.loading){
        return "loading"
      }else if(this.loaded >= this.total){
        return ""
      } else {
        return "load-more"
      }
    }
  }
}

</script>
