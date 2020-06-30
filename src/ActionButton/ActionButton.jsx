import { ActionButton as FActionButton, TooltipHost } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import _ from 'lodash';

/**
 * UPDATED Mar 17, 2020 by Anthony Hand
 * - Converted the control from a Function to a Class following the patterns in the Button control. 
 * - Added the priority feature for setting the icon to the start or end positions. Previously, was fixed to start only.
 * - Removed the 'checked' property. Not currently useful. 
 * - Removed the 'onChange' event. Not currently useful to monitor changes within the control. 
 * - Set the 'text' prop to optional. It's a valid use case to have only an icon. 
 * - Sync'd prop names and descriptions with other controls. 
 * 
 * TODOs
 * 
 * For additional outstanding issues, please see: 
 *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/72
 * */


class ActionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let iconProps = { iconName: this.props.iconName }

    //We want the root's margin to help the control to equal 40px. We need to make up 14px when there is no text.
    var rootPadding = '0 7px';
    //The label margin is always present, even when there is no label
    var labelMargin = '0';
    if (this.props.text) {
      rootPadding = '0';
      labelMargin = '0 8px';
    }

    let styles = {
      root: {
        margin: 0,
        padding: rootPadding,
      },
      label: {
        whiteSpace: 'nowrap',
        margin: labelMargin,
        padding: 0,
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
          <FActionButton
            {...this.props}
            iconProps={iconProps}
            styles={styles}
            aria-describedby={tooltipId}
          />
        </TooltipHost>
      </div>
    );
  }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ActionButton.propTypes = {

  /**
    * @uxpindescription The displayed text on the button (Optional)
    * @uxpinpropname Text
    * */
  text: PropTypes.string,

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
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
  tooltip: PropTypes.string,

  /**
   * @uxpindescription Fires when the button is clicked on
   * @uxpinpropname Click
   * */
  onClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ActionButton.defaultProps = {
  disabled: false,
  text: 'Basic Action Button',
  iconName: 'Launch',
  tooltip: ''
};

export { ActionButton as default };
