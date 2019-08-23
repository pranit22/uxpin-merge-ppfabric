import * as React from 'react';
import {MessageBar as FMessageBar} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function MessageBar(props) {
   return (
      <FMessageBar {...props}>{props.children}</FMessageBar>
  );
}

MessageBar.propTypes = {
    children: PropTypes.node,
};

export { MessageBar as default };
