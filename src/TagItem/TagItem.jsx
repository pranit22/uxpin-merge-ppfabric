import * as React from 'react';
import {
    TagItem as FTagItem
} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';



/**
 * UPDATED April 14, 2020 by Anthony Hand
 * - Brand new control. Pulling it in from the PeoplePicker and TagPicker controls.
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Control needs to be updated with the proper PayPal UI theme.
 * 
 * */



class TagItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bgColor: "transparent",
            bgHoverColor: "transparent",
            borderColor: "#000000",
            textColor: "#000000"
        }
    }

    set() {
        //Because any prop change in UXPin causes the control to remount, let's figure these out once and store them.
        let role = this.props.role;

        let bgColor = role === "Info" ? TpxUxColors.infoBackground
            : role === "Success" ? TpxUxColors.successBackground
                : role === "Warning" ? TpxUxColors.warningBackground
                    : role === "Error" ? TpxUxColors.errorBackground
                        : TpxUxColors.grey100; //Default

        let bgHoverColor = role === "Info" ? TpxUxColors.infoBackgroundHover
            : role === "Success" ? TpxUxColors.successBackgroundHover
                : role === "Warning" ? TpxUxColors.warningBackgroundHover
                    : role === "Error" ? TpxUxColors.errorBackgroundHover
                        : TpxUxColors.grey200; //Default

        let borderColor = role === "Info" ? TpxUxColors.info
            : role === "Success" ? TpxUxColors.success
                : role === "Warning" ? TpxUxColors.warning
                    : role === "Error" ? TpxUxColors.error
                        : TpxUxColors.grey500; //Default

        var textColor = role === "Info" ? TpxUxColors.infoText
            : role === "Success" ? TpxUxColors.successText
                : role === "Warning" ? TpxUxColors.warningText
                    : role === "Error" ? TpxUxColors.errorText
                        : TpxUxColors.black; //Default

        //Disabled check
        if (this.props.disabled)
            textColor = TpxUxColors.grey600;

        this.setState(
            {
                bgColor: bgColor,
                bgHoverColor: bgHoverColor,
                borderColor: borderColor,
                textColor: textColor
            }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.role !== this.props.role
            || prevProps.disabled !== this.props.disabled 
        ) {
            this.set();
        }
    }

    _onClick() {
        let text = this.props.text.trim();

        //Raise this event to UXPin. We'll send them the text value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(text);
        }
    }


    render() {

        let bgColor = this.state.bgColor;
        let bgHoverColor = this.state.bgHoverColor;
        let borderColor = this.state.borderColor;
        let textColor = this.state.textColor;

        let styles = {
            root: {
                alignSelf: "center",
                borderRadius: 25,
                color: textColor,
                background: bgColor,
                border: "1px solid",
                borderColor: borderColor,
                filter: this.props.disabled ? 'brightness(95%)' : 'brightness(100%)',
                selectors: {
                    ':hover': {
                        color: textColor,
                        background: this.props.hoverEffect && !this.props.disabled ? bgHoverColor : bgColor,
                    },
                }
            },
            close: {
                visibility: this.props.showClose ? '' : 'hidden',
                borderRadius: 100,
                background: 'transparent',
                selectors: {
                    ':hover': {
                        background: 'transparent',
                        color: borderColor,
                    },
                    ':pressed': {
                        background: borderColor,
                        color: TpxUxColors.white,
                    },
                    ':expanded': {
                        background: borderColor,
                        color: TpxUxColors.white,
                    },
                    ':checked': {
                        background: borderColor,
                        color: TpxUxColors.white,
                    },
                    ':active': {
                        background: borderColor,
                        color: TpxUxColors.white,
                    },
                },
            },
        };


        return (
            <FTagItem
                {...this.props}
                index={1}
                styles={styles}
                onRemoveItem={() => this._onClick()}
            >{this.props.text}</FTagItem>
        );
    }


}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
TagItem.propTypes = {
    /**
     * @uxpindescription The displayed text
     */
    text: PropTypes.string,

    /**
     * @uxpindescription Reflect the control's role in the UI with its visual style
     */
    role: PropTypes.oneOf(['Default', 'Info', 'Success', 'Warning', 'Error']),

    /**
     * @uxpindescription To enable a visual effect on mouse hover
     * @uxpinpropname Hover Effect
     * */
    hoverEffect: PropTypes.bool,

    /**
     * @uxpindescription Whether to display the Close button
     * @uxpinpropname Show Close Button
     * */
    showClose: PropTypes.bool,

    /**
     * @uxpindescription To disable the control
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when the button is clicked on.
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
TagItem.defaultProps = {
    text: "Tag Item",
    role: 'Default',
    showClose: true,
    hoverEffect: true,
    disabled: false,
}


export { TagItem as default };