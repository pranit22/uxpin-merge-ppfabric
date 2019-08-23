import * as React from 'react';
import {CommandBar as FCommandBar} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function CommandBar(props) {
   return (
      <FCommandBar {...props}>{props.children}</FCommandBar>
  );
}

CommandBar.propTypes = {
    children: PropTypes.node,
};

export { CommandBar as default };
