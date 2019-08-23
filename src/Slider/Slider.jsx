import * as React from 'react';
import {Slider as FSlider} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Slider(props) {
   return (
      <FSlider {...props}>{props.children}</FSlider>
  );
}

Slider.propTypes = {
    children: PropTypes.node,
};

export { Slider as default };
