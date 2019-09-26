import React, { Component } from 'react'
import { Text, Breadcrumb, Icon } from 'office-ui-fabric-react';
import { whileStatement } from '@babel/types';

class ContextBar extends Component {
  render() {
    let items = this.props.breadcrumbs.map(item => ({
      text: item,
      key: item
    }))
    return (
      <div className="ContextBarComponent">
        <div className="context">
          <Text className="product" variant={'medium'} nowrap>{this.props.productName}</Text>
          <Breadcrumb className="breadCrumb" items={items} />
          <div className="documentation">
            <Icon style={{
              color: 'white',
              marginRight: 10
            }} iconName="ReadingMode" />
            <Text style={{
              color: 'white',
              marginRight: 20
            }} variant="smallPlus" onClick={() => {
              this.props.onDocumentationClick()
            }}>Documentation</Text>
          </div>
        </div>
      </div>
    )
  }

}


export default ContextBar;
