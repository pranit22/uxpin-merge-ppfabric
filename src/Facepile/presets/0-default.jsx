import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Facepile } from 'office-ui-fabric-react/lib/Facepile';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';
export class FacepileBasicExample extends React.Component {
    constructor(props) {
        super(props);
        this._onChangeFadeIn = (ev, checked) => {
            this.setState((prevState) => {
                prevState.imagesFadeIn = checked;
                return prevState;
            });
        };
        this._onChangePersonaNumber = (value) => {
            this.setState((prevState) => {
                prevState.numberOfFaces = value;
                return prevState;
            });
        };
        this._onChangePersonaSize = (event, value) => {
            this.setState((prevState) => {
                prevState.personaSize = value.key;
                return prevState;
            });
        };
        this.state = {
            numberOfFaces: 3,
            imagesFadeIn: true,
            personaSize: PersonaSize.size32
        };
    }
    render() {
        const { numberOfFaces, personaSize } = this.state;
        const facepileProps = {
            personaSize: personaSize,
            personas: facepilePersonas.slice(0, numberOfFaces),
            overflowPersonas: facepilePersonas.slice(numberOfFaces),
            getPersonaProps: (persona) => {
                return {
                    imageShouldFadeIn: this.state.imagesFadeIn
                };
            },
            ariaDescription: 'To move through the items use left and right arrow keys.'
        };
        return (<div className="ms-FacepileExample">
        <Facepile {...facepileProps}/>
        <div className="control">
          <Slider label="Number of Personas:" min={1} max={5} step={1} showValue={true} value={numberOfFaces} onChange={this._onChangePersonaNumber}/>
          <Dropdown label="Persona Size:" selectedKey={this.state.personaSize} options={[
            { key: PersonaSize.size16, text: PersonaSize[PersonaSize.size16] },
            { key: PersonaSize.size24, text: PersonaSize[PersonaSize.size24] },
            { key: PersonaSize.size28, text: PersonaSize[PersonaSize.size28] },
            { key: PersonaSize.size32, text: PersonaSize[PersonaSize.size32] },
            { key: PersonaSize.size40, text: PersonaSize[PersonaSize.size40] }
        ]} onChange={this._onChangePersonaSize}/>
          <Checkbox styles={{ root: { margin: '10px 0' } }} label="Fade In" checked={this.state.imagesFadeIn} onChange={this._onChangeFadeIn}/>
        </div>
      </div>);
    }
}

export default FacepileBasicExample;
