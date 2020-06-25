import * as React from 'react';
import PPPageTemplate from '../PPPageTemplate';
import PPPageContainer from '../../PPPageContainer/PPPageContainer';
import Nav from '../../Nav/Nav';
import PPPage from '../../PPPage/PPPage';
import PPPageBody from '../../PPPageBody/PPPageBody';
import PPPageHeader from '../../PPPageHeader/PPPageHeader';
import PPPageFooter from '../../PPPageFooter/PPPageFooter';
import PPHeader from '../../PPHeader/PPHeader';

export default (
    <PPPageTemplate uxpId="pppagetemplate1">
        <PPHeader uxpId='pphdr1' />
        <PPPageContainer uxpId="pppagecontainer1">
            <Nav
                uxpId='nav1'
                styledBackground={true}
                controlWidth={232}
                controlHeight={700}
            />
            <PPPage uxpId="pppage1">
                <PPPageHeader uxpId='ppheader1' />
                <PPPageBody uxpId='pppagebody1' />
                <PPPageFooter uxpId='pgftr1' />
            </PPPage>
        </PPPageContainer>
    </PPPageTemplate>
);
