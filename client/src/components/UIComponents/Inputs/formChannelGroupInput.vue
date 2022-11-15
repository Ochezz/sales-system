<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <div>
      <div>소스/매체 다음과 일치</div>
      <input class="form-control border-input"
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
            v-on="$listeners">
    </div>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      value: [String, Number],
      label: String
    }
  }

</script>
<style>

</style>
