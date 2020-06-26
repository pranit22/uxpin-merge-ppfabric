import * as React from 'react';
import {
    PersonaCoin as FPersonaCoin,
    PersonaSize,
    PersonaInitialsColor,
    TooltipHost
} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';


/**
 * UPDATED April 23, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Control needs to be updated with the proper PayPal UI theme. 
 * 
 */


const personaFemaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png";


class PersonaCoin extends React.Component {

    constructor(props) {
        super(props);

        //State currently unused. 
        this.state = {
        }
    }


    _onClick() {

        //For the end user in UXPin, let's send the initials as a unique identifier, or image if no initials have been set. 
        var returnValue = (this.props.initials || this.props.imageUrl || "personaCoin");

        //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(returnValue);
        }
    }


    render() {

        const tooltipId = _.uniqueId('tooltip_');

        return (
            <TooltipHost
                content={this.props.tooltip}
                id={tooltipId}
            >
                <FPersonaCoin
                    {...this.props}
                    size={PersonaSize[this.props.ppSize]}
                    initialsColor={PersonaInitialsColor[this.props.bgColor]}
                    imageInitials={this.props.initials}
                    imageUrl={this.props.imageUrl}
                    //Bind our new OnClick handler
                    onClick={(this._onClick.bind(this))}
                    aria-describedby={tooltipId}
                />
            </TooltipHost>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PersonaCoin.propTypes = {

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. 
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(6)
    */
    imageUrl: PropTypes.string,

    /**
    * @uxpindescription If no image or icon, the initials to display on the 'coin' 
    * @uxpinpropname Initials
    */
    initials: PropTypes.string,

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy   
    * @uxpindescription If no image, the background color of the 'coin' showing the user's initials 
    * @uxpinpropname Coin Bg Color
    */
    bgColor: PropTypes.oneOf([
        'green', 'darkGreen', 'teal', 'lightBlue', 'blue', 'darkBlue', 'violet',
        'purple', 'magenta', 'lightPink', 'pink', 'burgundy', 'lightRed', 'darkRed',
        'orange', 'rust', 'gold', 'warmGray', 'coolGray']),

    /**
     * Requires a proprietary PayPal prop name, or else things get screwy. 
     * @uxpindescription The control's size 
     * @uxpinpropname Size
     */
    ppSize: PropTypes.oneOf(['size8', 'size24', 'size32', 'size40', 'size56', 'size72', 'size100']),

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Tooltip
     * */
    tooltip: PropTypes.string,

    /**
     * @uxpindescription Fires when the control is clicked on
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
PersonaCoin.defaultProps = {
    imageUrl: personaFemaleUrl,
    initials: 'AL',
    bgColor: 'blue',
    ppSize: "size100",
    tooltip: ''
};


export { PersonaCoin as default };