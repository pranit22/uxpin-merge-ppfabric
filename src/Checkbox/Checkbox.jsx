import { Checkbox as FCheckbox } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Checkbox(props) {
  return (
    <FCheckbox {...props}>{props.children}</FCheckbox>
  );
}

Checkbox.propTypes = {
  boxSide: PropTypes.oneOf(['start', 'end']),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

Checkbox.defaultProps = {
  boxSide: 'start',
  disabled: false,
  checked: false
};

export { Checkbox as default };
