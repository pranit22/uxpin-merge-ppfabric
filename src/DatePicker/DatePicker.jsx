import * as React from 'react';
import {DatePicker as FDatePicker} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function DatePicker(props) {
   return (
      <FDatePicker {...props}>{props.children}</FDatePicker>
  );
}

DatePicker.propTypes = {
    children: PropTypes.node,
};

export { DatePicker as default };
