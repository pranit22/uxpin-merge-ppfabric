import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActivityItem as FActivityItem } from 'office-ui-fabric-react';
// import parse from 'csv-parse'
// import { name2key, getTokens } from '../_helpers/parser.js'


class ActivityItem extends React.Component {
    render() {
        let params = {
            personaSize: PersonaSize[this.props.size],
            personas: ActivityItemPersonas.slice(0, this.props.number),
        }
        return (
            <FActivityItem {...params}></FActivityItem >
        )
    }
}

ActivityItem.propTypes = {
    click: PropTypes.func
};

ActivityItem.defaultProps = {

}

export { ActivityItem as default };
