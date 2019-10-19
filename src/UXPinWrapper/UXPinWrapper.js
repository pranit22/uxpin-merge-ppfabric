import * as React from 'react';
import { loadTheme } from 'office-ui-fabric-react';
import '@paypalcorp/console.pp-fabric/dist/pp-fabric-tokens.css';
import { light } from '@paypalcorp/console.pp-fabric/dist/theme';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

// load the theme from node_modules
loadTheme(light);

export default function UXPinWrapper({ children }) {
  return children;
}
