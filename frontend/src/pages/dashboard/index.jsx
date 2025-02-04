import React from "react";
import Head from "../../layout/head";
import {APICore} from "../../utils/api/APICore";
import Administrator from "./administrator";
import Teacher from "./teacher";

const Dashboard = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const Content = () => {
        switch (user.role) {
            case "1" :
                return <Administrator />;
            case "2" :
                return <Administrator />;
            case "3" :
                return <Teacher />;
            default :
                return <Administrator />;
        }
    }

    return (
        <React.Fragment>
            <Head title="Beranda"/>
            <Content />
        </React.Fragment>
    )
}

export default Dashboard;