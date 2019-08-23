import * as React from 'react';
import {Facepile as FFacepile} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Facepile(props) {
   return (
      <FFacepile {...props}>{props.children}</FFacepile>
  );
}

Facepile.propTypes = {
    children: PropTypes.node,
};

export { Facepile as default };
