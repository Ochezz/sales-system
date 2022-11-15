<template>
    <div v-bind:class="widthLevel">
      <div class="card">
        <paper-table :title="title" :data="tableData.data" :columns="tableData.columns" :link="link">

        </paper-table>
      </div>
    </div>
</template>
<script>
  import PaperTable from './PaperTable.vue'

  export default {
    components: {
      PaperTable
    },
    props: {
      title: {
        type: String,
        default: 'Chart title'
      },
      tableData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      widthLevel: {
        type: String,
        default: 'col-md-6' // 50% col-md-1 ~ col-md-12
      },
      link: {
        type: String,
        default: ''
      }
    }
  }

</script>
<style>

</style>
