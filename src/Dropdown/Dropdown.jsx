import * as React from 'react';
import {Dropdown as FDropdown} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Dropdown(props) {
   return (
      <FDropdown {...props}>{props.children}</FDropdown>
  );
}

Dropdown.propTypes = {
    children: PropTypes.node,
};

export { Dropdown as default };
