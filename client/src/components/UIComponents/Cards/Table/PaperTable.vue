<template>
  <div>
    <div class="header">
      <slot name="header">
        {{title}}
        <!-- <h4 class="title">{{title}}</h4> -->
        <!-- <p class="category">{{subTitle}}</p> -->
      </slot>
      <div class='detail-icon-wrap'>
        <router-link :to="{path:link}">
          <i class="ti-plus detail-icon"></i>
        </router-link>
      </div>
    </div>
    <div class="content table-responsive">
      <table class="table" :class="tableClass">
        <thead>
          <th v-for="column in columns">{{column}}</th>
        </thead>
        <tbody>
          <tr v-for="item in data">
            <!-- <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td> -->
            <!-- <td v-if="item === undefined">등록된 예약현황이 없습니다</td> -->
            <td v-for="(column, index) in columns">{{item[index]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      columns: Array,
      data: Array,
      type: {
        type: String, // striped | hover
        default: 'striped'
      },
      title: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      }
      // ,subTitle: {
      //   type: String,
      //   default: ''

      // }
    },
    computed: {
      tableClass () {
        return `table-${this.type}`
      }
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      }
    }
  }

</script>
<style>

</style>
