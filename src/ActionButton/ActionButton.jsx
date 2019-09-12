import { ActionButton as FActionButton } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function ActionButton(props) {
  return (
    <FActionButton {...props} iconProps={{ iconName: props.iconName }} ref={props.uxpinRef}/>
  );
}

ActionButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

ActionButton.defaultProps = {
  checked: false,
  disabled: false,
  text: 'Action Button',
  iconName: 'GlobalNavButton'
};

export { ActionButton as default };
