import * as React from 'react';
import {
    Calendar as FCalendar,
    DayOfWeek,
    DateRangeType,
} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxDateTimeUtils } from '../_helpers/tpxuxdatetimeutils.jsx';



/**
 * UPDATED April 8, 2020 by Anthony Hand
 * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
 * - Converted object to a class.
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Apply the PayPal UI theme 
 * 
 * */



const dayPickerStrings = {
    months: TpxUxDateTimeUtils.months,
    shortMonths: TpxUxDateTimeUtils.monthsShort,
    days: TpxUxDateTimeUtils.days,
    shortDays: TpxUxDateTimeUtils.daysShort,
    goToToday: 'Go to Today',
    weekNumberFormatString: 'Week {0}',
};

const workWeekDays = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday
];


class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: null //null or a Date
        }
    }

    set() {
        let dt = this._parseDate(this.props.uxpValue);
        this.setState(
            { selectedDate: dt }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.uxpValue !== this.props.uxpValue
        ) {
            this.set();
        }
    }

    //Based on the prop for the current date value, returns a valid Date object. 
    _parseDate(dateStr) {

        //Let's see if we can parse a real date
        let dt = TpxUxDateTimeUtils.parseDate(dateStr);

        //If it doesn't come back as undefined, then we can use it. 
        if (dt) {
            return new Date(dt);
        }
        else {
            //If it's undefined, then let's just return right now.
            return new Date();
        }
    }

    //We'll immediately use the date. In the future, we may use the date range, too. 
    _onSelectDate(date) {

        this.setState(
            { selectedDate: date }
        )

        if (this.props.onSelectDate) {
            //Format this before surfacing with style: 'Feb 8, 2020' 
            let dt = TpxUxDateTimeUtils.getFormattedDate(date);
            this.props.onSelectDate(dt);
        }
    }


    render() {

        return (

            <FCalendar
                {...this.props}

                //Standard behaviors for this control
                isMonthPickerVisible={true}
                dateRangeType={DateRangeType.Day}  //Typically, we're looking for a day rather than a month or week
                autoNavigateOnSelection={true}
                showGoToToday={true}
                showNavigateButtons={true}
                highlightCurrentMonth={true}
                highlightSelectedMonth={true}
                isDayPickerVisible={true}
                showMonthPickerAsOverlay={true}
                showSixWeeksByDefault={true}
                firstDayOfWeek={DayOfWeek.Sunday}
                workWeekDays={workWeekDays}
                strings={dayPickerStrings}

                //From UXPin Props & State
                value={this.state.selectedDate}
                showWeekNumbers={this.props.showWeekNumbers}

                onSelectDate={(d, sdr) => this._onSelectDate(d)}
            />
        );
    }
}



Calendar.propTypes = {

    /**
     * A unique name for this property. Got some weird behavior with the same name as the control's prop. 
     * @uxpindescription Set the date in the control using one of these formats: Feb 8, 2020 -OR- 2/6/2020
     * @uxpinpropname Date
     */
    uxpValue: PropTypes.string,

    /**
     * @uxpindescription To display week numbers on the left side of the Calendar
     * @uxpinpropname Show Week Numbers
     */
    showWeekNumbers: PropTypes.bool,

    /**
     * @uxpindescription Fires when a date is selected
     * @uxpinpropname Date Selected
     */
    onSelectDate: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Calendar.defaultProps = {
    uxpValue: "Jan 15, 2020",
    showWeekNumbers: false,
};


export { Calendar as default };
