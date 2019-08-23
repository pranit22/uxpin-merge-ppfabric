import * as React from 'react';
import {DocumentCard as FDocumentCard} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function DocumentCard(props) {
   return (
      <FDocumentCard {...props}>{props.children}</FDocumentCard>
  );
}

DocumentCard.propTypes = {
    children: PropTypes.node,
};

export { DocumentCard as default };
