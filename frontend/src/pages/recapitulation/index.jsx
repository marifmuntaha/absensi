import React, {useCallback, useEffect, useRef, useState} from "react";
import Head from "../../layout/head";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle, Button,
    Col, Icon,
    PreviewCard, Row, RSelect, RToast
} from "../../components";
import Content from "../../layout/content";
import {Controller, useForm} from "react-hook-form";
import {get as getTeacher} from "../../utils/api/teacher";
import {get as getPresence} from "../../utils/api/presence";
import {get as getHoliday} from "../../utils/api/holiday";
import moment from "moment";
import {Spinner} from "reactstrap";
import {APICore} from "../../utils/api/APICore";
import ButtonAction from "./partials/Button";
import year from "../master/year";

const Recapitulation = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const tableRef = useRef(null);
    const {formState: {errors}, control, handleSubmit, setValue, getValues, watch} = useForm();
    const [loading, setLoading] = useState(false);
    const [optionTeachers, setOptionTeachers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [presences, setPresences] = useState([]);
    const [presentCount, setPresentCount] = useState(0);
    const [permissionCount, setPermissionCount] = useState(0);
    const [sickCount, setSickCount] = useState(0);
    const [absenceCount, setAbsenceCount] = useState(0);
    const [holidayCount, setHolidayCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0)
    const optionMonths = [
        {value: '1', label: 'Januari'},
        {value: '2', label: 'Februari'},
        {value: '3', label: 'Maret'},
        {value: '4', label: 'April'},
        {value: '5', label: 'Mei'},
        {value: '6', label: 'Juni'},
        {value: '7', label: 'Juli'},
        {value: '8', label: 'Agustus'},
        {value: '9', label: 'September'},
        {value: '10', label: 'Oktober'},
        {value: '11', label: 'November'},
        {value: '12', label: 'Desember'},
    ];
    const optionYears = [
        {value: '2024', label: '2024'},
        {value: '2025', label: '2025'},
        {value: '2026', label: '2026'},
        {value: '2027', label: '2027'},
        {value: '2028', label: '2028'},
        {value: '2029', label: '2029'},
    ];
    const onSubmit = () => {
        setLoading(true);
        const date = new Date(parseInt(getValues('year')), getValues('month') - 1, 1);
        const lastDate = moment(`${getValues('year')}-${getValues('month')}`, 'YYYY-M').endOf('months').date().toString();
        let result = [];
        let holidays = []
        while (date.getMonth() === (getValues('month') - 1)) {
            date.getDay() === 0 && holidays.push(date.getDate().toString())
            result.push(date.getDate().toString());
            date.setDate(date.getDate() + 1)
        }
        getHoliday({month: getValues('month'), year: getValues('year')}).then((resp) => {
            const holiday = resp.data.result;
            holiday.map((item) => {
                return holidays.push(moment(item.date).format('D').toString())
            });
            setHolidayCount(holidays?.length)
            setActiveCount(lastDate ? parseInt(lastDate) - holidays?.length : 0)
            getPresence({teacherId: teacher?.id, month: getValues('month'), year: getValues('year')}).then(resp => {
                setLoading(false);
                setPresentCount(() => {
                    return resp.data.result.filter((item) => {
                        return item.statusIn === 'H'
                    }).length
                })
                setPermissionCount(() => {
                    return resp.data.result.filter((item) => {
                        return item.statusIn === 'I'
                    }).length
                })
                setSickCount(() => {
                    return resp.data.result.filter((item) => {
                        return item.statusIn === 'S'
                    }).length
                })
                setAbsenceCount(() => {
                    return resp.data.result.filter((item) => {
                        return item.statusIn === 'A'
                    }).length
                })
                setPresences(result.map((date) => {
                    const presences = resp.data.result.filter((presence) => {
                        return moment(presence.date, 'YYYY-MM-DD').format('D').toString() === date;
                    });
                    if (presences?.length > 0 && !holidays.includes(date)) {
                        const presence = presences.pop()
                        return {id: presence.id, day: date, in: presence.in, out: presence?.out, statusIn: presence.statusIn, statusOut: presence.statusOut, description: presence.description, color: 'white'};
                    }
                    else {
                        const description = holiday.filter((item) => {
                            return moment(item.date).format('D').toString() === date
                        }).pop()
                        return {id: null, day: date, in: null, out: null, statusIn: null, statusOut: null, description: description?.name, color: 'light'};
                    }
                }))
            }).catch(error => {
                RToast(error, 'error');
                setLoading(false)
            })
        }).catch(err => {
            RToast(err, 'error');
            setLoading(false)
        });
    }
    const handleParams = useCallback(() => {
        return {teacherId: teacher?.id, month: getValues('month'), year: getValues('year')}
    }, [teacher, getValues])
    useEffect(() => {
        getTeacher().then(resp => {
            setTeachers(resp.data.result)
        }).catch(err => RToast(err, 'error'))
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setOptionTeachers(teachers.map((teacher) => {
            return {value: teacher.id, label: teacher.name};
        }))
        // noinspection JSUnresolvedReference
        if (user.role === '3') {
            const teacher = JSON.parse(localStorage.getItem('teacher'));
            setTeacher(teacher);
            setValue('teacher', teacher.id)
        }
        // eslint-disable-next-line
    }, [teachers]);
    useEffect(() => {
        const teacher = teachers.filter((item) => {
            return item.id === getValues('teacher');
        }).pop();
        setTeacher(teacher);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('teacher')]);
    return (
        <React.Fragment>
            <Head title="Rekapitulasi" />
            <Content>
                <Block size="sm">
                    <BlockHead size="sm">
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Kelola Absensi</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockHead>
                    <PreviewCard>
                        <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                            <Row className="gy-2">
                                <Col className="col-md-4">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input type="hidden" className="form-control"/>
                                            <Controller
                                                control={control}
                                                className="form-control"
                                                name="teacher"
                                                rules={{required: true}}
                                                render={({field: {onChange, value, ref}}) => (
                                                    <RSelect
                                                        inputRef={ref}
                                                        options={optionTeachers}
                                                        value={optionTeachers && optionTeachers.find((c) => c.value === value)}
                                                        onChange={(val) => onChange(val.value)}
                                                        placeholder="Pilih Guru"
                                                        isDisabled={user.role === '3'}
                                                    />
                                                )}/>
                                            {errors.teacher && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col className="col-md-3">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input type="hidden" className="form-control"/>
                                            <Controller
                                                control={control}
                                                className="form-control"
                                                name="year"
                                                rules={{required: true}}
                                                render={({field: {onChange, value, ref}}) => (
                                                    <RSelect
                                                        inputRef={ref}
                                                        options={optionYears}
                                                        value={optionYears.find((c) => c.value === value)}
                                                        onChange={(val) => onChange(val.value)}
                                                        placeholder="Pilih Status"
                                                    />
                                                )}/>
                                            {errors.year && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col className="col-md-3">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input type="hidden" className="form-control"/>
                                            <Controller
                                                control={control}
                                                className="form-control"
                                                name="month"
                                                rules={{required: true}}
                                                render={({field: {onChange, value, ref}}) => (
                                                    <RSelect
                                                        inputRef={ref}
                                                        options={optionMonths}
                                                        value={optionMonths.find((c) => c.value === value)}
                                                        onChange={(val) => onChange(val.value)}
                                                        placeholder="Pilih Status"
                                                    />
                                                )}/>
                                            {errors.month && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={2} sm={12}>
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <Button size="md" className="btn-block" type="submit" color="light">
                                                {loading ? <Spinner size="sm" color="light"/> : "PROSES"}
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </PreviewCard>
                    <PreviewCard>
                        <Row className="mb-2">
                            <Col md={6} sm={12} className="mb-3">
                                <table className="table table-bordered table-sm w-100">
                                    <tbody>
                                    <tr>
                                        <th>Nama Lengkap</th>
                                        <td>{teacher && teacher.name}</td>
                                    </tr>
                                    <tr>
                                        <th>NIP</th>
                                        <td>{teacher && teacher.nip}</td>
                                    </tr>
                                    <tr>
                                        <th>NUPTK</th>
                                        <td>{teacher && teacher.nuptk}</td>
                                    </tr>
                                    <tr>
                                        <th>Bulan</th>
                                        <td>
                                            {optionMonths.find((c) => c.value === getValues('month'))?.label}
                                            {" "}{getValues('year')}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col md={6} sm={12} className="mb-2">
                                <table className="table table-bordered table-sm w-100">
                                    <tbody>
                                    <tr>
                                        <th>Hadir</th>
                                        <td>{presentCount} Hari</td>
                                    </tr>
                                    <tr>
                                        <th>Ijin</th>
                                        <td>{permissionCount} Hari</td>
                                    </tr>
                                    <tr>
                                        <th>Sakit</th>
                                        <td>{sickCount} Hari</td>
                                    </tr>
                                    <tr>
                                        <th>Tanpa Keterangan</th>
                                        <td>{absenceCount} Hari</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12} sm={12}>
                                <div className="overflow-auto">
                                    <table className="table table-bordered" ref={tableRef}>
                                        <thead>
                                        <tr className="text-center fw-bold" style={{verticalAlign: 'middle'}}>
                                            <td rowSpan={2}>Tanggal</td>
                                            <td rowSpan={2}>Masuk</td>
                                            <td rowSpan={2}>Keluar</td>
                                            <td colSpan={2}>Status</td>
                                            <td rowSpan={2}>Keterangan</td>
                                        </tr>
                                        <tr className="text-center fw-bold">
                                            <td>Masuk</td>
                                            <td>Keluar</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {presences.length > 0 ? presences.map((item, idx) => {
                                            return (
                                                <tr className="text-center" key={idx} style={{verticalAlign: 'middle'}}>
                                                    <td className={`bg-${item.color}`}>{item.day}</td>
                                                    <td className={`bg-${item.color}`}>{item.in}</td>
                                                    <td className={`bg-${item.color}`}>{item.out}</td>
                                                    <td className={`bg-${item.color}`}>{item.statusIn}</td>
                                                    <td className={`bg-${item.color}`}>{item.statusOut}</td>
                                                    <td className={`bg-${item.color}`}>{item.description}</td>
                                                </tr>
                                            )
                                        }) : (
                                            <tr className="text-center">
                                                <td colSpan={6}><span className="text-muted">Tidak ada data</span></td>
                                            </tr>
                                        )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <table className="table table-bordered w-100">
                                    <tbody>
                                    <tr className="text-center">
                                        <th>Hari Efektif</th>
                                        <th>Hari Libur</th>
                                    </tr>
                                    <tr className="text-center">
                                        <td>{activeCount} Hari</td>
                                        <td>{holidayCount} Hari</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                        {user.role === '3' && presences.length > 0 && (
                            <ButtonAction
                                params={handleParams()}
                                presences={presences}
                                present={presentCount}
                                permission={permissionCount}
                                sick={sickCount}
                                absence={absenceCount}
                                active={activeCount}
                                holiday={holidayCount}
                                tableRef={tableRef}
                            />
                        )}
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Recapitulation;