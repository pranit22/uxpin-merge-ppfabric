import * as React from 'react';
import {
    Stack,
    StackItem,
    Text
} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxNumberParser } from '../_helpers/tpxuxnumberutils.jsx';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';


/** 
 * UPDATED May 11, 2020 by Anthony Hand
 * - Added background color feature.
 */

/** 
 * UPDATED May 1, 2020 by    Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */


const leftAlign = 'left';
const centerAlign = 'center';
const rightAlign = 'right';

const topAlign = 'top';
const middleAlign = 'middle';
const bottomAlign = 'bottom';


const instructionText = `Horizontal Stack Instructions: 
1) Determine number of columns. 
2) Drag in any Merge controls onto the canvas, incl PP Stacks and Groups. 
3) In the Layers Panel, drag and drop them onto this control.`;

//This is displayed in the codeeditor. It must retain the line break.
const defaultWidths = `50%
50%`;

//In case we can't parse user-entered column width info or it's unspecified
const defaultColWidth = "auto";

//In case we can't parse user-entered internal padding info or it's unspecified
const defaultPadding = "0";

//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";

//A StackItem that will spring to fill available space. 
const spanner = (<StackItem grow={1}><span /></StackItem>);



class PPHorizontalStack extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colWidths: []
        }
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.widths !== this.props.widths
        ) {
            this.set();
        }
    }

    set() {
        //Let's set up the column widths as specified by the user, and fill in any extra gaps.
        var columnWidths = [];
        let colWidths = this.props.widths.split("\n");

        if (colWidths.length) {
            var i;
            for (i = 0; i < colWidths.length; i++) {
                var width = TpxUxNumberParser.parsePercentOrInt(colWidths[i]);

                if (!width)
                    width = defaultColWidth;

                columnWidths.push(width);
            }
        }

        this.setState(
            { colWidths: columnWidths }
        )
    }

    /**
     * Configures style info for a StackItem
     * @param {number} columnIndex - Use the 0-based index value of the column
     */
    _getColumnWidth(columnIndex) {
        let colWidths = this.state.colWidths;
        var colWidth = defaultColWidth;

        if (colWidths && colWidths.length && columnIndex < colWidths.length) {
            colWidth = colWidths[columnIndex];
        }

        return colWidth;
    }

    _getHorizontalAlignmentToken() {
        switch (this.props.align) {
            case leftAlign:
                return 'start';
            case centerAlign:
                return 'center';
            case rightAlign:
                return 'end';
            default:
                return 'start';
        }
    }

    _getVerticalAlignmentToken() {
        switch (this.props.vAlign) {
            case topAlign:
                return 'start';
            case middleAlign:
                return 'center';
            case bottomAlign:
                return 'end';
            default:
                return 'start';
        }
    }


    render() {

        //****************************
        // Instructions
        let fTextStyles = {
            root: {
                color: defaultTextColor,
                fontWeight: 'normal',
                fontStyle: 'normal',
                display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
            }
        }

        let instructions = (
            <Text
                {...this.props}
                styles={fTextStyles}
                variant={'medium'}>
                {instructionText}
            </Text>
        );

        //****************************
        //For Outer Stack

        let hAlign = this._getHorizontalAlignmentToken();
        let vAlign = this._getVerticalAlignmentToken();

        //Styles with dynamic values

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        var color = TpxUxColors.getHexFromHexOrPpuiToken(this.props.bgColor);
        if (!color)
            color = 'transparent';

        //For internal padding within the stack. 
        let internalPadding = this.props.internalPadding > 0 ? this.props.internalPadding : defaultPadding;

        const topStackItemStyles = {
            root: {
                background: color,        //undefined is OK
                height: this.props.stackHeight || 'auto'
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
        //For Inner Stack

        //Set up the StackItems
        var stackList = [];
        if (this.props.children) {

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            //Now, we configure the StackItems
            if (childList && childList.length) {

                for (var i = 0; i < childList.length; i++) {
                    let child = childList[i];

                    let stackItemWidth = this._getColumnWidth(i);
                    let stackItemStyle = {
                        root: {
                            width: stackItemWidth
                        },
                    };

                    //Now we put it all together!
                    let stack = (
                        <StackItem
                            key={i}
                            align={this.props.stretch ? "stretch" : ''}
                            styles={stackItemStyle}
                        >
                            {child}
                        </StackItem>
                    );
                    stackList.push(stack);
                } //for loop

                //Do we need to add a spanner?
                if (this.props.addSpanner && this.props.spannerIndex > 0 && this.props.spannerIndex <= stackList.length) {
                    let newIndex = this.props.spannerIndex - 1;

                    //Add the spanner at the specified index, deleting 0 other items.
                    stackList.splice(newIndex, 0, spanner);
                }

            } //if childList
        } //If props.children

        return (

            <Stack
                {...this.props}
                tokens={stackTokens}
                padding={internalPadding + 'px'}
                horizontal={true}
                horizontalAlign={hAlign}
                styles={topStackItemStyles}
            >

                {_.isEmpty(this.props.children) && instructions}
                {stackList}

            </Stack>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPHorizontalStack.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
     * @uxpindescription The list of widths. Put one width amount on each row. Enter a percent like '33%' or a whole number, like '212'. Be sure that the full width is accounted for! (In percent or pixels)
     * @uxpinpropname Col Widths
     * @uxpincontroltype codeeditor
     */
    widths: PropTypes.string,

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
     * @uxpindescription To stretch the right side contents 
     * @uxpinpropname Stretch Contents
     */
    stretch: PropTypes.bool,

    /**
     * @uxpindescription To insert a spanner to fill empty space between two elements. 
     * @uxpinpropname Add Spanner
     */
    addSpanner: PropTypes.bool,

    /**
     * @uxpindescription The 1-based index for where to insert a Spanner. The Spanner will be inserted to the left of the item that is at this index value.
     * @uxpinpropname Spanner Index
     */
    spannerIndex: PropTypes.number,

    /**
     * @uxpindescription To wrap the contents that overflow the stack 
     * @uxpinpropname Wrap
     */
    wrap: PropTypes.bool,

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Bg Color
     * */
    bgColor: PropTypes.string,

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription The height of the stack
     * @uxpinpropname Stack Height
     */
    stackHeight: PropTypes.string,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPHorizontalStack.defaultProps = {
    widths: defaultWidths,
    internalPadding: 0,
    gutterPadding: 12,
    align: leftAlign,
    vAlign: topAlign,
    fillParent: false,
    stretch: true,
    addSpanner: false,
    spannerIndex: 1,
    bgColor: '',
    wrap: false
}


export { PPHorizontalStack as default };