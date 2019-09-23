import * as React from 'react';
import * as PropTypes from 'prop-types';
// import parse from 'csv-parse'
// import { name2key, getTokens } from '../_helpers/parser.js'


class PPHeader extends React.Component {
    render() {
        return (
            <div className="PPHeaderComponent"></div >
        )
    }
}

PPHeader.propTypes = {
    productName: PropTypes.string,
    number: PropTypes.string,
};

PPHeader.defaultProps = {
    productName: 'Kafka',
    breadcrumbs: 'Kafka, Topics, Create Topic',
}

export { PPHeader as default };
