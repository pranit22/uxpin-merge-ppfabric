module.exports = {
  components: {
    categories: [
      {
        name: 'PayPal',
        include: [
          'src/PPLayout/PPLayout.jsx',
          'src/PPPageTemplate/PPPageTemplate.jsx',
          'src/PPPageContainer/PPPageContainer.jsx',
          'src/PPHeader/PPHeader.jsx',
          'src/PPProfileCard/PPProfileCard.jsx',
          'src/PPMetaDataGroup/PPMetaDataGroup.jsx',
          'src/PPMetaDataPair/PPMetaDataPair.jsx',
          'src/PPHorizontalStack/PPHorizontalStack.jsx',
          'src/PPVerticalStack/PPVerticalStack.jsx',
          'src/PPShape/PPShape.jsx',
          'src/PPFavoritesButton/PPFavoritesButton.jsx',
          'src/PPCard/PPCard.jsx',
          'src/PPCardFooter/PPCardFooter.jsx',
          'src/PPCardTextHeader/PPCardTextHeader.jsx',
          'src/PPChart/PPChart.jsx',
          'src/PPPage/PPPage.jsx',
          'src/PPPageBody/PPPageBody.jsx',
          'src/PPPageHeader/PPPageHeader.jsx',
          'src/PPPageFooter/PPPageFooter.jsx',
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
          'src/Link/Link.jsx',
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
          'src/ColorPicker/ColorPicker.jsx',
          'src/DatePicker/DatePicker.jsx',
          'src/PeoplePicker/PeoplePicker.jsx',
          'src/TagPicker/TagPicker.jsx',
        ]
      },
      {
        name: 'Items & Lists',
        include: [
          'src/ActivityItem/ActivityItem.jsx',
          'src/DetailsList/DetailsList.jsx',
          'src/Persona/Persona.jsx',
          'src/PersonaCoin/PersonaCoin.jsx',
          'src/Facepile/Facepile.jsx',
          'src/TagItem/TagItem.jsx',
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
          'src/Panel/Panel.jsx',
        ]
      },
      {
        name: 'Utilities',
        include: [
          'src/Icon/Icon.jsx',
          'src/Separator/Separator.jsx',
          'src/Text/Text.jsx',
          'src/Image/Image.jsx',
        ]
      }
    ]
  },
  name: 'MS Fabric UXPin Merge'
};
