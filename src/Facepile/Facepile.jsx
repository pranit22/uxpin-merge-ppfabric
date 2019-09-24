import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Facepile as FFacepile, PersonaSize } from 'office-ui-fabric-react';
import { facepilePersonas } from '@uifabric/example-data';



class Facepile extends React.Component {
    render() {
        let params = {
            personaSize: PersonaSize[this.props.size],
            personas: facepilePersonas.slice(0, this.props.number),
        }
        return (
            <FFacepile {...params}></FFacepile >
        )
    }
}

Facepile.propTypes = {
    size: PropTypes.oneOf(['size16', 'size24', 'size28', 'size32', 'size40']),
    number: PropTypes.oneOf([1, 2, 3, 4, 5]),
};

Facepile.defaultProps = {
    size: 'size32',
    number: 5,
}

export { Facepile as default };
