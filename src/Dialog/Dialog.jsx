import * as React from 'react';
import {
    Dialog as FDialog,
    DialogFooter,
    PrimaryButton,
    DefaultButton,
    DialogType,
    Stack
} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';


/**
 * UPDATED April 2, 2020 by Anthony Hand
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


const small = 'small';
const medium = 'medium';
const large = 'large';

const getWidthFromSize = width => {
    switch (width) {
        case small: return 340;
        case medium: return 680;
        case large: return 1020;
    }
}

const _dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
};

//Make the Primary and Secondary buttons rounded
const roundedButtonStyle = {
    root: {
        borderRadius: 100
    }
}

class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }


    set() {
        var isOpen = false;

        if (this.props.show) {
            isOpen = true;
        }

        this.setState(
            { open: isOpen }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.show !== this.props.show
        ) {
            this.set();
        }
    }


    dismissControl() {
        //Set the control to not open to dismiss it.
        this.setState(
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

        //Figure out whether we need to display any action buttons, and configure them.
        let hasActionButtons = false;
        var actionButtons = [];

        if (this.props.secondaryButtonLabel) {
            let btn = (<DefaultButton
                text={this.props.secondaryButtonLabel}
                styles={roundedButtonStyle}
                onClick={() => { this._onSecondaryButtonClicked(); }} />);
            actionButtons.push(btn);
            hasActionButtons = true;
        }
        if (this.props.primaryButtonLabel) {
            let btn = (<PrimaryButton
                text={this.props.primaryButtonLabel}
                styles={roundedButtonStyle}
                onClick={() => { this._onPrimaryButtonClicked(); }} />);
            actionButtons.push(btn);
            hasActionButtons = true;
        }

        var footer = "";
        if (hasActionButtons) {
            footer = (<DialogFooter>{actionButtons}</DialogFooter>)
        }

        return (
            <div>
                <div  //A visual aid for the designer to see in UXPin
                    style={{
                        width: '100px',
                        height: '100px',
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "middle",
                        background: 'var(--color-blue-800)',
                        borderRadius: 10
                    }}><br /><em><strong>Dialog:</strong></em><br />Move this marker offscreen</div>
                <FDialog
                    maxWidth={getWidthFromSize(this.props.maxWidth)}
                    hidden={!this.state.open}
                    dialogContentProps={{
                        type: DialogType.normal,
                        showCloseButton: true,
                        title: this.props.title,
                        subText: this.props.text
                    }}
                    modalProps={{
                        isBlocking: this.props.blocking,
                        isDarkOverlay: this.props.darkOverlay,
                        dragOptions: this.props.draggable ? _dragOptions : undefined
                    }}
                    onDismiss={() => { this._onDismissClicked() }}
                >
                    {this.props.children &&
                        <Stack
                            tokens={{
                                childrenGap: 12,
                                padding: '12px 0px'
                            }}
                        >
                            {this.props.children}
                        </Stack>
                    }
                    {footer}
                </FDialog>
            </div>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Dialog.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
     * @uxpindescription Whether to display the Dialog 
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription Max width for the control
     */
    maxWidth: PropTypes.oneOf([small, medium, large]),

    /**
     * @uxpindescription The control's title text
     * @uxpinpropname Headline
     */
    title: PropTypes.string,

    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(6)
     */
    text: PropTypes.string,

    /**
     * @uxpindescription Whether the user may drag around the dialog 
     */
    draggable: PropTypes.bool,

    /**
     * @uxpindescription Whether the user may click off the dialog to dismiss it, or must click on a button instead 
     */
    blocking: PropTypes.bool,

    /**
     * @uxpindescription Whether the to show a dark overlay while the dialog is displayed 
     * @uxpinpropname Dark Overlay
     */
    darkOverlay: PropTypes.bool,

    /**
     * @uxpindescription The displayed text on the Primary Button. Remove text to hide button.
     * @uxpinpropname Primary Button Text
     */
    primaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription The displayed text on the Secondary Button. Remove text to hide button.
     * @uxpinpropname Secondary Button Text
     */
    secondaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription Fires when the dialog is dismissed any way EXCEPT clicking on the Primary or Secondary buttons
     * @uxpinpropname Dismissed
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
Dialog.defaultProps = {
    show: true,
    maxWidth: small,
    title: "Basic Dialog",
    text: "Place the dialog marker off screen. Using another control like a Button, set the 'open' property to True to show it a mockup.",
    draggable: true,
    darkOverlay: true,
    blocking: false,
    primaryButtonLabel: "OK",
    secondaryButtonLabel: "Close"
};


export { Dialog as default };
