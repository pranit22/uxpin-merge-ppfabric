import * as React from 'react';
import PPLayout from '../PPLayout';
import PPVerticalStack from '../../PPVerticalStack/PPVerticalStack';
import PPHorizontalStack from '../../PPHorizontalStack/PPHorizontalStack';
import PPHeader from '../../PPHeader/PPHeader';
import Nav from '../../Nav/Nav';
import PPPageHeader from '../../PPPageHeader/PPPageHeader';
import PPPageFooter from '../../PPPageFooter/PPPageFooter';

export default (
    <PPLayout uxpId="pplayout1">
        <PPVerticalStack
            uxpId='stck1'
            gutterPadding={0}
            showInstructions={false}
            stackHeight='100%'
            spanChild={true}
            childSpannerIndex={2}
        >
            <PPHeader uxpId='pphdr1' />
            <PPHorizontalStack
                uxpId='stck2'
                gutterPadding={0}
                widths={`auto\nauto`}
                showInstructions={false}
                stackHeight='100%'
            >
                <Nav
                    uxpId='nav1'
                    styledBackground={true}
                />
                <PPVerticalStack
                    uxpId='stck3'
                    showInstructions={false}
                    stackHeight='100%'
                    spanChild={true}
                    childSpannerIndex={2}
                >
                    <PPPageHeader uxpId='pghdr1' />
                    <PPVerticalStack
                        uxpId='stck4'
                        internalPadding={24}
                    ></PPVerticalStack>
                    <PPPageFooter uxpId='pgftr1' />
                </PPVerticalStack>
            </PPHorizontalStack>
        </PPVerticalStack>
    </PPLayout>
);
