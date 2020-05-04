import * as React from 'react';
import {ColorPicker as FColorPicker} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';



/**
 * UPDATED April 10, 2020 by Anthony Hand
 * - Created a brand new component.
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 */


class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedColorObj: ""
        }
    }

    componentDidMount() {
        //Let's see if the UXPin designer entered a default color value...
        let color = "";
        if (this.props.selectedColor) 
        {
            //if the color starts with a hex value, we can use it as-is
            if (this.props.selectedColor.startsWith("#")) {
                color = this.props.selectedColor;
            }
            else {
                //Else, let's assume it's a PayPal UI color token, such as 'blue-600'. This can return undefined.
                color = TpxUxColors.getHexFromPPUIColorToken(this.props.selectedColor);
            }
        }

        if (color) {
            this.setState(
                { selectedColorObj: color }
            )
        }
    }


    _onColorChanged(color) {

        this.setState (
            {   selectedColorObj: color}
        )

        //Get the hex for the selected color and surface that
        let hex = "#" + color.hex;

        //Return the index of the color so UXPin can catch it
        if (this.props.onColorChange) {
            this.props.onColorChange(hex);
        }
    }


    render() {

        return (

            <FColorPicker 
                {...this.props}
                showPreview = { true } //hard code this
                color = { this.state.selectedColorObj }
                alphaSliderHidden = { !this.props.showAlpha }
                onChange = {(evt, c) => this._onColorChanged(c) } //Only catch the color
            />

        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ColorPicker.propTypes = {

    /**
     * @uxpindescription A PayPal UI or Hex color value to provide as the default color, such as: 'blue-600' or '#0070BA' (Optional)
     * @uxpinpropname Selected Color
     */ 
    selectedColor: PropTypes.string,

    /**
     * @uxpindescription To show the Alpha transparency features
     * @uxpinpropname Show Alpha
     * */
    showAlpha: PropTypes.bool,

    /**
     * @uxpindescription Fires when a color is selected
     * @uxpinpropname Change
     */  
    onColorChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ColorPicker.defaultProps = {
    selectedColor: "",
    showAlpha: true,
};


export { ColorPicker as default };
