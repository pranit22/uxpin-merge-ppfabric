import * as React from 'react';
import {ProgressIndicator as FProgressIndicator} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles } from '@uifabric/merge-styles';

class ProgressIndicator extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
         status: this.props.status
      }
    }

    getProgressIndicatorClasses() {

        return mergeStyles({
            selectors: { 
              '& .ms-ProgressIndicator-progressTrack' : {
                    borderRadius: 100
              },
              '& .ms-ProgressIndicator-progressBar': {
                    height: 6,
                    width: 50,
                    backgroundColor: 'red',
                    borderBottomLeftRadius: 100,
                    borderTopLeftRadius: 100
              }
            }      
        })
    }

    render() {
        return (
          
          <FProgressIndicator borderRadius={100} 
          barHeight={6}
          className={this.getProgressIndicatorClasses()} {...this.props} />
          
        );
      }
}    

ProgressIndicator.propTypes = {
    status: PropTypes.oneOf(['None','Green','Yellow','Red']),
    description: PropTypes.string,
    percentComplete: PropTypes.number
};

ProgressIndicator.defaultProps = {
    status: 'None',
    description: 'Enter text here',
    percentComplete: 0.5
}

export { ProgressIndicator as default };
