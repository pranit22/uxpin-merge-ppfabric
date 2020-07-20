import * as React from 'react';
import { ActionButton, TooltipHost } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';



/** 
 * UPDATED May 13, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */


const defaultFavoritedIcon = 'FavoriteStarFill';
const defaultFavoritedText = 'Favorite';

const defaultUnfavoritedIcon = 'FavoriteStar';
const defaultUnfavoritedText = 'Click to Favorite';



class PPFavoritesButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFavorited: false,
        }
    }

    set() {
        this.setState(
            { isFavorited: this.props.isFavorited }
        );
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.isFavorited !== this.props.isFavorited
        ) {
            this.set();
        }
    }

    _onChange() {
        //Toggle the state.
        let newIsFaveStatus = !this.state.isFavorited;
        this.setState(
            { isFavorited: newIsFaveStatus, }
        );

        //Raise this event to UXPin. We'll send them the new fave status in case they can catch it.
        if (this.props.onChange) {
            this.props.onChange(newIsFaveStatus);
        }
    }


    render() {

        let text = this.state.isFavorited ? this.props.favoritedText : this.props.text;

        var iName = this.state.isFavorited ? this.props.favoritedIconName : this.props.iconName;
        if (iName)
            iName = iName.trim();

        let iconProps = { iconName: iName }

        //We want the root's margin to help the control to equal 40px. We need to make up 14px when there is no text.
        var rootPadding = '0 7px';
        //The label margin is always present, even when there is no label
        var labelMargin = '0';
        if (this.props.text || this.props.favoritedText) {
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

        const tooltipId = _.uniqueId('tooltip_');

        return (
            <div>
                <TooltipHost
                    content={this.state.isFavorited ? this.props.favoritedTooltip : this.props.unfavoritedTooltip}
                    id={tooltipId}
                >
                    <ActionButton
                        {...this.props}
                        text={text}
                        iconProps={iconProps}
                        styles={styles}
                        onClick={() => { this._onChange() }}
                        aria-describedby={tooltipId}
                    />
                </TooltipHost >
            </div>
        );
    }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPFavoritesButton.propTypes = {

    /**
     * @uxpindescription To toggle the Favorited state. This prop's live value is available for scripting.
     * @uxpinpropname * Is Favorited
     * @uxpinbind onChange
     * */
    isFavorited: PropTypes.bool,

    /**
     * @uxpindescription Unfavorited State: The text to display on the button
     * @uxpinpropname Text
     * */
    text: PropTypes.string,

    /**
     * @uxpindescription Unfavorited State: The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon Name
     * */
    iconName: PropTypes.string,

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Tooltip
     * */
    unfavoritedTooltip: PropTypes.string,

    /**
     * @uxpindescription Favorited State: The text to display on the button
     * @uxpinpropname Fave Text
     * */
    favoritedText: PropTypes.string,

    /**
     * @uxpindescription Favorited State: The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Fave Icon Name
     * */
    favoritedIconName: PropTypes.string,

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Fav Tooltip
     * */
    favoritedTooltip: PropTypes.string,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when the controls Is Favorited value changes.
     * @uxpinpropname * Is Favorited Changed
     * */
    onChange: PropTypes.func
};



/**
 * Set the default values for this control in the UXPin Editor.
 */
PPFavoritesButton.defaultProps = {
    isFavorited: false,
    text: defaultUnfavoritedText,
    iconName: defaultUnfavoritedIcon,
    favoritedText: defaultFavoritedText,
    favoritedIconName: defaultFavoritedIcon,
    disabled: false,
    favoritedTooltip: '',
    unfavoritedTooltip: ''
};

export { PPFavoritesButton as default };
