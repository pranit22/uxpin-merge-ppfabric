import { Dropdown as FDropdown } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { csv2arr } from '../_helpers/parser.jsx'


/**
 * UPDATED Mar 22, 2020 by Anthony Hand
 * - Converted control to a 'controlled' component where the selectedIndex(es) list is managed by logic within the control.
 * - Removed the fixed width property so that the user can resize it by clicking & dragging in UXPin.  
 * - Added placeholder text prop. 
 * - Added an 'onChange' event. 
 * - Added descriptions and prop names for each property with some updates. Changed some prop names.
 * - Removed the AdvancedOptions prop. It was unused. 
 * - Changed the input control for the 'label' prop to give it more space. 
 * 
 * TODOs
 * - Waiting for guidance from UXPin on how to expose the selectedIndex prop at runtime within UXPin. 
 * - Need to support converting CSV formatted options and trimming whitespace. 
 * - Add support for the user to pre-select the list of selected items in UXPin.
 * 
 * For additional outstanding issues, please see: 
 *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/95
 * */


class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    //Track the lists of selected key(s) within the control
    //TODO: Populate these values with props when feature is exposed.
    this.state = {
      //default must be undefined
      _selectedIndex: undefined,

      //default must be an empty array
      _selectedIndices: []
    }
  }

  set() {
    const selected = csv2arr(this.props.selected)
      .flat()
      .map(
        i => parseInt(i.trim()) - 1
      );
    this.setState({
      _selectedIndex: selected[0],
      _selectedIndices: selected
    })
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.set();
    }
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

  // To process the onChange event for a single select use case. 
  _onChangeSingle(index) {

    // We MUST set the state with the updated index value. This will also force the control to update in UXPin at runtime.
    this.setState(
      { _selectedIndex: index }
    )


    // Raise this event to UXPin. We'll send them the new index value in case they can catch it.
    // For the end user in UXPin, convert the index to a 1-based number. 
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

    //We set both props in the Return.
    // One of these must be set to undefined, depending on whether this is single or multi select.
    var sIndex = undefined;
    var mIndices = undefined;

    if (this.props.multiSelect) {
      mIndices = this.state._selectedIndices;
    }
    else {
      sIndex = this.state._selectedIndex;
    }

    return (

      <FDropdown
        options={csv2arr(this.props.items)
          .flat()
          .map(
            (text, index) => ({ text: text, key: index })
          )
        }
        {...this.props}
        selectedKey={sIndex}
        selectedKeys={mIndices}
        onChange={(e, o, i) => { this._onChoiceChange(o, i); }}
      />

    );
  }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Dropdown.propTypes = {

  /**
   * @uxpindescription The label for the control
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription To display the 'required' flag on the label
   * @uxpinpropname Required
   * */
  required: PropTypes.bool,

  /**
   * @uxpindescription Placeholder text to show until an item(s) is selected
   * @uxpinpropname Placeholder
   * */
  placeholder: PropTypes.string,

  /**
   * @uxpindescription The list of available options. Separate items with a comma. 
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
   * @uxpindescription To allow multiple selections
   * @uxpinpropname Multi-select
   * */
  multiSelect: PropTypes.bool,

  /**
   * @uxpindescription The selected indexes, separated with commas (1-based index). In case of Single Select mode, the first number will be used if multiple values are provided.
   * @uxpinpropname Selected Indexes
   * */
  selected: PropTypes.string,

  /**
   * @uxpindescription An error message to display below the control. Setting this value also displays the control in an error state.
   * @uxpinpropname Error Message
   * */
  errorMessage: PropTypes.string,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the selected item(s) changes.
   * @uxpinpropname Value Change
   * */
  onChange: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Dropdown.defaultProps = {
  label: "Basic Dropdown",
  items: `Apples\nBananas\nGrapes\nPears`,
  selected: "",
  placeholder: " - Select -",
  disabled: false,
  required: false
};



export { Dropdown as default };
