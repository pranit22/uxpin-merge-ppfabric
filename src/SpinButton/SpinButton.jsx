import * as React from 'react';
import {SpinButton as FSpinButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles } from '@uifabric/merge-styles';

class SpinButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          
      }
    }
    render() {
        return (
         <FSpinButton 
         {...this.props} />       
        ); 
    }
}    

SpinButton.propTypes = {
    defaultValue: PropTypes.string.isRequired,
    label: PropTypes.string,
    labelPosition: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
};
SpinButton.defaultProps = {
    label: 'Basic SpinButton',
    defaultValue: '1',
    min:0,
    max: 10,
    step:0.5
}

export { SpinButton as default };
