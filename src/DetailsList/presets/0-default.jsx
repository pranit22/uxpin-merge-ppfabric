import * as React from 'react';
import DetailsList from '../DetailsList';

export default (
  <DetailsList
    uxpId="DetailsList1"
    columns="Aa | Bb | Cc"
    items={
      `A-1  | B-1  | C-1 
A-2 | B-2 | C-2
A-3 | B-3 | C-3`
    }
    isResizable />
)