import * as React from 'react';
import {DatePicker as FDatePicker, 
        DayOfWeek,
        DateRangeType,
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxDateTimeUtils } from '../_helpers/tpxuxdatetimeutils.jsx';



  /**
   * UPDATED April 9, 2020 by Anthony Hand
   * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
   * - Converted object to a class.
   * - Added file to our TPX UX Experimental library on UXPin.
   * 
   * TODOs
   * - Apply the PayPal UI theme 
   * 
   * */



const dayPickerStrings =  {
    months: TpxUxDateTimeUtils.months,
    shortMonths: TpxUxDateTimeUtils.monthsShort,
    days: TpxUxDateTimeUtils.days,
    shortDays: TpxUxDateTimeUtils.daysShort,
    goToToday: 'Go to Today',
    weekNumberFormatString: 'Week {0}',
    invalidInputErrorMessage: 'Invalid date format.',
};

const workWeekDays = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday
];



class DatePicker extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedDate: null //null or a Date
      }
    }

    componentDidMount() {
        //Let's see if we can parse a real date
        var dt = TpxUxDateTimeUtils.parseDate(this.props.calDate);

        //If it doesn't come back as undefined, then we can use it. 
        if (dt) {
            dt = new Date(dt);
        }
        else {
            //If it's not a real date, that's OK. Null is the preferred value.
            dt = null;
        }
        
        this.setState (
            { selectedDate: dt }
        )
    }


    /**
     * We'll immediately use the date. In the future, we may use the date range, too. 
     * @param {*} date - The selected date
     */
    _onSelectDate(date) {

        this.setState (  
            { selectedDate: date }
        )

        if (this.props.onSelectDate) {
            //Format this before surfacing with style: 'Feb 8, 2020' 
            let dt = TpxUxDateTimeUtils.getFormattedDate(date);
            this.props.onSelectDate(dt);
        }
    }


    /**
     * A callback to format the date as in our preferred way
     * @param {*} dateStr 
     */
    _onFormatDate(dateStr) {
        return TpxUxDateTimeUtils.getFormattedDate(dateStr);
    }

    /**
     * A callback to parse the user's entry to see if it's a date
     * @param {*} str - The string the user entered which might be a date
     */
    _onParseDate(str) {
        return TpxUxDateTimeUtils.parseDate(str);
    }


    render() {

        let calProps = {    
            dateRangeType: DateRangeType.Day,  //Typically, we're looking for a day rather than a month or week
            autoNavigateOnSelection: true,
            showNavigateButtons: true,   
            isDayPickerVisible: true,      
            showSixWeeksByDefault: true,
            workWeekDays: workWeekDays,
        };

        return (

            <FDatePicker
                { ...this.props }

                //Standard behaviors for this control
                firstDayOfWeek = { DayOfWeek.Sunday }
                strings = { dayPickerStrings }
                disableAutoFocus = { true }
                highlightCurrentMonth = { true }
                highlightSelectedMonth = { true }
                isMonthPickerVisible = { true }
                showCloseButton = { true }
                showGoToToday = { true }
                showMonthPickerAsOverlay = { true }

                calendarProps = { calProps }

                //From UXPin Props & State
                label = { this.props.label }
                value = { this.state.selectedDate }
                placeholder = { this.props.placeholder }
                initialPickerDate = { this.state.selectedDate }
                allowTextInput = { this.props.allowTextInput }
                showWeekNumbers = { this.props.showWeekNumbers }
                disabled = { this.props.disabled }
                isRequired = { this.props.required }

                onSelectDate = {(d, sdr) => this._onSelectDate(d) }
                onFormatDate = {(d) => this._onFormatDate(d) }
                parseDateFromString = {(d) => this._onParseDate(d) }
            />
        );
    }
}



DatePicker.propTypes = {

    /**
     * @uxpindescription The label for the switch
     * @uxpinpropname Label
     * @uxpincontroltype textfield(2)
     * */
    label: PropTypes.string,

    /**
     * A unique name for this property. Got some weird behavior with the same name as the control's prop. 
     * @uxpindescription Set the date in the control using one of these formats: Feb 8, 2020 -OR- 2/6/2020
     * @uxpinpropname Date
     */  
    calDate: PropTypes.string,

    /**
     * @uxpindescription Placeholder text to show in the text field when it's empty
     * @uxpinpropname Placeholder
     * */  
    placeholder: PropTypes.string, 

    /**
     * @uxpindescription To allow the user to enter a date into the field
     * @uxpinpropname Allow Text Input
     * */
    allowTextInput: PropTypes.bool,

    /**
     * @uxpindescription To display the 'required' flag on the label
     * */
    required: PropTypes.bool,

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
DatePicker.defaultProps = {
    label: "Basic DatePicker",
    placeholder: "Enter date: Jan 15, 2020 or 1/15/2020",
    calDate: "", 
    allowTextInput: true,
    required: false, 
    showWeekNumbers: false, 
};


export { DatePicker as default };
