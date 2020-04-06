Date.prototype.getWeek = function() {
  // get the week number in year (1 to 52)
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

const utils = {
  getFullYear(pDate) {
    return pDate.getUTCFullYear()
  },
  daysInMonth(year, month) {
    return new Date(Date.UTC(year, month, 0)).getDate();
  },
  dayOfMonthBegin(pDate) {
    pDate.setDate(1);
    return pDate.getDay();
  },
  localizedWeekDay(day) {
    // take and return  0: Sun, 1: Mon, 2: Tue...
    // this is just an ugly hack to get some cheap i18n
    let d = new Date(Date.UTC(1971, 1, day )) 
    return d.toLocaleString(d, { weekday: "short" });
  }, 
  firstWeekOfMonth(pDate) {
    pDate.setDate(1);
    return pDate.getWeek();
  }   
}

export default utils;