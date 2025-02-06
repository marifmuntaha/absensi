import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
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
} from "../../../components";
import ReactDataTable from "../../../components/table";
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import Partials from "./Partials";
import {get as getYears, destroy as destroyYear} from "../../../utils/api/year"

const Year = () => {
    const [sm, updateSm] = useState(false);
    const [years, setYears] = useState([]);
    const [year, setYear] = useState(null);
    const [loadData, setLoadData] = useState(true);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const Columns = [
        {
            name: "Nama Tahun",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
            hide: 370,
        },
        {
            name: "Status",
            selector: (row) => row.active,
            sortable: false,
            hide: "sm",
            cell: (row) => {
                return row.active === '1' ? <Badge pill color="success">Aktif</Badge> : <Badge pill color="danger">Tdk Aktif</Badge>;
            },
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            hide: "sm",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setYear(row);
                        setModal(true);
                    }}><Icon name="edit-alt"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id);
                        destroyYear(row.id).then(resp => {
                            RToast(resp.data.message, 'success');
                            setLoadData(true);
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
        loadData && getYears().then(resp => {
            setYears(resp.data.result);
            setLoadData(false)
        })
    }, [loadData]);
    return (
        <React.Fragment>
            <Head title="Data Tahun Pelajaran" />
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
                                <BlockTitle tag="h4">Data Tahun Pelajaran</BlockTitle>
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
                        <ReactDataTable data={years} columns={Columns} expandableRows pagination/>
                    </PreviewCard>
                </Block>
            </Content>
            <Partials modal={modal} setModal={setModal} year={year} setYear={setYear} setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Year;