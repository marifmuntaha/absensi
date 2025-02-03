import React, {useEffect, useState} from "react";
import {BarChart, PreviewCard} from "../../../components";
import {get as getPresent} from "../../../utils/api/presence";
import moment from "moment";

const YearChart = () => {
    const [present, setPresent] = useState([]);
    const [permission, setPermission] = useState([])
    const [sick, setSick] = useState([]);
    const [absent, setAbsent] = useState([]);
    const barChartMultiple = {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        dataUnit: "Hari",
        datasets: [
            {
                label: "Hadir",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#72f894",
                data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95],
            },
            {
                label: "Ijin",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#698ff6",
                data: [75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 200, 125],
            },
            {
                label: "Sakit",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#fbdc6f",
                data: [75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125],
            },
            {
                label: "Tanpa Keterangan",
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                backgroundColor: "#fb5555",
                data: [75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125],
            },
        ],
    };
    useEffect(() => {
        getPresent().then((resp) => {
            const presents = resp.data.result;
            const present = presents.filter((item) => {
                return item.statusIn === 'H'
            })
            const presentJan = present.filter((item) => {
                return moment(item.date).format("M").toString() === '2';
            })
            console.log(presentJan.length);
        })
    }, []);
    return (
        <PreviewCard>
            <div className="card-head">
                <h6 className="title">Statistik Tahunan</h6>
            </div>
            <div className="nk-ck-sm" style={{height: "265px"}}>
                <BarChart data={barChartMultiple} />
            </div>
        </PreviewCard>
    )
}

export default YearChart