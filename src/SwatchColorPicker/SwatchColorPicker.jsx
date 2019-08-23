import * as React from 'react';
import {SwatchColorPicker as FSwatchColorPicker} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function SwatchColorPicker(props) {
   return (
      <FSwatchColorPicker {...props}>{props.children}</FSwatchColorPicker>
  );
}

SwatchColorPicker.propTypes = {
    children: PropTypes.node,
};

export { SwatchColorPicker as default };
