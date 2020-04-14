import * as React from 'react';
import * as PropTypes from 'prop-types';
import { 
    Facepile as FFacepile, 
    PersonaPresence,
    PersonaInitialsColor,
    PersonaSize
    } from 'office-ui-fabric-react';
import { OverflowButtonType } from 'office-ui-fabric-react/lib/Facepile';


  /**
   * UPDATED Mar 24, 2020 by Anthony Hand
   * - Added support for the user to specify any number of personas from 1 - 99. 
   * - Added support for showing an overflow number.
   * - Added the props for showing the Add and Overflow buttons. 
   * - Added multiple onClick handlers for: each persona coin, the Add button, and the Overflow button. 
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
let personaFemaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png";

//This is the default URL to use for a generic male user
let personaMaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png";

//The max count for the persona list 
let maxPersonaCount = 99;


class Facepile extends React.Component {

    constructor(props) {
        super(props);

        //Make sure that the user entered a number between 1 - max.
        var pCount = this.props.number;
        if (this.props.number < 1) {
            pCount = 1;
        }
        if (this.props.number > maxPersonaCount) {
            pCount = maxPersonaCount;
        } 

        //We'll use this list of personas 
        this.state = {
            personaList: this._getPersonaList(pCount)
        }
    }

    //We build our own list of personas. In Microsoft's list, the first 2 are the same person. 
    _getPersonaList(count) {

        //Presence Choices: 
        //    'none', 'online', 'offline', 'away', 'busy', 'dnd', 'blocked'

        const personas = [];

        let p1 = this._configurePersona(personaFemaleUrl, "AL", "Annie Lindqvist", PersonaPresence.online, "blue");
        personas.push(p1);

        let p2 = this._configurePersona("", "MH", "Miguel Hernandez", PersonaPresence.offline, "green");
        personas.push(p2)

        let p3 = this._configurePersona(personaMaleUrl, "AR", "Abik Rao", PersonaPresence.away, "pink");
        personas.push(p3);

        let p4 = this._configurePersona("", "YA", "Yuki Abe", PersonaPresence.busy, "darkRed");
        personas.push(p4);

        let p5 = this._configurePersona("", "JW", "Jian Wang", PersonaPresence.dnd, "warmGray");
        personas.push(p5);

        //After this, add in any additional personas, as requested, up to the max.
        if (count > personas.length) {
            //Let's add more then!
            let remainder = count - personas.length;

            var i;

            //We'll add personas from the initial 5.
            //These won't be visible, so we'll just keep adding the same one. 
            for (i = 0; i < remainder; i++) {
                personas.push(p2);
            }
        }

        return personas;
    }

    _configurePersona(imgURL, initials, fullName, presence, initialsColor) {

        let params = {
            imageUrl: imgURL,
            imageInitials: initials,
            text: fullName,
            presence: presence, //Presence isn't working yet, but we'll add it anyways. 
            initialsColor: PersonaInitialsColor[initialsColor],
            onClick: ((e, p) => this._onClick(p))
        }

        return params;
    }

    _onClickOverflow(event) {
        //Raise this event to UXPin. We'll send them info about which item was clicked on in case they can catch it.
        if (this.props.onClick) {
            this.props.onOverflowClick("overflow");
        }     
    }

    _onClickAddButton(event) {
        //Raise this event to UXPin. We'll send them info about which item was clicked on in case they can catch it.
        if (this.props.onClick) {
            this.props.onAddClick("add");
        }        
    }

    _onClick(persona) {
        //Let's return the initials of the person in the Persona that was clicked on. 
        let returnValue = persona.imageInitials;

        //Raise this event to UXPin. We'll send them info about which item was clicked on in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(returnValue);
        }
    }


    render() {

        //Configure the Overflow button type. Off by default. 
        var ovbType = OverflowButtonType['none'];
        if (this.props.showOverflowButton) {
            ovbType = OverflowButtonType['descriptive'];
        }

        //Add the Overflow Button click listener. 
        const overflowButtonParams = {
            onClick: ((e) => this._onClickOverflow(e))
        };

        //Add the Add Button click listener. 
        const addButtonParams = {
            onClick: ((e) => this._onClickAddButton(e))
        };

        //If ShowOverflow is True, then we'll allow up to 4 personas to be displayed. 
        //If ShowOverflow is False, then we'll allow up to 5 personas to be displayed. 
        //The number of personas is otherwise whatever the user sets.
        var maxFaces = 5;
        if (this.props.showOverflowButton) {
            maxFaces = 4;
        }


        return (
            <FFacepile 
                //These props require their respective enum keys
                personaSize = { PersonaSize[this.props.size] }  
                maxDisplayablePersonas = { maxFaces }
                personas = { this.state.personaList.slice(0, this.props.number) }
                addButtonProps = { addButtonParams }
                overflowButtonType = { ovbType }
                overflowButtonProps = { overflowButtonParams }
                {...this.props} 
            />
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Facepile.propTypes = {

    /**
    * @uxpindescription The control's size 
    * @uxpinpropname Size
    */    
    size: PropTypes.oneOf(['size16', 'size24', 'size28', 'size32', 'size40']),

    /**
    * @uxpindescription The number of personas to display 
    * @uxpinpropname Count
    */    
    //number: PropTypes.oneOf([1, 2, 3, 4, 5]),
    number: PropTypes.number,

    /** 
    * @uxpindescription Whether to display the Add button 
    * @uxpinpropname Add Button
    */
   showAddButton: PropTypes.bool,

    /** 
    * @uxpindescription Whether to display the overflow button. 
    * @uxpinpropname Show Overflow Button
    */
   showOverflowButton: PropTypes.bool,   

    /**
     * @uxpindescription Fires when one of the personas is clicked on.
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func, 
    
    /**
     * @uxpindescription Fires when the Add Button is clicked on.
     * @uxpinpropname Add Click
     * */
    onAddClick: PropTypes.func,

    /**
     * @uxpindescription Fires when the Overflow Button is clicked on.
     * @uxpinpropname Overflow Click
     * */
    onOverflowClick: PropTypes.func 
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Facepile.defaultProps = {
    size: 'size32',
    number: 5,
    showAddButton: false,
    showOverflowButton: false
}

export { Facepile as default };
