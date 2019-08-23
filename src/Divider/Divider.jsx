import * as React from 'react';
import {Divider as FDivider} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Divider(props) {
   return (
      <FDivider {...props}>{props.children}</FDivider>
  );
}

Divider.propTypes = {
    children: PropTypes.node,
};

export { Divider as default };
