import React, {useEffect, useRef, useState} from "react";
import QrScanner from "qr-scanner";
import moment from "moment/moment";
import {BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard, RToast} from "../../../components";
import {get as getWorks} from "../../../utils/api/work";
import {get as getPresence, store as storePresence, update as updatePresence} from "../../../utils/api/presence";
import {Alert} from "reactstrap";

const OperatorScan = () => {
    const scanner = useRef();
    const videoEl = useRef();
    const qrBoxEl = useRef();
    const [qrOn, setQrOn] = useState(true);
    const [time, setTime] = useState('');
    const onScanSuccess = (result) => {
        scanner?.current?.stop();
        const teacher = JSON.parse(result.data);
        getWorks().then(resp => {
            const time = resp.data.result;
            const timeInDay = time.filter((item) => {
                return item.day === moment().day().toString();
            }).pop()
            const startTimeIn = mutationTime(timeInDay.in, -1);
            const endTimeIn = mutationTime(timeInDay.in, 2);
            const startTimeEnd = mutationTime(timeInDay.out, -1);
            const endTimeEnd = mutationTime(timeInDay.out, 3);
            if (moment().toDate() < startTimeIn.toDate()) {
                RToast('Absensi masuk belum dimulai.', 'error');
            } else {
                if (startTimeIn.toDate() < moment().toDate() && moment().toDate() < endTimeIn.toDate()) {
                    getPresence({date: moment().format("YYYY-MM-DD"), teacher_id: teacher.id}).then(resp => {
                        const presence = resp?.data?.result?.pop();
                        if (presence === undefined) {
                            const params = {
                                teacher_id: teacher.id,
                                date: moment().format("YYYY-MM-DD"),
                                in: moment().format("HH:mm:ss").toString(),
                                out: moment().format("HH:mm:ss").toString(),
                                status_in: 'H',
                                status_out: '',
                                description: '',
                                letter: ''
                            }
                            storePresence(params).then(() => {
                                RToast('Absensi masuk berhasil disimpan.', 'success');
                            }).catch(err => {
                                RToast('Absensi masuk gagal disimpan. ' + err, 'error');
                            })
                        } else {
                            presence.date = moment(presence.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                            presence.statusIn = 'H'
                            presence.in = moment().format('HH:mm:ss');
                            updatePresence(presence).then(() => {
                                RToast('Presensi Masuk berhasil disimpan.', 'success')
                            }).catch(err => {
                                RToast(err, 'error');
                            });
                        }
                    }).catch(err => {
                        RToast(err, 'error');
                    });
                } else if (endTimeIn.toDate() < moment().toDate() && moment().toDate() < startTimeEnd.toDate()) {
                    RToast('Absensi pulang belum dimulai.', 'error');
                } else if (startTimeEnd.toDate() < moment().toDate() && moment().toDate() < endTimeEnd.toDate()) {
                    getPresence({date: moment().format("YYYY-MM-DD"), teacher_id: teacher.id}).then(resp => {
                        const presence = resp?.data?.result?.pop();
                        if (presence === undefined) {
                            RToast('Ada belum melakukan absensi masuk.', 'error');
                        } else {
                            if (presence.statusOut === 'H') {
                                RToast('anda sudah melakukan absensi Pulang.', 'error')
                            } else {
                                presence.date = moment(presence.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                                presence.statusOut = 'H'
                                presence.out = moment().format('HH:mm:ss').toString();
                                updatePresence(presence).then(() => {
                                    RToast('Presensi Pulang berhasil disimpan.', 'success')
                                }).catch(err => {
                                    RToast(err, 'error')
                                });
                            }
                        }
                    }).catch(err => {
                        RToast(err, 'error');
                    });
                } else {
                    RToast('Absensi telah selesai hari ini.', 'error');
                }
            }
        });
        setTimeout(() => {
            scanner?.current?.start()
        }, 5000)
    };
    const onScanFail = (err) => {
        console.log(err);
    };
    const mutationTime = (time, value) => {
        return moment(time, 'HH:mm:ss').add(value, 'hours');
    }
    useEffect(() => {
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
            // eslint-disable-next-line
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
                <BlockContent className="text-center">
                    <BlockTitle>SISTEM ABSENSI ONLINE</BlockTitle>
                    <BlockTitle className="text-primary">{moment(new Date()).locale('id').format('dddd, DD MMMM YYYY')}</BlockTitle>
                    <BlockTitle className="text-primary">{time}</BlockTitle>
                    <BlockDes>
                        <Alert className="alert-icon" color="danger">
                            <p className="fw-bold fs-6">Arahkan QR Code anda ke Kamera</p>
                        </Alert>
                    </BlockDes>
                </BlockContent>
            </BlockHead>
            <div className="ratio ratio-16x9">
                <video ref={videoEl}></video>
            </div>
        </PreviewCard>
    )
}

export default OperatorScan;