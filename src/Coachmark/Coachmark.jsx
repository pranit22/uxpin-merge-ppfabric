import * as React from 'react';
import { Coachmark as FCoachmark, TeachingBubbleContent, DirectionalHint } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import './index.scss';

class Coachmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open || false
        }
        this._targetElm = React.createRef();
    }
    render() {
        let option = { key: 'A', text: 'Top Left Edge', data: DirectionalHint.topRightEdge }
        return (
            <div className="CoachmarkComponent" >
                <div
                    className="trigger"
                    onClick={() => { this.setState({ open: !this.state.open }) }}
                    ref={this._targetElm} />
                <FCoachmark
                    target={this._targetElm.current}
                    positioningContainerProps={{
                        directionalHint: {
                            coachmarkPosition: option.data,
                            dropdownSelectedOptionKey: option.key
                        },
                        // doNotLayer: false
                    }}>
                    <TeachingBubbleContent
                        headline="Example Title"
                        hasCloseIcon={true}
                        closeButtonAriaLabel="Close"
                        primaryButtonProps={{ text: 'Try it' }}
                        secondaryButtonProps={{ text: 'Try it again' }}
                        onDismiss={this.props.dismiss}
                        ariaDescribedBy={'example-description1'}
                        ariaLabelledBy={'example-label1'} >
                        Welcome to the land of Coachmarks!
                    </TeachingBubbleContent>
                </FCoachmark>
            </div >
        );
    }
}

Coachmark.propTypes = {
    open: PropTypes.bool,
    dismiss: PropTypes.func,

};

Coachmark.defaultProps = {
    open: true
}

export { Coachmark as default };
