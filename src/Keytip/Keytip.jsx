import * as React from 'react';
import {Keytip as FKeytip} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Keytip(props) {
   return (
      <FKeytip {...props}>{props.children}</FKeytip>
  );
}

Keytip.propTypes = {
    children: PropTypes.node,
};

export { Keytip as default };
