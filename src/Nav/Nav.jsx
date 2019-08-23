import * as React from 'react';
import {Nav as FNav} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Nav(props) {
   return (
      <FNav {...props}>{props.children}</FNav>
  );
}

Nav.propTypes = {
    children: PropTypes.node,
};

export { Nav as default };
