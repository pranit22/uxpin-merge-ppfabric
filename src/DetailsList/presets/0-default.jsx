import * as React from 'react';
import DetailsList from '../DetailsList';

export default (
  <DetailsList
    uxpId="DetailsList1"
    columns={
      `Aa
Bb [color:red-600]
Cc [color:blue-600]`
    }
    items={
      `A-1  | B-1  | [icon:StatusErrorFull:red-600] C-1 
A-2 | B-2 | C-2 [icon:SkypeCircleCheck:green-600]
A-3 | B-3 | C-3 [icon:AlertSolid:orange-600]`
    }
    isResizable />
)