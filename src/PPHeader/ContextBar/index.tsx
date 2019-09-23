import React, { Component } from 'react'
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getTheme } from "@uifabric/styling";
const theme = getTheme();

class ContextBar extends Component {
  render() {
    return (
      <div className={"ContextBarComponent"}
        style={{ backgroundColor: theme.palette.themeLight }}>
        <div className="context">
          <Text className="bold" variant={'small'} >Extension Name</Text>
          <Text variant={'small'} style={{ color: theme.palette.themePrimary }}>Home</Text>
          <Icon iconName="ChevronRight" />
          <Text variant={'small'} >Current Page</Text>
        </div>
        <div>
          <Text variant={'small'} style={{ color: theme.palette.themePrimary }} >Documentation</Text>
        </div>
      </div>
    )
  }

}


export default ContextBar;