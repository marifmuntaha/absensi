import React, {useEffect, useRef, useState} from "react";
import Head from "../../layout/head";
import {Link} from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {Block, BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard, RToast} from "../../components";
import QrScanner from "qr-scanner";
import moment from "moment";
import "moment/locale/id"
import Footer from "../auth/Footer";
import {get as getPresence, store as storePresence, update as updatePresence} from "../../utils/api/presence";
import {get as getWorks} from "../../utils/api/work";

const Scan = () => {
    const scanner = useRef();
    const videoEl = useRef();
    const qrBoxEl = useRef();
    const [qrOn, setQrOn] = useState(true);
    const [time, setTime] = useState('');
    const [startTimeIn, setStartTimeIn] = useState('');
    const [endTimeIn, setEndTimeIn] = useState('');
    const [startTimeEnd, setStartTimeEnd] = useState('');
    const [endTimeEnd, setEndTimeEnd] = useState('');
    const onScanSuccess = (result) => {
        scanner?.current?.stop();
        const teacher = JSON.parse(result.data);
        if (moment().toDate() < moment(startTimeIn).toDate()){
            RToast('Absensi masuk belum dimulai.', 'error');
        } else {
            getPresence({date: moment().format("YYYY-MM-DD"), teacher_id: teacher.id}).then(resp => {
                const presence = resp.data.result;
                if (presence.length > 0 ) {
                    if (moment().toDate() < moment(endTimeIn, 'HH:mm:ss').toDate()){
                        RToast('Anda sudah melakukan absensi', 'error');
                    }
                    else if (moment(endTimeIn, 'HH:mm:ss').toDate() < moment().toDate() < moment(startTimeEnd, 'HH:mm:ss').toDate()){
                        RToast('Absensi pulang belum dimulai', 'error');
                    } else {
                        const params = {
                            id: presence[0].id,
                            teacher_id: teacher.id,
                            date: presence[0].date,
                            in: presence[0].in,
                            out: moment().format('HH:mm:ss'),
                            status: '1',
                            description: '',
                            letter: ''
                        }
                        updatePresence(params).then(resp => {
                            RToast(resp.data.message, 'success');
                            scanner?.current?.start()
                        }).catch(err => {
                            RToast(err, 'error');
                            scanner?.current?.start()
                        });
                    }
                }
                else {
                    if (moment().toDate() > moment(endTimeIn, 'HH:mm:ss').toDate()) {
                        RToast('Absensi masuk sudah ditutup', 'error');
                    } else {
                        const params = {
                            teacher_id: teacher.id,
                            date: moment().format('YYYY-MM-DD'),
                            in: moment().format('HH:mm:ss'),
                            out: moment().format('HH:mm:ss'),
                            status: '1',
                            description: '',
                            letter: ''
                        }
                        storePresence(params).then(resp => {
                            RToast(resp.data.message, 'success');
                            scanner?.current?.start()
                        }).catch(err => {
                            RToast(err, 'error');
                            scanner?.current?.start()
                        });
                    }
                }
            }).catch(err => {
                RToast(err, "error");
            });
        }
        setTimeout(() => {
            scanner?.current?.start()
        }, 5000)
    };
    const onScanFail = (err) => {
        console.log(err);
    };
    const mutationTime = (time, value) => {
        return moment(time, 'HH:mm:ss').add(value, 'hours').format('HH:mm:ss');
    }

    useEffect(() => {
        getWorks().then(resp => {
            const time = resp.data.result;
            const timeInDay = time.filter((item) => {
                return item.day === moment().day().toString();
            })
            setStartTimeIn(mutationTime(timeInDay[0].in, -1));
            setStartTimeEnd(mutationTime(timeInDay[0].in, 4));
            setEndTimeIn(mutationTime(timeInDay[0].out, -1));
            setStartTimeEnd(mutationTime(timeInDay[0].out, 3));
        });

        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl?.current || undefined,
            });
            scanner?.current
                ?.start()
                .then((resp) => {
                    console.log(resp);
                    setQrOn(true)
                })
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);
    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('HH:mm:ss'));
        }, 1000);
    }, [time]);


    return (
        <React.Fragment>
            <Head title="Scan Kehadiran Guru" />
            <Block className="nk-block-middle nk-auth-body  wide-md">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                    </Link>
                </div>
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent className="text-center">
                            <BlockTitle>SISTEM ABSENSI</BlockTitle>
                            <BlockTitle className="text-primary">{moment(new Date()).locale('id').format('DD MMMM YYYY')} {time}</BlockTitle>
                            <BlockDes>
                                <h5 className="text-danger">Arahkan QR Code anda ke Kamera</h5>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <div className="ratio ratio-16x9">
                        <video ref={videoEl}></video>
                    </div>
                </PreviewCard>
            </Block>
            <Footer />
        </React.Fragment>
    )
}

export default Scan;