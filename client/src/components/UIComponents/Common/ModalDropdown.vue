<template>
  <li class="modaldropdown" :class="{open:isOpen}" @click.stop="()=>isOpen=true">
      <slot name="title">
        <p v-if="isOpen===false" class="notification">{{title}}
          <b class="caret"></b>
        </p>
      </slot>
    <ul class="modaldropdown-menu">
      <slot>
      </slot>
      <button class="btn-detail float-right" @click.stop="()=>isOpen=false">취소</button>
    </ul>
  </li>
</template>
<script>
  export default{
    props: {
      title: String
    },
    data () {
      return {
        isOpen: false
      }
    }
  }
</script>
