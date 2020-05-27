import * as React from 'react';
import {
    Link as FLink,
    Text
} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';


//TODO: getStyles to merge styles on Link. Disabled state no longer works. 


/** 
 * UPDATED April 29, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */


const primaryColor = '#0070BA';         //"blue-600";   //Also disclosure
const primaryHoverColor = '#003087';    //"blue-800";   //Also disclosure

const secondaryColor = '#000000';       //"black";
const secondaryHoverColor = "#000000";  //"black";

const textDecor = "none";               //Primary and secondary
const hoverTextDecor = "underline";     //Primary and secondary

const disclosureTextDecor = "underline dotted";


class Link extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            linkColor: "",
            hoverColor: "",
            decoration: "",
            hoverDecoration: ""
        }
    }

    set() {
        //Because any prop change in UXPin causes the control to remount, let's figure these out once and store them.
        let role = this.props.linkType;

        //Primary and Disclosure share the same color
        let linkColor = role === "secondary" ? secondaryColor
            : primaryColor; //Default

        //Primary and Disclosure share the same color
        let hoverColor = role === "secondary" ? secondaryHoverColor
            : primaryHoverColor; //Default

        //Disclosure only varies on the resting state textDecoration style
        let decor = role === "disclosure" ? disclosureTextDecor
            : textDecor; //Default

        this.setState(
            {
                linkColor: linkColor,
                hoverColor: hoverColor,
                decoration: decor,
                hoverDecoration: hoverTextDecor
            }
        )
    }

    componentDidMount() {
        this.set()
    }


    componentDidUpdate(prevProps) {
        if (
            prevProps.linkType !== this.props.linkType
        ) {
            this.set();
        }
    }


    _onLinkClick() {

        if (this.props.disabled)
            return;

        //Raise this event to UXPin. We'll send them the HREF value in case they can catch it.
        if (this.props.onLinkClick) {
            this.props.onLinkClick(this.props.linkHref);
        }
    }


    render() {

        //Assemble the Link style
        let linkStyles = {
            root: {
                color: this.state.linkColor,
                textDecoration: this.state.decoration,
                selectors: {
                    ':hover': {
                        color: this.state.hoverColor,
                        textDecoration: this.state.hoverDecoration,
                    },
                },
            }
        }

        //We assemble the Link Text style next
        let linkTextStyles = {
            root: {
                fontWeight: this.props.bold ? 'bold' : 'normal',
                fontStyle: this.props.italic ? 'italic' : 'normal',
                display: 'block',         //Required - prevents a bug
                lineHeight: 'normal',     //Required - prevents a bug
            }
        }


        return (

            <FLink
                {...this.props}
                styles={this.props.disabled ? '' : linkStyles}
                disabled={this.props.disabled}
                href={this.props.linkHref}
                target={"_UXPin Mockup"} //Force open in a new window
                onClick={() => { this._onLinkClick() }}
            >
                <Text
                    {...this.props}
                    styles={linkTextStyles}
                    variant={this.props.size}>
                    {this.props.value}
                </Text>
            </FLink>

        );

    }

}






/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Link.propTypes = {

    /**
     * @uxpindescription The text value to display
     * @uxpinpropname Link Text
     * @uxpincontroltype textfield(3)
     */
    value: PropTypes.string,

    /**
     * @uxpindescription A valid href value for the link itself. It should start with "http://", "https://", or "mailto:"
     * @uxpinpropname href
     * @uxpincontroltype textfield(3)
     */
    linkHref: PropTypes.string,

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
     * @uxpinpropname Size
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
     * @uxpinpropname Bold
     */
    bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     * @uxpinpropname Italic
     */
    italic: PropTypes.bool,

    /**
     * @uxpindescription To disable the control
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription To horizontally align all content within the stack 
     * @uxpinpropname Type
     */
    linkType: PropTypes.oneOf(['primary', 'secondary', 'disclosure']),

    /**
     * @uxpindescription Fires when the control is clicked on
     * @uxpinpropname Click
     */
    onLinkClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
Link.defaultProps = {
    value: 'PayPal.com',
    linkHref: 'https://www.paypal.com',
    linkType: 'primary',
    disabled: false,
    size: 'large',
    bold: false,
    italic: false,
}


export { Link as default };