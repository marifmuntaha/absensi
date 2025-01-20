import React, {useEffect, useRef, useState} from "react";
import QrScanner from "qr-scanner";
import moment from "moment/moment";
import {BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard, RToast} from "../../../components";
import {get as getWorks} from "../../../utils/api/work";
import {get as getPresence, update as updatePresence} from "../../../utils/api/presence";

const SchoolScan = () => {
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
            const endTimeIn = mutationTime(timeInDay.out, -1);
            const startTimeEnd = mutationTime(timeInDay.in, 4);
            const endTimeEnd = mutationTime(timeInDay.out, 3);
            if (moment().toDate() < startTimeIn.toDate()){
                RToast('Absensi masuk belum dimulai.', 'error');
            } else {
                if (startTimeIn.toDate() > moment().toDate() && moment().toDate() < endTimeIn.toDate()){
                    getPresence({date: moment().format("YYYY-MM-DD"), teacher_id: teacher.id}).then(resp => {
                        const presence = resp.data.result?.pop();
                        console.log(presence);
                    }).catch(err => RToast(err, 'error'));
                }
                else if (endTimeIn.toDate() < moment().toDate() && moment().toDate() < startTimeEnd.toDate()) {
                    RToast('Absensi pulang belum dimulai.', 'error');
                }
                else if (startTimeEnd.toDate() < moment().toDate() && moment().toDate() < endTimeEnd.toDate()){
                    getPresence({date: moment().format("YYYY-MM-DD"), teacher_id: teacher.id}).then(resp => {
                        const presence = resp.data.result?.pop();
                        presence.date = moment(presence.date).format("YYYY-MM-DD");
                        presence.out = moment().format('HH:mm:ss');
                        presence.statusOut = 'H';
                        updatePresence(presence).then(() => {
                            RToast('Absensi pulang berhasil disimpan.', 'success')
                        }).catch(err => RToast(err, 'error'));
                    }).catch(err => RToast(err, 'error'));
                }
                else {
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
    )
}

export default SchoolScan;