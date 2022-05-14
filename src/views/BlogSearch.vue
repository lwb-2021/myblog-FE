<template>
  <div>
    <t-row>
      <t-col flex="auto">
        <t-input v-model="keyword" clearable placeholder="搜索" @clear="() => this.keyword=''"
        @change="() => keyword===''?page(currentPage):undefined"/>
      </t-col>
      <t-col flex="20px">
        <t-button theme="default" @click="() => page(currentPage)">
          <search-icon/>
        </t-button>
      </t-col>
    </t-row>

    <blog-list :blogs="blogs"/>
    <blog-pagination @changeCurrentPage="changeCurrentPage" @changePageSize="changePageSize" v-model:total="total"/>
  </div>
</template>

<script>
import BlogPagination from "../components/BlogPagination"
import BlogList from "../components/BlogList";
import axios from "axios";
import {SearchIcon} from "tdesign-icons-vue-next";
import qs from "qs";

export default {
  name: "BlogSearch",
  components: {SearchIcon, BlogList, BlogPagination},
  data(){
    return{
      blogs: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      keyword: ""
    }
  },
  created() {
    this.page(1)
  },
  methods: {
    changeCurrentPage(currentPage){
      this.currentPage = currentPage
      this.page(this.currentPage)
    },
    changePageSize(pageSize){
      this.pageSize = pageSize
      this.page(this.currentPage)
    },
    page (currentPage) {
      const self = this
      axios.post("api/blog/list", qs.stringify({
        "currentPage": currentPage,
        "pageSize": this.pageSize,
        "keywords": this.keyword
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((result) => {
        const data = result.data.data
        self.blogs = data.records
        self.currentPage = data.current
        self.pageSize = data.size
        self.total = data.total
      })
    },
    async count(){
      let count;
      await axios.post("/api/blog/total?keywords="+this.keyword, ).then(
          (response) => {
            count = response.data.data
          }
      )
      return count
    }
  }
}

</script>
