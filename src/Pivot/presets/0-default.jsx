import { Label, PivotItem } from 'office-ui-fabric-react';
import * as React from 'react';
import Pivot from '../Pivot';

const labelStyles = {
  //root: { marginTop: 10 }
};

export default (
  <Pivot uxpId="pivot1">
    <PivotItem uxpId="pivot.item.1" headerText="My Files" headerButtonProps={{
      'data-order': 1,
      'data-title': 'My Files Title'
    }}>
      <Label uxpId="pivot.label.1" styles={labelStyles}>Pivot #1</Label>
    </PivotItem>
    <PivotItem uxpId="pivot.item.2" headerText="Recent">
      <Label uxpId="pivot.label.2"  styles={labelStyles}>Pivot #2</Label>
    </PivotItem>
    <PivotItem uxpId="pivot.item.3" headerText="Shared with me">
      <Label uxpId="pivot.label.3"  styles={labelStyles}>Pivot #3</Label>
    </PivotItem>
  </Pivot>
);
