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
          'src/Button/Button.jsx',          
          'src/Checkbox/Checkbox.jsx',
          'src/ChoiceGroup/ChoiceGroup.jsx',
          'src/ComboBox/ComboBox.jsx',
          'src/CommandButton/CommandButton.jsx',
          'src/CompoundButton/CompoundButton.jsx',
          'src/Dropdown/Dropdown.jsx',
          'src/IconButton/IconButton.jsx', 
          'src/Rating/Rating.jsx',
          'src/SearchBox/SearchBox.jsx',
          'src/Slider/Slider.jsx',
          'src/SpinButton/SpinButton.jsx',
          'src/SplitButton/SplitButton.jsx',
          'src/TextField/TextField.jsx',
          'src/Toggle/Toggle.jsx',

        ]
      },
      {
        name: 'Galleries & Pickers',
        include: [
          'src/Calendar/Calendar.jsx',
          'src/CalendarButton/CalendarButton.jsx',
          'src/DatePicker/DatePicker.jsx',
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
          'src/Nav/Nav.jsx',
          'src/Pivot/Pivot.jsx',
        ]
      },
      {
        name: 'Notification & Engagement',
        include: [
          'src/Coachmark/Coachmark.jsx',
          'src/MessageBar/MessageBar.jsx',
          'src/TeachingBubble/TeachingBubble.jsx',
        ]
      },
      {
        name: 'Progress',
        include: [
          'src/ProgressIndicator/ProgressIndicator.jsx',
          'src/Spinner/Spinner.jsx',
        ]
      },
      {
        name: 'Surfaces',
        include: [
          'src/Dialog/Dialog.jsx',
          'src/Tooltip/Tooltip.jsx',
        ]
      },
      {
        name: 'Utilities',
        include: [
          'src/Text/Text.jsx',
          'src/Icon/Icon.jsx',
        ]
      },
    ]
  },
  name: 'MS Fabric UXPin Merge'
};
