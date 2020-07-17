import { ChoiceGroup as FChoiceGroup } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { getTokens, csv2arr } from '../_helpers/parser.jsx';

  /**
   * UPDATED May 21, 2020 by Anthony Hand
   * - Updated to reflect UXPin 2.5's new model for handling prop updates in the Editor vs. at Runtime.
   */

  /**
   * UPDATED April 3, 2020 by Anthony Hand
   * - Added support for showing tiled options with icons.
   * - Added support for the user to put commas in a choice option. An option with a comma must be enclosed in quotes.
   */

  /**
   * UPDATED Mar 22, 2020 by Anthony Hand
   * - Rather than setting/getting props at runtime to track the checked state, switched to using state.
   */

  /**
   * UPDATED Mar 18, 2020 by Anthony Hand
   * - Converted control to a 'controlled' component where the selectedIndex prop is managed by logic within the control. 
   * - Added 'onChange' event. 
   * - Added descriptions and prop names for each property with some updates. Changed some prop names.
   * - Changed the input control for the 'label' prop to give it more space. 
   * 
   * TODOs
   * - Waiting for guidance from UXPin on how to expose the selectedIndex prop at runtime within UXPin. 
   * - Need to support converting CSV formatted options and trimming whitespace. 
   * 
   * For additional outstanding issues, please see: 
   *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/97
   * */


//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultChoices = `Apples
Bananas
"I love you, Grapes!"
Kiwis
Oranges`; 


class ChoiceGroup extends React.Component {

  constructor(props) {
    super(props);

    //Track the selected index state within the control
    this.state = {
      _index: 1,
      items: []  
    }
  }

  componentDidMount() {
    this.setItems();

    //Store the selected index as 1 based, same as user input
    this.setState (
      { _index: this.props.selectedIndex }
    )
  }

  componentDidUpdate(prevProps) {

    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      //Store the selected index as 1 based, same as user input
      this.setState(
        { _index: this.props.selectedIndex }
      )
    }

    //If the user sets props to true, then we add icons, which automatically converts it to tiled display.
    //So if either condition is true, we need to reset the items list. 
    if (prevProps.items !== this.props.items || prevProps.tiled !== this.props.tiled) {
      this.setItems();
    }
  }

  //Get the user-entered left icon name, if there is one
  getLeftIcon(str) {
    if (this.props.tiled) {
      const tokens = getTokens(str).tokens
      const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start')
      return leftIcon ? leftIcon.target : null
    }
    else {
      return undefined; 
    }
  }

  //If the user has chosen a tiled options display, let's figure out the icon names.
  getIconProps(str) {
    if (this.props.tiled) {
      return  {
            iconName: this.getLeftIcon(str) 
          }
    }

    return "";
  }

  //Parse the choice items
  setItems() {
    let items = csv2arr(this.props.items)
        .flat()
        .map((val, index) => ({
            text: getTokens(val).text,
            key: index,
            disabled: false,
            iconProps: this.getIconProps(val)
        }));

    this.setState({
      items: items
    });
  }

  _onChoiceChange(option) {
    //Get the value. Add 1 because it's stored as a 1-based index to be more user friendly.
    const i = option.key + 1;

    //Currently, we don't update the props for the selected index and only use it at runtime.
    
    //Set the state with the updated index value. This will force the control to update in UXPin at runtime.
    this.setState(
      { _index: i }
    )

    //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
    if (this.props.onChange) {
      this.props.onChange(i);
    }
  }

  render() {

    //Get the value from state. Subtract 1 because it's stored as a 1-based index to be more user friendly.
    const selectedKey = this.state._index - 1;

    return (

      <FChoiceGroup 
          {...this.props} 
          options={ this.state.items } 
          selectedKey={ selectedKey } 
          //Catch and process only the info for the Selected Option item.
          onChange={(e, o) => { this._onChoiceChange(o); }}
      />

    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ChoiceGroup.propTypes = {

  /**
   * @uxpindescription The label for the options
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
  * @uxpindescription The list of options. Put each option on a separate line. Enclose an item in quotes to include a comma within it.  For tiled choices, check the Tiled property and add an icon(IconName) at the start of each line.
  * @uxpinpropname Items
  * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
   * @uxpindescription To display the choices as icon tiles
   * @uxpinpropname Tiled
   * */  
  tiled: PropTypes.bool,

  /**
  * @uxpindescription The 1-based index value of the default item to be shown as selected (Optional)
  * @uxpinbind onChange
  * @uxpinpropname Index
   * */  
  selectedIndex: PropTypes.number,

  /**
   * @uxpindescription Fires when the checked state changes.
   * @uxpinpropname Index Change
   * */
  onChange: PropTypes.func
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
ChoiceGroup.defaultProps = {
  label: 'Basic ChoiceGroup',
  items: defaultChoices,
  selectedIndex: 1,
  required: false,
  tiled: false 
};


export { ChoiceGroup as default };
