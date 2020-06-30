import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PrimaryButton as FPrimaryButton, DefaultButton as FDefaultButton, TooltipHost } from 'office-ui-fabric-react';


/**
 * UPDATED Mar 16-17, 2020 by Anthony Hand
 * - Removed 'checked' property. This property is not required currently.
 * - Added descriptions and prop names for each property with some updates. 
 * - Removed the 'onClick' prop assignment from the <FButton>attributes in the Return method. They were unnecessary.
 * 
 * TODOs
 * - Allow for user resizing of the width. 
 * - Ensure all styling is as per PPUI spec.
 * 
 * For additional outstanding issues, please see: 
 *    https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/48
 *    
 * */


class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let iconProps = { iconName: this.props.iconName }

    let styles = {
      root: {
        borderRadius: this.props.rounded ? 100 : 0
      }
    }

    if (this.props.iconPosition === "end") styles.flexContainer = {
      flexDirection: 'row-reverse'
    }

    const tooltipId = _.uniqueId('tooltip_');

    return (
      <div>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipId}
        >
          {this.props.primary ?
            <FPrimaryButton
              {...this.props}
              iconProps={iconProps}
              styles={styles}
              aria-describedby={tooltipId}
            />
            :
            <FDefaultButton
              {...this.props}
              iconProps={iconProps}
              styles={styles}
              aria-describedby={tooltipId}
            />
          }
        </TooltipHost>
      </div>
    );
  }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Button.propTypes = {

  /**
   * @uxpindescription The displayed text on the button
   * @uxpinpropname Text
   * */
  text: PropTypes.string.isRequired,

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
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription The location to display an icon, if one is set
   * @uxpinpropname Icon Position
   * */
  iconPosition: PropTypes.oneOf(['start', 'end']),

  /**
   * @uxpindescription Sets whether to display the button in the rounded PayPal UI style.
   * @uxpinpropname Rounded
   * */
  rounded: PropTypes.bool,

  /**
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
  tooltip: PropTypes.string,

  /**
   * @uxpindescription Fires when the button is clicked on.
   * @uxpinpropname Click
   * */
  onClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Button.defaultProps = {
  primary: true,
  disabled: false,
  rounded: true,
  text: "Basic Button",
  tooltip: ''
};


export { Button as default };
