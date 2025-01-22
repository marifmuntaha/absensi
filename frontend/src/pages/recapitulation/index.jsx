import React, {useEffect, useState} from "react";
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

const Recapitulation = () => {
    const {formState: {errors}, control, getValues, watch} = useForm();
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

    useEffect(() => {
        getTeacher().then(resp => {
            setTeachers(resp.data.result)
        }).catch(err => RToast(err, 'error'));
    }, []);
    useEffect(() => {
        setOptionTeachers(teachers.map((teacher) => {
            return {value: teacher.id, label: teacher.name};
        }))
    }, [teachers]);
    useEffect(() => {
        const teacher = teachers.filter((item) => {
            return item.id === getValues('teacher');
        }).pop();
        setTeacher(teacher);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('teacher')]);
    useEffect(() => {
        const date = new Date(parseInt(getValues('year')), getValues('month') - 1, 1);
        const lastDate = moment(`${getValues('year')}-${getValues('month')}`, 'YYYY-M').endOf('months').date().toString();
        let result = [];
        let holidays = []
        while (date.getMonth() === (getValues('month') - 1)) {
            date.getDay() === 0 && holidays.push(date.getDate().toString())
            result.push(date.getDate().toString());
            date.setDate(date.getDate() + 1)
        }
        getHoliday({month: getValues('month'), year: getValues('year')}).then(resp => {
            resp.data.result.map((item) => {
                return holidays.push(moment(item.date).format('D').toString())
            });
            setHolidayCount(holidays?.length)
            setActiveCount(lastDate ? parseInt(lastDate) - holidays?.length : 0)
            getPresence({teacherId: teacher?.id, month: getValues('month'), year: getValues('year')}).then(resp => {
                const presences = resp.data.result
                setPresentCount(() => {
                    return presences.filter((item) => {
                        return item.statusIn === 'H'
                    }).length
                })
                setPermissionCount(() => {
                    return presences.filter((item) => {
                        return item.statusIn === 'I'
                    }).length
                })
                setSickCount(() => {
                    return presences.filter((item) => {
                        return item.statusIn === 'S'
                    }).length
                })
                setAbsenceCount(() => {
                    return presences.filter((item) => {
                        return item.statusIn === 'A'
                    }).length
                })
                setPresences(result.map((date) => {
                    const presences = resp.data.result?.filter((presence) => {
                        return moment(presence.date, 'YYYY-MM-DD').format('D').toString() === date;
                    }).pop();
                    if (presences && !holidays.includes(date)){
                        return {id: presences?.id, day: date, in: presences?.in, out: presences?.out, statusIn: presences.statusIn, statusOut: presences.statusOut, description: presences.description, color: 'white'};
                    }
                    else {
                        return {id: null, day: date, in: null, out: null, statusIn: null, statusOut: null, description: null, color: 'danger'};
                    }
                }))
            }).catch(error => {
                RToast(error, 'error')
            })
        }).catch(err => RToast(err, 'error'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('month')])
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
                        <Row className="gy-2">
                            <Col className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="teacher">Guru/Karyawan</label>
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
                                                />
                                            )}/>
                                        {errors.teacher && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="year">Tahun</label>
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
                            <Col className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="month">Bulan</label>
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
                        </Row>
                    </PreviewCard>
                    <PreviewCard>
                        <Row className="mb-4">
                            <Col className="col-md-4">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th style={{width: '200px'}}>Nama Lengkap</th>
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
                            <Col className="col-md-3">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th style={{width: '200px'}}>Hadir</th>
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
                            <Col className="col-md-5">
                                <Row>
                                    <Col className="col-md-12">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <th>Hari Efektif</th>
                                                <th>Hari Libur</th>
                                            </tr>
                                            <tr>
                                                <td>{activeCount} Hari</td>
                                                <td>{holidayCount} Hari</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                    <Col className="col-md-12 mt-5">
                                        <Row>
                                            <Col className="col-md-4">
                                                <Button size="md" className="btn-block" type="submit" color="success">
                                                    <Icon name="printer" />
                                                    <span>CETAK</span>
                                                </Button>
                                            </Col>
                                            <Col className="col-md-4">
                                                <Button size="md" className="btn-block" type="submit" color="danger">
                                                    <Icon name="download" />
                                                    <span>UNDUH</span>
                                                </Button>
                                            </Col>
                                            <Col className="col-md-4">
                                                <Button size="md" className="btn-block" type="submit" color="info">
                                                    <Icon name="checkbox" />
                                                    <span>AJUKAN</span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <table className="table table-bordered">
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
                                    <tr className="text-center" key={idx}>
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
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Recapitulation;