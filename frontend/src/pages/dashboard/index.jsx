import React from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {BlockBetween, BlockHead, BlockHeadContent, BlockTitle} from "../../components";

const Dashboard = () => {
    return (
        <React.Fragment>
            <Head title="Beranda"/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Dashboard
                            </BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
            </Content>
        </React.Fragment>
    )
}

export default Dashboard;