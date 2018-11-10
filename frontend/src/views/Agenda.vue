<template>
<div class="agenda">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="false" v-bind:agenda="true" v-bind:startDate="this.calendar.getStartWeek()" v-bind:endDate="this.calendar.getEndWeek()" v-bind:noLocalChanger="true" v-bind:xSmallScreen="xSmallScreen" v-on:back="back" v-on:today="today" v-on:previous="previousWeek" v-on:next="nextWeek"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div class="md-layout">
      <div class="md-layout-item days"><md-content class="md-primary header-row"><md-datepicker v-model="selectedDate" md-immediately /></md-content></div>
      <div class="md-layout-item days">
	<md-content v-if=!mediumScreen class="md-primary small-header-row"><div class="smallDayOfWeek">{{$t('mon')}}</div><h4 class="smallDayOfWeek">{{calendar.displayableDaysOfMonth[0]}}</h4></md-content>
	<md-content v-if=mediumScreen class="md-primary header-row"><span class="dayOfWeek">{{$t('mon')}}</span><h4 class="dayOfWeek">{{calendar.displayableDaysOfMonth[0]}}</h4></md-content>
      </div>
      <div class="md-layout-item days">
	<md-content v-if=!mediumScreen class="md-primary small-header-row"><div class="smallDayOfWeek">{{$t('tue')}}</div><h4 class="smallDayOfWeek">{{calendar.displayableDaysOfMonth[1]}}</h4></md-content>
	<md-content v-if=mediumScreen class="md-primary header-row"><span class="dayOfWeek">{{$t('tue')}}</span><h4 class="dayOfWeek">{{calendar.displayableDaysOfMonth[1]}}</h4></md-content>
      </div>
      <div class="md-layout-item days">
	<md-content v-if=!mediumScreen class="md-primary small-header-row"><div class="smallDayOfWeek">{{$t('wed')}}</div><h4 class="smallDayOfWeek">{{calendar.displayableDaysOfMonth[2]}}</h4></md-content>
	<md-content v-if=mediumScreen class="md-primary header-row"><span class="dayOfWeek">{{$t('wed')}}</span><h4 class="dayOfWeek">{{calendar.displayableDaysOfMonth[2]}}</h4></md-content>
      </div>
      <div class="md-layout-item days">
	<md-content v-if=!mediumScreen class="md-primary small-header-row"><div class="smallDayOfWeek">{{$t('thu')}}</div><h4 class="smallDayOfWeek">{{calendar.displayableDaysOfMonth[3]}}</h4></md-content>
	<md-content v-if=mediumScreen class="md-primary header-row"><span class="dayOfWeek">{{$t('thu')}}</span><h4 class="dayOfWeek">{{calendar.displayableDaysOfMonth[3]}}</h4></md-content>
      </div>
      <div class="md-layout-item days">
	<md-content v-if=!mediumScreen class="md-primary small-header-row"><div class="smallDayOfWeek">{{$t('fri')}}</div><h4 class="smallDayOfWeek">{{calendar.displayableDaysOfMonth[4]}}</h4></md-content>
	<md-content v-if=mediumScreen class="md-primary header-row"><span class="dayOfWeek">{{$t('fri')}}</span><h4 class="dayOfWeek">{{calendar.displayableDaysOfMonth[4]}}</h4></md-content>
      </div>
      <div class="md-layout-item days">
	<md-content v-if=!mediumScreen class="md-primary small-header-row"><div class="smallDayOfWeek">{{$t('sat')}}</div><h4 class="smallDayOfWeek">{{calendar.displayableDaysOfMonth[5]}}</h4></md-content>
	<md-content v-if=mediumScreen class="md-primary header-row"><span class="dayOfWeek">{{$t('sat')}}</span><h4 class="dayOfWeek">{{calendar.displayableDaysOfMonth[5]}}</h4></md-content>
      </div>
      <div class="md-layout-item days">
	<md-content v-if=!mediumScreen class="md-primary small-header-row"><div class="smallDayOfWeek">{{$t('sun')}}</div><h4 class="smallDayOfWeek">{{calendar.displayableDaysOfMonth[6]}}</h4></md-content>
	<md-content v-if=mediumScreen class="md-primary header-row"><span class="dayOfWeek">{{$t('sun')}}</span><h4 class="dayOfWeek">{{calendar.displayableDaysOfMonth[6]}}</h4></md-content>
      </div>
    </div>

    <md-dialog :md-active.sync="newPeriodDialogOpen">
      <md-dialog-title>{{$t('chooseTheActivity')}}</md-dialog-title>
      <div class="dialog-content">
	<md-field>
	  <md-select v-model="activityId" name="activity" id="activity" :placeholder="$t('activity')">
	    <md-option v-for="act in this.appData.activities" :key=act.id :value=act.id>{{act.name}}</md-option>
	  </md-select>
	</md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="newPeriodCancel">{{$t('cancel')}}</md-button>
        <md-button class="md-primary" @click.native="newPeriodConfirm">{{$t('comfirm')}}</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-content class="inner-calendar md-scrollbar">
      <div v-for="i in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]" class="agenda-row md-layout">
	<md-content class="md-layout-item agenda-row hours agenda-row-content hours" :class="{ smallHours: smallScreen, xSmallHours: xSmallScreen }">{{$d(new Date(0, 0, 0, i/2, i%2!==0?30:0, 0), 'hour')}}</md-content>
	<md-content v-on:dblclick="dblclickOnCell(0, i)" draggable="true" :col="0" :row="i" class="md-layout-item agenda-row md-medium-size-13 agenda-row-content draggable"></md-content>
	<md-content v-on:dblclick="dblclickOnCell(1, i)" draggable="true" :col="1" :row="i" class="md-layout-item agenda-row md-medium-size-13 agenda-row-content draggable"></md-content>
	<md-content v-on:dblclick="dblclickOnCell(2, i)" draggable="true" :col="2" :row="i" class="md-layout-item agenda-row md-medium-size-13 agenda-row-content draggable"></md-content>
	<md-content v-on:dblclick="dblclickOnCell(3, i)" draggable="true" :col="3" :row="i" class="md-layout-item agenda-row md-medium-size-13 agenda-row-content draggable"></md-content>
	<md-content v-on:dblclick="dblclickOnCell(4, i)" draggable="true" :col="4" :row="i" class="md-layout-item agenda-row md-medium-size-13 agenda-row-content draggable"></md-content>
	<md-content v-on:dblclick="dblclickOnCell(5, i)" draggable="true" :col="5" :row="i" class="md-layout-item agenda-row md-medium-size-13 agenda-row-content draggable"></md-content>
	<md-content v-on:dblclick="dblclickOnCell(6, i)" draggable="true" :col="6" :row="i" class="md-layout-item agenda-row md-medium-size-13 agenda-row-content draggable"></md-content>
      </div>
    </md-content>
  </md-content>
  <div id="dragImage"></div>
