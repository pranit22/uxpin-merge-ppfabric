import { Pivot as FPivot, PivotItem } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Pivot(props) {
  return (
    <FPivot {...props}>{props.tabs.split(',').map(tab => (<PivotItem headerText={tab} />))}</FPivot>
  );
}

Pivot.propTypes = {
  tabs: PropTypes.string.isRequired,
  defaultSelectedIndex: PropTypes.number
};

Pivot.defaultProps = {
  tabs: 'One,Two,Three',
  defaultSelectedIndex: 0
};

export { Pivot as default };
