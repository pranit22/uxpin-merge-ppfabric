import * as React from 'react';
import Button from '../Button';


  /**
   * UPDATED Mar 16-17, 2020 by Anthony Hand
   * - Removed the property for the default button label. We're setting it once in the Button.jsx file. 
   * - Added the style width property here. UXPin staff recommended it. This allows the end user to set the width at design time in UXPin by clicking and dragging.
   *    
   * */


export default (
  <Button uxpId="button1" style={{width: '100%'}} />
);

