import * as React from 'react';
import * as PropTypes from 'prop-types';
import parse from 'csv-parse'
import { name2key, getTokens } from '../_helpers/parser.js'
// import { TestImages } from '@uifabric/example-data';

import {
    Persona as FPersona,
    PersonaSize,
    PersonaPresence
} from 'office-ui-fabric-react';

let personaFemaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png"

class Persona extends React.Component {

    render() {
        let persona = {
            imageUrl: this.props.imageUrl || personaFemaleUrl,
            imageInitials: this.props.initials || 'AL',
            text: this.props.name || 'Annie Lindqvist',
            secondaryText: this.props.role || 'Software Engineer',
            tertiaryText: this.props.status || 'In a meeting',
            optionalText: this.props.optional || 'Available at 4:00pm'
        }

        return (
            <FPersona {...persona}
                size={PersonaSize[this.props.size]} />
        )
    }
}


Persona.propTypes = {
    /**
    * @uxpinpropname url
    * @uxpincontroltype textfield(2)
    * */
    imageUrl: PropTypes.string,

    size: PropTypes.oneOf(['size8', 'size24', 'size32', 'size40', 'size56', 'size72', 'size100', 'size120']),

    presence: PropTypes.oneOf(['offline', 'online', 'away', 'busy']),

    initials: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string,
    optional: PropTypes.string,
};

Persona.defaultProps = {
    size: "size100"
};

export { Persona as default };
