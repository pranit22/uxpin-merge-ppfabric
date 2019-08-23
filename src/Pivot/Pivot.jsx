import * as React from 'react';
import {Pivot as FPivot} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Pivot(props) {
   return (
      <FPivot {...props}>{props.children}</FPivot>
  );
}

Pivot.propTypes = {
    children: PropTypes.node,
};

export { Pivot as default };
