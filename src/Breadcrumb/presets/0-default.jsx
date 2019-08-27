import { FontSizes } from 'office-ui-fabric-react';
import * as React from 'react';
import Breadcrumb from '../Breadcrumb';

export default (<Breadcrumb uxpId="breadcrumb1" styles={{
  itemLink: {
    fontSize: FontSizes.medium
  }
}} crumbs="foo,bar,baz" />);
