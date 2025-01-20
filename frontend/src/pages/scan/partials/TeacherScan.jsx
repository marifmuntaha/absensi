import React, {useEffect, useState} from "react";
import {BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard} from "../../../components";
import moment from "moment";

const TeacherScan = () => {
    const [time, setTime] = useState('');
    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('HH:mm:ss'));
        }, 1000);
    }, [time]);
    return (
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
                <BlockContent className="text-center">
                    <BlockTitle>SISTEM ABSENSI</BlockTitle>
                    <BlockTitle className="text-primary">{moment(new Date()).locale('id').format('DD MMMM YYYY')} {time}</BlockTitle>
                    <BlockDes>
                        <h5 className="text-danger">Arahkan Scanner QRCode anda ke Layar</h5>
                    </BlockDes>
                </BlockContent>
            </BlockHead>
        </PreviewCard>
    )
}
export default TeacherScan;