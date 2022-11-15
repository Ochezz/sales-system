<template>
    <div v-bind:class="widthLevel">
      <div class="card card-plain">
        <paper-table type="hover" :title="table.title" :sub-title="table.subTitle" :data="table.data" :columns="table.columns">

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
      table: {
        type: Object,
        default: () => {
          return {}
        }
      },
      widthLevel: {
        type: String,
        default: 'col-md-6' // 50% col-md-1 ~ col-md-12
      }
    }
  }

</script>
<style>

</style>
