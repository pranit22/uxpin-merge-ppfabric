import * as React from 'react';
import { Coachmark as FCoachmark, TeachingBubbleContent, DirectionalHint } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';


  /**
   * UPDATED April 7, 2020 by Anthony Hand
   * - Added support for showing icons on the Primary and Secondary buttons. 
   * */

  /**
   * UPDATED Mar 30, 2020 by Anthony Hand
   * - Experimented with supporting link() and icon() features for the message copy. Unfortunately, both icons and links are
   *        hard coded to be blue, so they're effectively invisible against the blue background. 
   *        Too hard to access those tokens at runtime to change them.
   * - Added the footer property so we can simulate multi-step coaching.
   * - Added logic to hide a button if there is no text specified. 
   * - Fixed a layout bug where the bottom portion below the buttons was too narrow.   
   * - Made the buttons rounded, as per PayPal UI requirements.   
   * - Refactored the button click event handling. 
   * - Added descriptions and prop names for each property with some updates. Changed some prop names.
   * 
   * TODOs
   * - Cannot change the icon used directly. The mapping itself within the PayPal TPX icon library must be updated. 
   *        https://github.paypal.com/Console-R/pp-fabric-theme/issues/27
   * - For additional issues, see:
   *        https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/103
   * 
   * */


class Coachmark extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this._targetElm = React.createRef();
    }


    componentDidMount() {
        var isOpen = false;

        if (this.props.open) {
            isOpen = true;
        }

        this.setState(
            { open: isOpen }
        )
    }


    dismissControl() {
        //Set the control to not open to dismiss it.
        this.setState (
            { open: false }
        )
    }

    _onDismissClicked() {
        //Notify UXPin that the Close icon has been clicked on.
        if (this.props.dismiss) { 
            this.props.dismiss();
        }

        this.dismissControl();
    }

    _onPrimaryButtonClicked() {
        //Notify UXPin of the event.
        if (this.props.primaryButtonClick) { 
            this.props.primaryButtonClick();
        }

        this.dismissControl();
    }

    _onSecondaryButtonClicked() {
        //Notify UXPin of the event.
        if (this.props.secondaryButtonClick) {
            this.props.secondaryButtonClick();
        }

        this.dismissControl();
    }


    render() {

        //Determine whether to show the Primary and Secondary buttons. 
        var hidePrimaryButton = false;
        var hideSecondaryButton = false;

        //If the primary or secondary button labels are empty, we need to hide them. 
        if (!this.props.primaryButtonLabel) {
            hidePrimaryButton = true;
        }
        if (!this.props.secondaryButtonLabel) {
            hideSecondaryButton = true;
        }

        //Make the Primary and Secondary buttons rounded
        let roundedButtonStyle = {
            root: {
              borderRadius: 100
            }
        }

        let pIconProps = { iconName: this.props.primaryButtonIcon };
        let sIconProps = { iconName: this.props.secondaryButtonIcon, style: { color: 'white' }  };

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
                        {...this.props}
                        target = { this._targetElm.current }
                        positioningContainerProps = {{
                            doNotLayer: false,
                            directionalHint: DirectionalHint[this.props.direction],
                            directionalHintFixed: false 
                        }}>
                        <TeachingBubbleContent
                            headline = { this.props.title }
                            footerContent = { this.props.footerText }
                            hasCloseIcon = { true }
                            primaryButtonProps={{
                                text: this.props.primaryButtonLabel,
                                hidden: hidePrimaryButton,
                                styles: roundedButtonStyle, 
                                iconProps: pIconProps,
                                onClick: () => { this._onPrimaryButtonClicked() }
                            }}
                            secondaryButtonProps={{
                                text: this.props.secondaryButtonLabel,
                                hidden: hideSecondaryButton,  
                                styles: roundedButtonStyle, 
                                iconProps: sIconProps,
                                onClick: () => { this._onSecondaryButtonClicked() }
                            }}
                            onDismiss={() => { this._onDismissClicked()}} > 
                            { this.props.text }
                        </TeachingBubbleContent>
                    </FCoachmark>
                )}
            </>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Coachmark.propTypes = {

    /**
     * @uxpindescription Whether to display the Coachmark 
     */   
    open: PropTypes.bool,

    /**
     * @uxpindescription The control's title text
     * @uxpinpropname Headline
     */
    title: PropTypes.string,

    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(4)
     */
    text: PropTypes.string,

    /**    
    * @uxpindescription Footer text to display in the bottom left corner. 
    */
   footerText: PropTypes.string,

    /**
     * @uxpindescription The displayed text on the Primary Button. Remove text to hide button.
     * @uxpinpropname Text: Primary Button
     */
    primaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon: Primary Button
     */
    primaryButtonIcon: PropTypes.string,

    /**
     * @uxpindescription The displayed text on the Secondary Button. Remove text to hide button.
     * @uxpinpropname Text: Secondary Button
     */
    secondaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon: Secondary Button
     */
    secondaryButtonIcon: PropTypes.string,

    /**
     * @uxpindescription The control's display direction
     */
    direction: PropTypes.oneOf([
        "topLeftEdge",
        "topCenter",
        "topRightEdge",
        "topAutoEdge",
        "bottomLeftEdge",
        "bottomCenter",
        "bottomRightEdge", 
        "bottomAutoEdge",
        "leftTopEdge",
        "leftCenter",
        "leftBottomEdge",
        "rightTopEdge",
        "rightCenter",
        "rightBottomEdge"
    ]),

    /**
     * @uxpindescription Fires when the Close button is clicked
     * @uxpinpropname Close Button Click
     */   
    dismiss: PropTypes.func,

    /**
     * @uxpindescription Fires when the Primary Button is clicked on
     * @uxpinpropname Primary Button Click
     */ 
    primaryButtonClick: PropTypes.func,

    /**
     * @uxpindescription Fires when the Secondary Button is clicked on
     * @uxpinpropname Secondary Button Click
     */ 
    secondaryButtonClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Coachmark.defaultProps = {
    open: true,
    title: "Basic Coachmark",
    text: "Welcome to the land of Coachmarks!",
    footerText: "",
    direction: "bottomAutoEdge",
    primaryButtonLabel: 'Next',
    secondaryButtonLabel: 'Close',
    secondaryButtonIcon: "Close",
}


export { Coachmark as default };
