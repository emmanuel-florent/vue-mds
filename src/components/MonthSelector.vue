<template>
  <span>
    <MdsSelect :value="value" :options="months" @input="selectMonth" />
  </span>
</template>

<script>
import MdsSelect from "./MdsSelect";

export default {
  name: "MonthSelector",
  components: {
    MdsSelect
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectMonth(value) {
      this.$emit("input", value);
    }
  },
  computed: {
    months() {
      let monthArr = [];
      for (let i = 0; i < 12; i++) {
          let d = new Date() 
          d.setMonth(i)
        monthArr.push({
            value: i,
            label: d.toLocaleString('default', { month: 'long' })
        });
      }
      return monthArr;
    }
  }
};
</script>