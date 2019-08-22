import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './IconExample.scss';
export class IconBasicExample extends React.Component {
    render() {
        return (<div>
        <Icon iconName="CompassNW" className="ms-IconExample"/>
        <Icon iconName="Dictionary" className="ms-IconExample"/>
        <Icon iconName="TrainSolid" className="ms-IconExample"/>
      </div>);
    }
}

export default IconBasicExample;
