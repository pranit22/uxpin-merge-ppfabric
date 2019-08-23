import * as React from 'react';
import {ShimmeredDetailsList as FShimmeredDetailsList} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ShimmeredDetailsList(props) {
   return (
      <FShimmeredDetailsList {...props}>{props.children}</FShimmeredDetailsList>
  );
}

ShimmeredDetailsList.propTypes = {
    children: PropTypes.node,
};

export { ShimmeredDetailsList as default };
