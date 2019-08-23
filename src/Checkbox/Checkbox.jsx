import * as React from 'react';
import {Checkbox as FCheckbox} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Checkbox(props) {
   return (
      <FCheckbox {...props}>{props.children}</FCheckbox>
  );
}

Checkbox.propTypes = {
    children: PropTypes.node,
};

export { Checkbox as default };
