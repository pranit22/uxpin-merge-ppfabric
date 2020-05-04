import * as React from 'react';
import {Callout, 
    FocusTrapZone,
    Calendar,
    CommandButton,
    PrimaryButton,
    DefaultButton,
    DirectionalHint,
    DateRangeType,
    DayOfWeek,
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxDateTimeUtils } from '../_helpers/tpxuxdatetimeutils.jsx';


/**
 * UPDATED April 9, 2020 by Anthony Hand
 * - Created a brand new component.
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
};

const workWeekDays = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday
];


class CalendarButton extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedDate: null, //null or a Date
        showCalendar: false,
        userSelected: false //Whether the end user has explicitly chosen a date
      }

      this._calendarButtonElement = React.createRef();
    }

    componentDidMount() {
        //Let's see if we can parse a real date
        var dt = TpxUxDateTimeUtils.parseDate(this.props.calDate);

        //If it doesn't come back as undefined, then we can use it. 
        if (dt) {
            dt = new Date(dt);
        }
        else {
            //If it's undefined, then let's just return right now.
            dt = new Date();
        }
        
        this.setState (
            { selectedDate: dt }
        )
    }

    _onButtonClick() {
        this.setState (
            { showCalendar: true }
        )

        if (this.onButtonClick) {
            this.onButtonClick();
        }
    }

    _onSelectDate(date) {
        this.setState (  
            {   selectedDate: date,
                showCalendar: false,
                userSelected: true
            }
        )

        if (this.props.onSelectDate) {
            //Format this before surfacing with style: 'Feb 8, 2020' 
            let dt = TpxUxDateTimeUtils.getFormattedDate(date);
            this.props.onSelectDate(dt);
        }
    }

    _onDismissCallout() {
        this.setState (  
            {   showCalendar: false }
        )
    }

    render() {
        let buttonIconProps = { iconName: this.props.buttonIcon }

        //We use the text the UXPin user set for the button unless the user has selected a date
        var buttonText = this.props.buttonText;
        if (this.props.showSelectedDate && this.state.selectedDate && this.state.userSelected) {
            buttonText = TpxUxDateTimeUtils.getFormattedDate(this.state.selectedDate);
        }

        let buttonStyles = {
            root: {
              borderRadius: this.props.rounded ? 100 : 0
            }
        }

        var selectedDate = this.state.selectedDate;
        if (!this.state.selectedDate) {
            selectedDate = new Date();
        }

        return (
            <>
                <div ref = { this._calendarButtonElement }>
                    { this.props.buttonType == 'Command' ?
                            <CommandButton
                                {...this.props}
                                iconProps = { buttonIconProps }
                                text = { buttonText }
                                disabled = { this.props.buttonDisabled }
                                onClick = {() => { this._onButtonClick() }} />
                        : this.props.buttonType == 'Primary' ? 
                            <PrimaryButton  
                                {...this.props}
                                iconProps = { buttonIconProps }
                                text = { buttonText }
                                disabled = { this.props.buttonDisabled }
                                styles = { buttonStyles } 
                                onClick = {() => { this._onButtonClick() }} />
                        : //else secondary
                            <DefaultButton 
                                {...this.props}
                                iconProps = { buttonIconProps }
                                text = { buttonText }
                                disabled = { this.props.buttonDisabled }
                                styles = { buttonStyles } 
                                onClick = {() => { this._onButtonClick() }} />
                    }
                </div>
                {this.state.showCalendar && (
                    <Callout
                        isBeakVisible={false}
                        gapSpace={0}
                        doNotLayer={false}
                        target={ this._calendarButtonElement }
                        directionalHint={DirectionalHint.bottomLeftEdge}
                        onDismiss={() => { this._onDismissCallout() }}
                        setInitialFocus={true}
                    >
                        <FocusTrapZone isClickableOutsideFocusTrap = { true }>
                            <Calendar
                                //Standard behaviors for this control
                                isMonthPickerVisible = {true}        
                                dateRangeType = {DateRangeType.Day}  //Typically, we're looking for a day rather than a month or week
                                autoNavigateOnSelection = {true}     
                                showGoToToday = {true}              
                                showNavigateButtons = {true}        
                                highlightCurrentMonth = {true}      
                                highlightSelectedMonth = {true}     
                                isDayPickerVisible = {true}       
                                showMonthPickerAsOverlay = {true}
                                showSixWeeksByDefault =  {true}
                                firstDayOfWeek = {DayOfWeek.Sunday}
                                workWeekDays = {workWeekDays}
                                strings = {dayPickerStrings}

                                //From UXPin Props & State
                                value = { selectedDate }
                                showWeekNumbers = { this.props.showWeekNumbers }
                                onSelectDate = {(d, sdr) => this._onSelectDate(d) }
                            />
                        </FocusTrapZone>
                    </Callout>
                )}
            </>

        );
    }

}

/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CalendarButton.propTypes = {

    /**
     * @uxpindescription Reflect the control's role in the UI with its visual style
     * @uxpinpropname Button Type
     * */
    buttonType: PropTypes.oneOf(['Command','Primary','Secondary']),

    /**
     * @uxpindescription Sets whether to display a Primary or Secondary  button in the rounded PayPal UI style.
     * @uxpinpropname Rounded
     * */   
    rounded: PropTypes.bool,

    /**
     * @uxpindescription The displayed text on the button (Optional)
     * @uxpinpropname Button Text
     * */
    buttonText: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Button Icon Name
     * */ 
    buttonIcon: PropTypes.string,

    /**
     * A unique name for this property. Got some weird behavior with the same name as the control's prop. 
     * @uxpindescription Set the date in the control using one of these formats: Feb 8, 2020 -OR- 2/6/2020
     * @uxpinpropname Date
     */  
    calDate: PropTypes.string,

    /**
     * @uxpindescription To replace the default string on the button with the selected date  
     * @uxpinpropname Show Selected Date
     * */
    showSelectedDate: PropTypes.bool,

    /**
     * @uxpindescription To display week numbers on the left side of the Calendar
     * @uxpinpropname Show Week Numbers
     */  
    showWeekNumbers: PropTypes.bool,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    buttonDisabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when a date is selected
     * @uxpinpropname Date Selected
     */  
    onSelectDate: PropTypes.func,

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
CalendarButton.defaultProps = {
    buttonType: 'Command',
    rounded: true,
    buttonDisabled: false,
    buttonText: 'Show Calendar',
    buttonIcon: 'Calendar',
    calDate: "Jan 15, 2020",
    showSelectedDate: true,
    showWeekNumbers: false,
};


export { CalendarButton as default };