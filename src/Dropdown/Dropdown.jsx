import { Dropdown as FDropdown } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Dropdown(props) {
  return (
    <FDropdown options={props.items.split(',').map(text => ({text}))} {...props} styles={ {root: {width: props.inputWidth}} }/>
  );
}

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiSelect: PropTypes.bool,
  label: PropTypes.string,
  inputWidth: PropTypes.number,
  advancedOptions: PropTypes.object,
  /**
   * @uxpincontroltype textfield(2)
   * */
  items: PropTypes.string
};

Dropdown.defaultProps = {
  label: "label (clear to remove)",
  inputWidth: 300,
  items: "Apple,Orange,Cranberry"
};

export { Dropdown as default };
