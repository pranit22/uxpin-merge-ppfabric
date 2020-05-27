import * as React from 'react';
import { Rating as FRating } from 'office-ui-fabric-react';
import { RatingSize } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';


/**
 * UPDATED Mar 31, 2020 by Anthony Hand
 * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
 * - Converted object to a self managing class.
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Waiting for guidance from UXPin on how to expose a return value on at runtime within UXPin.
 * - Control needs to be updated with the proper PayPal UI theme. 
 * 
 * */


//Self-imposed limits on the number of stars.
const minNumberOfStars = 1;
const maxNumberOfStars = 20;


class Rating extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            maxNumberOfStars: 5
        }
    }

    set() {
        //We have to do some error checking, just in case. 

        //Make sure that the user entered a number between 1 - max.
        var sCount = this.props.stars;
        if (isNaN(this.props.stars)) {
            sCount = minNumberOfStars;
        }
        if (sCount < minNumberOfStars) {
            sCount = minNumberOfStars;
        }
        if (sCount > maxNumberOfStars) {
            sCount = maxNumberOfStars;
        }

        //Similarly, make sure that the user entered a number between 1 - max.
        var index = this.props.value;
        if (isNaN(this.props.value)) {
            index = minNumberOfStars;
        }
        //0 is a valid number for the index if the user also set the 'allowZero' property.
        if (index < 0) {
            index = 0;
        }
        if (index > maxNumberOfStars) {
            index = maxNumberOfStars;
        }

        this.setState(
            {
                selectedIndex: index,
                maxNumberOfStars: sCount
            }
        )
    }


    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.value !== this.props.value
            || prevProps.stars !== this.props.stars
        ) {
            this.set();
        }
    }


    _onChange(selectedIndex) {

        //The index comes in 1-based so we can save it immediately.     
        this.setState(
            { selectedIndex: selectedIndex }
        )

        //Raise this event to UXPin. We'll send them info about which item was clicked on in case they can catch it.
        if (this.props.onChange) {
            this.props.onChange(selectedIndex);
        }
    }


    render() {

        //These two values come from State because might have needed to do some error correction
        let index = this.state.selectedIndex;
        let stars = this.state.maxNumberOfStars;

        

        return (
            <FRating
                {...this.props}
                rating={index}
                max={stars}
                allowZeroStars={true}  //Hard code to allow zero
                unselectedIcon={this.props.unselectedIcon}
                icon={this.props.selectedIcon}
                disabled={this.props.disabled}
                size={RatingSize[this.props.size]}
                onChange={(e, v) => { this._onChange(v); }}
            />
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Rating.propTypes = {

    /**
     * @uxpindescription The rating value
     */
    value: PropTypes.number,  //maps to rating

    /**
    * @uxpindescription The number of stars to display from 1 - 20
    */
    stars: PropTypes.number,  //maps to max

    /**
     * @uxpindescription The exact name from the PayPal icon library
     */
    unselectedIcon: PropTypes.string, //maps to icon

    /**
     * @uxpindescription The exact name from the PayPal icon library
     */
    selectedIcon: PropTypes.string,

    /**
     * @uxpindescription The display size
     */
    size: PropTypes.oneOf([
        'Small',
        'Large',
    ]),

    /**
     * @uxpindescription To disable the control
     * */
    disabled: PropTypes.bool, //maps to readOnly

    /**
     * @uxpindescription Fires when the rating value changes.
     * @uxpinpropname Value Change
     * */
    onChange: PropTypes.func

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Rating.defaultProps = {
    value: 0,
    stars: 5,
    unselectedIcon: "FavoriteStar",
    selectedIcon: "FavoriteStarFill",
    size: 'Small',
    disabled: false
};

export { Rating as default };
