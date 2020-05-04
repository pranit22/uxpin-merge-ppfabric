import * as React from 'react';
import {SwatchColorPicker as FSwatchColorPicker} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';



let cellMinSize = 10;
let cellMaxSize = 100;
let cellCountMax = 300;


const colorCellsExample1 = [
    { id: '1', label: 'red', color: '#a4262c' },
    { id: '2', label: 'orange', color: '#ca5010' },
    { id: '3', label: 'orangeYellow', color: '#986f0b' },
    { id: '4', label: 'yellowGreen', color: '#8cbd18' },
    { id: '5', label: 'green', color: '#0b6a0b' },
    { id: '6', label: 'cyan', color: '#038387' },
    { id: '7', label: 'cyanBlue', color: '#004e8c' },
    { id: '8', label: 'magenta', color: '#881798' },
    { id: '9', label: 'magentaPink', color: '#9b0062' },
    { id: '10', label: 'black', color: '#000000' },
    { id: '11', label: 'gray', color: '#7a7574' },
    { id: '12', label: 'gray20', color: '#69797e' },
];


class SwatchColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 10,
            selectedColorID: null, //Must be null for default
            selectedColor: null,   //Must be null for default
            colors: []
        }
    }

    componentDidMount() {
        console.log("componentDidMount");''
        //First, let's populate the color array.
        var colors = [];
        if (this.props.palette == "PayPal UI Blues") {
            console.log("PayPal UI Blues");
            colors = TpxUxColors.getPPUIBlues();
        }
        else if (this.props.palette == "PayPal UI Greys") {
            console.log("PayPal UI Greys");
            colors = TpxUxColors.getPPUIGreys();
        }
        else if (this.props.palette == "PayPal UI Accents") {
            console.log("PayPal UI Accents");
            colors = TpxUxColors.getPPUIAccents();
        }
        else {
            //Else we need to parse the colors they put into the items list
            //TODO: We'll come back to this!
            console.log("Custom");
            colors = TpxUxColors.getPPUIAccents();
        }

        //Next, let's normalize the size coming in from props.
        let size = this.props.size;

        if (size < cellMinSize) 
            size = cellMinSize;

        if (size > cellMaxSize) 
            size = cellMaxSize;
        
        this.setState (
            {   colors: colors, 
                size: size }
        )
    }

    _getSelectedColorID () {
        //By default, if it's an empty string, the Microsoft control won't show anything as selected
        var selectedColorID = "";

        //Since the default value is null, we know that if there's a value here, it's been set by the end user
        if (this.state.selectedColorID) {
            selectedColorID = this.state.selectedColorID;
        }
        else if (this.props.selectedColor) {
            //Let's parse it into a number. This should be a 1-based index number.
            let index = parseInt(this.props.selectedColor);
            if (!isNaN(index) &&
                index > 0 &&
                index < cellCountMax) {
                selectedColorID = index - 1; //State uses a 0 based index
            }
        }

        return selectedColorID;
    }


    _onColorChanged(id, color) {
        console.log("Color selected. ID: " + id);
        console.log("    Color: " + color);

        this.setState (
            {   selectedColorID: id, 
                selectedColor: color}
        )

        //Return the index of the color so UXPin can catch it
        if (this.props.onChange) {
            this.props.onChange(id);
        }
    }


    render() {

        let selectedColorID = this._getSelectedColorID();

        return (

            <FSwatchColorPicker 
                {...this.props}
                isControlled = { true } //We'll keep track internally  which color is selected
                colorCells = { colorCellsExample1 }
                selectedID = { selectedColorID }
                cellShape = { this.props.shape }
                cellWidth = { this.state.size }
                cellHeight = { this.state.size }
                columnCount = { this.state.columns }
                disabled = { this.disabled }
                onColorChanged = {(id, c) => this._onColorChanged(id, c) }
            />

        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
SwatchColorPicker.propTypes = {

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon Name
     */  
    shape: PropTypes.oneOf(['circle', 'square']),

    /**
     * @uxpindescription The size to use for the width and height. Valid values are between 10 - 100.
     */  
    size: PropTypes.number,

    /**
     * @uxpindescription The number of swatches to display in each row
     */  
    columns: PropTypes.number,

    /**
     * @uxpindescription The padding to use between each color swatch
     */  
    padding: PropTypes.number,

    /**
     * @uxpindescription Select one of the PayPal UI color palettes, or enter a custom set of your own with the Custom Colors property
     * @uxpinpropname Palette
     */  
    palette: PropTypes.oneOf([
        'PayPal UI Blues', 
        'PayPal UI Greys',
        'PayPal UI Accents',
        'Custom']),

    /**
     * @uxpindescription Enter one color per line using this pattern: Color Name, Hex Value. Note the comma! Example: Eggshell Blue, #0070BA
     * @uxpinpropname Custom Colors
     */  
    colors: PropTypes.string,

        /**
     * @uxpindescription The 1-based index for the selected color. Leave blank or enter -1 for no selection.
     * @uxpinpropname Selected Color
     */ 
    selectedColor: PropTypes.number,

    /**
     * @uxpindescription To disable the control
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when a color is selected
     * @uxpinpropname Change
     */  
    onChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
SwatchColorPicker.defaultProps = {

    shape: 'circle',
    size: 24,
    padding: 10,
    columns: 5,
    palette: 'PayPal UI Blues',
    disabled: false,
};


export { SwatchColorPicker as default };
