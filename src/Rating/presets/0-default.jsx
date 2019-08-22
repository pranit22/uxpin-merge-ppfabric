import * as React from 'react';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { getTheme, createTheme } from 'office-ui-fabric-react/lib/Styling';
export class RatingBasicExample extends React.Component {
    constructor(props) {
        super(props);
        this._onFocus = () => {
            console.log('onFocus called');
        };
        this._onBlur = () => {
            console.log('onBlur called');
        };
        this._onLargeStarChange = (ev, rating) => {
            this.setState({ largeStarRating: rating });
        };
        this._onSmallStarChange = (ev, rating) => {
            this.setState({ smallStarRating: rating });
        };
        this._onTenStarChange = (ev, rating) => {
            this.setState({ tenStarRating: rating });
        };
        this._onThemedStarChange = (ev, rating) => {
            this.setState({ themedStarRating: rating });
        };
        this._onCustomIconStarChange = (ev, rating) => {
            this.setState({ customIconStarRating: rating });
        };
        this.state = {
            largeStarRating: undefined,
            smallStarRating: 3,
            tenStarRating: undefined,
            themedStarRating: undefined,
            customIconStarRating: 2.5
        };
        this._customTheme = createTheme(getTheme());
        this._customTheme.semanticColors.bodySubtext = '#DFDFDF';
        this._customTheme.semanticColors.bodyTextChecked = '#1E9FE8';
    }
    render() {
        return (<div className="ms-RatingBasicExample">
        Large Stars:
        <Rating min={1} max={5} size={RatingSize.Large} rating={this.state.largeStarRating} getAriaLabel={this._getRatingComponentAriaLabel} onChange={this._onLargeStarChange} onFocus={this._onFocus} onBlur={this._onBlur} ariaLabelFormat={'{0} of {1} stars selected'}/>
        Small Stars
        <Rating min={1} max={5} rating={this.state.smallStarRating} onChange={this._onSmallStarChange} getAriaLabel={this._getRatingComponentAriaLabel} onFocus={this._onFocus} onBlur={this._onBlur} ariaLabelFormat={'{0} of {1} stars selected'}/>
        10 Small Stars
        <Rating min={1} max={10} rating={this.state.tenStarRating} onChange={this._onTenStarChange} getAriaLabel={this._getRatingComponentAriaLabel} onFocus={this._onFocus} onBlur={this._onBlur} ariaLabelFormat={'{0} of {1} stars selected'}/>
        Disabled:
        <Rating min={1} max={5} rating={this.state.rating} disabled={true} onFocus={this._onFocus} onBlur={this._onBlur} ariaLabelFormat={'{0} of {1} stars selected'}/>
        Half star in readOnly mode:
        <Rating min={1} max={5} rating={2.5} getAriaLabel={this._getRatingComponentAriaLabel} readOnly={true} ariaLabelFormat={'{0} of {1} stars selected'}/>
        Custom icons:
        <Rating min={1} max={5} rating={this.state.customIconStarRating} onChange={this._onCustomIconStarChange} onFocus={this._onFocus} onBlur={this._onBlur} getAriaLabel={this._getRatingComponentAriaLabel} ariaLabelFormat={'{0} of {1} stars selected'} icon="StarburstSolid" unselectedIcon="Starburst"/>
        Themed star
        <Rating min={1} max={5} rating={this.state.themedStarRating} onChange={this._onThemedStarChange} getAriaLabel={this._getRatingComponentAriaLabel} onFocus={this._onFocus} onBlur={this._onBlur} ariaLabelFormat={'{0} of {1} stars selected'} theme={this._customTheme}/>
      </div>);
    }
    _getRatingComponentAriaLabel(rating, maxRating) {
        return `Rating value is ${rating} of ${maxRating}`;
    }
}

export default RatingBasicExample;
