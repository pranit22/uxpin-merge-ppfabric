import * as React from 'react';
import {TextField as FTextField} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function TextField(props) {
   return (
      <FTextField {...props}>{props.children}</FTextField>
  );
}

TextField.propTypes = {
    children: PropTypes.node,
};

export { TextField as default };
