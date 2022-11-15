<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <textarea class="form-control border-input"
           v-bind="$attrs"
           v-model="data"
           v-on="$listeners">
    </textarea>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      value: [String, Number],
      label: String
    },
    data () {
      return {
        data: this.value
      }
    }
  }

</script>
<style>

</style>
