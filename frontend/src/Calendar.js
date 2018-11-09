export default class Calendar {
    constructor(periods) {
	this.date = new Date();
	this.displayableDaysOfMonth = this.getDisplayableDaysOfMonth();
	this.displayablePeriods = null;
	this.periods = null;
	this.setPeriods(periods);
    }

    setPeriods(periods) {
	this.periods = periods;
	this.displayablePeriods = this.getDisplayablePeriods();
    }

    getActivity(date) {
	if(this.periods[date.getFullYear()]
	   && this.periods[date.getFullYear()][date.getMonth()]
	   && this.periods[date.getFullYear()][date.getMonth()][date.getDate()]
	   && this.periods[date.getFullYear()][date.getMonth()][date.getDate()][date.getHours()]
	   && this.periods[date.getFullYear()][date.getMonth()][date.getDate()][date.getHours()][date.getMinutes()])
	    return this.periods[date.getFullYear()][date.getMonth()][date.getDate()][date.getHours()][date.getMinutes()];
	else
	    return null;
    }

    getStartOfWeek() {
	var date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0);
	date.setDate(this.getMondayDayOfMonth());
	return date;
    }

    getDisplayablePeriods() {
	var periods = [];
	var date = null;
	for(var i = 0; i < 48; ++i) {
	    date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), Math.floor(i/2), i%2!==0?30:0, 0);
	    date.setDate(this.getMondayDayOfMonth());
	    periods.push([
		this.getActivity(date),
		this.getActivity(new Date(date.setDate(date.getDate()+1))),
		this.getActivity(new Date(date.setDate(date.getDate()+1))),
		this.getActivity(new Date(date.setDate(date.getDate()+1))),
		this.getActivity(new Date(date.setDate(date.getDate()+1))),
		this.getActivity(new Date(date.setDate(date.getDate()+1))),
		this.getActivity(new Date(date.setDate(date.getDate()+1))),
	    ]);
	}
	return periods;
    }

    getDisplayableDaysOfMonth() {
	var displayableDaysOfMonth = [];
	var date = new Date(this.date.getYear(), this.date.getMonth(), this.getMondayDayOfMonth()-1);
	for(var i = 0; i < 7; ++i) {
	    date.setDate(date.getDate() + 1);
	    displayableDaysOfMonth.push(date.getDate());
	}
	return displayableDaysOfMonth;
    }

    today() {
	this.date = new Date();
	this.displayableDaysOfMonth = this.getDisplayableDaysOfMonth();
	this.displayablePeriods = this.getDisplayablePeriods();
    }

    previousWeek() {
	this.date.setDate(this.date.getDate() - 7);
	this.displayableDaysOfMonth = this.getDisplayableDaysOfMonth();
	this.displayablePeriods = this.getDisplayablePeriods();
    }

    nextWeek() {
	this.date.setDate(this.date.getDate() + 7);
	this.displayableDaysOfMonth = this.getDisplayableDaysOfMonth();
	this.displayablePeriods = this.getDisplayablePeriods();
    }

    getMondayDayOfMonth() {
	return this.date.getDate() - (this.date.getDay() - 1);
    }

    getSundayDayOfMonth() {
	return this.date.getDate() + (7 - this.date.getDay());
    }

    getStartWeek() {
	let date = new Date(this.date);
	date.setDate(this.getMondayDayOfMonth());
	return date;
    }

    getEndWeek() {
	let date = new Date(this.date);
	date.setDate(this.getSundayDayOfMonth());
	return date;
    }
}
