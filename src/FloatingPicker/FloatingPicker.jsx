import * as React from 'react';
import {FloatingPicker as FFloatingPicker} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function FloatingPicker(props) {
   return (
      <FFloatingPicker {...props}>{props.children}</FFloatingPicker>
  );
}

FloatingPicker.propTypes = {
    children: PropTypes.node,
};

export { FloatingPicker as default };
