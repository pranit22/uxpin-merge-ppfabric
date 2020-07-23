import { TextField as FTextField } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';


/**
 * UPDATED Mar 22, 2020 by Anthony Hand
 * - Rather than setting/getting props at runtime to maintain variable with internal text contents, switched to using state.
 * 
 */

/**
 * UPDATED Mar 19, 2020 by Anthony Hand
 * - NEW: Added the placeholder prop and onChange event.  
 * - Fixed 2 annoying design time bugs. If one set the prefix or suffix and then removed the text value, a gray region would continue to render. 
 *   Now that gray region will disappear once one removes the text values for them. 
 * - Fixed an annoying design time bug regarding sizing a control. Previously, one could not drag the control to make it wider or shorter. Now it's OK. 
 * - Converted control into a 'controlled' component where it tracks its own text value.  
 * - Removed defaultValue property. This wasn't useful at runtime.
 * - Added descriptions and prop names for each property with some updates. 
 * - Cleaned up default props.
 * 
 * TODOs
 * - Waiting for guidance from UXPin on how to expose the isChecked prop at runtime within UXPin. 
 * 
 * For additional outstanding issues, please see: 
 *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/98
 * */




class TextField extends React.Component {

  constructor(props) {
    super(props);
  }

  set() {
    this.setState({
      //Initialize with the props value
      currentValue: this.props.textValue
    })
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.textValue !== this.props.textValue
    ) {
      this.set();
    }
  }


  _onChange(newValue) {
    //We only want to know what the new value should be.
    //Assumption: That Microsoft really is only sending strings and it's not undefined. 

    //Get the value. 
    const textVal = newValue.toString();

    //Set the state with the updated checked value. This will force the control to update in UXPin at runtime.
    this.setState(
      { currentValue: textVal }
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onChange) {
      this.props.onChange(textVal);
    }
  }


  render() {

    //Get the value from State.
    var textVal = this.state.currentValue;

    //Set the prefix, if the user has set one. The default MUST be undefined.
    //Microsoft requires that we explicitly set this to undefined if there is no text value. 
    var prefix = undefined;

    if (this.props.prefix) {
      prefix = this.props.prefix;
    }

    //Set the suffix, if the user has set one. The default MUST be undefined.
    //Microsoft requires that we explicitly set this to undefined if there is no text value. 
    var suffix = undefined;

    if (this.props.suffix) {
      suffix = this.props.suffix;
    }

    //We're going to keep this off for UXPin
    let showAutoComplete = false;


    return (
      <FTextField
        {...this.props}
        value={textVal}
        iconProps={{ iconName: this.props.icon }}
        onChange={(e, v) => { this._onChange(v); }}   //Only catch the value
        prefix={prefix}
        suffix={suffix}
        autoComplete={showAutoComplete}
      />
    );
  }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
TextField.propTypes = {

  /**
 * @uxpindescription The label for the switch
 * @uxpinpropname Label
 * @uxpincontroltype textfield(2)
 * */
  label: PropTypes.string,

  /**
   * @uxpindescription For multiline text fields, whether or not to auto adjust text field height
   * @uxpinpropname Auto Adjust Height
   * */
  autoAdjustHeight: PropTypes.bool,

  /**
   * @uxpindescription Description displayed below the text field to provide additional details about what text to enter
   * @uxpinpropname Description
   * */
  description: PropTypes.string,

  /**
   * We give this property a unique name to avoid collisions. We map its value to the control's 'value' prop.
   * @uxpindescription Current value of the text field. This prop's live value is available for scripting.
   * @uxpinpropname * Value
   * @uxpinbind onChange
   * @uxpincontroltype textfield(3)
   * */
  textValue: PropTypes.string,

  /**
   * @uxpindescription Placeholder text to show in the text field when it's empty
   * @uxpinpropname Placeholder
   * */
  placeholder: PropTypes.string,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription An error message to display below the control. Setting this value also displays the control in an error state.
   * @uxpinpropname Error Message
   * */
  errorMessage: PropTypes.string,

  /**
   * @uxpindescription The exact name from the PayPal icon library. Displays on the right side. (Optional)
   * @uxpinpropname Icon Name
   * */
  icon: PropTypes.string,

  /**
   * @uxpindescription Whether or not the text field is a multiline text field
   * @uxpinpropname Multiline
   * */
  multiline: PropTypes.bool,

  /**
   * @uxpindescription Text to display within the front section of the text field
   * @uxpinpropname Prefix
   * */
  prefix: PropTypes.string,

  /**
   * @uxpindescription Text to display within the end section of the text field
   * @uxpinpropname Suffix
   * */
  suffix: PropTypes.string,

  /**
   * @uxpindescription To set the control to read-only mode
   * @uxpinpropname Read Only
   * */
  readOnly: PropTypes.bool,

  /**
   * @uxpindescription To display the 'required' flag on the label
   * @uxpinpropname Required
   * */
  required: PropTypes.bool,

  /**
   * We give this property a unique name to avoid collisions. We map its value to the control's 'onChange' prop.
   * @uxpindescription Fires when the control's Value property changes.
   * @uxpinpropname * Value Changed
   * */
  onChange: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
TextField.defaultProps = {
  label: "Basic Text Field",
  textValue: "",
  placeholder: "Enter some text",
  multiline: false,
  autoAdjustHeight: false,
  readOnly: false,
  disabled: false
};


export { TextField as default };
