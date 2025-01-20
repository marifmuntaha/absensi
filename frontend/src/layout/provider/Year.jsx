import React, {createContext, useContext, useEffect, useState} from "react";
import {get as getYears} from "../../utils/api/year"
import {RToast} from "../../components";

const YearContext = createContext();

export function useYear() {
    return useContext(YearContext);
}

const YearProvider = ({...props}) => {
    const [years, setYears] = useState([]);

    useEffect(() => {
        getYears({active: true}).then(resp => {
            setYears(resp.data.result);
        }).catch(err => RToast(err, 'error'));
    }, [])

    return (
        <YearContext.Provider value={years}>
            {props.children}
        </YearContext.Provider>
    )
}

export default YearProvider;