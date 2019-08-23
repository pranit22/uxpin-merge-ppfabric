import * as React from 'react';
import {IconButton as FIconButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function IconButton(props) {
   return (
      <FIconButton {...props}>{props.children}</FIconButton>
  );
}

IconButton.propTypes = {
    children: PropTypes.node,
};

export { IconButton as default };
