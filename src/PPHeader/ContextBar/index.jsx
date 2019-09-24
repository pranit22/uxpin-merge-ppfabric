import React, { Component } from 'react'
import { Text, Breadcrumb, Icon } from 'office-ui-fabric-react';
import { getTheme } from "@uifabric/styling";

const theme = getTheme();

class ContextBar extends Component {
  render() {
    let items = this.props.breadcrumbs.map(item => ({
      text: item,
      key: item
    }))
    return (
      <div className="ContextBarComponent"
        style={{ backgroundColor: theme.palette.themeLight }}>
        <div className="context">
          <Text className="product" variant={'medium'} >{this.props.productName}</Text>
          <Breadcrumb className="breadCrumb" items={items} />
        </div>
      </div>
    )
  }

}


export default ContextBar;
