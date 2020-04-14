import * as React from 'react';
import { FontIcon } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';


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


class Icon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {

        let size = this.props.size;

        //Determine whether the user entered a PayPal UI color token like 'blue-600' or a Hex color.
        let c = this.props.color.trim();
        //By default, assume we had a hex color value. 
        var compColor = c;
        //If it doesn't start with a hashtag, set the computed color assuming we have a PayPal UI color token.
        if (!c.startsWith("#")) {
            compColor = `var(--color-${c})`;
        }

        const iconDisplayClass = mergeStyles({
            color: compColor,
            fontSize: size,
            height: size,
            width: size,
            margin: '0',
            padding: '0',
            verticalAlign: 'sub'
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

