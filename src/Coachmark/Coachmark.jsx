import * as React from 'react';
import { Coachmark as FCoachmark, TeachingBubbleContent, DirectionalHint } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';



class Coachmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this._targetElm = React.createRef();
    }

    componentDidMount() {
        if (this.props.open) this.setState({ open: true })
    }

    render() {
        return (
            <>
                <div
                    className="trigger"
                    onClick={() => { this.setState({ open: !this.state.open }) }}
                    ref={this._targetElm}
                    style={{
                        width: 10,
                        height: 10,
                        background: 'var(--color-blue-100)',
                        borderRadius: 10,
                        cursor: 'pointer'
                    }} />

                {this.state.open && (
                    <FCoachmark
                        target={this._targetElm.current}
                        positioningContainerProps={{
                            doNotLayer: false
                        }}>
                        <TeachingBubbleContent
                            headline={this.props.title}
                            hasCloseIcon={true}
                            closeButtonAriaLabel="Close"
                            primaryButtonProps={{
                                children: this.props.primaryButtonLabel,
                                onClick: () => {
                                    if (this.props.primaryButtonClick) this.props.primaryButtonClick()
                                    this.setState({ open: false })
                                }
                            }}
                            secondaryButtonProps={{
                                children: this.props.secondaryButtonLabel,
                                onClick: () => {
                                    if (this.props.secondaryButtonClick) this.props.secondaryButtonClick()
                                    this.setState({ open: false })
                                }
                            }}
                            onDismiss={() => {
                                this.setState({ open: false })
                                if (this.props.dismiss) this.props.dismiss()
                            }}
                            ariaDescribedBy={'example-description1'}
                            ariaLabelledBy={'example-label1'} >
                            {this.props.text}
                        </TeachingBubbleContent>
                    </FCoachmark>
                )}
            </>
        );
    }
}

Coachmark.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
    title: PropTypes.string,
    primaryButtonLabel: PropTypes.string,
    secondaryButtonLabel: PropTypes.string,

    dismiss: PropTypes.func,
    primaryButtonClick: PropTypes.func,
    secondaryButtonClick: PropTypes.func,


};

Coachmark.defaultProps = {
    open: true,
    title: "Example Title",
    text: 'Welcome to the land of Coachmarks!',
    primaryButtonLabel: 'Try it',
    secondaryButtonLabel: 'Try it again'

}

export { Coachmark as default };
