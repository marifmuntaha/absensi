import React, {useEffect, useState} from "react";
import {BarChart, PreviewCard} from "../../../../components";
import {get as getPresent} from "../../../../utils/api/presence";
import moment from "moment";

const YearChart = () => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const [present, setPresent] = useState([]);
    const [permission, setPermission] = useState([])
    const [sick, setSick] = useState([]);
    const [absent, setAbsent] = useState([]);
    const [data, setData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        dataUnit: "Hari",
        datasets: [
            {
                label: "Hadir",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#72f894",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                label: "Ijin",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#698ff6",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                label: "Sakit",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#fbdc6f",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                label: "Tanpa Keterangan",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#fb5555",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });
    useEffect(() => {
        let month = 1;
        while (month < 13) {
            getPresent({teacherId: teacher?.id, month: month, year: moment().format('YYYY').toString()}).then((resp) => {
                setPresent(present => [...present, resp.data.result?.filter((item) => {
                    return item.statusIn === 'H'
                })?.length])
                setPermission(permission => [...permission, resp.data.result?.filter((item) => {
                    return item.statusIn === 'I'
                })?.length])
                setSick(sick => [...sick, resp.data.result?.filter((item) => {
                    return item.statusIn === 'S'
                })?.length])
                setAbsent(absent => [...absent, resp.data.result?.filter((item) => {
                    return item.statusIn === 'A'
                })?.length])
            })
            month++;
        }
    }, []);

    useEffect(() => {
        setData({
            labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
            dataUnit: "Hari",
            datasets: [
                {
                    label: "Hadir",
                    barPercentage: 0.7,
                    categoryPercentage: 0.7,
                    backgroundColor: "#72f894",
                    data: present,
                },
                {
                    label: "Ijin",
                    barPercentage: 0.7,
                    categoryPercentage: 0.7,
                    backgroundColor: "#698ff6",
                    data: permission,
                },
                {
                    label: "Sakit",
                    barPercentage: 0.7,
                    categoryPercentage: 0.7,
                    backgroundColor: "#fbdc6f",
                    data: sick,
                },
                {
                    label: "Tanpa Keterangan",
                    barPercentage: 0.7,
                    categoryPercentage: 0.7,
                    backgroundColor: "#fb5555",
                    data: absent,
                },
            ],
        });
    }, [present, permission, sick, absent]);
    return (
        <PreviewCard>
            <div className="card-head">
                <h6 className="title">Statistik Tahunan</h6>
            </div>
            <div className="nk-ck-sm" style={{height: "265px"}}>
                <BarChart data={data}/>
            </div>
        </PreviewCard>
    )
}

export default YearChart