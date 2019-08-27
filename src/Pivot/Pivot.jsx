import { Pivot as FPivot} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Pivot(props) {
  return (
    <FPivot {...props}>{props.children}</FPivot>
  );
}

Pivot.propTypes = {
  headersOnly: PropTypes.bool,
  children: PropTypes.node
};

export { Pivot as default };
