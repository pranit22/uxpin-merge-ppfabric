import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card as FCard } from '@uifabric/react-cards';
import { Text } from 'office-ui-fabric-react';
// import parse from 'csv-parse'
// import { name2key, getTokens } from '../_helpers/parser.js'


class Card extends React.Component {
    render() {
        return (
            <FCard >
                <FCard.Item>
                    <Text>{this.props.text}</Text>
                </FCard.Item>
            </FCard >
        )
    }
}

Card.propTypes = {
    text: PropTypes.string,
};

Card.defaultProps = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mollis sed dolor et dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec vehicula eros tortor, sed sagittis dolor congue eu. Nunc suscipit porta sapien. In venenatis diam sed dolor mollis sodales. '
}

export { Card as default };
