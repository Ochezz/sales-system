<template>
  <!-- <div class="header">
    <slot name="header">
      <h4 class="title">{{title}}</h4>
      <p class="category">{{subTitle}}</p>
    </slot>
  </div> -->
  <div class="one-data-table-content table-responsive table-full-width one-data-table-wrap">
    <table class="table one-data-table">
      <thead>
        <th class="one-data-table-th">{{column}}</th>
      </thead>
      <tbody>
        <tr>
          <td class="one-data-table-td">{{data}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      column: String,
      data: String
    }
    // ,computed: {
    //   tableClass () {
    //     return `table-${this.type}`
    //   }
    // }
  }

</script>
<style scoped>

</style>
