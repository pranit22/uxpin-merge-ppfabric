import * as React from 'react';
import {Toggle as FToggle} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Toggle(props) {
   return (
      <FToggle {...props}>{props.children}</FToggle>
  );
}

Toggle.propTypes = {
    children: PropTypes.node,
};

export { Toggle as default };
