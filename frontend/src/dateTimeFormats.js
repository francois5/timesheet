const dateTimeFormats = {
    'en': {
	date: {
	    year: 'numeric',
	    month: 'short',
	    day: 'numeric'
	},
	shortDate: {
	    month: 'short',
	    day: 'numeric'
	},
	hour: {
	    hour: 'numeric',
	    minute: 'numeric',
	    hour12: false // todo solve the lineHeight android problem
	},
	dayPickerDate: {
	    weekday: 'short',
	    day: 'numeric',
	    month: 'short'
	}
    },
    'fr': {
	date: {
	    year: 'numeric',
	    month: 'short',
	    day: 'numeric'
	},
	shortDate: {
	    month: 'short',
	    day: 'numeric'
	},
	hour: {
	    hour: 'numeric',
	    minute: 'numeric'
	},
	dayPickerDate: {
	    weekday: 'short',
	    day: 'numeric',
	    month: 'short'
	}
    }
};
export { dateTimeFormats };
