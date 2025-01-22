import React, {Suspense, useEffect, useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    BackTo,
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard, RToast
} from "../../components";
import ReactDataTable from "../../components/table";
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import Partials from "./Partials";
import {get as getPermision,destroy as destroyPermission} from "../../utils/api/permission"
import moment from "moment";
import "moment/locale/id"

const Permission = () => {
    const [modal, setModal] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [permission, setPermission] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const Columns = [
        {
            name: "Tanggal",
            selector: (row) => moment(row.date).locale('id').format('DD/MM/YYYY'),
            sortable: false,
        },
        {
            name: "Perijinan",
            selector: (row) => (row.status === 'I' ? 'Ijin' : 'Sakit'),
            sortable: false,
            hide: 'sm',
        },
        {
            name: "Keterangan",
            selector: (row) => row.description,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Status",
            selector: (row) => row.accept,
            sortable: false,
            cell: (row) => {
                return row.accept === '1' ? <Badge pill color="success">Disetujui</Badge> : <Badge pill color="warning">Pengajuan</Badge>;
            },
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            hide: 'sm',
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setPermission(row);
                        setModal(true);
                    }}><Icon name="edit-alt"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id);
                        destroyPermission(row.id).then(resp => {
                            RToast(resp.data.message, 'success');
                            setLoadData(true);
                            setLoading(false)
                        }).catch(err => {
                            RToast(err, 'error')
                            setLoading(false)
                        });
                    }}>{loading  === row.id ? <Spinner size="sm" /> : <Icon name="trash"/>}</Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        loadData && getPermision().then(resp => {
            setPermissions(resp.data.result);
            setLoadData(false);
        }).catch(err => {
            RToast(err, 'error');
            setLoadData(false);
        })
    }, [loadData]);
    return (
        <Suspense fallback={<div>Loading..</div>}>
            <Head title="Data Perijinan" />
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/" icon="arrow-left">
                            Dashboard
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <Block size="sm">
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h4">Data Perijinan</BlockTitle>
                                <p>
                                    Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for react dashlite.
                                </p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button
                                        className="toggle btn-icon d-md-none"
                                        color="dark"
                                        onClick={() => {
                                            setModal(true);
                                        }}
                                    >
                                        <Icon name="plus"></Icon>
                                    </Button>
                                    <div className="toggle-expand-content">
                                        <ul className="nk-block-tools g-3">
                                            <li className="nk-block-tools-opt">
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
                        <ReactDataTable data={permissions} columns={Columns} expandableRows pagination />
                    </PreviewCard>
                </Block>
            </Content>
            <Partials modal={modal} setModal={setModal} permission={permission} setPermission={setPermission} setLoadData={setLoadData}/>
        </Suspense>
    )
}

export default Permission;