module.exports = {
  components: {
    categories: [
      {
        name: 'Basic Input',
        include: [
          'src/ActionButton/ActionButton.jsx',
          'src/Checkbox/Checkbox.jsx',
          'src/ChoiceGroup/ChoiceGroup.jsx',
          'src/ComboBox/ComboBox.jsx',
          'src/Dropdown/Dropdown.jsx',
          'src/PrimaryButton/PrimaryButton.jsx',
          'src/TextField/TextField.jsx',
          'src/Toggle/Toggle.jsx',
        ]
      },
      {
        name: 'Items & Lists',
        include: [
          'src/DetailsList/DetailsList.jsx',
          'src/Persona/Persona.jsx',
          'src/Facepile/Facepile.jsx',
        ]
      },
      {
        name: 'Commands, Menus & Navs',
        include: [
          'src/Breadcrumb/Breadcrumb.jsx',
          'src/Nav/Nav.jsx',
          'src/Pivot/Pivot.jsx',
        ]
      },
      {
        name: 'Experimental',
        include: [
          'src/Card/Card.jsx',
        ]
      },
    ]
  },
  name: 'MS Fabric UXPin Merge'
};
