import * as React from 'react';
import {ProgressIndicator as FProgressIndicator} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ProgressIndicator(props) {
   return (
      <FProgressIndicator {...props}>{props.children}</FProgressIndicator>
  );
}

ProgressIndicator.propTypes = {
    children: PropTypes.node,
};

export { ProgressIndicator as default };
