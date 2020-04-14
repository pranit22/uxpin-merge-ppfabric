import * as React from 'react';
import {
        TeachingBubble as FTeachingBubble,
        DirectionalHint
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';  


  /**
   * UPDATED April 7, 2020 by Anthony Hand
   * - Added support for showing icons on the Primary and Secondary buttons. 
   * */

  /**
   * UPDATED April 1, 2020 by Anthony Hand
   * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
   * - Converted object to a class.
   * - Added file to our TPX UX Experimental library on UXPin.
   * 
   * TODOs
   * - Control needs to be updated with the proper PayPal UI theme. 
   * - Cannot change the icon used directly. The mapping itself within the PayPal TPX icon library must be updated. 
   *        https://github.paypal.com/Console-R/pp-fabric-theme/issues/27
   * 
   * */


class TeachingBubble extends React.Component {
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


        let pIconProps = { iconName: this.props.primaryButtonIcon };
        let sIconProps = { iconName: this.props.secondaryButtonIcon, style: { color: 'white' }  };

        //Make the Primary and Secondary buttons rounded
        let roundedButtonStyle = {
            root: {
              borderRadius: 100
            }
        }

        return (
            <>
                <div
                    className="trigger"
                    ref={this._targetElm}
                    style={{
                        width: 10,
                        height: 10,
                        background: 'var(--color-blue-100)',
                        borderRadius: 10
                    }} />

                {this.state.open && (
                        <FTeachingBubble
                            target = { this._targetElm.current }
                            {...this.props}
                            calloutProps = {{ directionalHint: DirectionalHint[this.props.direction] }}
                            headline = { this.props.title }
                            footerContent = { this.props.footerText }
                            hasCloseButton = { this.props.hasCloseButton }
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
                        </FTeachingBubble>
                )}
            </>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
TeachingBubble.propTypes = {

    /**
     * @uxpindescription Whether to display the TeachingBubble 
     */   
    open: PropTypes.bool,

    /**
     * @uxpindescription The control's title text
     * @uxpinpropname Headline
     */
    title: PropTypes.string,

    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(5)
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
     * @uxpindescription Whether to display the Close button
     * @uxpinpropname Show Close Button
     * */
    hasCloseButton: PropTypes.bool,

    /**
     * @uxpindescription The control's display direction
     * @uxpinpropname Hint Direction
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
TeachingBubble.defaultProps = {
    open: true,
    title: "Basic TeachingBubble",
    text: "Set my 'open' property to true to view me in a mockup.",
    footerText: "",
    direction: "bottomAutoEdge",
    hasCloseButton: true,
    primaryButtonLabel: 'Next',
    secondaryButtonLabel: 'Close',
    secondaryButtonIcon: "Close",
}


export { TeachingBubble as default };
