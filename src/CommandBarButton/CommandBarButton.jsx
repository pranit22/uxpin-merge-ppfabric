import * as React from 'react';
import {CommandBarButton as FCommandBarButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function CommandBarButton(props) {
   return (
      <FCommandBarButton {...props}>{props.children}</FCommandBarButton>
  );
}

CommandBarButton.propTypes = {
    children: PropTypes.node,
};

export { CommandBarButton as default };
