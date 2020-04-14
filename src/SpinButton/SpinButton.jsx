import * as React from 'react';
import {SpinButton as FSpinButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
//import { mergeStyles } from '@uifabric/merge-styles';


  /**
   * UPDATED Mar 22, 2020 by Anthony Hand
   * - Rather than setting/getting props at runtime to track the checked state, switched to using state.
   * 
   */

  /**
   * UPDATED Mar 19, 2020 by Anthony Hand
   * - NEW: Added the disabled and tooltip properties, both of which are supported natively in the control. 
   * - Created a synthetic onChange event. This event isn't formally supported by Microsoft in the control's API. We're piecing it together
   *   from several other events that would result in a new value. It's a good enough solution for UXPin.
   * - Converted this into a 'controlled' component where it tracks its own value.
   * - Added multiple methods to capture user interactions with the control, determine the new value, then save and propagate it.
   * - Cleaned up the assignment of attributes on the control in the Render function.  
   * - Added descriptions and prop names for each property with some updates. 
   * - Changed the prop type for step to number, rather than string.
   * 
   * TODOs
   * - Waiting for guidance from UXPin on how to expose the isChecked prop at runtime within UXPin. 
   * 
   * For additional outstanding issues, please see: 
   *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/94
   * */


class SpinButton extends React.Component {
    constructor(props) {

      super(props);

      //Track the current numerical value within the control
      this.state = {
          //Initialize with the props value. This state variable holds a string. 
          _currentValue: this.props.value
      }
    }


    /* 
    *  ************* UTILITY METHOD
    *  Validate the proposed new value to set in the control. 
    *  newValue: Should be a number, but might be a string or something else.   
    *  Returns a validated and cleansed numeric value.
    */
    _getValidatedNumber(newValue) {

        //We have to parse the value and convert it to a number. It might be a letter or word instead. 
        var newNumber = parseFloat(newValue);

        //If the user put in a string or other non-number, we must check for it. 
        //If it's 'Not a Number', then we will set it to the min value.
        if (isNaN(newNumber)) {
            newNumber = this.props.min;
        }

        //Check for min
        if (newNumber < this.props.min) {
            newNumber = this.props.min;
        }

        //Check for max
        if (newNumber > this.props.max) {
            newNumber = this.props.max;
        }

        return newNumber;
    }


    /* 
    *  ************* SAVE NEW VALUE, PUBLISH EVENT
    *  We call this event to save the new value and do other important logic to make sure we can actually use the proposed new value.
    *  This value comes in as a float, but could be a string. 
    */
    _valueChanged(newValue) {

        // ************************
        // Validate Value First
        //We have to parse and validate the value first against the min and max allowed.
        //Then we return it to a string so it can be stored properly
        const displayValue = this._getValidatedNumber(newValue).toString();

        // ************************
        // Save and propagate the new value

        //Update the prop. This might be a Microsoft bug. 
        //It seems like Microsoft requires we set this prop rather than in the Render method below. Weird. 
        this.props.value = displayValue;

        //Update the value in State to force an update. Convert back to a string.
        this.setState (
            {  _currentValue: displayValue }
        )

        //Raise this event to UXPin. We'll send them the value in case they can catch it.
        //Let's send it as a number.
        if (this.props.onChange) {
            this.props.onChange(displayValue);
        }
    }


    /* *************************
    *  EVENT HANDLERS
    *  We have to synthesize an onChange event by tracking these 3 separate events. 
    *  Then we push the new value to the single event sink, valueChanged().
    *  *************************
    **/

    /* 
    *  This event is fired when the user manually changes the value in the TextBox part of the control.
    *  This value comes in as a string. 
    **/
    _onValidate(newValue) {
        this._valueChanged(newValue);
    }

    /* 
    *  This event is fired when the user increments or decrements the value using the Up/Down Arrow buttons. 
    *  The old value comes in as a string. 
    *  We have to increment or decrement ourselves.
    *  This method calculates what the new value should be. 
    **/
   _onIncDec(oldValue, isIncrement) {

        // ************************
        // Validate Value First
        // Initialize it with validated old value
        const parsedVal = this._getValidatedNumber(oldValue);

        if (isIncrement) {
            //Add the step value
            //newValue = parsedVal + this.props.step;
            this._valueChanged(parsedVal + this.props.step); 
        }
        else {
            //Subtract the step value
            //newValue = parsedVal - this.props.step;
            this._valueChanged(parsedVal - this.props.step); 
        }
    }


    // ************************


    render() {

        //Get the value from state. 
        //NOTE: Although we set this here, it appears that MS is hard coded to use the props.value instead.
        var newValue = this.state._currentValue;

        return (

            <FSpinButton 
                title={ this.props.title } 
                {...this.props} 
                value={ newValue }
                onValidate={(v) => { this._onValidate(v); }} 
                onIncrement={(v) => { this._onIncDec(v, true); }}
                onDecrement={(v) => { this._onIncDec(v, false); }}
            />       
        ); 
    }
}    


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
SpinButton.propTypes = {

   /**
    * @uxpindescription The numeric value of the SpinButton (Required)
    * @uxpinpropname Value
    * */  
    value: PropTypes.string.isRequired,

   /**
    * @uxpindescription Description label of the SpinButton
    * @uxpinpropname Label
    * @uxpincontroltype textfield(2)
    * */    
    label: PropTypes.string,

    /**
    * @uxpindescription The minimum value of the SpinButton
    * @uxpinpropname Min
    * */  
    min: PropTypes.number,

    /**
    * @uxpindescription The maximum value of the SpinButton
    * @uxpinpropname Max
    * */  
    max: PropTypes.number,

    /**
    * @uxpindescription The amount to raise or lower the value when clicking on the up or down buttons
    * @uxpinpropname Step
    * */      
    step: PropTypes.number,

       /**
    * @uxpindescription A little tooltip that will display on hover
    * @uxpinpropname Tooltip
    * @uxpincontroltype textfield(2)
    * */    
   title: PropTypes.string,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    disabled: PropTypes.bool,

    /**
    * @uxpindescription Fires when the value has changed
    * @uxpinpropname Value Changed
    * */  
    onChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
SpinButton.defaultProps = {
    label: 'Basic SpinButton',
    value: '1',
    min:    0,
    max:    10,
    step:   0.5,
    title:  '',
    disabled: false
}


export { SpinButton as default };
