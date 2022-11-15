<template>
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar bar1"></span>
      <span class="icon-bar bar2"></span>
      <span class="icon-bar bar3"></span>
    </button>
  </div>
</template>
<script>
  export default {
    methods: {
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      }
    }
  }

</script>
<style>

</style>
