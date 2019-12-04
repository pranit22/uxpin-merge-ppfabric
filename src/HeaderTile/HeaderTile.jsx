import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, Text} from 'office-ui-fabric-react';
import logo from './images/hero-graphic.png';

class HeaderTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            
        <div width="1440px" height="125px" style={{ backgroundImage: `linear-gradient(to right, #00CF92 , #009CDE)`}}>   
            <Stack horizontal verticallyAlign="center" horizontalAlign="space-between">
                <Stack.Item align="start">
                <span>
                    <Stack tokens={{childrenGap:-2}}>

                    <span>
                        <Text style={{ width: 235,height: 48, color:'white', fontFamily: 'PayPalSansBig-Light', fontSize: 60}} > {this.props.label} </Text>         
                    </span>
                    <span>
                        <Text style={{ width: 215,height: 36, color:'white',fontFamily:'PayPalSansBig-Regular', fontSize: 18}}> {this.props.description}    </Text>
                    </span>
                
                    </Stack>  
                </span> 
                </Stack.Item>
                <Stack.Item align="end">  
                <span>
                    <img src={logo} width="481px" height="89px" style={{paddingRight:50 ,backgroundPosition:'center center'}}/>
                </span>   
                </Stack.Item>              
            </Stack>
        </div>
            
            
        )
    }
}
HeaderTile.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string
};

HeaderTile.defaultProps = {
    label: 'Products',
    description: 'Tools to enable innovation'
}
export { HeaderTile as default };
