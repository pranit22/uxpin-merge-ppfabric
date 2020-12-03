import { Breadcrumb as FBreadcrumb } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { mergeStyles } from '@uifabric/merge-styles';
import { getTokens, csv2arr } from '../_helpers/parser';

//Default breadcrumb items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultCrumbs = `Home
Applications
dockerserv
Builds`;

//Sizes mapped as per Fluent library noted here: https://github.com/microsoft/fluentui/blob/master/packages/theme/src/fonts/FluentFonts.ts
let Font = {

  tiny: 10,
  xSmall: 10,
  smallPlus: 12,
  small: 12,
  medium: 14,
  mediumPlus: 16,
  large: 18,
  xLarge: 20,
  xxLarge: 28,
  mega: 68

}

class Breadcrumb extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      crumbs: [],
      selectedIndex: this.props.selectedIndex
    }
  }

  componentDidMount() {
    this.setItems();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.crumbs !== this.props.crumbs
      || prevProps.selectedIndex !== this.props.selectedIndex
    ) {
      this.setItems();
    }
  }

  //Parse the crumb items
  setItems() {
    let items = csv2arr(this.props.crumbs)
      .flat()
      .map((val, index) => ({
        text: getTokens(val).text,
        key: index + 1,
        onClick: this.onCrumbClick.bind(this)
      }));

    this.setState({
      crumbs: items,
      selectedIndex: this.props.selectedIndex
    });
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

  onCrumbClick(event, element) {

    event.preventDefault();
    const index = this.state.crumbs.findIndex(item => item.key === element.key) + 1;

    this.setState(
        { selectedIndex: index }
    )

    //If the prop for an individual crumb item's click event exists, propagate it. 
    if (this.props[`onItem${index}Click`]) {
        this.props[`onItem${index}Click`](index);
    }
}

  render() {
   
    return (
      this.state.crumbs.length > 0 ?
      <FBreadcrumb
        items={this.state.crumbs}

        //default value for the overflow index
        overflowIndex={1}
        className={this.getBreadcrumbClasses()} {...this.props}         
      />
        : <div> </div>
    );
  }
}

Breadcrumb.propTypes = {

  /**
  * @uxpindescription The list of crumbs. Put one item on each row. Enclose an item in quotes if including a comma.
  * @uxpinpropname Crumbs
  * @uxpincontroltype codeeditor
  */
  crumbs: PropTypes.string.isRequired,

  /**
  * @uxpindescription Max crumb Items to be displayed 
  * @uxpinpropname Max displayed Items
  */
  maxDisplayedItems: PropTypes.number,

  /**
  * @uxpindescription Font Size options 
  * @uxpinpropname Font Size
  */
  fontSize: PropTypes.oneOf([
    'tiny',
    'xSmall',
    'small',
    'smallPlus',
    'medium',
    'mediumPlus',
    'large',
    'xLarge',
    'xxLarge',
    'mega',
  ]),

/**
  * @uxpindescription Fires when Item 1 is clicked
  * @uxpinpropname Item 1 Click
  */
 onItem1Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 2 is clicked
 * @uxpinpropname Item 2 Click
 */
 onItem2Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 3 is clicked
 * @uxpinpropname Item 3 Click
 */
 onItem3Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 4 is clicked
 * @uxpinpropname Item 4 Click
 */
 onItem4Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 5 is clicked
 * @uxpinpropname Item 5 Click
 */
 onItem5Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 6 is clicked
 * @uxpinpropname Item 6 Click
 */
 onItem6Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 7 is clicked
 * @uxpinpropname Item 7 Click
 */
 onItem7Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 8 is clicked
 * @uxpinpropname Item 8 Click
 */
 onItem8Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 9 is clicked
 * @uxpinpropname Item 9 Click
 */
onItem9Click: PropTypes.func,

 /**
 * @uxpindescription Fires when Item 10 is clicked
 * @uxpinpropname Item 10 Click
 */
onItem10Click: PropTypes.func,
 
}

//exposed props
Breadcrumb.defaultProps = {
  crumbs: defaultCrumbs,
  maxDisplayedItems: 5,
  fontSize: 'small',
  selectedIndex: 1,
};

export { Breadcrumb as default };
