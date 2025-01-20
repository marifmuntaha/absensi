import React, {useEffect, useState} from 'react';
import Head from "../../layout/head";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button, Col,
    Icon,
    PreviewCard, Row
} from "../../components";
import Content from "../../layout/content";
import moment from "moment";
import 'moment/locale/id';
import {useNavigate} from "react-router-dom";
import {useSemester} from "../../layout/provider/Semester";
import {useYear} from "../../layout/provider/Year";

const Presence = () => {
    const year = useYear();
    const semester = useSemester();
    const navigate = useNavigate();
    const [month, setMonth] = useState([]);
    useEffect(() => {
        let start = moment(semester.start, 'YYYY-MM-DD');
        let end = moment(semester.end, 'YYYY-MM-DD');
        let monthData = [];
        while (end > start || start.format('M') === end.format('M')) {
            monthData.push(start.locale('id').format('MMMM YYYY'));
            start.add(1, 'month');
        }
        setMonth(monthData);

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
                                    <td>{year.name}</td>
                                </tr>
                                <tr>
                                    <th>Semester</th>
                                    <td>{semester.name === '1' ? 'Gasal' : 'Genap'}</td>
                                </tr>
                                <tr>
                                    <th>Tanggal Efektif</th>
                                    <td>{`${moment(semester.start, 'YYYY-MM-DD').locale('id').format('DD MMMM YYYY')} - ${moment(semester.end, 'YYYY-MM-DD').locale('id').format('DD MMMM YYYY')}`}</td>
                                </tr>
                                </tbody>
                            </table>
                        </Col>
                    </PreviewCard>
                    <PreviewCard>
                        <Row className="gy-3">
                            {month.map((item, index) => (
                                <Col className="col-md-4" key={index}>
                                    <Button
                                        className="btn-dim col-md-12"
                                        outline color="primary"
                                        size="xl"
                                        style={{height:'100px'}}
                                        onClick={() => {
                                            const date = moment(item, 'MMMM YYYY');
                                            navigate(`/absensi/kelola/${date.format('M')}/${date.format('YYYY')}`);
                                        }}
                                    >
                                        <Icon name="calendar"/>
                                        <span className="fs-22px">{item}</span>
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Presence;