import { PrimaryButton as FPrimaryButton } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function PrimaryButton(props) {
  return (
    <FPrimaryButton {...props} iconProps={{ iconName: props.iconName }}>{props.children}</FPrimaryButton>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired
};

PrimaryButton.defaultProps = {
  checked: false,
  disabled: false,
  text: ''
};

export { PrimaryButton as default };
