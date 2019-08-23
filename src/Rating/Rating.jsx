import * as React from 'react';
import {Rating as FRating} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Rating(props) {
   return (
      <FRating {...props}>{props.children}</FRating>
  );
}

Rating.propTypes = {
    children: PropTypes.node,
};

export { Rating as default };
