const fs = require('fs-extra');
const path = require('path');

const libraryTarget = 'office-ui-fabric-react';
const targetPath = path.resolve(__dirname, '../', `node_modules/${libraryTarget}/lib/components`);
// read the list of components
const dirItems = fs.readdirSync(targetPath);
const sourcePrefix = path.resolve(__dirname, '../', 'src');

dirItems.forEach(component => {
  // create a local folder
  const componentDir = `${sourcePrefix}/${component}`;

  switch (component) {
    case 'pickers':
      // const pickers = fs.readdirSync(componentDir);
      break;
    case 'Fabric':
      //noop
      break;
    default:
      fs.ensureDirSync(componentDir);
      const wrapperTemplate = `
import {${component}} from '${libraryTarget}';
export default ${component};
      `;
      fs.writeFileSync(`${componentDir}/${component}.ts`, wrapperTemplate);
  }

});
