import { TextField as FTextField } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function TextField(props) {
  return (
    <FTextField {...props} styles={ {root: {width: props.inputWidth}} } iconProps={{ iconName: props.icon }}/>
  );
}

TextField.propTypes = {
  autoAdjustHeight: PropTypes.bool,
  description: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  icon: PropTypes.string,
  inputWidth: PropTypes.number,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
};

TextField.defaultProps = {
  label: "Label (clear to remove)",
  inputWidth: 300
};

export { TextField as default };
