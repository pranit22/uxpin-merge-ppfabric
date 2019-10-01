import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActivityItem as FActivityItem, Icon, Link } from 'office-ui-fabric-react';
// import parse from 'csv-parse'
import { getTokens } from '../_helpers/parser.jsx'


class ActivityItem extends React.Component {

    render() {
        let params = {
            onClick: this.props.click,
            activityDescription: getTokens(this.props.description).mixed
                .map((el, i) => typeof el === 'string' ?
                    <span key={i}> {el} </span> :
                    el.suggestions[0]()),
            activityIcon: this.props.icon ? <Icon iconName={this.props.icon} /> : null,
            comments: this.props.comments,
            timeStamp: this.props.timeStamp,
        }
        return (
            <FActivityItem {...params}></FActivityItem >
        )
    }
}


ActivityItem.propTypes = {
    click: PropTypes.func,

    /**
     * CSV list of disabled items Indexes
     * @uxpincontroltype textfield(7)
     * */
    description: PropTypes.string,

    icon: PropTypes.string,
    comments: PropTypes.string,
    timeStamp: PropTypes.string,
};

ActivityItem.defaultProps = {
    description: 'link(Tahlia) edited this file and link(John Snow)',
    icon: 'Mail',
    comments: 'Hello! I am making a comment and mentioning.',
    timeStamp: 'Just now'
}

export { ActivityItem as default };
