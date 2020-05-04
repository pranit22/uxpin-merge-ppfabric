/**
 * This file contains a few useful helper utilities. 
 * Feel free to utilize them if they prove useful, or to contribute updates.
 * USE AT YOUR OWN RISK!!
 * Anthony Hand, TPX UX team
 */



/**
 * TPX UX Spacers
 * Use these standardized values for padding and margins within and between objects. 
 * For example, use 'small' for the vertical padding between two items in the same group, 
 *      and 'medium' padding between two different groups. 
 * As another example, internal padding within a dialog would be 'small' (12px) all around the edges.
 * These values are numbers formatted with 'px'. 
 */
export const TpxUxSpacers = {
    tiny : "4px",
    xSmall : "8px",
    small : "12px",
    medium : "24px",
    large : "36px",
    xLarge : "48px",
    mega : "72px",
};


/**
 * TPX UX GUID Utilities
 * Added by: Anthony Hand
 */
export const TpxUxGuidUtils = {

    /**
     * Random GUID Generator
     * This is NOT cryptographically secure. 
     * This is intended ONLY for casual, non-secure use cases. 
     * Source: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     * @returns {string} Returns a randomly generated GUID value. 
     */
    generateGuid : function() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    },
};




