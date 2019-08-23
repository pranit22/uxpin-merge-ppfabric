import * as React from 'react';
import {Coachmark as FCoachmark} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Coachmark(props) {
   return (
      <FCoachmark {...props}>{props.children}</FCoachmark>
  );
}

Coachmark.propTypes = {
    children: PropTypes.node,
};

export { Coachmark as default };
