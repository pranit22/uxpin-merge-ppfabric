import * as React from 'react';
import { DefaultButton, TooltipHost } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { getTokens, csv2arr } from '../_helpers/parser.jsx';



/**
 * UPDATED April 7, 2020 by Anthony Hand
 * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
 * - Converted object to a class.
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Control needs to be updated with the proper PayPal UI theme.
 * - Add support for making the button rounded.  
 * 
 * */


//Default pivot tab items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultItems = `icon(Document) Add Document
icon(FileCode) Add Code File
icon(Picture) Add Picture`;



class SplitButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.items !== this.props.items
    ) {
      this.set();
    }
  }

  //Parse the choice items
  set() {

    if (!this.props.items)
      return;

    let items = csv2arr(this.props.items)
      .flat()
      .map((val, index) => ({
        text: getTokens(val).text,
        key: index + 1,  //1 based index
        disabled: false,
        iconProps: this.getIconProps(val),
        onClick: () => { this._onClick(index + 1) } //same as key, 1-based
      }));

    this.setState({
      items: items
    });
  }

  //Get the user-entered left icon name, if there is one
  getLeftIcon(str) {
    const tokens = getTokens(str).tokens
    const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start')
    return leftIcon ? leftIcon.target : null
  }

  //If the user has chosen a tiled options display, let's figure out the icon names.
  getIconProps(str) {
    return {
      iconName: this.getLeftIcon(str)
    }
  }

  //The main Icon Button always passes 0.
  //Any sub-menu buttons pass their 1-based index value.
  _onClick(index) {

    //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
    if (this.props.onClick) {
      this.props.onClick(index);
    }
  }


  render() {
    let iconProps = { iconName: this.props.iconName }

    var menuProps = undefined;
    if (this.props.items) {
      menuProps = {
        items: this.state.items,
        directionalHintFixed: true
      };
    }

    const tooltipId = _.uniqueId('tooltip_');

    return (

      <TooltipHost
        content={this.props.tooltip}
        id={tooltipId}
      >
        <DefaultButton
          {...this.props}
          split={true}
          primary={this.props.primary}
          text={this.props.text}
          iconProps={iconProps}
          menuProps={menuProps}
          onClick={() => { this._onClick(0) }} //Always send 0 for the main button part
          aria-describedby={tooltipId}
        />
      </TooltipHost>
    );
  }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
SplitButton.propTypes = {

  /**
   * @uxpindescription The text to display on the button
   * @uxpinpropname Text
   * */
  text: PropTypes.string,

  /**
   * @uxpindescription The exact name from the PayPal icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: PropTypes.string,

  /**
   * @uxpindescription To display the button in the filled style. Otherwise, displays in the outline style
   * @uxpinpropname Primary Style
   * */
  primary: PropTypes.bool,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription An optional list of menu items. Put each option on a separate line.  Add an icon(IconName) at the start of each line.
   * @uxpinpropname Menu Items
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

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
SplitButton.defaultProps = {
  text: "Split Button",
  iconName: "Add",
  primary: true,
  items: defaultItems,
  disabled: false,
  tooltip: ''
};


export { SplitButton as default };
