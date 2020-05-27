import * as React from 'react';
import {
        Stack,
        StackItem,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';


/** 
 * UPDATED May 14, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */


const defaultBoxSize = '1';  //The smallest allowed box size
const defaultPadding = '0'; 

const leftAlign = 'left';
const centerAlign = 'center';
const rightAlign = 'right';

const topAlign = 'top';
const middleAlign = 'middle';
const bottomAlign = 'bottom';

const borderNone = 'none';
const borderTop = 'top';
const borderLeft = 'left';
const borderBottom = 'bottom';
const borderRight = 'right';
const borderAll = 'all';

const borderDashed = 'dashed';
const borderSolid = 'solid';
const borderDotted = 'dotted';

const defaultBorderThickness = '1';
const defaultBorderColor = 'grey-300';
const defaultBorderRadius = '4';

const instructionText = `Shape Instructions: 
1) Set sizing and other desired properties.
2) Optionally, drag any Merge controls onto the canvas. 
2) In the Layers Panel, drag and drop Merge controls onto this control. 
3) Uncheck the "Show Instructions" box.`;


//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";


class PPShape extends React.Component {
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

    _getVerticalAlignmentToken() {
        switch (this.props.vAlign) {
            case topAlign :
                return 'start';
            case middleAlign :
                return 'center';
            case bottomAlign :
                return 'end';
            default :
                return 'start';
        }
    }



    _getBorderStyle(edge) {
        var bStyle = undefined;
        var calcStyle = false;

        //If the user has specified no border, we always exit
        if (this.props.borderEdge === borderNone) 
            return 'none';

        //If it's a circle, we only want to set props on the border all property, unless the user has selected no border
        if (this.props.isCircle && edge === borderAll) {
            calcStyle = true;
        }
        else if (!this.props.isCircle && edge === this.props.borderEdge) {
            //If it's not a circle, then we calculate by whether the edge matches the selected prop. 
            calcStyle = true;
        }

        if (calcStyle) {
            let thickness = this.props.borderThickness > 0 ? this.props.borderThickness : defaultBorderThickness;

            let line =  this.props.borderStyle === borderSolid ? borderSolid 
                        : this.props.borderStyle === borderDashed ? borderDashed
                        : borderDotted;

            //The function returns undefined if it's unparseable
            var bColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.borderColor);
            if (!bColor)
                bColor = defaultBorderColor;
            
            bStyle = thickness + 'px ' + line + ' ' + bColor;
        }  

        return bStyle;
    }


    _onClick() {
        //Raise this event to UXPin. 
        if (this.props.onClick) {
          this.props.onClick();
        }
    }

    render() {

        //****************************
        //For Text control: Instructions
        //Let's see if we need to show instructions
        var instructionStack = '';
        if (this.props.showInstructions) {

            let fTextStyles = {
                root: {
                    color: defaultTextColor,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                    lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
                }
            }
            
            instructionStack = (
                <Text
                    {...this.props}
                    styles = { fTextStyles }
                    variant = { 'medium' }>
                    { this.props.value }
                </Text>
            );
        }

        //Styles with dynamic values

        //****************************
        //For Outer Stack

        let hAlign = this._getHorizontalAlignmentToken();
        let vAlign = this._getVerticalAlignmentToken();

        //For internal padding within the stack. 
        let internalPadding = this.props.internalPadding > 0 ? this.props.internalPadding : defaultPadding;

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        var color = TpxUxColors.getHexFromHexOrPpuiToken(this.props.bgColor);
        if (!color) 
            color = 'transparent';
        
        let mWidth = this.props.boxWidth > defaultBoxSize ? this.props.boxWidth : defaultBoxSize;
        let mHeight = this.props.boxHeight > defaultBoxSize ? this.props.boxHeight : defaultBoxSize;

        var bRadius = '';
        if (this.props.isCircle) {
            bRadius = '50%';
        }
        else {
            bRadius = this.props.borderRadius > 0 ? this.props.borderRadius : 0;
        }

        const topStackItemStyles = {
            root: {
                minWidth: mWidth + 'px',
                minHeight: mHeight + 'px',
                display: 'flex',
                overflow: 'hidden',
                borderRadius: bRadius,
                background: color,
                border: this._getBorderStyle(borderAll),
                borderTop: this._getBorderStyle(borderTop),
                borderRight: this._getBorderStyle(borderRight),
                borderBottom: this._getBorderStyle(borderBottom),
                borderLeft: this._getBorderStyle(borderLeft),
            },
        };

        //With one number, the padding applies to both rows and columns.  
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding > 0 ? this.props.gutterPadding : 0;

        const stackTokens = {
            childrenGap: pad,
            padding: 0, 
        };

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
                    let child = childList[i];
                    
                    //align = { 'stretch' } 

                    let stack = (
                        <StackItem
                            align = { this.props.stretch ? 'stretch' : '' }>
                            { child }
                        </StackItem>
                    );
                    stackList.push(stack);
                } //for loop
            } //if childList
        } //If props.children

        return (

            <Stack 
                {...this.props}
                tokens = { stackTokens }
                padding = { internalPadding }
                horizontal = { false }
                horizontalAlign = { hAlign }
                verticalAlign = { vAlign }
                wrap = { false }
                styles = { topStackItemStyles }
                onClick = { () => { this._onClick() } }> 

                    { instructionStack }

                    { stackList }

            </Stack>

        );
    }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPShape.propTypes = {

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
     * @uxpindescription To set the shape to a circle rather than a rectangle  
     * @uxpinpropname Circle
     */ 
    isCircle: PropTypes.bool, 

    /**
    * @uxpindescription A minimum width for the control. Most useful when inserting this into a Stack or Card.   
    * @uxpinpropname Min Width
    */ 
    boxWidth: PropTypes.number,

    /**
    * @uxpindescription The height of the control   
    * @uxpinpropname Height
    */ 
    boxHeight: PropTypes.number,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding within the stack. Value must be 0 or more. 
     * @uxpinpropname Padding
     */ 
    internalPadding: PropTypes.number, 

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Row padding between the items in the group. Value must be 0 or more.  
     * @uxpinpropname Gutter
     */ 
    gutterPadding: PropTypes.number,  

    /**
     * @uxpindescription To horizontally align all content within the stack 
     * @uxpinpropname Horiz Alignment
     */    
    align: PropTypes.oneOf([leftAlign, centerAlign, rightAlign]),

    /**
     * @uxpindescription To vertically align all content within the stack 
     * @uxpinpropname Vert Alignment
     */    
    vAlign: PropTypes.oneOf([topAlign, middleAlign, bottomAlign]),

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Bg Color
     * */  
    bgColor: PropTypes.string,

    /**
     * @uxpindescription The edge(s) to display the border on, if any  
     * @uxpinpropname Border Edge
     */ 
    borderEdge: PropTypes.oneOf([borderNone, borderAll, borderTop, borderRight, borderBottom, borderLeft]),

    /**
     * @uxpindescription The style of line to use  
     * @uxpinpropname Line Style
     */ 
    borderStyle: PropTypes.oneOf([borderDotted, borderSolid, borderDashed]),

    /**
     * @uxpindescription The thickness of the border line, if specified
     * @uxpinpropname Border Thickness
     */ 
    borderThickness: PropTypes.number, 

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Border Color
     * */  
    borderColor: PropTypes.string,

    /**
     * @uxpindescription The radius of the border line, if specified. PayPal UI typically uses 4 for rounded corners.
     * @uxpinpropname Border Radius
     */ 
    borderRadius: PropTypes.number, 

    /**
     * @uxpindescription To stretch the contents within each section
     * @uxpinpropname Stretch Contents
     */
    stretch: PropTypes.bool,

    /**
     * @uxpindescription Fires when the control is clicked on.
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPShape.defaultProps = {
    value: instructionText,    
    showInstructions: true,
    isCircle: false,
    boxWidth: 50,
    boxHeight: 50,
    internalPadding: 0,
    gutterPadding: 12,
    align: centerAlign,
    vAlign: middleAlign,
    bgColor: '',
    borderEdge: borderAll,
    borderStyle: borderSolid,
    borderThickness: defaultBorderThickness,
    borderColor: defaultBorderColor,
    borderRadius: defaultBorderRadius,
    stretch: false,
}


export { PPShape as default };