import * as React from 'react';
import { CommandButton as FCommandButton, TooltipHost } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { getTokens, csv2arr } from '../_helpers/parser.jsx';



/**
 * UPDATED April 6, 2020 by Anthony Hand
 * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
 * - Converted object to a class.
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Control needs to be updated with the proper PayPal UI theme. 
 * 
 * */



//Default pivot tab items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultItems = `icon(Document) Add Document
icon(FileCode) Add Code File
icon(Picture) Add Picture`;



class CommandButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.items !== this.props.items
        ) {
            this.set();
        }
    }

    //Parse the choice items
    set() {

        if (!this.props.items)
            return;

        let items = csv2arr(this.props.items)
            .flat()
            .map((val, index) => ({
                text: getTokens(val).text,
                key: index + 1,  //1 based index
                disabled: false,
                iconProps: this.getIconProps(val),
                onClick: () => { this._onClick(index + 1) } //same as key, 1-based
            }));

        this.setState({
            items: items
        });
    }


    //Get the user-entered left icon name, if there is one
    getLeftIcon(str) {
        const tokens = getTokens(str).tokens
        const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start')
        return leftIcon ? leftIcon.target : null
    }

    //If the user has chosen a tiled options display, let's figure out the icon names.
    getIconProps(str) {
        return {
            iconName: this.getLeftIcon(str)
        }
    }


    //The main Icon Button always passes 0.
    //Any sub-menu buttons pass their 1-based index value.
    _onClick(index) {

        //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(index);
        }
    }


    render() {
        let iconProps = { iconName: this.props.iconName }

        //We want the root's margin to help the control to equal 40px. We need to make up 14px when there is no text.
        var rootPadding = '0 7px';
        //The label margin is always present, even when there is no label
        var labelMargin = '0';
        if (this.props.text) {
            rootPadding = '0';
            labelMargin = '0 8px';
        }

        let styles = {
            root: {
                margin: 0,
                padding: rootPadding,
            },
            label: {
                whiteSpace: 'nowrap',
                margin: labelMargin,
                padding: 0,
            }
        }

        var menuProps = undefined;
        if (this.props.items) {
            menuProps = {
                items: this.state.items,
                directionalHintFixed: true
            };
        }

        let menuIconProps = {
            iconName: 'ElipsisVertical',
        }

        const tooltipId = _.uniqueId('tooltip_');

        return (
            <div>
                <TooltipHost
                    content={this.props.tooltip}
                    id={tooltipId}
                >
                    <FCommandButton
                        {...this.props}
                        text={this.props.text}
                        iconProps={iconProps}
                        menuProps={menuProps}
                        menuIconProps={this.props.ellipsis ? menuIconProps : ''}
                        styles={styles}
                        onClick={() => { this._onClick(0) }} //Always send 0. Only fires if it has no sub-menu
                    />
                </TooltipHost>
            </div>
        );
    }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CommandButton.propTypes = {

    /**
     * @uxpindescription The text to display on the button
     * @uxpinpropname Text
     * */
    text: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon Name
     * */
    iconName: PropTypes.string,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription An optional list of menu items. Put each option on a separate line.  Add an icon(IconName) at the start of each line.
     * @uxpinpropname Menu Items
     * @uxpincontroltype codeeditor
     * */
    items: PropTypes.string,

    /**
     * @uxpindescription To show the sub-menu icon as an ellipsis
     * @uxpinpropname Ellipsis Icon
     * */
    ellipsis: PropTypes.bool,

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Tooltip
     * */
    tooltip: PropTypes.string,

    /**
     * @uxpindescription Fires when the button is clicked on.
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func
};



/**
 * Set the default values for this control in the UXPin Editor.
 */
CommandButton.defaultProps = {
    text: "Add Item",
    iconName: "Add",
    items: defaultItems,
    disabled: false,
    tooltip: ''
};

export { CommandButton as default };
