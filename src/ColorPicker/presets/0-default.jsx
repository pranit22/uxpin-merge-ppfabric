import * as React from 'react';
import { ColorPicker, Toggle, getColorFromString } from 'office-ui-fabric-react/lib/index';
import { mergeStyleSets, HighContrastSelector } from 'office-ui-fabric-react/lib/Styling';
import { updateA } from 'office-ui-fabric-react/lib/utilities/color/updateA';
const classNames = mergeStyleSets({
    wrapper: {
        display: 'flex'
    },
    column2: {
        marginLeft: 10
    },
    colorSquare: {
        width: 100,
        height: 100,
        margin: '16px 0',
        border: '1px solid #c8c6c4',
        selectors: {
            [HighContrastSelector]: {
                MsHighContrastAdjust: 'none'
            }
        }
    }
});
export class ColorPickerBasicExample extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            color: getColorFromString('#ffffff'),
            alphaSliderHidden: false
        };
        this._updateColor = (ev, colorObj) => {
            this.setState({ color: colorObj });
        };
        this._onHideAlphaClick = (ev, checked) => {
            let color = this.state.color;
            if (checked) {
                // If hiding the alpha slider, remove transparency from the color
                color = updateA(this.state.color, 100);
            }
            this.setState({ alphaSliderHidden: !!checked, color });
        };
    }
    render() {
        const { color, alphaSliderHidden } = this.state;
        return (<div className={classNames.wrapper}>
        <ColorPicker color={color} onChange={this._updateColor} alphaSliderHidden={alphaSliderHidden}/>

        <div className={classNames.column2}>
          <div className={classNames.colorSquare} style={{
            backgroundColor: color.str
        }}/>
          <Toggle label="Hide alpha slider" onChange={this._onHideAlphaClick} checked={alphaSliderHidden}/>
        </div>
      </div>);
    }
}

export default ColorPickerBasicExample;
