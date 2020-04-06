<template>
  <div>
    <table class="month-view">
      <thead>
        <td class="tblHead"></td>
        <td
          @click="onAllDayOfWeekInMonthSelected(ct)"
          :key="ct"
          v-for="(__, ct) of new Array(7)"
          class="tblHead"
        >{{localizedWeekDay(ct)}}</td>
      </thead>
      <tbody>
        <tr :key="week" v-for="(__, week) of new Array(weeksRowsInMonth())">
          <td @click="onWeekSelected(week)" class="tblHead">{{firstWeekOfMonth() + week}}</td>
          <td
            @mousedown="onMouseDown((week * 7) + day)"
            @mouseup="onMouseUp((week * 7) + day)"
            :key="day"
            v-for="(__,day) of new Array(7)"
            class="monthCell"
            :class="{ dayselected: monthDaysArray[(week * 7) + day].selected}"
          >{{monthDaysArray[(week * 7) + day].label}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "./MonthView.sass";
import utils from "../utils/DateUtils";

export default {
  props: {
    value: {
      type: Date,
      required: true
    },
    naSign: {
      type: String,
      required: false,
      default: "-"
    },
    selection: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      monthDaysArray: this.calcMonthDaysArray(),
      startSelection: null,
      stopSelection: null,
      componentYear: null,
      componentMonth: null
    };
  },
  methods: {
    submitArrayOfDateAsCellNum(arr) {
      let selection = [...this.selection];
      for (let i = 0; i < arr.length; i++) {
        if (this.monthDaysArray[arr[i]].label != this.naSign) {
          let d = new Date(
            Date.UTC(
              this.componentYear,
              this.componentMonth,
              this.monthDaysArray[arr[i]].label,
              0,
              0,
              0
            )
          );
          // add or remove if inside
          if (selection.filter(i => i.getTime() == d.getTime()).length == 0) {
            selection.push(d);
          } else {
            selection = selection.filter(i => i.getTime() != d.getTime());
          }
        }
      }
      // emitable selection
      this.$emit("input", selection);
    },
    onAllDayOfWeekInMonthSelected(d) {
      let arr = [];
      for (let i = 0; i < this.weeksRowsInMonth(); i++) {
        let j = d + i * 7;
        arr.push(j);
      }
      this.submitArrayOfDateAsCellNum(arr);
    },
    onWeekSelected(w) {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        let j = w * 7 + i;
        arr.push(j);
      }
      this.submitArrayOfDateAsCellNum(arr);
    },
    onMouseDown(cellIndex) {
      this.startSelection = cellIndex;
    },
    onMouseUp(cellIndex) {
      // handle simple click special case
      if (this.startSelection == null) {
        this.startSelection = cellIndex;
      }
      // multiple selection
      if (this.startSelection > this.startSelection) {
        let oldEnd = this.stopSelection;
        this.stopSelection = this.startSelection;
        this.startSelection = oldEnd;
      }
      let arr = [];
      for (let i = this.startSelection; i <= cellIndex; i++) {
        arr.push(i);
      }
      this.submitArrayOfDateAsCellNum(arr);
      // reset UI action
      this.startSelection = null;
    },
    weeksRowsInMonth() {
      let dayInMonth = utils.daysInMonth(
        this.componentYear,
        this.componentMonth
      );
      let dayOfMonthBegin = utils.dayOfMonthBegin(this.value);
      let subTotal = dayOfMonthBegin + dayInMonth;
      return Math.trunc(subTotal / 7) + 1;
    },
    calcMonthDaysArray() {
      this.componentYear = this.value.getFullYear();
      this.componentMonth = this.value.getMonth();
      // this function is called by current year-month watcher and used
      // to fill the month view
      // this construct an array where each cell is indexed by number
      // think 0 to 40 with days 1 to 30 inside.
      const arr = [];
      // fill an empty array with "-"
      for (let i = 0; i < 8 * 7; i++) {
        arr.push({ label: this.naSign, selected: false });
      }
      // construct days ...
      let dayNum = 1;
      // loop for all days in month
      for (
        let i = utils.dayOfMonthBegin(this.value);
        i <
        utils.dayOfMonthBegin(this.value) +
          utils.daysInMonth(this.componentYear, this.componentMonth);
        i++
      ) {
        // generate date in loop
        let d = new Date(
          Date.UTC(this.componentYear, this.componentMonth, dayNum, 0, 0, 0)
        );
        // flag as selected if date in selection
        let selected = false;
        if (this.selection.filter(i => i.getTime() == d.getTime()).length > 0) {
          selected = true;
        }
        arr[i] = { label: dayNum, selected };
        dayNum++;
      }
      return arr;
    },
    firstWeekOfMonth() {
      return utils.firstWeekOfMonth(this.value);
    },
    internalUpdate() {
      this.monthDaysArray = this.calcMonthDaysArray();
      this.componentYear = this.value.getFullYear();
      this.componentMonth = this.value.getMonth();
    },
    localizedWeekDay(d) {
      return utils.localizedWeekDay(d);
    }
  },
  mounted: function() {
    // !!! do not use () => on mounted ...
    this.internalUpdate();
  },
  watch: {
    value() {
      this.internalUpdate();
    }
  }
};
</script>
