import * as React from "react";
import { Slider as FSlider } from "office-ui-fabric-react";
import * as PropTypes from "prop-types";
import { mergeStyles } from "@uifabric/merge-styles";


  /**
   * UPDATED Mar 22, 2020 by Anthony Hand
   * - Rather than setting/getting props at runtime to maintain the slider value, switched to using state.
   * 
   */

  /**
   * UPDATED Mar 18, 2020 by Anthony Hand
   * - Converted control into a 'controlled' component where it tracks its own slider value.
   * - Added a new 'onValueChange' function to capture the new value and do some logic.
   * - Cleaned up the assignment of attributes on the control in the Render function.  
   * - Added descriptions and prop names for each property with some updates. 
   * - Changed the input control for the 'label' prop. 
   * 
   * TODOs
   * - Waiting for guidance from UXPin on how to expose the isChecked prop at runtime within UXPin. 
   * 
   * For additional outstanding issues, please see: 
   *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/93
   * */


class Slider extends React.Component {
  constructor(props) {
    super(props);

    //Track the slider value state within the control
    this.state = {
      //Initialize with the props value
      _sliderValue: this.props.value
    }
  }

  _onValueChange(newValue) {
    //The newValue object here is the new slider value already as a number. 
    
    //We MUST  set the state with the updated slider value. This will force the control to update in UXPin at runtime.
    this.setState(
      { _sliderValue: newValue }
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }


  //TODO: Figure out how to handle sizing, especially vertical. 
  getSliderClasses() {
    
    return mergeStyles({
        height: this.props.vertical ? 300 : 50,
        marginBottom: 4
    });
  }


  render() {

    //Get the updated slider value from
    const sliderValue = this.state._sliderValue;

    return (
          <FSlider
            className={this.getSliderClasses()}
            {...this.props}
            value = {sliderValue}
            onChange={(v) => { this._onValueChange(v); }}  
          />
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Slider.propTypes = {

  /**
   * @uxpindescription Description label of the Slider
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription The minimum value of the Slider
   * @uxpinpropname Min
   * */  
  min: PropTypes.number,

  /**
   * @uxpindescription The max value of the Slider
   * @uxpinpropname Max
   * */
  max: PropTypes.number,

  /**
   * @uxpindescription The difference between the two adjacent values of the Slider
   * @uxpinpropname Step
   * */
  step: PropTypes.number,

  /**
   * @uxpindescription Optional flag to render the slider vertically. Defaults to rendering horizontal
   * @uxpinpropname Vertical
   * */
  vertical: PropTypes.bool,

  /**
   * @uxpindescription The value of the Slider
   * @uxpinpropname Value
   * */
  value: PropTypes.number,

  /**
   * @uxpindescription Optional flag whether to display the current Slider value
   * @uxpinpropname Show Value
   * */
  showValue: PropTypes.bool,

  /**
   * @uxpindescription Fires when the Slider value changes.
   * @uxpinpropname Value Change
   * */
  onChange: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Slider.defaultProps = {
  label: "Basic Slider",
  min: 0,
  max: 10,
  step: 1,
  value: 2,
  showValue: true,
  vertical: false
};


export { Slider as default };
