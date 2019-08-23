import * as React from 'react';
import {DefaultButton as FDefaultButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function DefaultButton(props) {
   return (
      <FDefaultButton {...props}>{props.children}</FDefaultButton>
  );
}

DefaultButton.propTypes = {
    children: PropTypes.node,
};

export { DefaultButton as default };
