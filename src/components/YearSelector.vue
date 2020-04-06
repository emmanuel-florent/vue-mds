<template>
    <span>
        <MdsSelect :value="value" :options="years" @input="selectYear"/>
    </span>
</template>

<script>
import "./MultiDateSelector.sass";
import MdsSelect from "./MdsSelect"

export default {
  name: "YearSelector",
    components: {
    MdsSelect,
    },  
  props: {
    value: {
        type: Object,
        required: true,
    },
    range: {
        type: Number,
        required: false,
        default: 5
    },
  },
  methods: {
    selectYear(year) {
      this.$emit("input", year);
    }
  },
  computed: {
    years() {
      let years = [];
      const minimum = this.value.value - this.range;
      const maximum = this.value.value + this.range;
      for (let i = minimum; i < maximum; i++) {
        years.push({
            label: i,
            value: i
        });
      }
      return years;
    },
  },
};
</script>
