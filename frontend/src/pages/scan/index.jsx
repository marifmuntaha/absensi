import React, {Suspense, useEffect, useState} from "react";
import Head from "../../layout/head";
import {Link} from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {Block, RToast} from "../../components";
import "moment/locale/id"
import Footer from "../auth/Footer";
import {show as showSchool} from "../../utils/api/school";
import OperatorScan from "./partials/OperatorScan";
import OperatorQR from "./partials/OperatorQR";
import {APICore} from "../../utils/api/APICore";
import TeacherQR from "./partials/TeacherQR";
import TeacherScan from "./partials/TeacherScan";
import TeacherButton from "./partials/TeacherButton";

const Scan = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const [school, setSchool] = useState({});
    useEffect(() => {
        showSchool({id: 1}).then(resp => {
            setSchool(resp.data.result);
        }).catch(err => RToast(err, 'error'));
    }, []);


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Scan Kehadiran Guru" />
            <Block className="nk-block-middle nk-auth-body  wide-md">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                    </Link>
                </div>
                {user.role === '1' && school.type === '1' && <OperatorScan />}
                {user.role === '1' && school.type === '2' && <OperatorQR />}
                {user.role === '3' && school.type === '1' && <TeacherQR />}
                {user.role === '3' && school.type === '2' && <TeacherScan />}
                {user.role === '3' && school.type === '3' && <TeacherButton />}
            </Block>
            <Footer />
        </Suspense>
    )
}

export default Scan;