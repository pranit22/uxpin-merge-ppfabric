import * as React from 'react';
import {Panel as FPanel} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Panel(props) {
   return (
      <FPanel {...props}>{props.children}</FPanel>
  );
}

Panel.propTypes = {
    children: PropTypes.node,
};

export { Panel as default };
