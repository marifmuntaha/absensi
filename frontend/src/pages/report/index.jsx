import React, {Suspense, useEffect, useState} from "react";
import Head from "../../layout/head";
import {
    BackTo,
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard, RToast
} from "../../components";
import Content from "../../layout/content";
import ReactDataTable from "../../components/table";
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import {get as getReports, update as updateReport} from "../../utils/api/report";
import {pdf as generatePdf} from "../../utils/api/generate"
import moment from "moment";
import "moment/locale/id"
import {randomBytes} from "../../utils/Utils";

const Report = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const onSubmit = async (params) => {
        setLoading(true);
        await updateReport(params).then((resp) => {
            const result = resp.data.result;
            if (result.accept === '1') {
                generatePdf(result).then(() => {
                    RToast('Berkas absensi berhasil dibuat.', 'success');
                }).catch((err) => {
                    RToast(err, 'danger');
                })
            }
            setLoadData(true)
            setLoading(false);
            RToast(resp.data.message, 'success');
        }).catch(err => {
            RToast(err, "error");
            setLoading(false);
        });
    }
    const Columns = [
        {
            name: "Nama Guru",
            selector: (row) => row.teacher?.name,
            sortable: false,
        },
        {
            name: "Bulan",
            selector: (row) => moment(row.date).locale('id').format('MMMM YYYY'),
            sortable: false,
            hide: 370,
        },
        {
            name: "Rekapitulasi",
            selector: (row) => row.value,
            sortable: false,
            hide: 370,
            cell: (row) => {
                const recapitulation = JSON.parse(row.value);
                return (
                    <ul className="preview-list">
                        <li style={{padding: '0.1rem'}}>
                            <Badge pill color="success">Hadir: {recapitulation.present}</Badge>
                        </li>
                        <li style={{padding: '0.1rem'}}>
                            <Badge pill color="info">Ijin: {recapitulation.permission}</Badge>
                        </li>
                        <li style={{padding: '0.1rem'}}>
                            <Badge pill color="warning">Sakit: {recapitulation.sick}</Badge>
                        </li>
                        <li style={{padding: '0.1rem'}}>
                            <Badge pill color="danger">Tidak Hadir: {recapitulation.absence}</Badge>
                        </li>
                    </ul>
                )
            }
        },
        {
            name: "Status",
            selector: (row) => row.active,
            sortable: false,
            hide: "sm",
            cell: (row) => {
                switch (row.accept) {
                    case "1":
                        return <Badge pill color="outline-success"><Icon name="check-thick"/><span>Disetujui</span></Badge>;
                    case "2":
                        return <Badge pill color="outline-warning"><Icon name="clock"/><span>Diajukan</span></Badge>
                    case "3":
                        return <Badge pill color="outline-danger"><Icon name="cross"/> <span>Ditolak</span></Badge>
                    default:
                }
            },
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            hide: "sm",
            cell: (row) => {
                return row.accept === '2' && (
                    <ButtonGroup size="sm">
                        <Button outline color="success" onClick={async () => {
                            let params = {
                                id: row.id,
                                teacherId: row.teacherId,
                                number: randomBytes(8),
                                date: row.date,
                                value: row.value,
                                accept: '1'
                            }
                            onSubmit(params).then(() => setLoading(false));
                        }}>{loading ? <Spinner size="sm"/> : <Icon name="check"/> }</Button>
                        <Button outline color="danger" onClick={() => {
                            let params = {
                                id: row.id,
                                teacherId: row.teacherId,
                                number: randomBytes(8),
                                date: row.date,
                                value: row.value,
                                accept: '3'
                            }
                            onSubmit(params).then(() => setLoading(false));
                        }}>{loading ? <Spinner size="sm"/> : <Icon name="cross"/>}</Button>
                    </ButtonGroup>
                )
            }
        },
    ];

    useEffect(() => {
        loadData && getReports().then(resp => {
            setReports(resp.data.result);
        }).then(() => setLoadData(false));
    }, [loadData])
    return (
        <Suspense fallback={null}>
            <Head title="Data Ajuan Tanda Tangan" />
            <Content>
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/" icon="arrow-left">
                            Dashboard
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <Block size="sm">
                    <BlockHead size="sm">
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Ajuan Tanda Tangan</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockHead>
                </Block>
                <PreviewCard>
                    <ReactDataTable data={reports} columns={Columns} expandableRows pagination/>
                </PreviewCard>
            </Content>
        </Suspense>
    )
}

export default Report;