</div>
</template>

<script>
import axios from 'axios';

import TopBar from '../components/TopBar.vue'
import Calendar from '../Calendar.js'
import enums from '../appDataSchema.js';

export default {
    name: 'Agenda',
    data () {
	var localAppData = JSON.parse(localStorage.getItem('appData'));
	return {
	    colors: enums.COLORS,
	    appData: localAppData,
	    windowWidth: window.innerWidth,
	    widthListener: function() {
		this.windowWidth = window.innerWidth;
	    },
	    draging: false,
	    startDrag: {col: null, row: null},
	    currentDrag: {col: null, row: null},
	    calendar: new Calendar(localAppData.periods),
	    tmpDate: new Date(),
	    cells: null,
	    dragSrcEl: null,
	    dragCurEl: null,
	    newPeriodDialogOpen: false,
	    newPeriodData: {},
	    activityId: null,
	    selectedDate: null
	}
    },
    watch: {
	selectedDate: function(newDate, oldDate) {
	    if(oldDate && newDate.getTime() !== oldDate.getTime())
		this.setWeek(newDate);
	    let button = document.querySelector(".md-datepicker>button");
	    if(button) button.style.display = 'none';
	}
    },
    computed: {
	xSmallScreen() {
	    return this.windowWidth < 430;
	},
	smallScreen() {
	    return this.windowWidth < 700 && this.windowWidth >= 430;
	},
	mediumScreen() {
	    return this.windowWidth >= 700;
	}
    },
    components: {
	TopBar
    },
    beforeMount() {
	
    },
    mounted() {
	window.addEventListener('resize', () => {
	    this.widthListener();
	});
	this.initCells();
	document.querySelector(".md-datepicker>input").style.display = 'none';
	this.$material.locale = {
	    startYear: 1900,
	    endYear: 2099,
	    dateFormat: this.$t('dateFormat'),
	    days: [this.$t('sunday'), this.$t('monday'), this.$t('tuesday'), this.$t('wednesday'), this.$t('thursday'), this.$t('friday'), this.$t('saturday')],
	    shortDays: [this.$t('sun'), this.$t('mon'), this.$t('tue'), this.$t('wed'), this.$t('thu'), this.$t('fri'), this.$t('sat')],
	    shorterDays: [this.$t('shorterSun'), this.$t('shorterMon'), this.$t('shorterTue'), this.$t('shorterWed'), this.$t('shorterThu'), this.$t('shorterFri'), this.$t('shorterSat')],
	    months: [this.$t('january'), this.$t('february'), this.$t('march'), this.$t('april'), this.$t('may'), this.$t('june'), this.$t('july'), this.$t('august'), this.$t('september'), this.$t('october'), this.$t('november'), this.$t('december')],
	    shortMonths: [this.$t('jan'), this.$t('feb'), this.$t('mar'), this.$t('apr'), this.$t('may'), this.$t('june'), this.$t('july'), this.$t('aug'), this.$t('sep'), this.$t('oct'), this.$t('nov'), this.$t('dec')],
	    shorterMonths: [this.$t('shorterJan'), this.$t('shorterFeb'), this.$t('shorterMar'), this.$t('shorterApr'), this.$t('shorterMay'), this.$t('shorterJun'), this.$t('shorterJul'), this.$t('shorterAug'), this.$t('shorterSep'), this.$t('shorterOct'), this.$t('shorterNov'), this.$t('shorterDec')],
	    firstDayOfAWeek: 1
	}
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.widthListener);
    },
    methods: {
	handleDragStart: function(e) {
	    this.draging = true;
	    this.startDrag.col = e.target.getAttribute("col");
	    this.startDrag.row = e.target.getAttribute("row");
	    this.dragSrcEl = e.target;
	    this.dragSrcEl.style.setProperty("background-color", "#bbb", "important");
	    var dt = e.dataTransfer;
	    dt.setDragImage(document.getElementById("dragImage"), 0, 0);
	},
	handleDragEnd: function(e) {
	    this.draging = false;
	    this.chooseActivity(parseInt(this.startDrag.col), parseInt(this.startDrag.row), parseInt(this.currentDrag.col), parseInt(this.currentDrag.row));
	    this.dragSrcEl = null;
	},
	handleDrop: function(e) {
            if(this.dragSrcEl) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
            }
	},
	handleDragOver: function(e) {
            if (e.preventDefault) {
		e.preventDefault();
            }
	    e.dataTransfer.dropEffect = 'move';
	},
	handleDragEnter: function(e) {
            this.dragCurEl = e.target;
	    this.currentDrag.col = e.target.getAttribute("col");
	    this.currentDrag.row = e.target.getAttribute("row");
	    
	    this.cells = document.querySelectorAll('.agenda-row-content.draggable');
	    var that = this;
	    this.cells.forEach(function (cell) {
		let cellCol = parseInt(cell.getAttribute("col"));
		let cellRow = parseInt(cell.getAttribute("row"));
		let startCol = parseInt(that.startDrag.col);
		let startRow = parseInt(that.startDrag.row);
		let currentCol = parseInt(that.currentDrag.col);
		let currentRow = parseInt(that.currentDrag.row);

		let cellGridPos = cellCol*1000+cellRow;
		let startGridPos = startCol*1000+startRow;
		let currentGridPos = currentCol*1000+currentRow;
		if(((cellGridPos <= startGridPos && cellGridPos >= currentGridPos)
		    || (cellGridPos >= startGridPos && cellGridPos <= currentGridPos)))
		    cell.style.setProperty("background-color", "#bbb", "important");
		else
		    that.setCellColor(cell);
	    });
	},
	dblclickOnCell: function(col, row) {
	    this.removePeriod(col, row, true, null);
	},
	removePeriod: function(col, row, firstCall, activityId) {
	    var date = new Date(this.calendar.getStartOfWeek());
	    date.setDate(date.getDate()+col);
	    var dataModified = false;
	    if(this.hasPeriod(this.appData.periods, date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(row/2), row%2!==0?30:0)) {
		var dataModified = true;
		if(activityId === null || this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()][Math.floor(row/2)][row%2!==0?30:0] === activityId) {
		    const thisActivityId = this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()][Math.floor(row/2)][row%2!==0?30:0];
		    this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()][Math.floor(row/2)][row%2!==0?30:0] = null;
		    if(row === 47) {
			this.removePeriod(col+1, 0, false, thisActivityId);
			this.removePeriod(col, row-1, false, thisActivityId);
		    } else if(row === 0) {
			this.removePeriod(col-1, 47, false, thisActivityId);
			this.removePeriod(col, row+1, false, thisActivityId);
		    } else {
			this.removePeriod(col, row-1, false, thisActivityId);
			this.removePeriod(col, row+1, false, thisActivityId);
		    }
		}
	    }
	    if(firstCall && dataModified) {
		this.calendar.setPeriods(this.appData.periods);
		localStorage.setItem('appData', JSON.stringify(this.appData));
		this.setCellsColors();
	    }
	},
	hasPeriod: function(periods, year, month, dayOfMonth, hour, min) {
	    if(!periods[year])
		return false;
	    if(!periods[year][month])
		return false;
	    if(!periods[year][month][dayOfMonth])
		return false;
	    if(!periods[year][month][dayOfMonth][hour])
		return false;
	    if(!periods[year][month][dayOfMonth][hour][min])
		return false;
	    return true;
	},
	back: function(e) {
            this.$router.push({ name: 'Dashboard' });
	},
	initCells: function() {
	    this.cells = document.querySelectorAll('.agenda-row-content.draggable');
	    var that = this;
	    this.cells.forEach(function (cell) {
		cell.addEventListener('dragstart', that.handleDragStart, false);
		cell.addEventListener('dragenter', that.handleDragEnter, false);
		cell.addEventListener('dragover', that.handleDragOver, false);
		cell.addEventListener('drop', that.handleDrop, false);
		cell.addEventListener('dragend', that.handleDragEnd, false);
		that.setCellColor(cell);
	    });
	},
	setCellsColors: function() {
	    var that = this;
	    this.cells.forEach(function (cell) {
		that.setCellColor(cell);
	    });
	},
	setCellColor: function(cell) {
	    let cellCol = parseInt(cell.getAttribute("col"));
	    let cellRow = parseInt(cell.getAttribute("row"));
	    
	    if(this.calendar.displayablePeriods[cellRow][cellCol])
		cell.style.setProperty("background-color", this.colors[this.calendar.displayablePeriods[cellRow][cellCol]], "important");
	    else
		cell.style.setProperty("background-color", "#efefef", "important");
	},
	chooseActivity: function(startCol, startRow, endCol, endRow) {
	    this.newPeriodDialogOpen = true;
	    this.newPeriodData = { startCol: startCol, startRow: startRow, endCol: endCol, endRow: endRow };
	},
        newPeriodCancel: function() {
	    this.newPeriodDialogOpen = false;
            this.setCellsColors();
	},
        newPeriodConfirm: function() {
	    this.newPeriodDialogOpen = false;
	    if(this.activityId)
		this.putNewPeriod(this.activityId, this.newPeriodData.startCol, this.newPeriodData.startRow, this.newPeriodData.endCol, this.newPeriodData.endRow);
	    else
		this.setCellsColors();
	},
	putNewPeriod: function(activityId, startCol, startRow, endCol, endRow) {
	    var date = new Date(this.calendar.getStartOfWeek());
	    if(endCol < startCol) {
		let tmp = endCol;
		endCol = startCol;
		startCol = tmp;
		tmp = endRow
		endRow = startRow;
		startRow = tmp;
	    }
	    date.setDate(date.getDate()+startCol);
	    for(var col = startCol; col <= endCol; ++col) {
		let colEndRow = endRow;
		let colStartRow = startRow;
		if(col !== startCol && col === endCol)
		    colStartRow = 0;
		else if(col < endCol)
		    colEndRow = 47;
		else if(endRow < startRow) {
		    let tmp = colEndRow;
		    colEndRow = colStartRow;
		    colStartRow = tmp;
		}
		for(var row = colStartRow; row <= colEndRow; ++row) {
		    if(!this.appData.periods[date.getFullYear()])
			this.appData.periods[date.getFullYear()] = {};
		    if(!this.appData.periods[date.getFullYear()][date.getMonth()])
			this.appData.periods[date.getFullYear()][date.getMonth()] = {};
		    if(!this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()])
			this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()] = {};
		    if(!this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()][Math.floor(row/2)])
			this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()][Math.floor(row/2)] = {};
		    this.appData.periods[date.getFullYear()][date.getMonth()][date.getDate()][Math.floor(row/2)][row%2!==0?30:0] = activityId.toString();
		    this.calendar.setPeriods(this.appData.periods);
		    localStorage.setItem('appData', JSON.stringify(this.appData));
		}
		date.setDate(date.getDate()+1);
	    }
	    this.setCellsColors();
	},
	today: function() {
	    this.calendar.today();
	    this.setCellsColors();
	},
	previousWeek: function() {
	    this.calendar.previousWeek();
	    this.setCellsColors();
	},
	nextWeek: function() {
	    this.calendar.nextWeek();
	    this.setCellsColors();
	},
	setWeek: function() {
	    this.calendar.setWeek(this.selectedDate);
	    this.setCellsColors();
	},
    },
}
</script>

