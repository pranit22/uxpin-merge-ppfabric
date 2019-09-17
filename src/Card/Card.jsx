import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card as FCard } from 'office-ui-fabric-react';
// import parse from 'csv-parse'
// import { name2key, getTokens } from '../_helpers/parser.js'


class Card extends React.Component {
    render() {
        let params = {
        }
        return (
            <FCard {...params}></FCard >
        )
    }
}

Card.propTypes = {
};

Card.defaultProps = {
}

export { Card as default };
