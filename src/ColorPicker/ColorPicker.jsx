import * as React from 'react';
import {ColorPicker as FColorPicker} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ColorPicker(props) {
   return (
      <FColorPicker {...props}>{props.children}</FColorPicker>
  );
}

ColorPicker.propTypes = {
    children: PropTypes.node,
};

export { ColorPicker as default };
