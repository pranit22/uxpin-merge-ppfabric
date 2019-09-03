module.exports = {
  components: {
    categories: [
      {
        name: 'Basic Input',
        include: [
          'src/ActionButton/ActionButton.jsx',
          'src/PrimaryButton/PrimaryButton.jsx',
          'src/Checkbox/Checkbox.jsx',
          'src/ChoiceGroup/ChoiceGroup.jsx',
          'src/Dropdown/Dropdown.jsx',
          'src/TextField/TextField.jsx',
          'src/Toggle/Toggle.jsx',
        ]
      },
      {
        name: 'Commands, Menus & Navs',
        include: [
          'src/Breadcrumb/Breadcrumb.jsx',
          'src/Pivot/Pivot.jsx'
        ]
      },
    ]
  },
  name: 'MS Fabric UXPin Merge'
};
