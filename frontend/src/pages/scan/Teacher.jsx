import React, {Suspense, useEffect, useState} from "react";
import {show as showSchool} from "../../utils/api/school"
import {RToast} from "../../components";
import Head from "../../layout/head";
const ScanTeacher = () => {
    const [school, setSchool] = useState({});
    useEffect(() => {
        showSchool({id: 1}).then((resp) => {

        }).catch((err) => RToast(err, 'error'))
    }, [])
    return (
        <Suspense fallback={null}>
            <Head title="Scan Kehadiran"/>

        </Suspense>
    )
}

export default ScanTeacher;