import React, {Suspense, useEffect, useState} from "react";
import {BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard} from "../../../components";
import moment from "moment/moment";
import {Alert, Card} from "reactstrap";
import ImageContainer from "../../../components/partials/galery";

const TeacherQR = () => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const [time, setTime] = useState()
    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('HH:mm:ss'));
        }, 1000);
    }, [time]);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                <BlockHead>
                    <BlockContent className="text-center">
                        <BlockTitle>SISTEM ABSENSI ONLINE</BlockTitle>
                        <BlockTitle className="text-info">{moment(new Date()).locale('id').format('dddd, DD MMMM YYYY')}</BlockTitle>
                        <BlockTitle className="text-danger">{time}</BlockTitle>
                        <BlockDes>
                            <Alert className="alert-icon" color="info">
                                <p className="fw-bold fs-6">Silahkan arahkan QRCode Dibawah ini ke scanner</p>
                            </Alert>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
                <Card className="border border-3 border-info col-md-6 offset-3">
                    <ImageContainer img={teacher.qrcode} />
                </Card>
            </PreviewCard>
        </Suspense>
    )
}

export default TeacherQR;