import * as React from 'react';
import {Icon as FIcon} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Icon(props) {
   return (
      <FIcon {...props}>{props.children}</FIcon>
  );
}

Icon.propTypes = {
    children: PropTypes.node,
};

export { Icon as default };
