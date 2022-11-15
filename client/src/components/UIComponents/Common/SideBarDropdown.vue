<template>
  <li class="sidebardropdown" :class="{open:isOpen}" @click.stop="toggleDropDown($event)">
    <a class="sidebardropdown-toggle btn-rotate" data-toggle="dropdown" href="javascript:void(0)">
      <slot name="title">
        <i :class="icon"></i>
        <p class="notification">{{title}}
          <b class="caret"></b>
        </p>
      </slot>
    </a>
    <ul class="sidebardropdown-menu">
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default{
    props: {
      title: String,
      icon: String
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleDropDown (e) {
        this.isOpen = !this.isOpen
        document.getElementsByClassName('sidebardropdown open').forEach(element => {
          if (element === e.target) {
            this.isOpen = !this.isOpen
          }
        })
        document.getElementsByClassName('sidebardropdown-menu').forEach(element => {
          if (element.contains(e.target)) {
            this.isOpen = !this.isOpen
          }
        })
        document.getElementsByClassName('sidebardropdown-toggle').forEach(element => {
          if (element.contains(e.target)) {
            this.$parent.arrowMovePx = e.target.getBoundingClientRect().top - 195
          }
        })
      }
    }
  }
</script>
