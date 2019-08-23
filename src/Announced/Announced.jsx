import * as React from 'react';
import {Announced as FAnnounced} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Announced(props) {
   return (
      <FAnnounced {...props}>{props.children}</FAnnounced>
  );
}

Announced.propTypes = {
    children: PropTypes.node,
};

export { Announced as default };
