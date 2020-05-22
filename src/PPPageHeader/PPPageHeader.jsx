import * as React from 'react';
import {
        Stack,
        StackItem,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';



const defaultSuperText = "Super Text";
const defaultSuperTextSize = 'medium';

const defaultPageHeading = "Page Title";
const defaultPageHeadingSize = 'xxLarge';

const defaultSubText = "TIP: Add Action, Icon and/or Command Buttons to make a Toolbar on the right";
const defaultSubTextSize = 'medium';

const defaultTextColor = 'grey-700';
const defaultTextColorHex = '#2C2E2F';

const defaultBgColor = 'blue-100';

const defaultBorderColor = 'blue-300';
const defaultBorderThickness = 1;
const borderSolid = 'solid';

const defaultInternalPadding = 24;
const defaultGutterPadding = 12;
const defaultTextStackPadding = 6;



class PPPageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
        }
    }



    _getBorderStyle() {
        var bColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.borderColor);

        //If the line thickness is 0 or the user has removed the line color, then we're done.
        if (this.props.borderThickness < 1 || !bColor) 
            return 'none';

        let thickness = this.props.borderThickness > 0 ? this.props.borderThickness : defaultBorderThickness;
        
        return thickness + 'px ' + borderSolid + ' ' + bColor;
    }



    render() {
        //Outer container stack is a horizontal stack.
        //Left Vertical Stack holds the Page Heading and super & sub text.
        //Right Horizontal Stack holds toolbar.


        //****************************
        //OUTER HORIZONTAL STACK
        //For internal padding within the stack. 

        let internalPadding = this.props.internalPadding > 0 ? this.props.internalPadding : 0;

        //With one number, the padding applies to both rows and columns.  
        const outerStackTokens = {
            childrenGap: defaultTextStackPadding,
            padding: 0, 
        };

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        var color = TpxUxColors.getHexFromHexOrPpuiToken(this.props.bgColor);

        const outerStackStyles = {
            root: {
                display: 'flex',
                overflow: 'hidden',
                background: color ? color : 'transparent',
                borderBottom: this._getBorderStyle(),
            },
        };


        //****************************
        //TEXT VERTICAL STACK

        //Applies to all text
        var stColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.textColor);
        if (!stColor) {
            stColor = defaultTextColorHex ;
        }
        let fTextStyles = {
            root: {
                color: stColor,
                fontWeight: 'normal',
                fontStyle: 'normal',
                display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
            }
        }

        //****************************
        //SUPER TEXT
        var superText = '';
        if (this.props.superTextValue) {
            
            superText = (
                <Text
                    styles = { fTextStyles }
                    variant = { this.props.superTextSize }>
                    { this.props.superTextValue.trim() }
                </Text>
            );
        }

        //****************************
        //MAIN HEADING TEXT

        //With one number, the padding applies to both rows and columns.  
        const headingRowStackTokens = {
            childrenGap: 24,
            padding: 0, 
        };

        var mainHeadingText = '';
        if (this.props.pageHeadingText) {

            let mhtStyles = {
                root: {
                    color: stColor,
                    fontWeight: this.props.pageHeadingBold ? 'bold' : 'normal',
                    fontStyle: this.props.pageHeadingItalic ? 'italic' : 'normal',
                    display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                    lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
                }
            }
            
            mainHeadingText = (
                <Text
                    styles = { mhtStyles }
                    variant = { this.props.pageHeadingSize }>
                    { this.props.pageHeadingText.trim() }
                </Text>
            );
        }

        //****************************
        //SUB TEXT
        var subText = '';
        if (this.props.subTextValue) {
            
            subText = (
                <Text
                    styles = { fTextStyles }
                    variant = { this.props.subTextSize }>
                    { this.props.subTextValue.trim() }
                </Text>
            );
        }


        //****************************
        //RIGHT SIDE HORIZONTAL TOOLBAR STACK

        //With one number, the padding applies to both rows and columns.  
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding > 0 ? this.props.gutterPadding : 0;
        const toolbarStackTokens = {
            childrenGap: pad,
            padding: 0, 
        };
        
        //Set up the StackItems
        var stackList = [];
        if (this.props.children) {

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            //Now, we configure the StackItems
            if (childList && childList.length) {

                for (var i = 0; i < childList.length; i++) {
                    let child = childList[i];  

                    //Now we put it all together!
                    let stack = (
                        <StackItem>
                            { child }
                        </StackItem>
                    );
                    stackList.push(stack);
                } //for loop
            } //if childList
        } //If props.children


        //<div style={outerDivStyles} padding={internalPadding}>
        //padding = { internalPadding }

        return (

           
            
            <Stack                                          //Outer wrapper stack
                {...this.props}
                tokens = { outerStackTokens }
                horizontal = { false }
                horizontalAlign = { 'start' }
                verticalAlign = { 'center' }
                wrap = { false }
                styles = {outerStackStyles }  
                padding = { internalPadding + 'px' }  >

                    <StackItem>
                        { superText }
                    </StackItem>

                    <StackItem align = { 'stretch' } >                             
                        <Stack                                          //Left side Page header text             
                            tokens = { headingRowStackTokens }
                            horizontal = { true }
                            horizontalAlign = { 'start' }
                            verticalAlign = { 'center' }
                            wrap = { false }>

                                <StackItem>
                                    { mainHeadingText }
                                </StackItem>

                                <StackItem grow={1}><span /></StackItem>

                                <StackItem>
                                    <Stack                            //Right side toolbar stack
                                        tokens = { toolbarStackTokens }
                                        horizontal = { true }
                                        horizontalAlign = { 'end' }
                                        verticalAlign = { 'center' }
                                        wrap = { false }>
                                            { stackList }
                                    </Stack>
                                </StackItem>
                        </Stack>
                    </StackItem>

                <StackItem>
                    { subText }
                </StackItem>
                
            </Stack>


        );
    }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPPageHeader.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Command Bar values 
     * @uxpinpropname 
     */ 
    children: PropTypes.node,

    /**
     * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Text Color
     */
    textColor: PropTypes.string,

    /**
     * @uxpindescription Small text value appearing above the main page heading
     * @uxpinpropname Top Text
     * @uxpincontroltype textfield(2)
     */
    superTextValue: PropTypes.string,

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
     * @uxpinpropname Top Size
     */
    superTextSize: PropTypes.oneOf(['tiny', 'xSmall', 'small', 'smallPlus', 'medium', 'mediumPlus', 'large', 'xLarge', 'xxLarge', 'mega', ]),

    /**
     * @uxpindescription The main page heading text value 
     * @uxpinpropname Heading
     * @uxpincontroltype textfield(2)
     */
    pageHeadingText: PropTypes.string,

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
     * @uxpinpropname Heading Size
     */
    pageHeadingSize: PropTypes.oneOf(['tiny', 'xSmall', 'small', 'smallPlus', 'medium', 'mediumPlus', 'large', 'xLarge', 'xxLarge', 'mega', ]),

    /**
     * @uxpindescription To apply bold formatting
     * @uxpinpropname Heading Bold
     */
    pageHeadingBold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     * @uxpinpropname Heading Italics
     */
    pageHeadingItalic: PropTypes.bool,

    /**
     * @uxpindescription Small text value appearing below the main page heading
     * @uxpinpropname Sub-Text
     * @uxpincontroltype textfield(2)
     */
    subTextValue: PropTypes.string,

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
     * @uxpinpropname Sub-Text Size
     */
    subTextSize: PropTypes.oneOf(['tiny', 'xSmall', 'small', 'smallPlus', 'medium', 'mediumPlus', 'large', 'xLarge', 'xxLarge', 'mega', ]),

    /**
     * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Bg Color
     */
    bgColor: PropTypes.string,

    /**
     * @uxpindescription The thickness of the bottom border line 
     * @uxpinpropname Border Line Thickness
     */
    borderThickness: PropTypes.number,

    /**
     * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Border Color
     */
    borderColor: PropTypes.string,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding within the control. Value must be 0 or more. 
     * @uxpinpropname Padding
     */ 
    internalPadding: PropTypes.number, 

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding between items added to this control. Value must be 0 or more.  
     * @uxpinpropname Right Gutter
     */ 
    gutterPadding: PropTypes.number,  
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPPageHeader.defaultProps = {
    textColor: defaultTextColor,
    superTextValue: defaultSuperText,
    superTextSize: defaultSuperTextSize,
    pageHeadingText: defaultPageHeading,
    pageHeadingSize: defaultPageHeadingSize,
    pageHeadingBold: false,
    pageHeadingItalic: false,
    subTextValue: defaultSubText,
    subTextSize: defaultSubTextSize,
    bgColor: defaultBgColor,
    borderThickness: defaultBorderThickness,
    borderColor: defaultBorderColor,
    internalPadding: defaultInternalPadding,
    gutterPadding: defaultGutterPadding,
}


export { PPPageHeader as default };