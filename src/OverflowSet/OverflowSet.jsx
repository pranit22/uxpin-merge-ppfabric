import * as React from 'react';
import {OverflowSet as FOverflowSet} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function OverflowSet(props) {
   return (
      <FOverflowSet {...props}>{props.children}</FOverflowSet>
  );
}

OverflowSet.propTypes = {
    children: PropTypes.node,
};

export { OverflowSet as default };
