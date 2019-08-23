import * as React from 'react';
import {HoverCard as FHoverCard} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function HoverCard(props) {
   return (
      <FHoverCard {...props}>{props.children}</FHoverCard>
  );
}

HoverCard.propTypes = {
    children: PropTypes.node,
};

export { HoverCard as default };
