import React, {Suspense} from "react";
import Head from "./head";
import {ToastContainer} from "react-toastify";

const Layout = ({title, ...props}) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title={!title && 'Loading'} />
            <div className="nk-app-root">
                <div className="nk-wrap nk-wrap-nosidebar">
                    <div className="nk-content">
                        {props.children}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Suspense>
    );
};
export default Layout;
