import * as React from 'react';
import {
        ActionButton,
        FontIcon,
        Stack,
        StackItem,
        Text 
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { getTokens, csv2arr } from '../_helpers/parser.jsx';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';

/** 
 * UPDATED May 13, 2020 by Anthony Hand
 * - Added an Icon to the front of the PPCardHeader.
 */

/** 
 * UPDATED May 11, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */

    
//****** STYLES */

//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";

const defaultIconSize = 24;
const defaultIconName = 'Card';

//****** OTHER */

const defaultHeaderText = "Card Header Text";


//Default pivot tab items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultItems = `icon(Document) Document
icon(FileCode) Code File
icon(Picture) Picture`; 


class CardTextHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        this.setItems();
    }

    //Get the user-entered left icon name, if there is one
    getLeftIcon(str) {
        const tokens = getTokens(str).tokens
        const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start')
        return leftIcon ? leftIcon.target : null
    }

    //If the user has chosen a tiled options display, let's figure out the icon names.
    getIconProps(str) {
        return  {
            iconName: this.getLeftIcon(str) 
        }
    }

    //Parse the choice items
    setItems() {

        if (!this.props.items)
            return;

        let items = csv2arr(this.props.items)
            .flat()
            .map((val, index) => ({
                text: getTokens(val).text,
                key: index + 1,  //1 based index
                disabled: false,
                iconProps: this.getIconProps(val),
                onClick: () => { this._onClick(index + 1) } //same as key, 1-based
            }));

        this.setState({
            items: items
        });
    }


    //The main Icon Button always passes 0.
    //Any sub-menu buttons pass their 1-based index value.
    _onClick(index) {
        //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(index);
        }
    }


    render() {

        //Styles with dynamic values

        //****************************
        //For Outer Stack

        //Let's make sure we have a positive number. 

        const topStackItemStyles = {
            root: {
              display: 'flex',
              overflow: 'hidden',
            },
        };

        //With one number, the padding applies to both rows and columns.  
        //Let's make sure we have a positive number. 
        let pad = '12px';

        const stackTokens = {
            childrenGap: pad,
            padding: 0, 
        };

        //****************************
        //For Icon

        var iconStackItem = '';
        if (this.props.iconName) {
            let iName = this.props.iconName.trim();

            let iSize = this.props.iconSize + 'px';

            //Let's see if the user entered a valid color value. This method returns undefined if not. 
            var iColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.iconColor);
            if (!iColor) {
                iColor = defaultTextColor;
            }
    
            const iconDisplayClass = mergeStyles({
                color: iColor,
                fontSize: iSize,
                height: iSize,
                width: iSize,
                display: 'block',           //Required
                lineHeight: 'normal',       //Required
            });
    
            iconStackItem = (
                    <FontIcon 
                        iconName = { iName }
                        className = { iconDisplayClass }
                    />
            );
        }

        //****************************
        //For Text control

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        let textColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.textColor);

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
        //For CommandButton 

        let iconProps = { 
            iconName: 'ElipsisVertical',
        }

        let items = {
            items: this.state.items
        }

        var commButton = undefined;
        if (this.props.items && this.state.items.length) {
            commButton = (
                <ActionButton
                    text = {" "}
                    menuProps = { items }
                    menuIconProps = { iconProps }
                />
            );
        }

        return (

            <Stack 
                tokens = { stackTokens }
                horizontal = { true }
                horizontalAlign = { 'start' }
                verticalAlign = { 'center' }
                wrap = { false }
                styles = { topStackItemStyles }> 

                    <StackItem>
                        { iconStackItem }
                    </StackItem>

                    <StackItem>
                        <Text
                            styles = { fTextStyles }
                            variant = { this.props.size }>
                            { this.props.value }
                        </Text>
                    </StackItem>
                    <StackItem grow={1}><span /></StackItem>
                    <StackItem>
                        
                        { commButton }
                        
                    </StackItem>
            </Stack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CardTextHeader.propTypes = {

    /**
     * @uxpindescription Text to display in the header
     * @uxpinpropname Header Text
     * @uxpincontroltype textfield(6)
     */
    value: PropTypes.string,

    /**
     * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Text Color
     */
    textColor: PropTypes.string,

    /**
     * @uxpindescription To apply bold formatting
     */
    bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     */
    italic: PropTypes.bool,

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
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
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon Name
     * */  
    iconName: PropTypes.string,

    /**
     * @uxpindescription The size to use for the icon's width and height
     * @uxpinpropname Icon Size
     * */  
    iconSize: PropTypes.number,

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Icon Color
     * */  
    iconColor: PropTypes.string,

    /**
     * @uxpindescription An optional list of menu items. Put each option on a separate line.  Add an icon(IconName) at the start of each line.
     * @uxpinpropname Menu Items
     * @uxpincontroltype codeeditor
     * */
    items: PropTypes.string,

    /**
     * @uxpindescription Fires when the button is clicked on.
     * @uxpinpropname Click
     * */   
    onClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
CardTextHeader.defaultProps = {
    value: defaultHeaderText,
    textColor: defaultTextColor,
    size: 'large',
    bold: true,
    italic: false,
    iconName: defaultIconName,
    iconSize: defaultIconSize,
    iconColor: defaultTextColor,
    items: defaultItems,
}


export { CardTextHeader as default };