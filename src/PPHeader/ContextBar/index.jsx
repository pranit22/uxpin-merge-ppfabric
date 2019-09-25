import React, { Component } from 'react'
import { Text, Breadcrumb, Icon } from 'office-ui-fabric-react';

class ContextBar extends Component {
  render() {
    let items = this.props.breadcrumbs.map(item => ({
      text: item,
      key: item
    }))
    return (
      <div className="ContextBarComponent">
        <div className="context">
          <Text className="product" variant={'medium'} >{this.props.productName}</Text>
          <Breadcrumb className="breadCrumb" items={items} />
        </div>
      </div>
    )
  }

}


export default ContextBar;
