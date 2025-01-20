import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col,
    Icon,
    PreviewCard, Row, RSelect, RToast
} from "../../components";
import Content from "../../layout/content";
import {Controller, useForm} from "react-hook-form";
import {get as getTeacher} from "../../utils/api/teacher";
import {get as getPresence} from "../../utils/api/presence"
import moment from "moment";

const Recapitulation = () => {
    const {register, formState: {errors}, control, getValues, watch} = useForm();
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState(false);
    const [optionYears, setOptionYears] = useState([]);
    const [days, setDays] = useState([]);
    const [optionTeachers, setOptionTeachers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [presences, setPresences] = useState([]);
    const [holidays, setHolidays] = useState(['1', '7', '14', '21', '28']);
    const [optionMonths, setOptionMonths] = useState([
        {value: 1, label: 'Januari'},
        {value: 2, label: 'Februari'},
        {value: 3, label: 'Maret'},
        {value: 4, label: 'April'},
        {value: 5, label: 'Mei'},
        {value: 6, label: 'Juni'},
        {value: 7, label: 'Juli'},
        {value: 8, label: 'Agustus'},
        {value: 9, label: 'September'},
        {value: 10, label: 'Oktober'},
        {value: 11, label: 'November'},
        {value: 12, label: 'Desember'},
    ]);
    useEffect(() => {
        getTeacher({with: 'present'}).then(resp => {
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
        });
        const years = teacher[0] && teacher[0].present.map((item) => {
            return moment(item.date, 'YYYY-MM-DD').format('YYYY').toString();
        })
        const options = years && years.filter(function(item, pos) {
            return years.indexOf(item) === pos;
        });
        setOptionYears(options && options.map((item) => {
            return {value: item, label: item};
        }));
        setTeacher(teacher[0]);
    }, [watch('teacher')]);
    useEffect(() => {
        const date = new Date(parseInt(getValues('year')), getValues('month') - 1, 1);
        const result = [];
        while (date.getMonth() === (getValues('month') - 1)) {
            result.push(date.getDate().toString());
            date.setDate(date.getDate() + 1)
        }
        setPresences(result.map((date) => {
            const presences = teacher.presences.filter((presence) => {
                return presence.id === date;
            })
            if (presences.length > 0 && !holidays.includes(date)){
                return {id: presences[0].id, day: date, in: presences[0].in, out: presences[0].out, status: presences[0].status, description: presences[0].description, color: 'white'};
            }
            else {
                return {id: null, day: date, in: null, out: null, status: null, description: null, color: 'danger'};
            }
        }))
    }, [watch('month')])
    return (
        <React.Fragment>
            <Head title="Rekapitulasi" />
            <Content>
                <Block size="sm">
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h4">Kelola Absensi</BlockTitle>
                                <p>
                                    Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for react dashlite.
                                </p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <a
                                        href="#more"
                                        className="btn btn-icon btn-trigger toggle-expand me-n1"
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            updateSm(!sm);
                                        }}
                                    >
                                        <Icon name="more-v"></Icon>
                                    </a>
                                    <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                        <ul className="nk-block-tools g-3">
                                            <li className="nk-block-tools-opt">
                                                <Button
                                                    className="toggle btn-icon d-md-none"
                                                    color="dark"
                                                    onClick={() => {
                                                        setModal(true);
                                                    }}
                                                >
                                                    <Icon name="plus"></Icon>
                                                </Button>
                                                <Button
                                                    className="toggle d-none d-md-inline-flex"
                                                    color="dark"
                                                    onClick={() => {
                                                        setModal(true);
                                                    }}
                                                >
                                                    <Icon name="plus"></Icon>
                                                    <span>TAMBAH</span>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
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
                                                    value={optionYears && optionYears.find((c) => c.value === value)}
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
                        <Row>
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
                                        <td>Januari 2025</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <td>Tanggal</td>
                                <td>Masuk</td>
                                <td>Keluar</td>
                                <td>Status</td>
                                <td>Keterangan</td>
                            </tr>
                            </thead>
                            <tbody>
                            {presences.length > 0 ? presences.map((item, idx) => (
                                <tr className="text-center" key={idx}>
                                    <td className={`bg-${item.color}`}>{item.day}</td>
                                    <td className={`bg-${item.color}`}>{item.in}</td>
                                    <td className={`bg-${item.color}`}>{item.out}</td>
                                    <td className={`bg-${item.color}`}>{item.status}</td>
                                    <td className={`bg-${item.color}`}>{item.description}</td>
                                </tr>
                            )) : (
                                <tr className="text-center">
                                    <td colSpan={5}><span className="text-muted">Tidak ada data</span></td>
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