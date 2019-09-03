# ComboBox
  
```jsx
const options =  [
  { key: 'Header1', text: 'First heading', itemType: ComboBox.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: ComboBox.Divider },
  { key: 'Header2', text: 'Second heading', itemType: ComboBox.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' }, //
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' }
];
<ComboBox 
  multiSelect
  defaultSelectedKey="C"
  label="ComboBox Label" 
  allowFreeform 
  autoComplete="on" 
  options={options} 
  styles={ {root: {width: ComboBox.defaultProps.dropdownWidth}} } /> 
```
  
 