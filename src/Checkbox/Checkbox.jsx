import { Checkbox as FCheckbox } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';


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
      _isChecked: this.props.isChecked
    }
  }

  _onSelectionChange(isChecked) {
    //Assumption: That Microsoft really is only sending true or false, and we don't need to validate the value.

    //Get the value. No validation currently needed.
    const checked = isChecked;
    
    //Set the state with the updated checked value. This will force the control to update in UXPin at runtime.
    this.setState(
      { _isChecked: checked }
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  }

  render() {

    //Get the value from our wrapper control's prop.
    const checked = this.state._isChecked;

    return (

      <FCheckbox 
          {...this.props}
          checked={checked}
          onChange={(e, v) => { this._onSelectionChange(v); }}  //We only catch the new value
          >{this.props.children}</FCheckbox>
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Checkbox.propTypes = {
  /**
   * @uxpindescription To display the box before the start or after end of the text.
   * @uxpinpropname Box Side
   * */
  boxSide: PropTypes.oneOf(['start', 'end']),

  /**
   * @uxpindescription The checked state of the control.
   * @uxpinpropname Checked
   * */
  isChecked: PropTypes.bool,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription The displayed text for the checkbox
   * @uxpinpropname Text
   * @uxpincontroltype textfield(3)
   * */
  label: PropTypes.string,

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
  boxSide: 'start',
  isChecked: false, 
  disabled: false,
  label: 'Basic Checkbox'
};


export { Checkbox as default };
