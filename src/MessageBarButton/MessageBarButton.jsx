import * as React from 'react';
import {MessageBarButton as FMessageBarButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function MessageBarButton(props) {
   return (
      <FMessageBarButton {...props}>{props.children}</FMessageBarButton>
  );
}

MessageBarButton.propTypes = {
    children: PropTypes.node,
};

export { MessageBarButton as default };
