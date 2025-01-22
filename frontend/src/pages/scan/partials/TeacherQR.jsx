import React, {Suspense, useEffect, useState} from "react";
import {Block, BlockContent, BlockDes, BlockHead, BlockTitle, Col, PreviewCard} from "../../../components";
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
                            <Alert color="info">
                                <p className="fw-bold fs-6">Silahkan arahkan QRCode Dibawah ini ke scanner</p>
                            </Alert>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
                <Col className="border border-3 border-info align-self-center">
                    <ImageContainer img={teacher.qrcode} />
                </Col>
            </PreviewCard>
        </Suspense>
    )
}

export default TeacherQR;