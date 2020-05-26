import { Checkbox as FCheckbox } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';


  /**
   * UPDATED May 20, 2020 by Anthony Hand
   * - Updated to reflect UXPin 2.5's new model for handling prop updates in the Editor vs. at Runtime.
   * 
   */

  /**
   * UPDATED Mar 22, 2020 by Anthony Hand
   * - Rather than setting/getting props at runtime to track the checked state, switched to using state.
   * 
   */

  /**
   * UPDATED Mar 16-18, 2020 by Anthony Hand
   * - Converted 'func' structure to a class control. 
   * - Converted control into a 'controlled' component where it tracks its own checked status.  
   * - Removed defaultChecked property. This wasn't useful at runtime.
   * - Added 'checked' property. Should support runtime examination of control state.
   * - Added 'onChange' event. Should support required interactive use cases. 
   * - Added descriptions and prop names for each property with some updates. 
   * - Changed the input control for the 'label' prop. 
   * 
   * TODOs
   * - Waiting for guidance from UXPin on how to expose the isChecked prop at runtime within UXPin. 
   * 
   * For additional outstanding issues, please see: 
   *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/96
   * */


class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    //Track the checked state within the control
    this.state = {
      //Initialize with the props value
      isChecked: false,
    }
  }

  componentDidMount() {
    //Save the value coming in from props & initializes the state
    this.setState(
      { isChecked: this.props.isChecked}
    )
  }

  componentDidUpdate(prevProps, prevState) {
    //Handles prop updates in the UXPin Editor
    if (prevProps.isChecked !== this.props.isChecked) {
      
      this.setState(
        { isChecked: this.props.isChecked}
      )
    }
  }

  _onSelectionChange(isChecked) {
    //Assumption: That Microsoft really is only sending true or false, and we don't need to validate the value.
    
    //Set the state with the updated checked value. This will force the control to update in UXPin at runtime.
    this.setState(
      { isChecked: isChecked}
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onChange) {
      this.props.onChange(isChecked);
    }
  }

  render() {

    
    return (

      <FCheckbox 
          {...this.props}
          checked = { this.state.isChecked }
          onChange = { (e, v) => { this._onSelectionChange(v); } }  //We only catch the new value
          />
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Checkbox.propTypes = {

  /**
   * @uxpindescription The displayed text for the checkbox
   * @uxpinpropname Text
   * @uxpincontroltype textfield(3)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription The checked state of the control.
   * @uxpinpropname Checked
   * */
  isChecked: PropTypes.bool,

  /**
   * @uxpindescription To display the box before the start or after end of the text.
   * @uxpinpropname Box Side
   * */
  boxSide: PropTypes.oneOf(['start', 'end']),

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the checked state changes.
   * @uxpinpropname Value Change
   * */
  onChange: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
 Checkbox.defaultProps = {
  label: 'Basic Checkbox',
  isChecked: false,
  boxSide: 'start',
  disabled: false,
};


export { Checkbox as default };
