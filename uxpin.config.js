module.exports = {
  components: {
    categories: [
      {
        name: 'PayPal',
        include: [
          'src/PPHeader/PPHeader.jsx',
        ]
      },
      {
        name: 'Basic Input',
        include: [
          'src/ActionButton/ActionButton.jsx',
          'src/Checkbox/Checkbox.jsx',
          'src/ChoiceGroup/ChoiceGroup.jsx',
          'src/ComboBox/ComboBox.jsx',
          'src/Dropdown/Dropdown.jsx',
          'src/Button/Button.jsx',
          'src/TextField/TextField.jsx',
          'src/Toggle/Toggle.jsx',
        ]
      },
      {
        name: 'Items & Lists',
        include: [
          'src/ActivityItem/ActivityItem.jsx',
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
        name: 'Notification & Engagement',
        include: [
          'src/Coachmark/Coachmark.jsx',
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
