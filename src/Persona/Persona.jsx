import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Persona as FPersona,
    PersonaSize,
    PersonaPresence,
    PersonaInitialsColor
} from 'office-ui-fabric-react';


  /**
   * UPDATED Mar 24, 2020 by Anthony Hand
   * - Added the prop for showing the user as 'unknown.'
   * - Added the prop for hiding the persona details. 
   * - Added an onClick event handler. Now the UXPin user can know when it's been clicked on.
   * - Added a constructor. 
   * - Added descriptions and prop names for each property with some updates. Changed some prop names.
   * 
   * TODOs
   * - Waiting for guidance from UXPin on how to expose a return value on at runtime within UXPin.
   * 
   * For additional outstanding issues, please see: 
   *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/46
   * */


//This is the default URL to use for a generic female user
let personaFemaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png"


class Persona extends React.Component {

    constructor(props) {
        super(props);

        //State currently unused. 
        this.state = {
        }
    }

    _onClick() {

        //For the end user in UXPin, let's send the initials as a unique identifier, or full name if no initials have been set. 
        var returnValue = (this.props.initials || this.props.name || "persona");

        //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(returnValue);
        }
    }


    render() {

        return (
            <FPersona
                //These props require their respective enum keys
                size = { PersonaSize[this.props.ppSize] } 
                presence = { PersonaPresence[this.props.ppPresence] } 
                initialsColor = { PersonaInitialsColor[this.props.ppInitialsColor] } 

                //We can set these props as-is
                imageUrl = { this.props.imageUrl }
                imageInitials = { this.props.initials }
                text = { this.props.name }
                secondaryText = { this.props.role }
                tertiaryText = { this.props.status }
                optionalText = { this.props.optional }
                showUnknownPersonaCoin = { this.props.showUnknownPersonaCoin }
                hidePersonaDetails = { this.props.hidePersonaDetails }           

                {...this.props}

                //Bind our new OnClick handler
                onClick = { (this._onClick.bind(this)) }
            />
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Persona.propTypes = {

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. 
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(3)
    */
    imageUrl: PropTypes.string,

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy. 
    * @uxpindescription The control's size 
    * @uxpinpropname Size
    */    
    ppSize: PropTypes.oneOf(['size8', 'size24', 'size32', 'size40', 'size56', 'size72', 'size100']),

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy. 
    * @uxpindescription The user's presence status 
    * @uxpinpropname Presence
    */     
    ppPresence: PropTypes.oneOf(['none', 'online', 'offline', 'away', 'busy', 'dnd', 'blocked']),

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy   
    * @uxpindescription If no image, the color of the 'coin' showing the user's initials 
    * @uxpinpropname Initials Color
    */ 
    ppInitialsColor: PropTypes.oneOf([
        'green', 'darkGreen', 'teal', 'lightBlue', 'blue', 'darkBlue', 'violet',
        'purple', 'magenta', 'lightPink', 'pink', 'burgundy', 'lightRed', 'darkRed',
        'orange', 'rust', 'gold', 'warmGray', 'coolGray']),

    /**
    * @uxpindescription If no image, the initials to display on the 'coin' 
    * @uxpinpropname Initials
    */         
    initials: PropTypes.string,

    /**
    * @uxpindescription The full name for this persona 
    * @uxpinpropname Name
    */ 
    name: PropTypes.string,

    /**
    * @uxpindescription This persona's role; displayed under their name
    * @uxpinpropname Role
    */     
    role: PropTypes.string,

    /**
    * @uxpindescription This persona's current availability status, such as 'In a meeting'
    * @uxpinpropname Status
    */     
    status: PropTypes.string,

    /**
    * @uxpindescription In very large Personas, a 4th line of text can show more info, if desired
    * @uxpinpropname Additional Text
    */
    optional: PropTypes.string,

    /** 
    * @uxpindescription Whether to display coin using the 'Unknown Person' style
    * @uxpinpropname Unknown Person
    */
    showUnknownPersonaCoin: PropTypes.bool,

    /** 
    * @uxpindescription Whether to display the persona's details or only the 'coin'
    * @uxpinpropname Hide Details
    */
   hidePersonaDetails: PropTypes.bool,

    /**
     * @uxpindescription Fires when the control is clicked on
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func   
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Persona.defaultProps = {
    imageUrl: personaFemaleUrl,
    initials: 'AL',
    name: 'Annie Lindqvist',
    role: 'Software Engineer',
    status: 'In a meeting',
    optional: 'Available at 4:00 PM PST',
    ppSize: "size100",
    ppPresence: 'online',  
    showUnknownPersonaCoin: false,
    hidePersonaDetails: false,
    ppInitialsColor: 'blue'
};

export { Persona as default };
