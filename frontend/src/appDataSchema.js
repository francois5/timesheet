/*
Schema of the application data that we get and store on server
{
    activities: [
	{
	    id: [int],
	    name: [String],
	    type: [TYPE],
	    balance: [BALANCE || day of month]
	}
    ],
    periods: [
	{
	    id: [int],
	    activity: [int],
	    start: [timestamp],
	    end: [timestamp]
	}
    ]
}
*/

const enums = {
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
