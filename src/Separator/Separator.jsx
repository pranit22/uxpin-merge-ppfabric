import * as React from 'react';
import {Separator as FSeparator,
        Icon,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';


  /**
   * UPDATED April 21, 2020 by Anthony Hand
   * - Added file to our TPX UX Experimental library on UXPin.
   * 
   * TODOs
   * - Control needs to be updated with the proper PayPal UI theme. 
   * 
   */



class Separator extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
      }
    }


    render() {

        //Let's see if the user entered a valid text color value. This method returns undefined if not. 
        var txColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.textColor);
        if (!txColor) {
            txColor = '#000000';
        }

        const iconStyles = {
            root: {
              fontSize: '16px',
              height: '16px',
              width: '16px',
              marginRight: '6px'
            },
        };

        //Let's see if the user entered a valid background color value. This method returns undefined if not. 
        var bgColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.bgColor);
        if (!bgColor) {
            bgColor = '#ffffff';
        }

        const contentStyles = {
            content: {
                background: bgColor,
                color: txColor,
                borderRadius: 100,
            }
        }

        let showIcon = false;
        if (this.props.iconName && this.props.iconName.trim().length > 0) {
            showIcon = true;
        }

        let showText = false;
        if (this.props.text && this.props.text.trim().length > 0) {
            showText = true;
        } 


        return (
            <FSeparator
                    {...this.props}
                    vertical = { this.props.vertical }
                    alignContent = { this.props.alignment }
                    styles = { contentStyles }
                >
                    { showIcon ?
                        <Icon 
                            {...this.props}
                            iconName = { this.props.iconName.trim() }
                            styles = { iconStyles }
                        />
                    : ''
                    }
                    { showText ?
                        <Text
                            {...this.props}
                            >{this.props.text}</Text>
                    : ''
                    }
            </FSeparator>
        );
    }

}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Separator.propTypes = {
    /**
     * @uxpindescription Text to display on the separator (optional)
     */
    text: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon Name
     */  
    iconName: PropTypes.string,

    /**
     * @uxpindescription If an icon or text are set, the background color behind the content. Set with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'.  
     * @uxpinpropname Bg Color
     */
    bgColor: PropTypes.string,

    /**
     * @uxpindescription If an icon or text are set, the color for the content. Set with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'.  
     * @uxpinpropname Text Color
     */
    textColor: PropTypes.string,

    /**
    * @uxpindescription How to align content if text and/or and icon are specified 
    * @uxpinpropname Content Alignment
    */    
    alignment: PropTypes.oneOf(['start', 'center', 'end']),

    /** 
    * @uxpindescription Whether to display the separator vertical  
    */
    vertical: PropTypes.bool,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Separator.defaultProps = {
    text: "Simple Separator",
    iconName: '',
    bgColor: '',
    textColor: '',
    alignment: "center",
    vertical: false,
}

export { Separator as default };
