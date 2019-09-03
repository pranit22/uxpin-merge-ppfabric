import * as React from 'react';

import ComboBox from '../ComboBox';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react';

const options =  [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' }, //
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' }
];

export default (<ComboBox 
  defaultSelectedKey="C"
  label="Single-select ComboBox (uncontrolled, allowFreeform: T, autoComplete: T)" 
  allowFreeform 
  autoComplete="on" 
  options={options} 
  styles={ {root: {width: ComboBox.defaultProps.dropdownWidth}} } />)

