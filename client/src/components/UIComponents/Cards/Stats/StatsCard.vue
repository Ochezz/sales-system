<template>
  <div v-bind:class="widthLevel">
    <div class="card">
      <div class="content">
        <div class="row">
          <!-- <div class="col-xs-5">
            <slot name="header">a</slot>
          </div>
          <div class="col-xs-7">
            <slot name="content">s</slot>
          </div> -->

          <!-- <div class="col-xs-2">
            <div v-bind:class="'icon-big text-center ' + iconCondition">
              <i v-bind:class="iconName"></i>
            </div>
          </div> -->
          <div class="col-xs-12">
            <p class="stats-title-text">{{title}}</p>
            <p class="stats-data-text">{{statsData}}</p>
            <!-- <p class="stats-sub-text">{{subTitle}}</p> -->
          </div>
          <!-- <div class="col-xs-4 numbers">
          </div> -->
        </div>
        <!-- <div class="footer">
          <hr/>
          <slot name="footer"></slot>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'stats-card',
    props: {
      title: {
        type: String,
        default: 'stats title'
      },
      // subTitle: {
      //   type: String,
      //   default: 'sub title'
      // },
      statsData: {
        type: String,
        default: ''
      },
      widthLevel: {
        type: String,
        default: 'col-md-6' // 50% col-md-1 ~ col-md-12
      }
      // iconName: {
      //   type: String,
      //   default: ''
      // },
      // iconCondition: {
      //   type: String,
      //   default: 'icon-primary' // icon-primary icon-info icon-success icon-warning icon-danger
      // }
    }
  }

</script>
<style>
  
</style>
