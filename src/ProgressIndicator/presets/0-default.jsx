import * as React from 'react';
import ProgressIndicator from '../ProgressIndicator';

export default (
    <ProgressIndicator 
        uxpId = "progressIndicator1"
        status = 'Default'
        percent = "0.5" 
        descriptionText = 'Progress description'
    />
);


/**
 * Let's try doing it like UXPin shows in it's documentation, where these default props are in the 0-default.jsx file. 
 * Reference: https://www.uxpin.com/docs/merge/authoring-and-managing-jsx-presets#basic-information
 * 

ProgressIndicator.defaultProps = {
    status: 'Default',
    percent: "0.5",
    descriptionText: 'Enter text here'
}

*/