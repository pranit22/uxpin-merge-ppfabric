import * as React from 'react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { ActionButton, Text, Stack } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import Box from './images/box.svg';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        
        return (
        <Card style={{maxWidth:212, maxHeight:263, borderRadius:4, borderColor:'#EAECED', borderWidth:1}}>
            <Stack verticalAlign="center" tokens={{childrenGap:10}} >
               <Card.Section >      
                    <Box style= {{ alignSelf: 'center',height:60, width:60, margin:10, backgroundSize:'contain' ,backgroundColor:'#640487', borderRadius: 30}}> </Box>
               </Card.Section>
                <Card.Section>
                        <div width="212px" height="24px" style={{alignSelf: 'center'}}>
                            <Text style={{fontFamily:'PayPalSansBig-Regular', fontSize:18}}> kafka </Text>
                        </div>
                </Card.Section>
                <Card.Section>
                    <Text  style={{alignSelf:'center', width: 188, height: 78, fontSize:11,color:'#757575', textAlign:'left',fontFamily:'Arial'}}>
                        Kafka is used for building real-time data pipelines and streaming applications. It is horizontally scalable, fault-tolerant, and runs in production in thousands of companies.
                    </Text>               
                </Card.Section>
                <Card.Section horizontal >
                    
                    <div style={{ marginLeft:10, borderTopStyle: 'dotted', borderTopColor: '#8c8c8c', width:188, height:40, borderTopWidth:1}}> 
                    <Stack horizontal horizontalAlign="space-between" verticalAlign="end"> 
                        <span><ActionButton iconProps={{iconName:"Documentation"}} text="Learn" /></span>
                        <span><ActionButton iconProps={{iconName:"Go"}} text="Use" /></span>
                    </Stack> 
                    </div>            
                </Card.Section> 
            </Stack>    
        </Card>

        )
    }
}

ProductCard.propTypes = {
    productTitle: PropTypes.string,
    productText: PropTypes.string
};

ProductCard.defaultProps = {
    productTitle: 'kafka',
    productText:'Kafka is used for building real-time data pipelines and streaming applications. It is horizontally scalable, fault-tolerant, and runs in production in thousands of companies.'
}

export { ProductCard as default };
