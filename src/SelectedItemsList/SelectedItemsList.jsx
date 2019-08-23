import * as React from 'react';
import {SelectedItemsList as FSelectedItemsList} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function SelectedItemsList(props) {
   return (
      <FSelectedItemsList {...props}>{props.children}</FSelectedItemsList>
  );
}

SelectedItemsList.propTypes = {
    children: PropTypes.node,
};

export { SelectedItemsList as default };
