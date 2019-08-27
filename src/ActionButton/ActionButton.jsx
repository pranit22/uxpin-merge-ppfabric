import { ActionButton as FActionButton } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function ActionButton(props) {
  return (
    <FActionButton {...props} iconProps={{ iconName: props.iconName }}>{props.children}</FActionButton>
  );
}

ActionButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired
};

ActionButton.defaultProps = {
  checked: false,
  disabled: false,
  text: ''
};

export { ActionButton as default };
