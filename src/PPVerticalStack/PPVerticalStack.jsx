import * as React from 'react';
import {
        Stack,
        StackItem,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';



  /** 
   * UPDATED April 29, 2020 by Anthony Hand
   * - Added file to our TPX UX Experimental library on UXPin.
   */


const verticalAlign = 'center';

const leftAlign = 'left';
const centerAlign = 'center';
const rightAlign = 'right';

const instructionText = `Vertical Stack Instructions: 
1) Drag any Merge controls onto the canvas. 
2) In the Layers Panel, drag and drop it onto this control. 
3) Uncheck the "Show Instructions" box.`;
    

//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";


class PPVerticalStack extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
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


        return (

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
                        variant = { this.props.size }>
                        { instructions }
                    </Text>

                    { stackList }

            </Stack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPVerticalStack.propTypes = {

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
     * @uxpindescription Row padding between the items in the group. Value must be 0 or more.  
     * @uxpinpropname Gutter
     */ 
    gutterPadding: PropTypes.number,  
    
    /**
     * @uxpindescription To horizontally align all content within the stack 
     * @uxpinpropname Alignment
     */    
    align: PropTypes.oneOf([leftAlign, centerAlign, rightAlign]),

    /**
     * @uxpindescription To stretch the right side contents 
     * @uxpinpropname Stretch Contents
     */
    stretch: PropTypes.bool,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPVerticalStack.defaultProps = {
    value: instructionText,    
    showInstructions: true,
    gutterPadding: 12,
    align: leftAlign,
    stretch: true,
}


export { PPVerticalStack as default };