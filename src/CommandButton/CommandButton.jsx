import * as React from 'react';
import {CommandButton as FCommandButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function CommandButton(props) {
   return (
      <FCommandButton {...props}>{props.children}</FCommandButton>
  );
}

CommandButton.propTypes = {
    children: PropTypes.node,
};

export { CommandButton as default };
