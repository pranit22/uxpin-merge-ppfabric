import * as React from 'react';
import {Dialog as FDialog} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Dialog(props) {
   return (
      <FDialog {...props}>{props.children}</FDialog>
  );
}

Dialog.propTypes = {
    children: PropTypes.node,
};

export { Dialog as default };
