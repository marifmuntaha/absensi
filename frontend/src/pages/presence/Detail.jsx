import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Head from "../../layout/head";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Col,
    PreviewAltCard,
    PreviewCard, RToast
} from "../../components";
import Content from "../../layout/content";
import moment from "moment";
import "moment/locale/id";
import {Badge} from "reactstrap";
import {useYear} from "../../layout/provider/Year";
import {useSemester} from "../../layout/provider/Semester";
import {get as getHoliday} from "../../utils/api/holiday";
import {get as getTeacher} from "../../utils/api/teacher";

const Detail = () => {
    const yearActive = useYear();
    const semester = useSemester();
    const {month, year} = useParams();
    const [days, setDays] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const colorState = (state) => {
        switch (state) {
            case "H":
                return 'success';
            case "I":
                return 'info';
            case "S":
                return 'warning';
            default:
                return 'danger';
        }
    }
    const getWeekday = (day) => {
        return moment(`${day}/${month}/${year}`, 'D/MM/YYYY').locale('id').format('dddd').toString() === 'Minggu'
    }

    useEffect(() => {
        let date = moment(`1/${month}/${year}`, 'D/MM/YYYY').daysInMonth()
        const result = [];
        while (date) {
            result.push(date.toString());
            date--;
        }
        setDays(result.reverse());

        getHoliday({month: month, year: year}).then(resp => {
            const holiday = resp.data.result.map((item) => {
                return moment(item.date, 'YYYY-MM-DD').format('D').toString()
            });
            setHolidays(holiday);
        }).catch(err => RToast(err, 'error'));

        getTeacher({presence: true, month: month, year: year}).then(resp => {
            setTeachers(resp.data.result)
        }).catch(err => RToast(err, 'error'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <React.Fragment>
            <Head title="Kelola Absesnsi" />
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
                        <Col className="col-md-4">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th style={{width: '200px'}}>Tahun Pelajaran</th>
                                    <td>{yearActive.name}</td>
                                </tr>
                                <tr>
                                    <th>Semester</th>
                                    <td>{semester.name === '1' ? 'Gasal' : 'Genap'}</td>
                                </tr>
                                <tr>
                                    <th>Bulan</th>
                                    <td>{moment(`${month}/${year}`, 'MM/YYYY').locale('id').format('MMMM YYYY')}</td>
                                </tr>
                                </tbody>
                            </table>
                        </Col>
                    </PreviewCard>
                    <PreviewAltCard>
                        <table className="table table-bordered border-2 table-striped"
                               style={{display: "block", overflowX: "auto", whiteSpace: "nowrap"}}>
                            <thead>
                            <tr className="text-center fw-bold" style={{verticalAlign: "middle"}}>
                                <td rowSpan="3">Nama Guru</td>
                                <td colSpan={days.length * 2}>Tanggal</td>
                                <td colSpan="4">Jumlah</td>
                            </tr>
                            <tr className="text-center fw-bold" style={{verticalAlign: "middle"}}>
                                {days.map((item, idx) => {
                                    if (holidays.includes(item) || getWeekday(item)) {
                                        return <td colSpan="2" key={idx} className="bg-danger">{item}</td>
                                    }
                                    else {
                                        return <td colSpan="2" key={idx}>{item}</td>
                                    }
                                })}
                                <td rowSpan={2} className="bg-success">H</td>
                                <td rowSpan={2} className="bg-info">I</td>
                                <td rowSpan={2} className="bg-warning">S</td>
                                <td rowSpan={2} className="bg-danger">A</td>
                            </tr>
                            <tr className="text-center fw-bold">
                                {days.map((item, idx) => {
                                    if (holidays.includes(String(item)) || getWeekday(item)) {
                                        return (
                                            <React.Fragment key={idx}>
                                                <td className="bg-danger">M</td>
                                                <td className="bg-danger">P</td>
                                            </React.Fragment>
                                        )
                                    }
                                    else {
                                        return (
                                            <React.Fragment key={idx}>
                                                <td>M</td>
                                                <td>P</td>
                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {teachers.map((item, idx) => {
                                const present = item.presences.filter((value) => {
                                    return value.statusIn === 'H'
                                });
                                const permission = item.presences.filter((value) => {
                                    return value.statusIn === 'I'
                                });
                                const sick = item.presences.filter((value) => {
                                    return value.statusIn === 'S'
                                });
                                const absent = item.presences?.filter((value) => {
                                    return value.statusIn === 'A'
                                });
                                return (
                                  <tr key={idx} className="text-center" style={{verticalAlign: "middle"}}>
                                      <td>{item.name}</td>
                                      {days.map((day, idx) => {
                                          const presence = item.presences.filter((value) => {
                                              return moment(value.date, 'YYYY-MM-DD').date().toString() === day;
                                          })
                                          if (presence.length > 0 && !holidays.includes(day) && !getWeekday(day)) {
                                              return (
                                                <React.Fragment key={idx}>
                                                    <td><Badge pill color={colorState(presence[0].statusIn)}>{presence[0].statusIn}</Badge></td>
                                                    <td><Badge pill color={colorState(presence[0].statusOut)}>{presence[0].statusOut}</Badge></td>
                                                </React.Fragment>
                                              )
                                          }
                                          else if (holidays.includes(day) || getWeekday(day)) {
                                              return (
                                                <React.Fragment key={idx}>
                                                    <td className={`bg-danger`}></td>
                                                    <td className={`bg-danger`}></td>
                                                </React.Fragment>
                                              )
                                          }
                                          else {
                                              return (
                                                <React.Fragment key={idx}>
                                                    <td></td>
                                                    <td></td>
                                                </React.Fragment>
                                              )
                                          }
                                      })}
                                      <td className="bg-success">{present?.length}</td>
                                      <td className="bg-info">{permission?.length}</td>
                                      <td className="bg-warning">{sick?.length}</td>
                                      <td className="bg-danger">{absent?.length}</td>
                                  </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </PreviewAltCard>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Detail;