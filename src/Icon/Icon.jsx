import * as React from 'react';
import { FontIcon } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';



  /**
   * UPDATED April 24, 2020 by Anthony Hand
   * - Fixed issue where when one nudged the icon up or down a pixel, the control would a) sometimes move 3 pixels, 
   *      and b) sometimes move the opposite direction instead. 
   * - Fixed issue where the icon appeared to overlap its bounding box. 
   *      This interfered with aligning the control and positioning it on the canvas. 
   * - Adopted the improved algorithm from TpxUXColors utility for calculating what color value the user entered.
   * */

  /**
   * UPDATED April 6, 2020 by Anthony Hand
   * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
   * - Converted object to a class.
   * - Added file to our TPX UX Experimental library on UXPin.
   * 
   * TODOs
   * - Figure out alignment within the bounding box in the UXPin Editor. 
   *        Right now, the image is a little high within the bounding box. 
   * 
   * */


//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultColor = "#000000";


class Icon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {

        let size = this.props.size;

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        var color = TpxUxColors.getHexFromHexOrPpuiToken(this.props.color);
        if (!color) {
            color = defaultColor;
        }

        const iconDisplayClass = mergeStyles({
            color: color,
            fontSize: size,
            height: size,
            width: size,
            display: 'block',
            lineHeight: 'normal',
        });

        return (

            <FontIcon 
                {...this.props}
                iconName = { this.props.iconName }
                className = { iconDisplayClass }
            />

        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Icon.propTypes = {

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon Name
     * */  
    iconName: PropTypes.string,

    /**
     * @uxpindescription The size to use for the width and height
     * */  
    size: PropTypes.number,

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * */  
    color: PropTypes.string,

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Icon.defaultProps = {
    iconName: "Home",
    size: 50,
    color: "grey-700"
};



export { Icon as default };

