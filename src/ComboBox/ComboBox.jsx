import { ComboBox as FComboBox, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getTokens, csv2arr } from '../_helpers/parser.jsx';


/**
 * UPDATED April 7, 2020 by Anthony Hand
 * - Added support for entering items with commas. The user must wrap an item with commas in it in quotes.
 * */


/**
 * UPDATED Mar 22, 2020 by Anthony Hand
 * - Converted control to a 'controlled' component where the selectedIndex(es) list is managed by logic within the control.
 * - Removed the fixed width property so that the user can resize it by clicking & dragging in UXPin.
 * - Added an 'onChange' event. 
 * - Added descriptions and prop names for each property with some updates. Changed some prop names.
 * - Converted the 'autoComplete' prop to a boolean. A checkbox is easier in the UXPin UI. 
 * - Removed the following events, which weren't very useful currently: onMenuOpen, onFocus, onPendingValueChanged.
 * - Removed the "allowFreeform" prop. It complicated things...
 * - Changed the input control for the 'label' prop to give it more space. 
 * 
 * TODOs
 * - Waiting for guidance from UXPin on how to expose the selectedIndex prop at runtime within UXPin. 
 * - Need to support converting CSV formatted options and trimming whitespace. 
 * - Add support for the user to pre-select the list of selected items in UXPin.
 * 
 * For additional outstanding issues, please see: 
 *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/108
 * */



//Default pivot tab items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultItems = `Apples
Bananas
"I love you, Grapes!"
Pears`;


class ComboBox extends React.Component {

    constructor(props) {
        super(props);

        //Track the lists of selected key(s) within the control
        //TODO: Populate these values with props when feature is exposed.
        this.state = {
            //default must be undefined
            _selectedIndex: null,

            //default must be an empty array
            _selectedIndices: [],
            items: []
        }

    }


    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.items !== this.props.items
            || prevProps.selected !== this.props.selected
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
                key: index,  //0 based index
                disabled: false,
            }));

        const selected = csv2arr(this.props.selected)
            .flat()
            .map(
                i => parseInt(i.trim()) - 1
            );
        
        this.setState({
            items: items,
            _selectedIndex: selected[0],
            _selectedIndices: selected
        });
    }

    //The main entry point for the control's onChange event. 
    // Note that 'changed' means its changed from checked to unchecked, or vice versa. 
    // And in the case of multi-select, each individual item comes in separately. 
    _onChoiceChange(option, index) {

        //Case Single Select
        // Option info is undefined. The Index is the index of the newly selected item. 

        //Case Multi Select
        // Option info has the new selection state info for a specific item. 
        // Option.selected has its new selection state, true or false. Index is its index. 

        if (this.props.multiSelect) {
            this._onChangeMulti(option);
        }
        else {
            this._onChangeSingle(index);
        }
    }

    //To process the onChange event for a single select use case. 
    _onChangeSingle(index) {

        //We MUST  set the state with the updated index value. This will also force the control to update in UXPin at runtime.
        this.setState(
            { _selectedIndex: index }
        )

        //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
        //For the end user in UXPin, convert the index to a 1-based number. 
        if (this.props.onChange) {
            this.props.onChange(index + 1);
        }

    }


    //To process the onChange event for a multi-select use case. 
    _onChangeMulti(option) {

        const selected = option.selected;
        const key = option.key;

        //Clone the array.
        var keys = [...this.state._selectedIndices];
        const included = keys.includes(key);

        //If selected, let's add it to our tracking array prop.
        if (selected && included == false) {
            keys.push(key);
        }
        else if (selected == false && included) {

            //Otherwise let's remove it from our tracking array. 
            var filtered = keys.filter(
                function (currVal) {
                    return currVal != key;
                });

            // Now we set the filtered array to the keys array.
            keys = filtered;
        }

        //We MUST update the state with the new values. This will also force the control to update in UXPin at runtime.
        this.setState(
            { _selectedIndices: keys }
        )

        //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
        if (this.props.onChange) {
            const list = keys.toString(); //comma separated
            this.props.onChange(list);
        }
    }


    render() {

        //Microsoft uses one prop for both single and multi-select use cases, unlike the Dropdown. 
        var keys = null;

        if (this.props.multiSelect &&
            this.state._selectedIndices) {

            keys = this.state._selectedIndices;
        }
        else {
            keys = this.state._selectedIndex;
        }

        //Convert the autocomplete boolean to one of Microsoft's preferred strings. 
        var autoComplete = "off";
        if (this.props.autoComplete) {
            autoComplete = "on";
        }


        return (

            <FComboBox
                {...this.props}
                options={this.state.items}
                autoComplete={autoComplete}
                selectedKey={keys}
                onChange={(e, o, i, v) => { this._onChoiceChange(o, i); }} //We only want to catch the option and index
            />

        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ComboBox.propTypes = {

    /**
     * @uxpindescription The label for the control
     * @uxpinpropname Label
     * @uxpincontroltype textfield(2)
     * */
    label: PropTypes.string,

    /**
     * @uxpindescription Placeholder text to show until an item(s) is selected
     * @uxpinpropname Placeholder
     */
    placeholder: PropTypes.string,

    /**
     * @uxpindescription The list of available options. Put each item on a separate line. Put quotes around an item to use a comma in it. 
     * @uxpincontroltype codeeditor
     */
    items: PropTypes.string,

    /**
     * @uxpindescription To allow multiple selections
     * @uxpinpropname Multi-select
     */
    multiSelect: PropTypes.bool,

    /**
     * @uxpindescription The selected indexes, separated with commas (1-based index). In case of Single Select mode, the first number will be used if multiple values are provided.
     * @uxpinpropname Selected Indexes
     * */
    selected: PropTypes.string,

    /**
     * Microsoft uses the values: "on", "off" 
     * @uxpindescription Whether the ComboBox auto completes. As the user is inputing text, it will be suggested potential matches from the list of options. 
     * @uxpinpropname Auto-Complete
     */
    autoComplete: PropTypes.bool,

    /**
     * @uxpindescription An error message to display below the control. Setting this value also displays the control in an error state.
     * @uxpinpropname Error Message
     */
    errorMessage: PropTypes.string,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    disabled: PropTypes.bool,

    /** Coma separated values to preselect */
    //defaultSelectedKey: PropTypes.string,

    /**
     * @uxpindescription Fires when the selected item(s) changes.
     * @uxpinpropname Value Change
     * */
    onChange: PropTypes.func

};

/**
 * Set the default values for this control in the UXPin Editor.
 */
ComboBox.defaultProps = {
    label: "Basic ComboBox",
    placeholder: " - Select -",
    disabled: false,
    multiSelect: false,
    autoComplete: "off",
    items: defaultItems,
    selected: ""
};


export { ComboBox as default };
