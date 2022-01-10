export default `import { system } from "trellisuml";
// Import components & relationships from other diagrams as needed, don't duplicate components in other diagram files!

// Export individual components one at a time or with array destructuring.
// Like:   'export const myService = service('My Service');'
// Or:     'export const [myService, myOtherService] = service([{label: 'My Service'}, {label: 'My Other Service'}]);'

export const componentRelationships = [
  // Add component relationships here
];

export default system({
    name: '{{name}}',
    components: [
      // Add all components defined in this system here.
    ],
    componentRelationships,
});

`;
