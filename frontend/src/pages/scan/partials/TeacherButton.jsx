import React, {Suspense, useEffect, useState} from "react";
import {Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard, RToast} from "../../../components";
import moment from "moment";
import {Alert, Spinner} from "reactstrap";
import {get as getPresence, update as updatePresence} from "../../../utils/api/presence";
import {get as getWorks} from "../../../utils/api/work";

const TeacherButton = () => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState();
    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        getWorks().then(resp => {
            // noinspection DuplicatedCode
            const time = resp.data.result;
            const timeInDay = time.filter((item) => {
                return item.day === moment().day().toString();
            }).pop()
            const startTimeIn = mutationTime(timeInDay.in, -1);
            const endTimeIn = mutationTime(timeInDay.in, 2);
            const startTimeEnd = mutationTime(timeInDay.out, -1);
            const endTimeEnd = mutationTime(timeInDay.out, 3);
            if (moment().toDate() < startTimeIn.toDate()){
                RToast('Absensi masuk belum dimulai.', 'error');
                setLoading(false);
            } else {
                if (startTimeIn.toDate() < moment().toDate() && moment().toDate() < endTimeIn.toDate()){
                    getPresence({date: moment().format("YYYY-MM-DD"), teacher_id: teacher.id}).then(resp => {
                        const presence = resp?.data?.result?.pop();
                        presence.date = moment(presence.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                        presence.statusIn = 'H'
                        presence.in = moment().format('HH:mm:ss');
                        updatePresence(presence).then(() => {
                            RToast('Presensi Masuk berhasil disimpan.', 'success')
                            setLoading(false);
                        }).catch(err => {
                            RToast(err, 'error');
                            setLoading(false);
                        });
                    }).catch(err => {
                        RToast(err, 'error');
                        setLoading(false);
                    });
                }
                else if (endTimeIn.toDate() < moment().toDate() && moment().toDate() < startTimeEnd.toDate()) {
                    RToast('Absensi pulang belum dimulai.', 'error');
                    setLoading(false);
                }
                else if (startTimeEnd.toDate() < moment().toDate() && moment().toDate() < endTimeEnd.toDate()){
                    getPresence({date: moment().format("YYYY-MM-DD"), teacher_id: teacher.id}).then(resp => {
                        const presence = resp?.data?.result?.pop();
                        presence.date = moment(presence.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                        presence.statusOut = 'H'
                        presence.Out = moment().format('HH:mm:ss');
                        updatePresence(presence).then(() => {
                            RToast('Presensi Pulang berhasil disimpan.', 'success')
                            setLoading(false)
                        }).catch(err => {
                            RToast(err, 'error')
                            setLoading(false)
                        });
                    }).catch(err => {
                        RToast(err, 'error');
                        setLoading(false);
                    });
                }
                else {
                    RToast('Absensi telah selesai hari ini.', 'error');
                    setLoading(false)
                }
            }
        });
    }

    const mutationTime = (time, value) => {
        return moment(time, 'HH : mm : ss').add(value, 'hours');
    }

    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('HH:mm:ss'));
        }, 1000);
    }, [time]);

    return (
        <Suspense fallback={null}>
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                <BlockHead>
                    <BlockContent className="text-center">
                        <BlockTitle>SISTEM ABSENSI ONLINE</BlockTitle>
                        <BlockTitle className="text-primary">{moment(new Date()).locale('id').format('dddd, DD MMMM YYYY')}</BlockTitle>
                        <BlockTitle className="text-primary">{time}</BlockTitle>
                        <BlockDes>
                            <Alert fade={false} color="danger">
                                <p className="fw-bold fs-6">Tekan Tombol dibawah ini untuk melakukan Presensi</p>
                            </Alert>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
                <Block className="mt-3">
                    <div className="form-group">
                        <Button size="xl" className="btn-block" color="success" onClick={(e) => onSubmit(e)}>
                            {loading ? <Spinner size="sm" color="light"/> : "HADIR"}
                        </Button>
                    </div>
                </Block>
            </PreviewCard>
        </Suspense>
    )
}

export default TeacherButton;