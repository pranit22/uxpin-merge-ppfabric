import { Pivot as FPivot, PivotItem, colGroupProperties } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

class Pivot extends React.Component {

    _handleClick(element) {
  
      const index = element.target.innerText;
      if (this.props[`onLink${index}Click`]) 
        this.props[`onLink${index}Click`]()    
    }

    render() {
      return (
          <>
              {           
                <FPivot onClick={(e)=>{ this._handleClick(e); } } {...this.props}> 
                  { 
                    this.props.tabs.split(',').map((tab,idx) => (
                      <PivotItem  headerText={tab} key={idx}/>
                      )
                    )
                  }
                </FPivot>           
              }
          </> 
      )
    }
  }   
                
Pivot.propTypes = {
  tabs: PropTypes.string.isRequired,
  defaultSelectedIndex: PropTypes.number,

   /** @uxpinpropname Link 1 click */
   onLinkOneClick: PropTypes.func,

   /** @uxpinpropname Link 2 click */
   onLinkTwoClick: PropTypes.func,

   /** @uxpinpropname Link 3 click */
   onLinkThreeClick: PropTypes.func,

    /** @uxpinpropname Link 4 click */
    onLinkFourClick: PropTypes.func,

    /** @uxpinpropname Link 5 click */
    onLinkFiveClick: PropTypes.func,

    /** @uxpinpropname Link 6 click */
    onLinkSixClick: PropTypes.func,

    /** @uxpinpropname Link 7 click */
    onLinkSevenClick: PropTypes.func,

    /** @uxpinpropname Link 8 click */
    onLinkEightClick: PropTypes.func,

    /** @uxpinpropname Link 9 click */
    onLinkNineClick: PropTypes.func,

    /** @uxpinpropname Link 10 click */
    onLinkTenClick: PropTypes.func,
};

Pivot.defaultProps = {
  tabs: 'One,Two,Three',
  defaultSelectedIndex: 0
};

export { Pivot as default };
