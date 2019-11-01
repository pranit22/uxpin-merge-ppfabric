
// there is an existing issue between jest and office-ui-fabric-react
// https://github.com/OfficeDev/office-ui-fabric-react/issues/9150
module.exports = {
  moduleNameMapper: {
    '^office-ui-fabric-react[/\\\\]lib(.*)': 'office-ui-fabric-react/lib-commonjs$1',
  }
}