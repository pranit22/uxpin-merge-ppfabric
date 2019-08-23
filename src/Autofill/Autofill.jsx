import * as React from 'react';
import {Autofill as FAutofill} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Autofill(props) {
   return (
      <FAutofill {...props}>{props.children}</FAutofill>
  );
}

Autofill.propTypes = {
    children: PropTypes.node,
};

export { Autofill as default };
