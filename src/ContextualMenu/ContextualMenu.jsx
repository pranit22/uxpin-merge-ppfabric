import * as React from 'react';
import {ContextualMenu as FContextualMenu} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ContextualMenu(props) {
   return (
      <FContextualMenu {...props}>{props.children}</FContextualMenu>
  );
}

ContextualMenu.propTypes = {
    children: PropTypes.node,
};

export { ContextualMenu as default };
