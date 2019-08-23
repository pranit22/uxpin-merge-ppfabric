import * as React from 'react';
import {DetailsList as FDetailsList} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function DetailsList(props) {
   return (
      <FDetailsList {...props}>{props.children}</FDetailsList>
  );
}

DetailsList.propTypes = {
    children: PropTypes.node,
};

export { DetailsList as default };
