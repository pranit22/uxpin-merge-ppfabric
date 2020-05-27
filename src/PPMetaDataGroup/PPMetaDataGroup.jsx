import * as React from 'react';
import {
        Stack,
        StackItem,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';



  /** 
   * UPDATED April 28, 2020 by Anthony Hand
   * - Added file to our TPX UX Experimental library on UXPin.
   */


const verticalAlign = 'center';
const horizontalAlign = 'start';

const instructionText = `Data Group: 
1) Drag in PPMetaDataPair (or other) controls onto the canvas. 
2) In the Layers Panel, drag and drop it onto this control. 
3) Update this Header text.`;


//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";


class PPMetaDataGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {

        //Styles with dynamic values

        //****************************
        //For Outer Stack

        const topStackItemStyles = {
            root: {
              display: 'flex',
              overflow: 'hidden',
              width: '100%',
            },
        };

        //The left number is the vertical gap between rows. Right number is the column gap. 
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding < 0 ? 0 : this.props.gutterPadding;
        let gap = pad + ' 12';
        const stackTokens = {
            childrenGap: gap,
            padding: 0, 
        };

        //****************************
        //For Text control on the left side

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        let textColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.color);

        let fTextStyles = {
            root: {
                color: textColor ? textColor : defaultTextColor,
                fontWeight: this.props.bold ? 'bold' : 'normal',
                fontStyle: this.props.italic ? 'italic' : 'normal',
                display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
            }
        }


        //****************************
        //For Inner Stack

        //Set up the StackItems
        var stackList = [];
        if (this.props.children) {

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            //Now, we configure the StackItems
            if (childList.length) {
                var i;
                for (i = 0; i < childList.length; i++) {
                    let child = childList[i];      
                    let stack = (
                        <StackItem 
                            grow = { this.props.stretch ? true : '' }
                            align = { this.props.stretch ? "stretch" : '' }   >
                            { child }
                        </StackItem>
                    );
                    stackList.push(stack);
                }
            }
        } //If props.children

        return (

            <Stack 
                {...this.props}
                tokens = { stackTokens }
                horizontal = { false }
                horizontalAlign = { horizontalAlign }
                verticalAlign = { verticalAlign }
                wrap = { false }
                styles = { topStackItemStyles }> 

                    <Text
                        {...this.props}
                        styles = { fTextStyles }
                        variant = { this.props.size }>
                        { this.props.value }
                    </Text>

                    { stackList }

            </Stack>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPMetaDataGroup.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */ 
    children: PropTypes.node,

    /**
     * @uxpindescription The text value to display
     * @uxpinpropname Header Text
     * @uxpincontroltype textfield(6)
     */
    value: PropTypes.string,

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
     * @uxpinpropname Header Size
     */
    size: PropTypes.oneOf([
        'tiny',
        'xSmall',
        'small',
        'smallPlus',
        'medium',
        'mediumPlus',
        'large',
        'xLarge',
        'xxLarge',
        'mega',
    ]),

    /**
     * @uxpindescription To apply bold formatting
     * @uxpinpropname Header Bold
     */
    bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     * @uxpinpropname Header Italic
     */
    italic: PropTypes.bool,

    /**
     * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'
     * @uxpinpropname Header Color
     */
    color: PropTypes.string,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Row padding between the items in the group. Value must be 0 or more.
     * @uxpinpropname Gutter
     */ 
    gutterPadding: PropTypes.number,   
    
    /**
     * @uxpindescription To stretch the contents of each row
     * @uxpinpropname Stretch Contents
     */
    stretch: PropTypes.bool,

}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPMetaDataGroup.defaultProps = {
    value: instructionText,
    size: 'large',
    bold: false,
    italic: false,
    color: 'grey-700',
    gutterPadding: 12,
    stretch: true,
}


export { PPMetaDataGroup as default };