import React, { Component, Suspense } from 'react';
import { CompoundButton, INavLinkGroup, Nav, Text } from 'office-ui-fabric-react';

type Props = {
  match: {
    params: {
      name: string
    }
  }
}

export class InjectComponent extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const componentName = this.props.match.params.name;
    const Injected = React.lazy(() => import(
      /*
      webpackExclude: /(divider|extendedpicker|floatingpicker|pickers|selectableoption|selecteditemslist|ScrollablePane|splitbutton|documentcard|persona|nav|contextualmenu|datepicker|facepile|icon|link|modal)$/i,
      webpackChunkName: "component-",
      webpackMode: "lazy"
      */
      `./components/${componentName}/presets/0-default.jsx`)
    );

    return (
      <div>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Injected />
        </Suspense>
      </div>
    )
  }

}
