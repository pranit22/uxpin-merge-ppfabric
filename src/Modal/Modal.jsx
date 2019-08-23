import * as React from 'react';
import {Modal as FModal} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Modal(props) {
   return (
      <FModal {...props}>{props.children}</FModal>
  );
}

Modal.propTypes = {
    children: PropTypes.node,
};

export { Modal as default };
