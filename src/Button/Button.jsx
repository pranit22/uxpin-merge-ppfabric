import { PrimaryButton as FPrimaryButton, DefaultButton as FDefaultButton } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Button(props) {
  let iconProps = { iconName: props.iconName }
  return (
    <>
      {this.props.primary ?
        <FPrimaryButton {...props} iconProps={iconProps} ref={props.uxpinRef} styles={{
          label: { whiteSpace: 'nowrap' }
        }} />
        :
        <FDefaultButton {...props} iconProps={iconProps} ref={props.uxpinRef} styles={{
          label: { whiteSpace: 'nowrap' }
        }} />
      }
    </>

  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired
};

Button.defaultProps = {
  text: 'Button Name',
  primary: true,
  checked: false,
  disabled: false,
};

export { Button as default };
