import * as React from 'react';
import Dropdown from '../Dropdown';
const options = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: 'Header' },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: 'Divider' },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: 'Header' },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
];

export default ( <Dropdown uxpId="dropdown1" placeholder="Select an option" label="Label (optional)" options={options} dropdownWidth="300"/>);
