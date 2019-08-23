import * as React from 'react';
import {Calendar as FCalendar} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Calendar(props) {
   return (
      <FCalendar {...props}>{props.children}</FCalendar>
  );
}

Calendar.propTypes = {
    children: PropTypes.node,
};

export { Calendar as default };
