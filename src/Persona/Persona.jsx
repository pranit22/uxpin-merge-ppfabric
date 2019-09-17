import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
    Persona as FPersona,
    PersonaSize,
    PersonaPresence,
    PersonaInitialsColor
} from 'office-ui-fabric-react';

let personaFemaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png"

class Persona extends React.Component {

    render() {
        let persona = {
            imageUrl: this.props.imageUrl || '',
            imageInitials: this.props.initials || 'AL',
            text: this.props.name || 'Annie Lindqvist',
            secondaryText: this.props.role || 'Software Engineer',
            tertiaryText: this.props.status || 'In a meeting',
            optionalText: this.props.optional || 'Available at 4:00pm'
        }

        return (
            <FPersona {...persona}
                size={PersonaSize[this.props.size]}
                presence={PersonaPresence[this.props.presence || null]}
                initialsColor={PersonaInitialsColor[this.props.initialsColor || null]}
            />
        )
    }
}


Persona.propTypes = {
    /**
    * @uxpinpropname url
    * @uxpincontroltype textfield(2)
    * */
    imageUrl: PropTypes.string,

    size: PropTypes.oneOf(['size8', 'size24', 'size32', 'size40', 'size56', 'size72', 'size100']),

    presence: PropTypes.oneOf(['none', 'online', 'offline', 'away', 'busy', 'dnd', 'blocked']),

    initialsColor: PropTypes.oneOf([
        'green', 'darkGreen', 'teal', 'lightBlue', 'blue', 'darkBlue', 'violet',
        'purple', 'magenta', 'lightPink', 'pink', 'burgundy', 'lightRed', 'darkRed',
        'orange', 'rust', 'gold', 'warmGray', 'coolGray']),

    initials: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string,
    optional: PropTypes.string,
};

Persona.defaultProps = {
    imageUrl: personaFemaleUrl,
    size: "size100",
    presence: 'online',
    initials: 'AL',
    name: 'Annie Lindqvist',
    role: 'Software Engineer',
    status: 'In a meeting',
    optional: 'Available at 4:00pm',
    initialsColor: 'green'
};

export { Persona as default };
