import * as React from 'react';
import {CompoundButton as FCompoundButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function CompoundButton(props) {
   return (
      <FCompoundButton {...props}>{props.children}</FCompoundButton>
  );
}

CompoundButton.propTypes = {
    children: PropTypes.node,
};

export { CompoundButton as default };
