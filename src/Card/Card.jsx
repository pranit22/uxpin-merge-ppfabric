import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card as FCard } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react';


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
    
    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(4)
     */
    text: PropTypes.string,
};

Card.defaultProps = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}

export { Card as default };
