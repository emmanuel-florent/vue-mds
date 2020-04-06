<template>
  <div
    class="custom-select"
    @blur="open = false"
  > 
    <div
      class="selected"
      :class="{open: open}"
      @click="open = !open"
    >
      {{ selected.label }}
    </div>
    <div
      class="items"
      :class="{selectHide: !open}"
    >
      <div
        class="item"
        v-for="(option, i) of options"
        :key="i"
        @click="selected=option; open=false; $emit('input', option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<script>
import "./MdsSelect.sass";

export default {
  props:{
    options:{
      type: Array,
      required: true
    },
    value:{}   
  },
  data() {
    return {
      selected: this.value,
      open: false
    };
  },
  watch: {
    value(newValue) {
      this.selected= newValue
    }
  },
};
</script>