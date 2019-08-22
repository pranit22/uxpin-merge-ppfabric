import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
export class TeachingBubbleBasicExample extends React.Component {
    constructor(props) {
        super(props);
        this._onDismiss = this._onDismiss.bind(this);
        this._onShow = this._onShow.bind(this);
        this.state = {
            isTeachingBubbleVisible: false
        };
    }
    render() {
        const { isTeachingBubbleVisible } = this.state;
        const examplePrimaryButton = {
            children: 'Try it out'
        };
        const exampleSecondaryButtonProps = {
            children: 'Maybe later',
            onClick: this._onDismiss
        };
        return (<div className="ms-TeachingBubbleExample">
        <span className="ms-TeachingBubbleBasicExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton onClick={isTeachingBubbleVisible ? this._onDismiss : this._onShow} text={isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'}/>
        </span>
        {isTeachingBubbleVisible ? (<div>
            <TeachingBubble target={this._menuButtonElement} primaryButtonProps={examplePrimaryButton} secondaryButtonProps={exampleSecondaryButtonProps} onDismiss={this._onDismiss} footerContent="1 of 2" headline="Discover what’s trending around you">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
            </TeachingBubble>
          </div>) : null}
      </div>);
    }
    _onDismiss(ev) {
        this.setState({
            isTeachingBubbleVisible: false
        });
    }
    _onShow(ev) {
        this.setState({
            isTeachingBubbleVisible: true
        });
    }
}

export default TeachingBubbleBasicExample;
