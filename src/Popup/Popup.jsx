import * as React from 'react';
import {Popup as FPopup} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Popup(props) {
   return (
      <FPopup {...props}>{props.children}</FPopup>
  );
}

Popup.propTypes = {
    children: PropTypes.node,
};

export { Popup as default };
