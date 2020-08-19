import * as React from 'react';
import { Card as FCard } from '@uifabric/react-cards';
import {
        Stack,
        StackItem,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';



  /** 
   * UPDATED May 8, 2020 by Anthony Hand
   * - Added file to our TPX UX Experimental library on UXPin.
   */

//****** ALIGNMENT */
const verticalAlign = 'center';

const leftAlign = 'left';
const centerAlign = 'center';
const rightAlign = 'right';
    
//****** STYLES */

const themeDefault = "Default";
const themeBlue = "PayPal Blue";
const themeDarkBlue = "PayPal Dark Blue";

//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";
const specialtyTextColor = "#ffffff"; //White

//PPUI Card Styles: https://engineering.paypalcorp.com/confluence/pages/viewpage.action?spaceKey=PPUI&title=Cards
const bgColor = "#ffffff"; //White
const bgDarkBlue = "#003087"; //Blue 800
const bgBlue = "#005EA6"; //Blue 700

const borderRadius = '4px';

//PPUI Elevation Specs: https://engineering.paypalcorp.com/confluence/display/PPUI/Elevation
const elevationShadow0 = '0 2px 4px rgba(0, 0, 0, 0.16)';  
const elevationShadow1 = '0 3px 10px rgba(0, 0, 0, 0.16)';

//****** OTHER */

const instructionText = `Card Instructions: 
1) Drag any Merge controls in for the Header, Body and Footer sections, as needed. 
2) In the Layers Panel, drag and drop each control onto this Card. 
3) Uncheck the "Show Instructions" box.`;


class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    _getHorizontalAlignmentToken() {
        switch (this.props.cardAlign) {
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

        console.log('CARD: In Render.');

        //An empty string will cause the Text control to hide.
        let instructions = this.props.showInstructions ? instructionText : '' ;

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
        let cardPad = this.props.cardPadding < 0 ? 0 : this.props.cardPadding + 'px';
        let cardBgColor =   this.props.cardTheme === themeBlue ? bgBlue 
                            : this.props.cardTheme === themeDarkBlue ? bgDarkBlue
                            : bgColor;
        let cardShadow =   this.props.cardTheme === themeBlue ? '' 
                            : this.props.cardTheme === themeDarkBlue ? ''
                            : this.state.hovered ? elevationShadow1 : elevationShadow0; //default theme only

        const divStyles = {
              backgroundColor: cardBgColor,
              borderRadius: borderRadius,
              boxShadow: cardShadow,
              padding: cardPad,
        };

        //With one number, the padding applies to both rows and columns.  
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding < 0 ? 0 : this.props.gutterPadding;

        const stackTokens = {
            childrenMargin: pad,
            padding: 0, 
        };

        //****************************
        //For Text control: Instructions
        let cardTextColor =   this.props.cardTheme === themeBlue ? specialtyTextColor 
                                : this.props.cardTheme === themeDarkBlue ? specialtyTextColor
                                : defaultTextColor;


        let fTextStyles = {
            root: {
                color: cardTextColor,
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
                var i;
                for (i = 0; i < childList.length; i++) {
                    let child = childList[i];      
                    let stack = (
                        <StackItem 
                            align = { this.props.stretch ? 'stretch' : '' }   >
                            { child }
                        </StackItem>
                    );
                    stackList.push(stack);
                }
            }
        } //If props.children

        console.log('CARD: Return section is next.');


        return (
            <FCard 
                {...this.props}
                tokens = { stackTokens }
                horizontal = { false }
                styles = { topStackItemStyles }  > 
                <FCard.Section>
                    <Text
                        styles = { fTextStyles } >
                        { instructions }
                    </Text>
                </FCard.Section>
            </FCard>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Card.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */ 
    children: PropTypes.node,

    /**
     * @uxpindescription To show or hide the instructional text  
     * @uxpinpropname Show Instructions
     */ 
    showInstructions: PropTypes.bool, 
    
    /**
     * @uxpindescription The visual theme of the card. This selection influences background color and shadow effects. 
     */    
    cardTheme: PropTypes.oneOf([themeDefault, themeDarkBlue, themeBlue]),

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
    cardAlign: PropTypes.oneOf([leftAlign, centerAlign, rightAlign]),

    /**
     * @uxpindescription To stretch the right side contents 
     * @uxpinpropname Stretch Contents
     */
    stretch: PropTypes.bool,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
Card.defaultProps = {
    showInstructions: true,
    cardTheme: themeDefault,
    cardPadding: 12,
    gutterPadding: 12,
    cardAlign: leftAlign,
    stretch: true,
}


export { Card as default };