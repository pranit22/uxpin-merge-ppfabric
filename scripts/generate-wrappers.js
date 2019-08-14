const fs = require('fs-extra');
const path = require('path');

const libraryTarget = 'office-ui-fabric-react';
const targetPath = path.resolve(__dirname, '../', `node_modules/${libraryTarget}/lib`);
// read the list of components
const dirItems = fs.readdirSync(targetPath).filter(file => file.match(/\.js/)).map(file => file.split('.')[ 0 ]);
const sourcePrefix = path.resolve(__dirname, '../', 'src');

// remove the source directory
fs.emptyDirSync(sourcePrefix);

dirItems.forEach(component => {
  // create a local folder
  const componentDir = `${sourcePrefix}/${component}`;

  switch (component) {
    case 'index':
    // we need to generate this one ourselves at the end!
    // noop
    default:
      fs.ensureDirSync(componentDir);
      const wrapperTemplate = `
import {${component}} from '${libraryTarget}';
export default ${component};
      `;
      fs.writeFileSync(`${componentDir}/${component}.js`, wrapperTemplate);
  }

  // generate the index file
  const indexTemplate = dirItems.reduce((tpl, file) => {
    tpl += `export * from './${file}/${file}'\n`;
    return tpl;
  }, '');
  const indexPath = `${sourcePrefix}/index.js`;
  fs.ensureFileSync(indexPath);
  fs.writeFileSync(indexPath, indexTemplate);

  // write wrapper component
  const wrapperPath = `${sourcePrefix}/UXPinWrapper/UXPinWrapper.js`;
  const wrapperTemplate = `
import React from 'react';

export default function UXPinWrapper({ children }) {
  return children;
}
  `;
  fs.ensureFileSync(wrapperPath);
  fs.writeFileSync(wrapperPath, wrapperTemplate);

});
