import * as React from 'react';
import {CompoundButton as FCompoundButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';


  /**
   * UPDATED Mar 31, 2020 by Anthony Hand
   * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
   * - Converted object to a class.
   * - Added file to our TPX UX Experimental library on UXPin.
   * 
   * TODOs
   * - Control needs to be updated with the proper PayPal UI theme. 
   * 
   * */


class CompoundButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }


    _onClick() {

        console.log("Clicked!");
    
        //Raise this event to UXPin. 
        if (this.props.onClick) {
          this.props.onClick();
        }
    }


    render() {

        let styles = {
            root: {
              borderRadius: this.props.rounded ? 100 : 0
            }
        }

        let iconProps = { iconName: this.props.iconName }

        if (this.props.iconPosition === "end") styles.flexContainer = {
            flexDirection: 'row-reverse'
        }

        return (
            <FCompoundButton 
                {...this.props} 
                iconProps = { iconProps }
                primary = { this.props.primary }
                text = { this.props.text }
                secondaryText = { this.props.secondaryText }
                disabled = { this.props.disabled }
                styles = { styles }
                onClick = { () => { this._onClick(); } }
            />
        )
    }
}

/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CompoundButton.propTypes = {

    /**
     * @uxpindescription The larger primary displayed on the button
     * @uxpinpropname Text
     * */
    text: PropTypes.string,

    /**
     * @uxpindescription The smaller secondary displayed on the button
     * @uxpinpropname Secondary Text
     * */
    secondaryText: PropTypes.string,
  
    /**
     * @uxpindescription To display the button in the filled style. Otherwise, displays in the outline style
     * @uxpinpropname Primary Style
     * */
    primary: PropTypes.bool,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon Name
     * */  
    iconName: PropTypes.string,
  
    /**
     * @uxpindescription The location to display an icon, if one is set
     * @uxpinpropname Icon Position
     * */   
    iconPosition: PropTypes.oneOf(['start', 'end']),

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */  
    disabled: PropTypes.bool,
  
    /**
     * @uxpindescription Sets whether to display the button in the rounded PayPal UI style.
     * @uxpinpropname Rounded
     * */   
    rounded: PropTypes.bool,
  
    /**
     * @uxpindescription Fires when the button is clicked on.
     * @uxpinpropname Click
     * */   
    onClick: PropTypes.func
  };


/**
 * Set the default values for this control in the UXPin Editor.
 */
CompoundButton.defaultProps = {
    primary: true,
    disabled: false,
    rounded: true,
    text: "Basic Compound Button",
    secondaryText: "Secondary text", 
    iconName: "Home"
  };

export { CompoundButton as default };
