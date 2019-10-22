import * as React from 'react';
import {ProgressIndicator as FProgressIndicator} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles } from '@uifabric/merge-styles';
import { getTokens } from '../_helpers/parser.jsx'

const cautionIcon = 'icon(Warning|color-yellow-700)';
const errorIcon = 'icon(Error|color-red-700)';
const checkIcon = 'icon(Completed|color-green-700)';
class ProgressIndicator extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
          percent: this.props.percent
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

     getDescription(status, desc) {
        
        let updated_text = status === 'Green' ? checkIcon
               : status === 'Yellow' ? cautionIcon
               : status === 'Red' ?  errorIcon 
               : '' 
        let text = updated_text + ' ' + desc;  
        let name = getTokens(text).mixed ? getTokens(text).mixed
                .map((el, i) => typeof el === 'string' ?
                  <span key={i}> {el} </span> :
                  el.suggestions[0]())
                :
                getTokens(text).text
        return name ;
    }

    

    render() {
        return ( 
          <FProgressIndicator 
          percentComplete={parseFloat(this.state.percent)}
          barHeight={6}
          className={this.getProgressIndicatorClasses()}
          description={this.getDescription(this.props.status, this.props.descriptionText)}
          {...this.props} />        
        );
      }
}    

ProgressIndicator.propTypes = {
    status: PropTypes.oneOf(['None','Green','Yellow','Red']),
    descriptionText: PropTypes.string,
    percent: PropTypes.string
};

ProgressIndicator.defaultProps = {
    status: 'None',
    percent: "0.5",
    descriptionText: 'Enter text here'
}

export { ProgressIndicator as default };
