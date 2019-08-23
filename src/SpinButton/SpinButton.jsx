import * as React from 'react';
import {SpinButton as FSpinButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function SpinButton(props) {
   return (
      <FSpinButton {...props}>{props.children}</FSpinButton>
  );
}

SpinButton.propTypes = {
    children: PropTypes.node,
};

export { SpinButton as default };
