import * as React from 'react';
import { BaseComponent, classNamesFunction, Coachmark, DefaultButton, DirectionalHint, Dropdown, TeachingBubbleContent } from 'office-ui-fabric-react';
export class CoachmarkBasicExample extends BaseComponent {
    constructor(props) {
        super(props);
        this._targetButton = React.createRef();
        this._onDismiss = () => {
            this.setState({
                isCoachmarkVisible: false
            });
        };
        this._onDropdownChange = (event, option) => {
            this.setState({
                coachmarkPosition: option.data,
                dropdownSelectedOptionKey: option.key
            });
        };
        this._onShowMenuClicked = () => {
            this.setState({
                isCoachmarkVisible: !this.state.isCoachmarkVisible
            });
        };
        this.state = {
            isCoachmarkVisible: false,
            coachmarkPosition: DirectionalHint.bottomAutoEdge,
            dropdownSelectedOptionKey: 'H'
        };
    }
    render() {
        const { isCoachmarkVisible, dropdownSelectedOptionKey } = this.state;
        const getClassNames = classNamesFunction();
        const classNames = getClassNames(() => {
            return {
                dropdownContainer: {
                    maxWidth: '400px'
                },
                buttonContainer: {
                    marginTop: '30px',
                    display: 'inline-block'
                }
            };
        }, {});
        const buttonProps = {
            text: 'Try it'
        };
        const buttonProps2 = {
            text: 'Try it again'
        };
        return (<div className={classNames.root}>
        <div className={classNames.dropdownContainer}>
          <Dropdown label="Coachmark position" selectedKey={dropdownSelectedOptionKey} onFocus={this._onDismiss} options={[
            { key: 'A', text: 'Top Left Edge', data: DirectionalHint.topLeftEdge },
            { key: 'B', text: 'Top Center', data: DirectionalHint.topCenter },
            { key: 'C', text: 'Top Right Edge', data: DirectionalHint.topRightEdge },
            { key: 'D', text: 'Top Auto Edge', data: DirectionalHint.topAutoEdge },
            { key: 'E', text: 'Bottom Left Edge', data: DirectionalHint.bottomLeftEdge },
            { key: 'F', text: 'Bottom Center', data: DirectionalHint.bottomCenter },
            { key: 'G', text: 'Bottom Right Edge', data: DirectionalHint.bottomRightEdge },
            { key: 'H', text: 'Bottom Auto Edge', data: DirectionalHint.bottomAutoEdge },
            { key: 'I', text: 'Left Top Edge', data: DirectionalHint.leftTopEdge },
            { key: 'J', text: 'Left Center', data: DirectionalHint.leftCenter },
            { key: 'K', text: 'Left Bottom Edge', data: DirectionalHint.leftBottomEdge },
            { key: 'L', text: 'Right Top Edge', data: DirectionalHint.rightTopEdge },
            { key: 'M', text: 'Right Center', data: DirectionalHint.rightCenter },
            { key: 'N', text: 'Right Bottom Edge', data: DirectionalHint.rightBottomEdge }
        ]} onChange={this._onDropdownChange}/>
        </div>

        <div className={classNames.buttonContainer} ref={this._targetButton}>
          <DefaultButton onClick={this._onShowMenuClicked} text={isCoachmarkVisible ? 'Hide Coachmark' : 'Show Coachmark'}/>
        </div>
        {isCoachmarkVisible && (<Coachmark target={this._targetButton.current} positioningContainerProps={{
            directionalHint: this.state.coachmarkPosition,
            doNotLayer: false
        }} ariaAlertText="A Coachmark has appeared" ariaDescribedBy={'coachmark-desc1'} ariaLabelledBy={'coachmark-label1'} ariaDescribedByText={'Press enter or alt + C to open the Coachmark notification'} ariaLabelledByText={'Coachmark notification'}>
            <TeachingBubbleContent headline="Example Title" hasCloseIcon={true} closeButtonAriaLabel="Close" primaryButtonProps={buttonProps} secondaryButtonProps={buttonProps2} onDismiss={this._onDismiss} ariaDescribedBy={'example-description1'} ariaLabelledBy={'example-label1'}>
              Welcome to the land of Coachmarks!
            </TeachingBubbleContent>
          </Coachmark>)}
      </div>);
    }
}

export default CoachmarkBasicExample;
