import { PPHeader as FPPHeader } from "@paypalcorp/console.pp-fabric";
import * as PropTypes from 'prop-types';
import * as React from 'react';

const PPHeader = (props) => {
  return (
    <div style={{minWidth: '640px', width: props.width}}>
      <FPPHeader {...props} />
    </div>
  )
};

PPHeader.propTypes = {
  width: PropTypes.number,

  title: PropTypes.string.isRequired,
  /** @uxpinpropname TitleMenu */
  hasExtensionMenu: PropTypes.bool,
  /** @uxpinpropname TitleClick */
  titleCallback: PropTypes.func,

  /**
   *  @uxpindescription userInfo detail object
   *  @uxpinpropname UserInfo */
  userInfo: PropTypes.shape({
    'sub': PropTypes.string.isRequired,
    'Department': PropTypes.default.string.isRequired,
    'Email': PropTypes.string.isRequired,
    'DisplayName': PropTypes.string.isRequired,
    'Country': PropTypes.string.isRequired,
    'Desk': PropTypes.string.isRequired,
    'GivenName': PropTypes.string.isRequired,
    'Title': PropTypes.string.isRequired,
    'Location': PropTypes.string.isRequired
  }).isRequired,

  // Search

  /** @uxpinpropname Search */
  hasSearch: PropTypes.bool,
  /** @uxpinpropname SearchClick */
  searchCallback: PropTypes.func,

  // Notifications

  /** @uxpinpropname NotifButton */
  hasNotificationButton: PropTypes.bool,
  /** @uxpinpropname NotifBadge */
  hasNotification: PropTypes.bool,
  /** @uxpinpropname NotificationClick */
  notificationCallback: PropTypes.func,

  // Info

  /** @uxpinpropname Info */
  hasHelpButton: PropTypes.bool,
  /** @uxpinpropname InfoClick */
  helpCallback: PropTypes.func,

  // Feedback

  /** @uxpinpropname Feedback */
  hasFeedbackButton: PropTypes.bool,
  /** @uxpinpropname FeedbackClick */
  feedbackCallback: PropTypes.func,

  // Persona

  /** @uxpinpropname Persona */
  hasPersonaButton: PropTypes.bool,
  /** @uxpinpropname PersonaClick */
  personaCallback: PropTypes.func,

  // Context Bar

  /** @uxpinpropname ContextBar */
  hasContextBar: PropTypes.bool,
  /** @uxpinpropname Context
   *  @uxpindescription type:id collection for context breadcrumb
   * */
  extensionContext: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })),
  /** @uxpinpropname ContextName */
  extensionName: PropTypes.string,
  /** @uxpinpropname ContextHomeClick */
  homeCallback: PropTypes.func,
  /** @uxpinpropname ContextHelpClick */
  extensionDocCallback: PropTypes.func,

};

PPHeader.defaultProps = {
  title: 'Console',

  userInfo: {
    sub: 'guest',
    Department: 'foo',
    Email: 'guest@paypal.com',
    DisplayName: 'User, Guest',
    Country: 'US',
    Desk: '10.2.350',
    GivenName: 'Guest',
    Title: 'Grand Poobah',
    Location: 'San Jose - North'
  },
  hasContextBar: true,
  hasHelpButton: true,
  hasNotification: false,
  hasNotificationButton: true,
  hasFeedbackButton: true,
  hasPersonaButton: true,
  hasExtensionMenu: true,
  hasSearch: true,
  extensionName: 'Foo',
  extensionContext: [],
  width: 1440
};

export { PPHeader as default };
