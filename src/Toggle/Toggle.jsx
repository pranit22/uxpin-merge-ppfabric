import { Toggle as FToggle } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Toggle(props) {
  return (
    <FToggle {...props}/>
  );
}

Toggle.propTypes = {
  defaultChecked: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

Toggle.defaultProps = {
  defaultChecked: false,
  label: "label (clear to remove",
  disabled: false
};

export { Toggle as default };
