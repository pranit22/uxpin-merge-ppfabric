import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react';
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

    componentDidMount() {
        this.setState(
            { isFavorited: this.props.isFavorited }
        );
    }

    _onClick() {
        //Toggle the state.
        let newIsFaveStatus = !this.state.isFavorited;

        console.log("New fave status: " + newIsFaveStatus);

        this.setState(
            { isFavorited: newIsFaveStatus, }
        );

        //Raise this event to UXPin. We'll send them the new fave status in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(newIsFaveStatus);
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

        return (

            <ActionButton 
                {...this.props}
                text = { text }
                iconProps = { iconProps }
                styles = { styles }
                onClick={() => { this._onClick() }} 
            />

        );
    }
  
  }


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPFavoritesButton.propTypes = {

    /**
     * @uxpindescription To toggle the Favorited state
     * @uxpinpropname Is Favorited
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
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */  
    disabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when the button is clicked on.
     * @uxpinpropname Click
     * */   
    onClick: PropTypes.func
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
};

export { PPFavoritesButton as default };
