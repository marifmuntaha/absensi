import React, {useEffect, useState} from "react";
import { Card } from "reactstrap";
import {Icon, DoughnutChart} from "../../../../components";
import {get as getPresence} from "../../../../utils/api/presence"
import moment from "moment";

const TrafficSources = ({...props}) => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const [presence, setPresence] = useState([]);
    const [permission, setPermission] = useState([]);
    const [sick, setSick] = useState([]);
    const [absent, setAbsent] = useState([]);
    const [dataDoughnut, setDataDoughnut] = useState({
        labels: ["Hadir", "Ijin", "Sakit", "Tanpa Keterangan"],
        dataUnit: "People",
        legend: false,
        datasets: [
            {
                borderColor: "#fff",
                backgroundColor: ["#72f894", "#698ff6", "#fbdc6f", "#fb5555"],
                data: [0, 0, 0, 0],
            },
        ],
    });

    useEffect(() => {
        getPresence({teacherId: teacher?.id, month: props.month, year: moment().format('YYYY').toString()}).then((resp) => {
            setPresence(resp.data.result?.filter((item) => {
                return item.statusIn === 'H'
            }))
            setPermission(resp.data.result?.filter((item) => {
                return item.statusIn === 'I'
            }))
            setSick(resp.data.result?.filter((item) => {
                return item.statusIn === 'S'
            }))
            setAbsent(resp.data.result?.filter((item) => {
                return item.statusIn === 'A'
            }))
        })
    }, [props.month])

    useEffect(() => {
        setDataDoughnut({
            labels: ["Hadir", "Ijin", "Sakit", "Tanpa Keterangan"],
            dataUnit: "People",
            legend: false,
            datasets: [
                {
                    borderColor: "#fff",
                    backgroundColor: ["#72f894", "#698ff6", "#fbdc6f", "#fb5555"],
                    data: [presence?.length, permission?.length, sick?.length, absent?.length],
                },
            ],
        })
    }, [presence, permission, sick, absent])

    return (
        <Card className="card-full overflow-hidden">
            <div className="nk-ecwg nk-ecwg4 h-100">
                <div className="card-inner flex-grow-1">
                    <div className="card-title-group mb-4">
                        <div className="card-title">
                            <h6 className="title">Statistik Kehadiran</h6>
                        </div>
                    </div>
                    <div className="data-group">
                        <div className="nk-ecwg4-ck">
                            <DoughnutChart data={dataDoughnut} />
                        </div>
                        <ul className="nk-ecwg4-legends">
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#72f894" }}></span>
                                    <span>Hadir</span>
                                </div>
                                <div className="amount amount-xs">{presence?.length}</div>
                            </li>
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#698ff6" }}></span>
                                    <span>Ijin</span>
                                </div>
                                <div className="amount amount-xs">{permission?.length}</div>
                            </li>
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#fbdc6f" }}></span>
                                    <span>Sakit</span>
                                </div>
                                <div className="amount amount-xs">{sick?.length}</div>
                            </li>
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#fb5555" }}></span>
                                    <span>Tanpa Keterangan</span>
                                </div>
                                <div className="amount amount-xs">{absent?.length}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-inner card-inner-md bg-light">
                    <div className="card-note">
                        <Icon className="info-fill"></Icon>
                        <span>Traffic channels have beed generating the most traffics over past days.</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TrafficSources;
