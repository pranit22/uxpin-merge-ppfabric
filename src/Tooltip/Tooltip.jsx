import * as React from 'react';
import {Tooltip as FTooltip} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Tooltip(props) {
   return (
      <FTooltip {...props}>{props.children}</FTooltip>
  );
}

Tooltip.propTypes = {
    children: PropTypes.node,
};

export { Tooltip as default };
