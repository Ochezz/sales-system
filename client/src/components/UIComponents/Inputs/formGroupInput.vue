<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <input class="form-control border-input"
           v-bind="$attrs"
           v-model="data"
           @input="$emit('input', $event.target.value)"
           v-on="$listeners">
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
