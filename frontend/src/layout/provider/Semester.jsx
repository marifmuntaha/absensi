import React, {createContext, useContext, useEffect, useState} from "react";
import {get as getSemesters} from "../../utils/api/semester"
import {RToast} from "../../components";

const SemesterContext = createContext();

export function useSemester() {
    return useContext(SemesterContext);
}

const SemesterProvider = ({...props}) => {
    const [semester, setSemester] = useState([]);

    useEffect(() => {
        getSemesters({active: true}).then(resp => {
            setSemester(resp.data.result);
        }).catch(err => RToast(err, 'error'));
    }, []);

    return (
        <SemesterContext.Provider value={[semester, setSemester]}>
            {props.children}
        </SemesterContext.Provider>
    )
}

export default SemesterProvider;