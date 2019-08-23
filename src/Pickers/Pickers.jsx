import * as React from 'react';
import {Pickers as FPickers} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Pickers(props) {
   return (
      <FPickers {...props}>{props.children}</FPickers>
  );
}

Pickers.propTypes = {
    children: PropTypes.node,
};

export { Pickers as default };
