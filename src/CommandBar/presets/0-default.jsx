import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
export class CommandBarBasicExample extends React.Component {
    constructor() {
        super(...arguments);
        // Data for CommandBar
        this.getItems = () => {
            return [
                {
                    key: 'newItem',
                    name: 'New',
                    cacheKey: 'myCacheKey',
                    iconProps: {
                        iconName: 'Add'
                    },
                    ariaLabel: 'New',
                    subMenuProps: {
                        items: [
                            {
                                key: 'emailMessage',
                                name: 'Email message',
                                iconProps: {
                                    iconName: 'Mail'
                                },
                                ['data-automation-id']: 'newEmailButton'
                            },
                            {
                                key: 'calendarEvent',
                                name: 'Calendar event',
                                iconProps: {
                                    iconName: 'Calendar'
                                }
                            }
                        ]
                    }
                },
                {
                    key: 'upload',
                    name: 'Upload',
                    iconProps: {
                        iconName: 'Upload'
                    },
                    href: 'https://dev.office.com/fabric',
                    ['data-automation-id']: 'uploadButton'
                },
                {
                    key: 'share',
                    name: 'Share',
                    iconProps: {
                        iconName: 'Share'
                    },
                    onClick: () => console.log('Share')
                },
                {
                    key: 'download',
                    name: 'Download',
                    iconProps: {
                        iconName: 'Download'
                    },
                    onClick: () => console.log('Download')
                }
            ];
        };
        this.getOverlflowItems = () => {
            return [
                {
                    key: 'move',
                    name: 'Move to...',
                    onClick: () => console.log('Move to'),
                    iconProps: {
                        iconName: 'MoveToFolder'
                    }
                },
                {
                    key: 'copy',
                    name: 'Copy to...',
                    onClick: () => console.log('Copy to'),
                    iconProps: {
                        iconName: 'Copy'
                    }
                },
                {
                    key: 'rename',
                    name: 'Rename...',
                    onClick: () => console.log('Rename'),
                    iconProps: {
                        iconName: 'Edit'
                    }
                }
            ];
        };
        this.getFarItems = () => {
            return [
                {
                    key: 'sort',
                    name: 'Sort',
                    ariaLabel: 'Sort',
                    iconProps: {
                        iconName: 'SortLines'
                    },
                    onClick: () => console.log('Sort')
                },
                {
                    key: 'tile',
                    name: 'Grid view',
                    ariaLabel: 'Grid view',
                    iconProps: {
                        iconName: 'Tiles'
                    },
                    iconOnly: true,
                    onClick: () => console.log('Tiles')
                },
                {
                    key: 'info',
                    name: 'Info',
                    ariaLabel: 'Info',
                    iconProps: {
                        iconName: 'Info'
                    },
                    iconOnly: true,
                    onClick: () => console.log('Info')
                }
            ];
        };
    }
    render() {
        return (<div>
        <CommandBar items={this.getItems()} overflowItems={this.getOverlflowItems()} overflowButtonProps={{ ariaLabel: 'More commands' }} farItems={this.getFarItems()} ariaLabel={'Use left and right arrow keys to navigate between commands'}/>
      </div>);
    }
}

export default CommandBarBasicExample;
