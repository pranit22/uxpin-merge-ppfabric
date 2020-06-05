import * as React from 'react';
import {
        Stack,
        StackItem,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';
import _ from 'lodash';


/** 
 * UPDATED May 13, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */

//****** ALIGNMENT */
const verticalAlign = 'center';

const leftAlign = 'left';
const centerAlign = 'center';
const rightAlign = 'right';
    
//****** STYLES */

//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";

const borderRadius = '4px';

//PPUI Elevation Specs: https://engineering.paypalcorp.com/confluence/display/PPUI/Elevation
const elevationShadow0 = '0 2px 4px rgba(0, 0, 0, 0.16)';  
const elevationShadow1 = '0 3px 10px rgba(0, 0, 0, 0.16)';

//****** OTHER */

const instructionText = `Card Instructions: 
1) Drag any Merge controls in for the Header, Body and Footer sections, as needed. 
2) In the Layers Panel, drag and drop each control onto this Card. 
3) Uncheck the "Show Instructions" box.`;



class PPCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
        }
    }

    _setHover(hover) {
        this.setState({ hovered: hover });
    }

    _getHorizontalAlignmentToken() {
        switch (this.props.align) {
            case leftAlign :
                return 'start';
            case centerAlign :
                return 'center';
            case rightAlign :
                return 'end';
            default :
                return 'start';
        }
    }

    render() {

        //An empty string will cause the Text control to hide.
        let instructions = this.props.showInstructions ? this.props.value : '' ;

        let hAlign = this._getHorizontalAlignmentToken();

        //Styles with dynamic values

        //****************************
        //For Outer Stack

        const topStackItemStyles = {
            root: {
              display: 'flex',
              overflow: 'hidden',
            },
        };

        //Let's make sure we have a positive number. 
        let cardPad = this.props.cardPadding < 0 ? 0 : this.props.cardPadding;

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        let cardBgColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.bgColor);

        let cardShadow =   this.state.hovered ? elevationShadow1 : elevationShadow0; 

        const divStyles = {
              backgroundColor: cardBgColor,
              borderRadius: borderRadius,
              boxShadow: this.props.showShadow ? cardShadow : '',
              padding: cardPad + 'px',
        };

        //With one number, the padding applies to both rows and columns.  
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding < 0 ? 0 : this.props.gutterPadding;

        const stackTokens = {
            childrenGap: pad,
            padding: 0, 
        };

        //****************************
        //For Text control: Instructions
        let fTextStyles = {
            root: {
                color: defaultTextColor,
                fontWeight: 'normal',
                fontStyle: 'normal',
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
                for (var i = 0; i < childList.length; i++) {
                    if (childList[i]) {
                        let child = _.cloneDeep(childList[i]);   
                        child.cardTheme = this.props.cardTheme;   
                        let stack = (
                            <StackItem 
                                align = { 'stretch' }   >
                                { child }
                            </StackItem>
                        );
                        stackList.push(stack);
                    }
                }
            }
        } //If props.children


        return (
            <div 
                    {...this.props} 
                    style= { divStyles } 
                    onMouseEnter = {() => this._setHover(true)}
                    onMouseLeave = {() => this._setHover(false)} >

            <Stack 
                {...this.props}
                tokens = { stackTokens }
                horizontal = { false }
                horizontalAlign = { hAlign }
                verticalAlign = { verticalAlign }
                wrap = { false }
                styles = { topStackItemStyles }> 
                    <Text
                        {...this.props}
                        styles = { fTextStyles }
                        variant = { 'medium' }>
                        { instructions }
                    </Text>

                    { stackList }

            </Stack>
            </div>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPCard.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */ 
    children: PropTypes.node,

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Click 'Hide Instructions' to hide this text.
     * @uxpinpropname Instructions
     * @uxpincontroltype textfield(6)
     */
    value: PropTypes.string,

    /**
     * @uxpindescription To show or hide the instructional text  
     * @uxpinpropname Show Instructions
     */ 
    showInstructions: PropTypes.bool, 

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Inner padding for all card contents. Value must be 0 or more.  
     * @uxpinpropname Card Padding
     */ 
    cardPadding: PropTypes.number,  

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding between the sections in the card. Value must be 0 or more.  
     * @uxpinpropname Section Padding
     */ 
    gutterPadding: PropTypes.number,  
    
    /**
     * @uxpindescription To horizontally align all content within the stack 
     * @uxpinpropname Alignment
     */    
    align: PropTypes.oneOf([leftAlign, centerAlign, rightAlign]),

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Bg Color
     * */  
    bgColor: PropTypes.string,

    /**
     * @uxpindescription To show or hide the card's background shadow  
     * @uxpinpropname Show Shadow
     */ 
    showShadow: PropTypes.bool, 
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPCard.defaultProps = {
    value: instructionText,    
    showInstructions: true,
    cardPadding: 12,
    gutterPadding: 12,
    align: leftAlign,
    bgColor: '',
    showShadow: true,
}


export { PPCard as default };