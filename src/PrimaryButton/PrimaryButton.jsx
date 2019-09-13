import { PrimaryButton as FPrimaryButton } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function PrimaryButton(props) {
  return (
    <FPrimaryButton {...props} iconProps={{ iconName: props.iconName }} ref={props.uxpinRef} styles={{
      label: {
        whiteSpace: 'nowrap'
      }
    }}/>
  );
}

PrimaryButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired
};

PrimaryButton.defaultProps = {
  checked: false,
  disabled: false,
  text: ''
};

export { PrimaryButton as default };
