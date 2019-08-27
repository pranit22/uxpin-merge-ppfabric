import { Dropdown as FDropdown } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Dropdown(props) {
  return (
    <FDropdown {...props}>{props.children}</FDropdown>
  );
}

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.array,
  required: PropTypes.bool,
  multiSelect: PropTypes.bool,
  label: PropTypes.string,
  dropdownWidth: PropTypes.number
};

Dropdown.defaults = {
  dropdownWidth: 300,
  label: "label (optional)"
};

export { Dropdown as default };
