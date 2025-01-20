import React, {Suspense} from "react";
import Sidebar from "./sidebar";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import {ToastContainer} from "react-toastify";
import YearProvider from "./provider/Year";
import SemesterProvider from "./provider/Semester";

const Layout = ({title, ...props}) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <YearProvider>
                <SemesterProvider>
                    <Head title={!title && 'Loading'}/>
                    <AppRoot>
                        <AppMain>
                            <Sidebar fixed/>
                            <AppWrap>
                                <Header fixed/>
                                {props.children}
                                <Footer/>
                            </AppWrap>
                        </AppMain>
                    </AppRoot>
                    <ToastContainer/>
                </SemesterProvider>
            </YearProvider>
        </Suspense>
    );
};
export default Layout;
