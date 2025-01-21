import React, {useEffect, useState} from "react";
import {BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard, RToast} from "../../../components";
import moment from "moment";
import {Alert, Card} from "reactstrap";
import {QRCodeSVG} from "qrcode.react";
import {get as getToken} from "../../../utils/api/token"

const OperatorQR = () => {
    const [time, setTime] = useState('');
    const [qrcode, setQrcode] = useState({});

    useEffect(() => {
        getToken({date: moment().format('YYYY-MM-DD')}).then(resp => {
            setQrcode(JSON.stringify(resp?.data?.result?.pop()));
        }).catch(err => RToast(err, 'error'))
    }, []);
    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('HH:mm:ss'));
        }, 1000);
    }, [time]);
    return (
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
                <BlockContent className="text-center">
                    <BlockTitle>SISTEM ABSENSI ONLINE</BlockTitle>
                    <BlockTitle className="text-info">{moment(new Date()).locale('id').format('dddd, DD MMMM YYYY')}</BlockTitle>
                    <BlockTitle className="text-danger">{time}</BlockTitle>
                    <BlockDes>
                        <Alert className="alert-icon" color="info">
                            <p className="fw-bold fs-6">Silahkan scan QRCode Dibawah ini</p>
                        </Alert>
                    </BlockDes>
                </BlockContent>
            </BlockHead>
            <Card className="border border-3 border-info p-2 col-md-6 offset-3">
                <QRCodeSVG value={qrcode} size={500}/>
            </Card>
        </PreviewCard>
    )
}
export default OperatorQR;