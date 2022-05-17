<template>
  <div>
    <t-pagination
        :total="total"
        show-jumper
        @pageSizeChange="changePageSize"
        @currentChange="changeCurrentPage"
    />
  </div>
</template>

<script setup>
</script>
<script>
export default {
  props: ["total"],
  methods:{
    changeCurrentPage(currentPage, pageInfo){
      this.$emit("changeCurrentPage", currentPage)
    },
    changePageSize(pageSize){
      this.$emit("changePageSize", pageSize)
    },
  },
}
</script>