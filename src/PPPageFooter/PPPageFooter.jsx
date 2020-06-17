import * as React from 'react';
import {
    Image,
    ImageFit,
    Link,
    Stack,
    StackItem,
    Text
} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';


/** 
 * UPDATED May 15, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */


const defaultTextColor = 'grey-700';
const defaultTextColorHex = '#2C2E2F';
const defaultTextSize = '14px';

const defaultLine1Text = "Product or Team Name";
const defaultLine1TextSize = 'medium';
const defaultLine2Text = "#Slack_Channel | http://paypal.com";
const defaultLine3Text = "prod_support@paypal.com | mailto:prod_support@paypal.com";

const defaultBgColor = 'transparent';

const defaultBorderColor = 'blue-700';
const defaultBorderThickness = 4;
const borderSolid = 'solid';

const defaultInternalPadding = 24;
const defaultTextStackPadding = 6;

const defaultTextStackMinWidth = '300px';
const defaultCorpInfoMaxWidth = '1000px';

const linkStyles = {
    root: {
        color: '#0070BA',           //"blue-600"
        textDecoration: "none",
        selectors: {
            ':hover': {
                color: '#003087',   //"blue-800"
                textDecoration: "underline",
            },
        },
    }
}

const dividerStyle = {
    width: 1,
    height: 60,
    borderLeft: '1px solid #CBD2D6',    //grey-300
}

const logoURL = 'https://uc.uxpin.com/files/135332/142253/FullColor_Horizontal_Logo_RGB-a8f6cc.png';
const logoWidth = '102px';
const logoHeight = '25px';
const logoFit = ImageFit.contain;

//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultLinks = `Product Home | http://www.paypal.com
Product on Confluence | https://developer.paypal.com/home/
Support | https://www.paypal.com/us/smarthelp
FAQs | http://paypal.com/faqs
Github | http://github.paypal.com/`;

const corpInfoTextSize = '12px';
const copyright = '© 2002-2019 PayPal Inc. All Rights Reserved.';
const confidentiality = 'CONFIDENTIALITY NOTICE: This web site is intended only for the use of PayPal employees, and may contain information that is privileged, confidential and exempt from disclosure under applicable law';



class PPPageFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [],
            textColor: defaultTextColorHex,
        }
    }

    set() {
        this.setItems();

        this.setState(
            {
                textColor:
                    TpxUxColors.getHexFromHexOrPpuiToken(this.props.textColor)
                    || TpxUxColors.getHexFromHexOrPpuiToken(defaultTextColor)
            }
        );
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.links !== this.props.links
            || prevProps.textColor !== this.props.textColor
        ) {
            this.set();
        }
    }


    setItems() {
        var linkList = [];

        if (this.props.links) {
            let items = this.props.links.match(/[^\r\n]+/g);

            if (items && items.length) {
                for (var i = 0; i < items.length; i++) {
                    let item = items[i];

                    let linkInfo = this._parseTextAndLink(item);

                    if (linkInfo)
                        linkList.push(linkInfo);
                } //for loop
            } //if items
        } //if props.links

        this.setState(
            { links: linkList }
        );
    }

    _parseTextAndLink(rawStr) {
        if (rawStr && rawStr.length) {
            let links = rawStr.split("|");

            //First display side
            if (links && links.length) {
                let left = links[0].trim();     //This is the display text
                var right = undefined;          //This is the optional link

                if (links[1]) {
                    right = links[1].trim();
                }

                let linkInfo = {
                    text: left,
                    href: right,
                }

                return linkInfo;
            } //If links array
        }

        //If we made it this far, it didn't work out
        return undefined;
    }


    _configTextOrLink(textLinkInfo, textSize, addLinkDelimiter) {
        //Both params are required
        if (!textLinkInfo || !textSize)
            return '';

        //Text prop is required. HREF prop is optional.
        let text = textLinkInfo.text ? textLinkInfo.text : '';
        let href = textLinkInfo.href ? textLinkInfo.href : undefined;

        let fTextStyles = {
            color: href ? undefined : this.state.textColor,
            fontSize: textSize,
            fontWeight: 'normal',
            fontStyle: 'normal',
        }

        let textSpan = (
            <span
                style={fTextStyles}>
                {text}
            </span>
        )

        //if isText, return this part
        if (!href) {
            return textSpan;
        }

        //Should we add a link delimiter?
        var linkDelimiter = '';
        if (addLinkDelimiter) {
            let delimiterStyle = {
                color: this.state.textColor,
                fontSize: textSize,
                fontWeight: 'normal',
                fontStyle: 'normal',
            }

            linkDelimiter = (
                <span
                    style={delimiterStyle}>
                    {" | "}
                </span>
            );
        }

        let linkPart = (
            <>
                <Link
                    styles={linkStyles}
                    href={href}
                    target={"_UXPin Mockup"} //Force open in a new window
                    onClick={() => { this._onLinkClick(href) }}
                >
                    {textSpan}
                </Link>

                {linkDelimiter}
            </>
        );

        //if isLink, return this part
        return linkPart;
    }


    _getBorderStyle() {
        var bColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.borderColor);

        //If the line thickness is 0 or the user has removed the line color, then we're done.
        if (this.props.borderThickness < 1 || !bColor)
            return 'none';

        let thickness = this.props.borderThickness > 0 ? this.props.borderThickness : defaultBorderThickness;

        return thickness + 'px ' + borderSolid + ' ' + bColor;
    }


    _onLinkClick(href) {

        //Raise this event to UXPin. We'll send them a value in case they can catch it.
        if (this.props.onLinkClick) {
            this.props.onLinkClick(href);
        }
    }


    render() {
        //Outer container stack is a horizontal stack.
        //Left Vertical Stack holds the Page Heading and super & sub text.
        //Right Horizontal Stack holds toolbar.

        //Let's track whether to show the Divider. We only show it if there is left side text to display
        var showDivider = false;


        //****************************
        //OUTER HORIZONTAL STACK
        //For internal padding within the stack. 

        let internalPadding = this.props.internalPadding > 0 ? this.props.internalPadding : 0;

        //With one number, the padding applies to both rows and columns.  
        const outerStackTokens = {
            childrenGap: 24,        //24 between each column in the outer stack
            padding: 0,
        };

        const outerStackStyles = {
            root: {
                display: 'flex',
                overflow: 'hidden',
                // padding: internalPadding,
                background: defaultBgColor,
                borderTop: this._getBorderStyle(),
            },
        };

        //****************************
        //TEXT VERTICAL STACK

        //With one number, the padding applies to both rows and columns.  
        const textStackTokens = {
            childrenGap: defaultTextStackPadding,
            padding: 0,
        };


        //****************************
        //LINE 1 TEXT
        var line1 = '';
        if (this.props.line1Value) {

            let l1Styles = {
                root: {
                    color: this.state.textColor,
                    fontWeight: this.props.line1Bold ? 'bold' : 'normal',
                    fontStyle: this.props.line1Italic ? 'italic' : 'normal',
                    display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                    lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
                }
            }

            line1 = (
                <Text
                    styles={l1Styles}
                    variant={defaultLine1TextSize}>
                    {this.props.line1Value}
                </Text>
            );

            showDivider = true;
        }

        //****************************
        //LINE 2 TEXT
        var line2 = '';
        var l2Info = this._parseTextAndLink(this.props.line2Value);
        if (l2Info) {
            line2 = this._configTextOrLink(l2Info, defaultTextSize, false);
            showDivider = true;
        }


        //****************************
        //LINE 3 TEXT
        var line3 = '';
        var l3Info = this._parseTextAndLink(this.props.line3Value);
        if (l3Info) {
            line3 = this._configTextOrLink(l3Info, defaultTextSize, false);
            showDivider = true;
        }


        //****************************
        //VERTICAL DIVIDER

        var divider = '';
        if (showDivider) {
            divider = (
                <StackItem><div style={dividerStyle} /></StackItem>
            );
        }

        //We gotta use the showDivider var
        const textStackStyles = {
            root: {
                minWidth: showDivider ? defaultTextStackMinWidth : 0,
                display: 'flex',
                overflow: 'hidden',
            },
        };

        var spanner = '';
        if (showDivider) {
            spanner = (
                <StackItem grow={1}><span /></StackItem>
            );
        }

        //****************************
        //RIGHT SIDE STACK

        const corpInfoStackStyles = {
            root: {
                maxWidth: showDivider ? '800px' : '100%',
                display: 'flex',
                overflow: 'hidden',
            },
        };

        let logoProps = {
            shouldFadeIn: true,
            src: logoURL,
            imageFit: logoFit,
            maximizeFrame: true,
            width: logoWidth,
            height: logoHeight,
        }

        //With one number, the padding applies to both rows and columns.
        const companyInfoStackTokens = {
            childrenGap: defaultTextStackPadding,
            padding: 0,
        };

        //Set up the StackItems
        //The right side is a vertical stack, as well. 
        var linkList = [];
        if (this.state.links && this.state.links.length) {

            for (var i = 0; i < this.state.links.length; i++) {
                let link = this.state.links[i];

                //Now we put it all together!
                var addLinkDelimiter = false;
                if (i + 1 < this.state.links.length)
                    addLinkDelimiter = true;

                let linkInfo = this._configTextOrLink(link, defaultTextSize, addLinkDelimiter);
                if (linkInfo) {
                    linkList.push(linkInfo);
                }
            } //for loop

        } //If state.links


        //setup copyright and confidentiality
        let copyrightInfo = this._parseTextAndLink(copyright);
        let copyrightElem = this._configTextOrLink(copyrightInfo, corpInfoTextSize, false);

        let confidentialityInfo = this._parseTextAndLink(confidentiality);
        let confidentialityElem = this._configTextOrLink(confidentialityInfo, corpInfoTextSize, false);


        return (

            <Stack                                          //Outer wrapper stack
                {...this.props}
                tokens={outerStackTokens}
                horizontal={true}
                horizontalAlign={'start'}
                verticalAlign={'center'}
                wrap={false}
                styles={outerStackStyles}
                padding={internalPadding + 'px'}>

                <StackItem>
                    <Stack                              //Left side vertical text stack              
                        tokens={textStackTokens}
                        horizontal={false}
                        horizontalAlign={'start'}
                        verticalAlign={'center'}
                        wrap={false}
                        styles={textStackStyles}>
                        <StackItem>
                            {line1}
                        </StackItem>
                        <StackItem>
                            {line2}
                        </StackItem>
                        <StackItem>
                            {line3}
                        </StackItem>
                    </Stack>
                </StackItem>

                {spanner}

                {divider}

                <StackItem>
                    <Image
                        {...logoProps}
                    />
                </StackItem>

                <StackItem>
                    <Stack                                  //Right side Company Info Stack
                        tokens={companyInfoStackTokens}
                        horizontal={false}
                        horizontalAlign={'start'}
                        verticalAlign={'center'}
                        wrap={false}
                        styles={corpInfoStackStyles}>

                        <StackItem>
                            <div>{linkList}</div>
                        </StackItem>

                        <StackItem>
                            {copyrightElem}
                        </StackItem>

                        <StackItem>
                            {confidentialityElem}
                        </StackItem>
                    </Stack>
                </StackItem>

            </Stack>


        );
    }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPPageFooter.propTypes = {

    /**
     * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Text Color
     */
    textColor: PropTypes.string,

    /**
     * @uxpindescription The 1st line of text. Enter product team name. Use format:  Display Text | http://www.paypal.com (Optional)
     * @uxpinpropname Line 1
     * @uxpincontroltype textfield(3)
     */
    line1Value: PropTypes.string,

    /**
     * @uxpindescription To apply bold formatting
     * @uxpinpropname Line 1 Bold
     */
    line1Bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     * @uxpinpropname Line 1 Italics
     */
    line1Italic: PropTypes.bool,

    /**
     * @uxpindescription The 2nd line of text. Enter a link or Slack channel. Use format:  Display Text | http://www.paypal.com (Optional)
     * @uxpinpropname Line 2
     * @uxpincontroltype textfield(4)
     */
    line2Value: PropTypes.string,

    /**
     * @uxpindescription The 3rd line of text. Enter support email or Slack channel. Use format:  Display Text | http://www.paypal.com (Optional)
     * @uxpinpropname Line 3 
     * @uxpincontroltype textfield(4)
     */
    line3Value: PropTypes.string,

    /**
     * @uxpindescription The list of link items. Put each link on a separate line. Display Text | http://www.paypal.com (Optional)
     * @uxpinpropname Links
     * @uxpincontroltype codeeditor
     */
    links: PropTypes.string,

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
    * @uxpindescription Fires when any link is clicked
    * @uxpinpropname Link Click
    */
    onLinkClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPPageFooter.defaultProps = {
    textColor: defaultTextColor,
    line1Value: defaultLine1Text,
    line1Bold: true,
    line1Italic: false,
    line2Value: defaultLine2Text,
    line3Value: defaultLine3Text,
    links: defaultLinks,
    borderThickness: defaultBorderThickness,
    borderColor: defaultBorderColor,
    internalPadding: defaultInternalPadding,
}


export { PPPageFooter as default };