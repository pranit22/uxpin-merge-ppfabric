/**
 * This file contains a few useful helper utilities. 
 * Feel free to utilize them if they prove useful, or to contribute updates.
 * USE AT YOUR OWN RISK!!
 * Anthony Hand, TPX UX team
 */



/**
 * TPX UX Date & Time Utilities
 * Added by: Anthony Hand
 */
export const TpxUxDateTimeUtils = {

    months: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],

    monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],

    days: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],

    daysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    timeAM: "AM",
    timePM: "PM",

    /**
     * Parse an English month name to return an index from 1-12. 
     * Returns undefined if the entered value can't be parsed. 
     * @param {string} month An English month name in either long or short form, such as 'January' or 'Sep'.
     * @returns {number} Returns the 1-based index of the month. If the entered string is invalid, return undefined. 
     * Added by: Anthony Hand
     */
    getMonthIndexFromName : function(month) {

      //Some error handling...
      //If we have an empty date string, return undefined as an error code. 
      if (!month || month.length < 1)
        return undefined;

      let m = month.toLowerCase();

      if (m.includes("jan"))
        return 1;

      if (m.includes("feb"))
        return 2;

      if (m.includes("mar"))
        return 3;

      if (m.includes("apr"))
        return 4;

      if (m.includes("may"))
        return 5;

      if (m.includes("jun"))
        return 6;

      if (m.includes("jul"))
        return 7;

      if (m.includes("aug"))
        return 8;

      if (m.includes("sep"))
        return 9;

      if (m.includes("oct"))
        return 10;

      if (m.includes("nov"))
        return 11;
      
      if (m.includes("dec"))
        return 12;

      //If we got here, then it means we couldn't parse the month name. Return undefined as an error code. 
      return undefined;
    },


    /**
     * Tests a string to see if it can be converted into a valid Date object. 
     * Can include a true Date value, such as new Date(); or a U.S.-style date, such as 'Feb 8, 2020' or '2/8/2020'.
     * Returns true if it can be converted into a valid Date object, or false otherwise.  
     * @param {string} dateStr A string representation of a date. 
     * @example A representation of a valid Date object, such as 'new Date()'. 
     * @example 'Feb 8, 2020' where the date is February 8, 2020.
     * @example '2/8/2020' where the date is February 8, 2020.
     * @returns {boolean} True if the string entered can make a valid Date, false otherwise. 
     * Added by: Anthony Hand
     */
    isValidDate : function(dateStr) {

      //Some error handling...
      //If we have an empty date string, return false. 
      if (!dateStr)
        return false;

      //Let's test it to make sure some unsupported string wasn't entered.
      var timestamp = Date.parse(dateStr);
      if (isNaN(timestamp) == false) {
        //Sweet. We have a viable date string, so let's return true.
        return true;
      }

      //If we got here, there was some other error.
      return false;
    },


    /**
     * Parse a string representing one of two U.S.-style date formats, such as 'Feb 8, 2020' or '2/8/2020'.
     * If valid, returns a Date object representation for system use, not for display to end users.
     * Returns an 'undefined' value if the entered value can't be parsed. 
     * @param {string} dateStr A string representation of a U.S.-style date, such as 'Feb 8, 2020' or '2/8/2020'.
     * @example 'Feb 8, 2020' where the date is February 8, 2020.
     * @example '2/8/2020' where the date is February 8, 2020.
     * @returns {Date} Returns a Date value, if one can be created. Returns undefined if not.  
     */
    parseDate : function(dateStr) {

      if (this.isValidDate(dateStr)) {
        //Sweet. We have a viable string, so let's return a real date.
        return new Date(dateStr);
      }

      //If we got here, there was some other error.
      return undefined;
    },


    /**
     * With a valid JavaScript Date representation, returns a nicely formatted U.S.-style date. 
     * Returns an 'undefined' value if the entered value can't be parsed. 
     * NOTE: Optimized for TPX UX standards.
     * @param {string} dateStr A string representation of a valid date.
     * @returns {string} Returns a nicely formatted U.S.-style date, such as: 'Feb 8, 2020'. 
     */
    getFormattedDate : function(dateStr) {
      
      if (!this.isValidDate(dateStr)) {
        return undefined;
      }

      //OK, now let's parse out the parts. 
      let dt = new Date(dateStr);
      let year = dt.getFullYear();
      let date = dt.getDate();
      let monthIndex = dt.getMonth(); //0-based month index

      //Assemble a date string like this: 'Feb 8, 2020'
      let month = this.monthsShort[monthIndex];
      return month + " " + date + ", " + year; 
    },

    /** 
     * A convenience method for getting a nicely formatted U.S.-style date with time. 
     * Time is in the U.S.-standard 12 hour time, no seconds, and with AM/PM. 
     * For example, 'Feb 8, 2020, 6:45 AM'.  
     * Returns an 'undefined' value if the entered value can't be parsed.
     * NOTE: Optimized for TPX UX standards. 
     * @param {string} dateStr A string representation of a valid date.
     * @returns {string} Returns a nicely formatted U.S.-style date and time, such as: 'Feb 8, 2020, 6:45 AM'.
     */
    getFormattedDateTime : function(dateStr) {

      let dt = this.getFormattedDate(dateStr);
      let time = this.getFormattedTime(dateStr);

      if (dt && time) {
        return dt + ", " + time;
      }

      //If we got this far, there's an issue.
      return undefined;
    },

    /**
     * With a valid JavaScript Date representation, returns a nicely formatted U.S.-style time. 
     * Time is in the U.S.-standard 12 hour time, no seconds, and with AM/PM. 
     * For example, '6:45 AM'.  
     * Returns an 'undefined' value if the entered value can't be parsed.
     * NOTE: Optimized for TPX UX standards. 
     * @param {string} dateStr A string representation of a valid date.
     * @returns {string} Returns a nicely formatted U.S.-style time, such as: '6:45 AM' or '3:42 PM'.
     */
    getFormattedTime : function(dateStr) {
      return this.getFormattedTimeAdvanced(dateStr, true, false);
    },

    /**
     * With a valid JavaScript Date representation, returns a nicely formatted U.S.-style time. 
     * For example, '6:45 AM' or '15:07:22".  
     * Returns an 'undefined' value if the entered value can't be parsed. 
     * @param {string} dateStr A string representation of a valid date.
     * @param {boolean} in12HrFormat True for the 12 hr format, false for the 24 hr format. AM/PM is appended to the 12 hour format.
     * @param {boolean} withSeconds True to include seconds. 
     * @returns {string} Returns a nicely formatted U.S.-style time, such as: '6:45 AM' or '15:07:22".
     */
    getFormattedTimeAdvanced(dateStr, in12HrFormat, withSeconds) {

      if (!this.isValidDate(dateStr)) {
        return undefined; 
      }

      //OK, now let's parse out the parts. 
      let dt = new Date(dateStr);
      let hour = dt.getHours(); //24 hour clock
      let min = dt.getMinutes();

      var hourAdjusted = hour;
      var minAdjusted = min;

      if (in12HrFormat) {
        hourAdjusted = ((hour > 12) ? hour - 12 : hour);
      }

      //Minutes don't have leading 0's. 
      if (min < 10) 
        minAdjusted = "0" + min.toString();
      
      //Assemble the base adjusted for 12 or 24 hour
      var time = hourAdjusted + ":" + minAdjusted;

      //Add seconds?
      if (withSeconds) {
        var seconds = dt.getSeconds();

        //Seconds don't have leading 0's. 
        if (seconds < 10) 
          seconds = "0" + seconds.toString();

        time = time + ":" + seconds;
      }

      //Add AM or PM?
      if (in12HrFormat) {
        var suffix = this.timeAM;

        if (hour > 11) 
          suffix = this.timePM;

        time = time + " " + suffix;
      }

      return time;
    },
 
}

