import * as React from 'react';
import {Selection as FSelection} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Selection(props) {
   return (
      <FSelection {...props}>{props.children}</FSelection>
  );
}

Selection.propTypes = {
    children: PropTypes.node,
};

export { Selection as default };
