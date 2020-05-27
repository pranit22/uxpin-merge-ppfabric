import * as React from 'react';
import {
        Image as FImage,
        ImageFit
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';



/** 
 * UPDATED May 13, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 */


//This is the default URL to use for a generic female user
let personaFemaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png"

const fitCenter = 'center';
const fitCenterCover = 'center cover';
const fitCenterContain = 'center contain';
const fitContain = 'contain';
const fitCover = 'cover';
const fitNone = 'none';



class Image extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
        }
    }

    _getFitCode() {
        let fit = this.props.imageFit;
        let code =  fit === fitCenter ? ImageFit.center  //fitCenterCode
                    : fit === fitCenterContain ? ImageFit.centerContain // fitCenterContainCode
                    : fit === fitCenterCover ? ImageFit.centerCover //fitCenterCoverCode
                    : fit === fitContain ? ImageFit.contain // fitContainCode
                    : fit === fitCover ? ImageFit.cover // fitCoverCode
                    : ImageFit.none; // fitNoneCode;

        return code;
    }


    _onClick() {
        //Raise this event to UXPin.
        if (this.props.onClick) {
            this.props.onClick();
        }
    }


    render() {

        let fit = this._getFitCode();

        let mWidth = this.props.imgWidth > 0 ? this.props.imgWidth : 1;
        let mHeight = this.props.imgHeight > 0 ? this.props.imgHeight : 1;

        let imgProps = {
            shouldFadeIn: true,
            src: this.props.imageUrl,
            imageFit: fit,
            maximizeFrame: true,
            width: mWidth,
            height: mHeight,
        }

        return (

                <FImage
                    {...imgProps}
                    onClick = { () => { this._onClick() } }
                />

        );
    }


}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Image.propTypes = {

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. 
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(6)
    */
   imageUrl: PropTypes.string,

    /**  
    * @uxpindescription How to scale and fit the image within the viewable space 
    * @uxpinpropname Fit
    */ 
   imageFit: PropTypes.oneOf([fitCenter, fitCenterCover, fitContain, fitCenterContain, fitCover, fitNone]),

    /**
    * NOTE: This cannot be called just 'minWidth,' or else there is a namespace collision with regular CSS prop
    * @uxpindescription Minimum image width. Useful when putting an image into a card or stack. 
    * @uxpinpropname Width
    */ 
    imgWidth: PropTypes.number,

    /**
     * NOTE: This cannot be called just 'minHeight,' or else there is a namespace collision with regular CSS prop
     * @uxpindescription Minimum image height. Useful when putting an image into a card or stack. 
     * @uxpinpropname Height
     */ 
    imgHeight: PropTypes.number,

    /**
     * @uxpindescription Fires when the control is clicked on
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
Image.defaultProps = {
    imageUrl: personaFemaleUrl,
    imageFit: fitContain,
    imgWidth: 100,
    imgHeight: 100,
}


export { Image as default };