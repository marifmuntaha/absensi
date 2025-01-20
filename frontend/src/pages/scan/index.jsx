import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import {Link} from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {Block, RToast} from "../../components";
import "moment/locale/id"
import Footer from "../auth/Footer";
import {show as showSchool} from "../../utils/api/school";
import SchoolScan from "./partials/SchoolScan";
import TeacherScan from "./partials/TeacherScan";

const Scan = () => {
    const [school, setSchool] = useState({});
    useEffect(() => {
        showSchool({id: 1}).then(resp => {
            setSchool(resp.data.result);
        }).catch(err => RToast(err, 'error'));
    }, []);


    return (
        <React.Fragment>
            <Head title="Scan Kehadiran Guru" />
            <Block className="nk-block-middle nk-auth-body  wide-md">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                    </Link>
                </div>
                {school?.type === '1' ? (
                    <SchoolScan />
                ) : <TeacherScan/>}
            </Block>
            <Footer />
        </React.Fragment>
    )
}

export default Scan;