/*
Schema of the application data that we get and store on server
{
    activities: [
	{
	    id: [int],
	    name: [String],
	    color: [int],
	    type: [TYPE],
	    balance: [BALANCE || day of month]
	}
    ],
    periods: {
        year(YYYY): {
            month(MM): {
                dayOfMonth(DD): {
		    hour(int): {
		        min("0" or "30"): activityId
		    }
		}
            }
        }
    }
}
*/

export function addPeriod(periods, activityId, beginDate, endDate) {
    let date = beginDate;
    while(date.getTime() <= endDate.getTime()) {
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	let lastPeriod = false;
	while(date.getTime() <= endDate.getTime() && !lastPeriod) {
	    let hour = date.getHours();
	    let mins = date.getMinutes();

	    if(!periods[year])
		periods[year] = {};
	    if(!periods[year][month])
		periods[year][month] = {};
	    if(!periods[year][month][day])
		periods[year][month][day] = {};
	    if(!periods[year][month][day][hour])
		periods[year][month][day][hour] = {};
	    periods[year][month][day][hour][mins] = activityId;

	    if(date.getHours() === 23 && date.getMinutes() === 30)
		lastPeriod = true;
	    if(date.getMinutes() === 0)
		date.setMinutes(30);
	    else {
		date.setHours(date.getHours() + 1);
		date.setMinutes(0);
	    }
	}
	if(!lastPeriod)
	    date.setDate(date.getDate() + 1);
	date.setHours(0);
	date.setMinutes(0);
    }
};

const enums = {
    COLORS: {
	0: "#42b883",
	1: "#0410f2",
	2: "#bd2234"
    },
    TYPE: {
	HOURLY_INCOME: 0,
	FIXED_INCOME: 1,
	TIME: 2
    },
    BALANCE: {
	// 1 to 31 is for custom day
	END_OF_WEEK: 32,
	END_OF_MONTH: 33
    }
};

export default Object.freeze(enums);
