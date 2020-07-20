import { Toggle as FToggle } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';


/**
 * UPDATED Mar 22, 2020 by Anthony Hand
 * - Rather than setting/getting props at runtime to track the checked state, switched to using state.
 * 
 */

/**
   * UPDATED Mar 19, 2020 by Anthony Hand
   *  - NEW: Added the inlineLabel property. Now the user can decide whether to position the label inline with the switch or above it. 
   * - Converted control into a 'controlled' component where it tracks its own checked status.  
   * - Removed defaultChecked property. This wasn't useful at runtime.
   * - Added 'checked' property. Should support runtime examination of control state.
   * - Added 'onChange' event. Should support required interactive use cases. 
   * - On and off text are now optional. 
   * - Added descriptions and prop names for each property with some updates. 
   * - Changed the input control for the 'label' prop. 
   * 
   * TODOs
   * - Waiting for guidance from UXPin on how to expose the isChecked prop at runtime within UXPin. 
   * 
   * For additional outstanding issues, please see: 
   *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/98
   * */


class Toggle extends React.Component {

  constructor(props) {
    super(props);
  }

  set() {
    this.setState({
      _isChecked: this.props.isChecked
    })
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isChecked !== this.props.isChecked
    ) {
      this.set();
    }
  }

  _onSelectionChange(newValue) {
    //Assumption: That Microsoft really is only sending true or false, and we don't need to validate the value.

    //Get the value. 
    const checked = newValue;

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

    //Get the value from state.
    const checked = this.state._isChecked;

    return (
      <FToggle
        checked={checked}
        {...this.props}
        onChange={(e, v) => { this._onSelectionChange(v); }}   //Only catch the new value
      />
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Toggle.propTypes = {

  /**
   * @uxpindescription The label for the switch
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription The text to show when the value is on (Required)
   * @uxpinpropname On Text
   * */
  onText: PropTypes.string,

  /**
   * @uxpindescription The text to show when the value is off (Required)
   * @uxpinpropname Off Text
   * */
  offText: PropTypes.string,

  /**
   * @uxpindescription The checked state of the control. This prop's live value is available for scripting.
   * @uxpinpropname * Checked
   * @uxpinbind onChange
   * */
  isChecked: PropTypes.bool,

  /**
   * @uxpindescription To position on the same line as the control (true), or above the control (false)
   * @uxpinpropname Inline Label
   * */
  inlineLabel: PropTypes.bool,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the control's Checked value changes
   * @uxpinpropname * Checked Changed
   * */
  onChange: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Toggle.defaultProps = {
  label: "Basic Toggle",
  onText: "On",
  offText: "Off",
  inlineLabel: true,
  isChecked: true,
  disabled: false
};

export { Toggle as default };
