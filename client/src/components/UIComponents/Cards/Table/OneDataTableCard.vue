<template>
    <div v-bind:class="widthLevel">
      <div class="card">
        <!-- <one-data-paper-table :data="table.data" :column="table.column"> -->
        <one-data-paper-table :data="data" :column="title">

        </one-data-paper-table>
      </div>
    </div>
</template>
<script>
  import OneDataPaperTable from './OneDataPaperTable.vue'

  export default {
    components: {
      OneDataPaperTable
    },
    props: {
      title: {
        type: String,
        default: 'Chart title'
      },
      data: {
        type: String,
        default: ''
      },
      // table: {
      //   type: Object,
      //   default: () => {
      //     return {}
      //   }
      // },
      widthLevel: {
        type: String,
        default: 'col-md-6' // 50% col-md-1 ~ col-md-12
      }
    }
  }

</script>
<style>

</style>
