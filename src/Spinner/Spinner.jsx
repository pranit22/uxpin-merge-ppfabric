import * as React from 'react';
import {Spinner as FSpinner} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Spinner(props) {
   return (
      <FSpinner {...props}>{props.children}</FSpinner>
  );
}

Spinner.propTypes = {
    children: PropTypes.node,
};

export { Spinner as default };
