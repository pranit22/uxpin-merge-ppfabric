import * as React from 'react';
import {ProgressIndicator as FProgressIndicator} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles } from '@uifabric/merge-styles';
// import { initializeIcons } from '@uifabric/icons';
// import { Icon } from 'office-ui-fabric-react/lib/Icon';
// import { getIconClassName } from '@uifabric/styling';

class ProgressIndicator extends React.Component {
  
    constructor(props) {
      super(props);
      //initializeIcons();
      this.state = {
         status: this.props.status,
         description: this.props.description,
         percentValue: this.props.percentComplete
      }
    }

    getProgressIndicatorClasses() {
        //this.toPercent();
        // const per = this.state.percentValue/100;
        // console.log(per);
        // this.setState = {
        //     percentValue: per
        // }
        // console.log(this.state.percentValue);
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

    getDescription() {
        //this.getIcon();
        return this.props.status === 'None' ? this.props.description
               : this.props.status === 'Green' ? '\uE73E' + this.props.description
               : this.props.status === 'Yellow' ? '\uF331' + this.props.description 
               : '\uE783' + this.props.description 
    }

    // getIcon() {
    //     console.log(<Icon iconName='Error' /> );
    //     console.log(`<i class="${getIconClassName('Error')}" />`);

    // }

    toPercent(val){
        //console.log(this.state.percentValue);
        //let percent = this.props.percentComplete;
        let percent = val/100;
        
        // this.setState = ({
        //     percentValue: percent,
        // });
        console.log(percent);
        return percent;
        //return percent;
        //console.log(this.state.percentValue);
        //return percent;

    }

    render() {
        
        return ( 
          <FProgressIndicator percentComplete={this.toPercent(this.props.percentComplete)} /*this.toPercent()*/
          barHeight={6}
          className={this.getProgressIndicatorClasses()}
          description={this.props.description}
          {...this.props} />        
        );
      }
}    

ProgressIndicator.propTypes = {
    status: PropTypes.oneOf(['None','Green','Yellow','Red']),
    description: PropTypes.string,
    percentComplete: PropTypes.number
};

ProgressIndicator.defaultProps = {
    status: 'Red',
    percentComplete: 0.5,
    description: 'Enter text here'
}

export { ProgressIndicator as default };
