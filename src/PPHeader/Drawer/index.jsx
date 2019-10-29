
import React, { Component } from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import AnimateHeight from 'react-animate-height';

import mockProducts from '../data/products'
import ContextBar from '../ContextBar/index'


export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grouped: false,
    }
  }

  onGroupedSwitch() {
    this.setState({
      grouped: !this.state.grouped,
    })
  }



  renderProducts() {
    return (
      <div className="panel">
        <Icon iconName="ChromeClose" className="ms-fontColor-themeLighterAlt"
          onClick={this.props.onCloseClick.bind(this)} />

        <Pivot className="switch"
          onLinkClick={this.onGroupedSwitch.bind(this)}
          selectedKey={this.state.grouped ? 'Grouped' : 'A-Z'} >

          <PivotItem headerText="A-Z" itemKey='A-Z'></PivotItem>
          <PivotItem headerText="Grouped" itemKey='Grouped'></PivotItem>
        </Pivot>

        {this.state.grouped ?

          <div className="grouped">
            <section>
              {mockProducts
                .map((group, i) => {
                  return (
                    <div key={i} className="block">
                      <header key={group.category}>
                        <Icon iconName={group.icon} />
                        <Text variant={'smallPlus'}>{group.category}</Text></header>
                      {group.list.map(product => (
                        <Text className="product" key={product} variant={'small'} block>{product}</Text>
                      ))}
                    </div>
                  )
                })}
            </section>
            <Text className="bottomLink" variant={'small'} block>Open Product Catalog</Text>
          </div>

          :

          <div className="alphabetical">
            <section>
              {mockProducts
                .reduce((col, elm) => col.concat(elm.list), [])
                .sort()
                .map(product => {
                  return (<Text className="product" key={product} variant={'small'} block>{product}</Text>)
                })}
            </section>
            <Text className="bottomLink" variant={'small'} block>Open Product Catalog</Text>
          </div>
        }
      </div>

    )
  }

  renderFavorites() {
    return (
      <div className={"panel" + (this.props.open ? ' open' : '')}>
        <Icon iconName="ChromeClose" className="ms-fontColor-themeLighterAlt"
          onClick={this.props.onCloseClick.bind(this)} />
        <div className="favorite">
          <div className="block">
            <header className="ms-fontSize-12 ms-fontColor-themeLighterAlt">
              <Icon iconName="Pinned" />
              <Text variant={'smallPlus'}>Favorite Products</Text>
            </header>
            <Text className="product" variant={'small'} block>Kafka</Text>
            <Text className="product" variant={'small'} block>SDLC</Text>
            <Text className="product" variant={'small'} block>DAL Insights</Text>
          </div>
        </div>
      </div >
    )
  }

  onProductSwitchClick() {
    this.setState({ productsView: type })
  }

  render() {
    let p = this.props
    let height = p.open ? 'auto' : 0
    return (
      <div className="DrawerComponent" id="DrawerComponent">
        <div className={"drawerWrapper"}>
          <AnimateHeight
            duration={300}
            animateOpacity
            height={height} >
            {p.open === 'Products' ? this.renderProducts() : null}
            {p.open === 'Favorites' ? this.renderFavorites() : null}
          </AnimateHeight>
          <ContextBar
            productName={p.productName}
            breadcrumbs={p.breadcrumbs}
            onDocumentationClick={p.onDocumentationClick} />
        </div >
      </div >
    )
  }

}


