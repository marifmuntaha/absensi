import React, {createContext, useContext, useEffect, useState} from "react";
import {get as getYears} from "../../utils/api/year"
import {RToast} from "../../components";

const YearContext = createContext();

export function useYear() {
    return useContext(YearContext);
}

const YearProvider = ({...props}) => {
    const [year, setYear] = useState({});

    useEffect(() => {
        getYears({active: true}).then(resp => {
            setYear(resp.data.result);
        }).catch(err => RToast(err, 'error'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <YearContext.Provider value={[year, setYear]}>
            {props.children}
        </YearContext.Provider>
    )
}

export default YearProvider;