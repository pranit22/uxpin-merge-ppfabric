import * as React from 'react';
import {ProgressIndicator as FProgressIndicator} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles } from '@uifabric/merge-styles';

class ProgressIndicator extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
         status: this.props.status,
         description: this.props.description
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
                    backgroundColor: this.props.status === 'None' ? '#0464AE' 
                                   : this.props.status === 'Green' ? '#008000' 
                                   : this.props.status === 'Yellow' ? '#FFC800' 
                                   : '#CD0000',
                    borderRadius: 100
              }
            }      
        })
    }

    render() {
        return (
          
          <FProgressIndicator percentComplete={0.5}
          barHeight={6}
          className={this.getProgressIndicatorClasses()}
          {...this.props} />
          
        );
      }
}    

ProgressIndicator.propTypes = {
    status: PropTypes.oneOf(['None','Green','Yellow','Red']),
    description: PropTypes.string
};

ProgressIndicator.defaultProps = {
    status: 'None',
    description: 'Enter text here',
}

export { ProgressIndicator as default };
