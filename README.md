# UXPin Integration

This project contains components that provide an interface for UXPin <--> MS Fabric utilizing [UXPin Merge](https://www.uxpin.com/docs/merge/what-is-uxpin-merge) tools.

## Adding new components

The current manifest of components is both documented and maintained in [uxpin-config.js](https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/blob/master/uxpin.config.js). 

To add a new component:

1. Utilizing the stub and examples from other components, create an interface to the underlying Fabric or custom component by importing it
into `{component}/{component.jsx}.
1. Implement a representative example of your component in `{component}/preset/0-default.jsx` and export it as an element, ie: 
```jsx
export default (<Foo />);
```
1. Add your component to [uxpin-config.js] in the appropriate category.
1. Run the debug task to regenerate a component manifest `npm run debug`
1. You can view your component locally via the kitchen sink app by running `npm run kitchensink`.

More detailed instructions forthcoming.
