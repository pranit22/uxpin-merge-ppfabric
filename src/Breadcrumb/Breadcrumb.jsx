import { Breadcrumb as FBreadcrumb, FontSizes } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { mergeStyles } from '@uifabric/merge-styles';

let Font = {

  mini: 10,
  xSmall: 10,
  smallPlus: 12,
  small: 12,
  medium: 14,
  mediumPlus: 16,
  icon: 16,
  large: 20,
  xLarge: 20,
  xLargePlus: 24,
  xxLarge: 28
    
}
class Breadcrumb extends React.Component {
  
  constructor(props) {
    super(props);
  }

  getBreadcrumbClasses() {

    return mergeStyles({
      marginTop: -5,
      marginBottom: -5,
      display: 'inline-block',
      width: 'min-content',
      height: 'min-content',
      selectors: {
        '& .ms-Breadcrumb-item': {
          fontSize: Font[this.props.fontSize] 
        },
        '& .ms-Breadcrumb-list': {
          height: 'min-content',
          verticalAlign: 'middle'
        }
      }
    })
  }

  render() {
    return (
      
      <FBreadcrumb className="BreadcrumbComponent"
        items={this.props.crumbs.split(',').map(text => ({ text }))}
        className={this.getBreadcrumbClasses()} {...this.props} />
    );
  }
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.string.isRequired,
  maxDisplayedItems: PropTypes.number,
  overflowIndex: PropTypes.number,
  fontSize: PropTypes.oneOf(['mini','xSmall','small','smallPlus','medium','mediumPlus','icon','large','xLarge',
            'xLargePlus', 'xxLarge'])
 
}

Breadcrumb.defaultProps = {
  crumbs: 'foo,bar,baz',
  maxDisplayedItems: 3,
  overflowIndex: 0,
  fontSize: 'small'

};

export { Breadcrumb as default };
