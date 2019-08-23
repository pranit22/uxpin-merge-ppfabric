import * as React from 'react';
import {ExtendedPicker as FExtendedPicker} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ExtendedPicker(props) {
   return (
      <FExtendedPicker {...props}>{props.children}</FExtendedPicker>
  );
}

ExtendedPicker.propTypes = {
    children: PropTypes.node,
};

export { ExtendedPicker as default };
