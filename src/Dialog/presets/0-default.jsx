import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { hiddenContentStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
const screenReaderOnly = mergeStyles(hiddenContentStyle);
export class DialogBasicExample extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hideDialog: true,
            isDraggable: false
        };
        // Use getId() to ensure that the IDs are unique on the page.
        // (It's also okay to use plain strings without getId() and manually ensure uniqueness.)
        this._labelId = getId('dialogLabel');
        this._subTextId = getId('subTextLabel');
        this._dragOptions = {
            moveMenuItemText: 'Move',
            closeMenuItemText: 'Close',
            menu: ContextualMenu
        };
        this._showDialog = () => {
            this.setState({ hideDialog: false });
        };
        this._closeDialog = () => {
            this.setState({ hideDialog: true });
        };
        this._toggleDraggable = () => {
            this.setState({ isDraggable: !this.state.isDraggable });
        };
    }
    render() {
        const { hideDialog, isDraggable } = this.state;
        return (<div>
        <Checkbox label="Is draggable" onChange={this._toggleDraggable} checked={isDraggable}/>
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog"/>
        <label id={this._labelId} className={screenReaderOnly}>
          My sample Label
        </label>
        <label id={this._subTextId} className={screenReaderOnly}>
          My Sample description
        </label>

        <Dialog hidden={hideDialog} onDismiss={this._closeDialog} dialogContentProps={{
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
        }} modalProps={{
            titleAriaId: this._labelId,
            subtitleAriaId: this._subTextId,
            isBlocking: false,
            styles: { main: { maxWidth: 450 } },
            dragOptions: isDraggable ? this._dragOptions : undefined
        }}>
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Save"/>
            <DefaultButton onClick={this._closeDialog} text="Cancel"/>
          </DialogFooter>
        </Dialog>
      </div>);
    }
}

export default DialogBasicExample;
