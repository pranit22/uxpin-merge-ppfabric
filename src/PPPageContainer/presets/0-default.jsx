import * as React from 'react';
import PPPageContainer from '../PPPageContainer';
import Nav from '../../Nav/Nav';
import PPPage from '../../PPPage/PPPage';
import PPPageHeader from '../../PPPageHeader/PPPageHeader';
import PPPageFooter from '../../PPPageFooter/PPPageFooter';
import PPPageBody from '../../PPPageBody/PPPageBody';

export default (
    <PPPageContainer uxpId="pppagecontainer1">
        <Nav
            uxpId='nav1'
            styledBackground={true}
            controlWidth={232}
            controlHeight={700}
        />
        <PPPage uxpId="pppage1">
            <PPPageHeader uxpId='pppageheader1' />
            <PPPageBody uxpId='pppagebody1' />
            <PPPageFooter uxpId='pppagefooter1' />
        </PPPage>
    </PPPageContainer>
);
