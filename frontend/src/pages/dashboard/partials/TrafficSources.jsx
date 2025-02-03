import React, { useState } from "react";
import { Card } from "reactstrap";
import {Icon, DoughnutChart} from "../../../components";

const TrafficSources = () => {
    const trafficSources = {
        labels: ["Hadir", "Ijin", "Sakit", "Tanpa Keterangan"],
        dataUnit: "People",
        legend: false,
        datasets: [
            {
                borderColor: "#fff",
                backgroundColor: ["#72f894", "#698ff6", "#fbdc6f", "#fb5555"],
                data: [4305, 859, 482, 138],
            },
        ],
    };
    const [data, setData] = useState(trafficSources);
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
                            <DoughnutChart data={data} />
                        </div>
                        <ul className="nk-ecwg4-legends">
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#72f894" }}></span>
                                    <span>Hadir</span>
                                </div>
                                <div className="amount amount-xs">{data === "7" ? "2505" : data === "15" ? "3505" : "4000"}</div>
                            </li>
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#698ff6" }}></span>
                                    <span>Ijin</span>
                                </div>
                                <div className="amount amount-xs">{data === "7" ? "482" : data === "15" ? "800" : "1250"}</div>
                            </li>
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#fbdc6f" }}></span>
                                    <span>Sakit</span>
                                </div>
                                <div className="amount amount-xs">{data === "7" ? "859" : data === "15" ? "1650" : "3250"}</div>
                            </li>
                            <li>
                                <div className="title">
                                    <span className="dot dot-lg sq" style={{ background: "#fb5555" }}></span>
                                    <span>Tanpa Keterangan</span>
                                </div>
                                <div className="amount amount-xs">{data === "7" ? "138" : data === "15" ? "150" : "250"}</div>
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
