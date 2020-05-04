import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav, ZIndexes } from 'office-ui-fabric-react';
import { name2key, getTokens, csv2arr } from '../_helpers/parser.jsx';



  /**
   * UPDATED Mar 31, 2020 by Anthony Hand
   * - Added a prop so the user can choose whether to enable a styled background or leave it clear.   
   * */

  /**
   * UPDATED Mar 27, 2020 by Anthony Hand
   * - Fixed the issue where the user couldn't drag a border to resize the control within UXPin.  
   * - Set the background color and border line per Eric Rider's design reference.  
   * - Updated the default nav items to appear more relevant to TPX developers. 
   * - Added descriptions and prop names for each property with some updates. Changed some prop names.
   * 
   * TODOs
   * - In the UXPin editor, allow the user to click on the control's bottom border to drag the height. 
   * - Verify PayPal UI styles.
   * - Come up with a system to allow the user to specify groups. 
   * - Once UXPin can catch a value on a click event, remove all the extra click events. Only have 1. Return the index of the clicked on nav item. 
   * 
   * */



//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultNavItems = `icon(Dashboard) Overview
icon(FavoriteStarFill) Favorites
icon(Upload) Upload
icon(BIDashboard) Metrics
icon(Commitments) Data Services
icon(Admin) Admin`;


class Nav extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            links: [],
            selectedIndex: props.selectedIndex || 1,
            disabledIndexes: []
        }
    }


    componentDidMount() {
        this.setDisabledIndexes(this.setItems)
    }


    //TODO: Set the PayPal UI styling until the theme is updated. 
    getStyles() {

        if (this.props.styledBackground) {
            return {
                root: {
                    backgroundColor: "#F5F7FA",
                    borderRight: "1px solid #CBD2D6",
                }
            }
        }

        return "";

    }


    getLeftIcon(str) {
        const tokens = getTokens(str).tokens
        const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start')
        return leftIcon ? leftIcon.target : null
    }


    //Parse the nav items
    setItems(callback) {
        this.setState({
            links: csv2arr(this.props.items)
                .flat()
                .map((val, i) => ({
                    name: getTokens(val).text,
                    key: name2key(val),
                    disabled: this.state.disabledIndexes.includes(i + 1),
                    icon: this.getLeftIcon(val)
                }))
        }, callback)
    }


    //Parse the disabled items
    setDisabledIndexes(callback) {
        let disabledIndexes = csv2arr(this.props.disabled).flat().map(i => parseInt(i.trim()))
        this.setState(
            { disabledIndexes }, 
            callback)
    }


    onMenuClick(event, element) {
        event.preventDefault();

        const index = this.state.links.findIndex(link => link.key === element.key) + 1;

        this.setState(
            { selectedIndex: index }
        )

        //If the prop for an individual nav item's click event exists, let's push it. 
        //Raise this event to UXPin. We'll send them info about which item was clicked on in case they can catch it.
        if (this.props[`onLink${index}Click`]) {
            this.props[`onLink${index}Click`](index);
        }
    }


    render() {

        let groupParams = [
                { links: this.state.links }
        ];  

        
        return (
            //For some reason, the control will only display properly in UXPin with this weird wrapping & logic. 
            <> 
                {this.state.links.length > 0 ?
                    <FNav
                        {...this.props}
                        selectedKey = { this.state.links[this.state.selectedIndex - 1].key } 
                        styles = { this.getStyles() }
                        groups = { groupParams }
                        onLinkClick = { this.onMenuClick.bind(this) } />
                : <div> </div>}
            </>
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Nav.propTypes = {

    /**
     * @uxpindescription The 1-based index value of the tab to be shown as selected by default
     * @uxpinpropname Selected Index
     */
    selectedIndex: PropTypes.number,

    /**
     * @uxpindescription The list of nav items. Put each item on a separate line. Specify an icon using: icon(IconName)
     * @uxpinpropname Items
     * @uxpincontroltype codeeditor
     */
    items: PropTypes.string,

    /**
     * @uxpindescription The list of nav items to show as disabled, separated with commas. (1-based index)
     * @uxpinpropname Disabled Items
     * */
    disabled: PropTypes.string,

    /**
     * @uxpindescription Whether to apply styling to the control's background
     * @uxpinpropname Styled Background
     * */    
    styledBackground: PropTypes.bool,

    /**
    * @uxpindescription Fires when Item 1 is clicked
    * @uxpinpropname Item 1 Click
    */
    onLink1Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 2 is clicked
    * @uxpinpropname Item 2 Click
    */
    onLink2Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 3 is clicked
    * @uxpinpropname Item 3 Click
    */
    onLink3Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 4 is clicked
    * @uxpinpropname Item 4 Click
    */
    onLink4Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 5 is clicked
    * @uxpinpropname Item 5 Click
    */
    onLink5Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 6 is clicked
    * @uxpinpropname Item 6 Click
    */
    onLink6Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 7 is clicked
    * @uxpinpropname Item 7 Click
    */
    onLink7Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 8 is clicked
    * @uxpinpropname Item 8 Click
    */
    onLink8Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 9 is clicked
    * @uxpinpropname Item 9 Click
    */
    onLink9Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 10 is clicked
    * @uxpinpropname Item 10 Click
    */
    onLink10Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 11 is clicked
    * @uxpinpropname Item 11 Click
    */
    onLink11Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 12 is clicked
    * @uxpinpropname Item 12 Click
    */
    onLink12Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 13 is clicked
    * @uxpinpropname Item 13 Click
    */
    onLink13Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 14 is clicked
    * @uxpinpropname Item 14 Click
    */
    onLink14Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 15 is clicked
    * @uxpinpropname Item 15 Click
    */
    onLink15Click: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Nav.defaultProps = {
    selectedIndex: 1,
    items: defaultNavItems,
    styledBackground: false,
    disabled: "5, 8",
};


export { Nav as default };
