import * as React from 'react';
import {SearchBox as FSearchBox} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function SearchBox(props) {
   return (
      <FSearchBox {...props}>{props.children}</FSearchBox>
  );
}

SearchBox.propTypes = {
    children: PropTypes.node,
};

export { SearchBox as default };