<style scoped>
.agenda {
    height: 100%;
}
.inner-screen {
    height: calc(100% - 55px);
}
.inner-calendar {
    height: calc(100% - 60px);
    overflow-y: scroll;
}
.days {
    height: 60px;
}
.hours {
    font-size: 15px;
    margin-left: 0px !important;
}
.xSmallHours {
    font-size: 10px !important;
    line-height: 10px !important;
}
.smallHours {
    font-size: 12px !important;
}
.agenda-row {
    width: 100%;
    height: 28px;
    margin-left: 2px;
    background-color: #fff;
}
.agenda-row-content {
    width: 100%;
    height: 26px;
    margin-top: 2px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #efefe !important;
}
.header-row {
    width: 100%;
    height: 60px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.small-header-row {
    width: 100%;
    height: 60px;
    display: block;
    justify-content: center;
    align-items: center;
}
.md-layout {
    margin: 0px;
}
.smallDayOfWeek {
    margin: 0px;
}
div.smallDayOfWeek {
    font-size: 16px;
    transform: translate(0px, 8px) !important;
}
h4.smallDayOfWeek {
    font-size: 21px;
    transform: translate(0px, 11px);
}
.dayOfWeek {

}
span.dayOfWeek {
    font-size: 20px;
}
h4.dayOfWeek {
    font-size: 25px;
    margin-left: 11px;
}
.agenda-row-content {
    background-color: #efefef !important;
}
.md-dialog {
    max-width: 400px;
    max-height: 200px;
}
.dialog-content {
    margin-left: 20px;
    margin-right: 20px;
}
div.md-datepicker::after {
    display: none;
}
</style>
