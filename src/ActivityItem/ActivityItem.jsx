import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActivityItem as FActivityItem, Icon, Link } from 'office-ui-fabric-react';
import { getTokens } from '../_helpers/parser.jsx'



/**
 * UPDATED Mar 23-24, 2020 by Anthony Hand
 * - Made the Body Copy ("comments") section capable of using the link(Link Text) feature.
 * - To address a bug in Microsoft, we have a proprietary prop called bodyCopy which maps to the comments. Microsoft won't let us manipulate the comments contents otherwise. 
 * - Added Compact Mode support. 
 * - Added a constructor. 
 * - Added descriptions and prop names for each property with some updates. Changed some prop names.
 * - Gave more input space in UXPin props panel for Description and Comments.  
 * 
 * TODOs
 * - Waiting for guidance from UXPin on how to expose which link was clicked on at runtime within UXPin.
 * 
 * For additional outstanding issues, please see: 
 *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/100
 * */


class ActivityItem extends React.Component {

    constructor(props) {
        super(props);

        //State currently unused. 
        this.state = {
            comments: "",
            description: ""
        }
    }

    set() {
        let description = this._getTokenizedText(this.props.description);
        let comments = this._getTokenizedText(this.props.bodyCopy);

        this.setState(
            {
                comments: comments,
                description: description
            }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.description !== this.props.description
            || prevProps.bodyCopy !== this.props.bodyCopy
        ) {
            this.set();
        }
    }

    //Tokenize the string coming in from UXPin for the message 
    //    to support the link(Link Text) feature.
    _getTokenizedText(text) {

        var tokens = getTokens(text).mixed.map((el, i) => {
            if (typeof (el) === 'string') {
                return (<span key={i}> {el} </span>);
            }
            else if (el.type == 'link') {
                //TODO: Add a click event handler here...
                return el.suggestions[0]();
            }
            else if (el.suggestions[0]) {
                // if there's a suggestion, call the function
                return el.suggestions[0]();
            } else {
                // there's no suggestion, return the text
                return (<span key={i}> {el.tokenString} </span>);
            }
        });

        return tokens;
    }


    render() {

        let icon = this.props.icon ?
            (<Icon iconName={this.props.icon} />) :
            null;

        return (
            <FActivityItem
                activityIcon={icon}
                activityDescription={this.state.description}
                comments={this.state.comments}
                timeStamp={this.props.timeStamp}
                isCompact={this.props.isCompact}
                {...this.props}
            />
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ActivityItem.propTypes = {
    /**
     * @uxpindescription The exact name from the PayPal icon library. Displays on the right side. (Optional)
     * @uxpinpropname Icon Name
     */
    icon: PropTypes.string,

    /**
     * @uxpindescription The top line of text summarizing what the activity was. Supports the link(Click Me) feature. 
     * @uxpinpropname Description
     * @uxpincontroltype textfield(4)
     */
    description: PropTypes.string,

    /**
     * We have to have a proprietary prop or else Microsoft will use this value before we can transform the input. 
     * This prop will be mapped to the 'comments' property. 
     * @uxpindescription The main body of text detailing the activity. Supports the link(Click Me) feature. 
     * @uxpinpropname Comments
     * @uxpincontroltype textfield(5)
     */
    bodyCopy: PropTypes.string,

    /**
     * @uxpindescription Brief timestamp info. 
     * @uxpinpropname Timestamp
     */
    timeStamp: PropTypes.string,

    /** 
    * @uxpindescription Whether to display the control in Compact mode. 
    * @uxpinpropname Compact Mode
    */
    isCompact: PropTypes.bool,


    /**
     * @uxpindescription Fires when the control is clicked on.
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ActivityItem.defaultProps = {

    icon: 'Beaker',
    description: 'link(Tahlia) created a new Test Environment',
    bodyCopy: 'link(Fabulous TestEnv) contains 5 components. You have been listed as an operator.',
    timeStamp: 'Just now',
    isCompact: false
}


export { ActivityItem as default };
