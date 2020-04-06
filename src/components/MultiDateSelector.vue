<template>
  <div class="mds-component">
    <div class="mds-calendar-selector">
      <div class="mds-select-prev-next" @click="decMonth">
        <slot name="previous-month">&lt;&lt;</slot>
      </div>
      <div class="mds-select-cell">
        <MonthSelector :value="month" @input="selectMonth"></MonthSelector>
      </div>
      <div class="mds-select-cell">
        <YearSelector :value="year" @input="selectYear"></YearSelector>
      </div>
      <div class="mds-select-prev-next" @click="incMonth">
        <slot name="next-month">&gt;&gt;</slot>
      </div>
    </div>
    <MonthView
      :value="currentDate"
      :selection="internalSelection"
      @input="monthUpdated"
      :key="monthViewKey"
    />
  </div>
</template>

<script>
import utils from "../utils/DateUtils";
import YearSelector from "./YearSelector";
import MonthSelector from "./MonthSelector";
import MonthView from "./MonthView";

export default {
  name: "MultiDateSelector",
  components: {
    YearSelector,
    MonthSelector,
    MonthView
  },
  props: {
    selected: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      currentDate: new Date(
        Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1)
      ),
      internalSelection: [...this.selected],
      monthViewKey: 1
    };
  },
  mounted: function() {
    // !!! do not use () => on mounted ...
    this.internalUpdate();
  },
  watch: {
    selected() {
      this.internalUpdate();
    }
  },
  computed: {
    year() {
      return {
        label: this.currentDate.getFullYear(),
        value: this.currentDate.getFullYear()
      };
    },
    month() {
      return {
        label: this.currentDate.toLocaleString("default", { month: "long" }),
        value: this.currentDate.getMonth()
      };
    }
  },

  methods: {
    internalUpdate() {
      this.internalSelection = this.selected;
    },
    selectYear(year) {
      let d = new Date(this.currentDate);
      d.setFullYear(year);
      this.currentDate = d;
    },
    selectMonth(month) {
      let d = new Date(this.currentDate);
      d.setMonth(month);
      this.currentDate = d;
    },
    incMonth() {
      let d = new Date(this.currentDate);
      d.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = d;
    },
    decMonth() {
      let d = new Date(this.currentDate);
      d.setMonth(this.currentDate.getMonth() - 1);
      this.currentDate = d;
    },
    monthUpdated(days) {
      let minDate = new Date(this.currentDate);
      let maxDate = new Date(this.currentDate);
      maxDate.setDate(
        utils.daysInMonth(
          this.currentDate.getFullYear,
          this.currentDate.getMonth()
        )
      );
      // add days to filtered selection
      let selected = [
        ...this.selected.filter(
          d => d.getTime() < minDate || d.getTime() > maxDate
        ),
        ...days
      ];
      this.internalSelection = [...selected];
      this.monthViewKey += 1;
      this.$emit("input", selected);
    }
  }
};
</script>
<style scoped>
.mds-component {
  width: -moz-min-content;
  width: min-content;
}

.mds-calendar-selector {
  display: flex;
}

.mds-select-cell {
  flex: 1;
  padding: 12px;
}

.mds-select-prev-next { 
  padding: 12px;
}
</style>