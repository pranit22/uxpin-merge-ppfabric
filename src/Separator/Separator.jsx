import * as React from 'react';
import {Separator as FSeparator} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Separator(props) {
   return (
      <FSeparator {...props}>{props.children}</FSeparator>
  );
}

Separator.propTypes = {
    children: PropTypes.node,
};

export { Separator as default };
