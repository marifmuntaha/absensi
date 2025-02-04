import React, {useEffect, useState} from "react";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col,
    Icon,
    Row
} from "../../../components";
import {Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import moment from "moment/moment";
import TrafficSources from "./partials/TrafficSources";
import YearChart from "./partials/YearChart";
import Content from "../../../layout/content";
import {get as getTeacher} from "../../../utils/api/teacher";
import {get as getPermission} from "../../../utils/api/permission";
import {get as getReporter} from "../../../utils/api/report";

const Administrator = ({...props}) => {
    const [sm, updateSm] = useState(false);
    const [month, setMonth] = useState(moment().format('M').toString());
    const [teachers, setTeachers] = useState(0);
    const [permissions, setPermissions] = useState(0);
    const [reports, setReports] = useState(0);
    const monthOptions = [
        {value: '1', label: "Januari"},
        {value: '2', label: "Februari"},
        {value: '3', label: "Maret"},
        {value: '4', label: "April"},
        {value: '5', label: "Mei"},
        {value: '6', label: "Juni"},
        {value: '7', label: "Juli"},
        {value: '8', label: "Agustus"},
        {value: '9', label: "September"},
        {value: '10', label: "Oktober"},
        {value: '11', label: "November"},
        {value: '12', label: "Desember"},
    ];

    useEffect(() => {
        getTeacher().then((resp) => {
            setTeachers(resp.data.result?.length);
        });
        getPermission({month: month, year: moment().format('YYYY').toString()}).then((resp) => {
            setPermissions(resp.data.result?.length);
        });
        getReporter({month: month, year: moment().format('YYYY').toString()}).then((resp) => {
            setReports(resp.data.result?.length);
        })
    }, [month])
    return (
        <Content>
            <BlockHead size="sm">
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle page tag="h3">
                            Dashboard
                        </BlockTitle>
                    </BlockHeadContent>
                    <BlockHeadContent>
                        <div className="toggle-wrap nk-block-tools-toggle">
                            <Button
                                className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                onClick={() => updateSm(!sm)}
                            >
                                <Icon name="more-v"/>
                            </Button>
                            <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                <ul className="nk-block-tools g-3">
                                    <li>
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                tag="a"
                                                className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                                                <Icon className="d-none d-sm-inline" name="calender-date"/>
                                                <span>
                                                        {monthOptions.filter((item) => {
                                                            return item.value === month
                                                        }).pop().label +" "+ moment().format('YYYY').toString()}
                                                    </span>
                                                <Icon className="dd-indc" name="chevron-right"/>
                                            </DropdownToggle>
                                            <DropdownMenu end>
                                                <ul className="link-list-opt no-bdr">
                                                    {monthOptions.map((item, i) => (
                                                        <li key={i}>
                                                            <DropdownItem
                                                                tag="a"
                                                                onClick={() => {
                                                                    setMonth(item.value)
                                                                }}
                                                                href="#!"
                                                            >
                                                                <span>{item.label}</span>
                                                            </DropdownItem>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
            <Block>
                <Row className="g-gs">
                    <Col sm={12} md={3}>
                        <Card className="pricing card-bordered border-info">
                            <div className="pricing-head">
                                <div className="pricing-title">
                                    <h4 className="card-title title">GURU</h4>
                                    <p className="sub-text">Jumlah semua guru</p>
                                </div>
                                <div className="card-text">
                                    <Row>
                                        <Col size={6}>
                                            <span className="h4 fw-500">{teachers}</span>
                                            <span className="sub-text">Guru & Karyawan</span>
                                        </Col>
                                        <Col size={6}>
                                            <span className="h2 text-muted"><Icon name="users"/></span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={12} md={3}>
                        <Card className="pricing card-bordered border-info">
                            <div className="pricing-head">
                                <div className="pricing-title">
                                    <h4 className="card-title title">PERIJINAN</h4>
                                    <p className="sub-text">Jumlah Guru Ijin</p>
                                </div>
                                <div className="card-text">
                                    <Row>
                                        <Col size={6}>
                                            <span className="h4 fw-500">{permissions}</span>
                                            <span className="sub-text">Guru & Karyawan</span>
                                        </Col>
                                        <Col size={6}>
                                            <span className="h2 text-muted"><Icon name="calendar"/></span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={12} md={3}>
                        <Card className="pricing card-bordered border-info">
                            <div className="pricing-head">
                                <div className="pricing-title">
                                    <h4 className="card-title title">VERIFIKASI</h4>
                                    <p className="sub-text">Pengajuan Verifikasi</p>
                                </div>
                                <div className="card-text">
                                    <Row>
                                        <Col size={6}>
                                            <span className="h4 fw-500">{reports}</span>
                                            <span className="sub-text">Pengajuan</span>
                                        </Col>
                                        <Col size={6}>
                                            <span className="h2 text-muted"><Icon name="file"/></span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={12} md={3}>
                        <Card className="pricing card-bordered border-info">
                            <div className="pricing-head">
                                <div className="pricing-title">
                                    <h4 className="card-title title">TRAFIK</h4>
                                    <p className="sub-text">Jumlah semua guru</p>
                                </div>
                                <div className="card-text">
                                    <Row>
                                        <Col size={6}>
                                            <span className="h4 fw-500">20</span>
                                            <span className="sub-text">Guru & Karyawan</span>
                                        </Col>
                                        <Col size={6}>
                                            <span className="h2 text-muted"><Icon name="users"/></span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Block>
            <Block>
                <Row className="g-gs">
                    <Col lg="5" sm={12}>
                        <TrafficSources month={month}/>
                    </Col>
                    <Col lg="7" sm={12}>
                        <YearChart />
                    </Col>
                </Row>
            </Block>
        </Content>
    )
}
export default Administrator;