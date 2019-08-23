import * as React from 'react';
import {ResizeGroup as FResizeGroup} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ResizeGroup(props) {
   return (
      <FResizeGroup {...props}>{props.children}</FResizeGroup>
  );
}

ResizeGroup.propTypes = {
    children: PropTypes.node,
};

export { ResizeGroup as default };
