<template>
  <div>
    <t-row>
      <t-col flex="auto">
        <t-input v-model="keyword" clearable placeholder="搜索" @clear="() => this.keyword=''"
        @change="() => keyword===''?page(currentPage):undefined"/>
      </t-col>
      <t-col flex="20px">
        <t-button theme="default" @click="() => page(currentPage)">
          <search-icon />
        </t-button>
      </t-col>
    </t-row>

    <user-list :users="users"/>
    <custom-pagination @changeCurrentPage="changeCurrentPage" @changePageSize="changePageSize" v-model:total="total"/>
  </div>
</template>

<script>
import axios from "axios";
import {SearchIcon} from "tdesign-icons-vue-next";
import qs from "qs";
import CustomPagination from "./CustomPagination";
import UserList from "./UserList";
import {getUserHeaders} from "../utils/utils";

export default {
  name: "UserSearch",
  components: {SearchIcon, CustomPagination, UserList},
  data(){
    return{
      users: null,
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
      axios.post("api/admin/list", qs.stringify({
        "currentPage": currentPage,
        "pageSize": this.pageSize,
        "keywords": this.keyword
      }), {
        headers: getUserHeaders()
      }).then((result) => {
        const data = result.data.data
        self.users = data.records
        self.currentPage = data.current
        self.pageSize = data.size
        self.total = data.total
      })
    },
    async count(){
      let count;
      await axios.post("/api/admin/total?keywords="+this.keyword).then(
          (response) => {
            count = response.data.data
          }
      )
      return count
    }
  }
}

</script>
