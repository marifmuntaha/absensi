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
import {ButtonGroup, Spinner} from "reactstrap";
import Partials from "./Partials";
import {get as getWork, destroy as destroyWork} from "../../../utils/api/work"

const Work = () => {
    const [sm, updateSm] = useState(false);
    const [works, setWorks] = useState([]);
    const [work, setWork] = useState(null)
    const [loadData, setLoadData] = useState(true);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const Columns = [
        {
            name: "Hari",
            selector: (row) => DayFormat(row.day),
            sortable: false,
        },
        {
            name: "Jam Masuk",
            selector: (row) => row.in,
            sortable: false,
            hide: 370,
        },
        {
            name: "Jam Pulang",
            selector: (row) => row.out,
            sortable: false,
            hide: 370,
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            hide: "sm",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setWork(row);
                        setModal(true);
                    }}><Icon name="edit-alt"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id);
                        destroyWork(row.id).then(resp => {
                            RToast(resp.data.message, 'success');
                            setLoadData(true);
                        }).catch(err => RToast(err, 'error'));
                    }}>{loading  === row.id ? <Spinner size="sm" /> : <Icon name="trash"/>}</Button>
                </ButtonGroup>
            )
        },
    ];
    const DayFormat = (day)  => {
        switch (day) {
            case '1':
                return 'Senin';
            case '2':
                return 'Selasa';
            case '3':
                return 'Rabu';
            case '4':
                return 'Kamis';
            case '5':
                return "Jum'at";
            case '6':
                return 'Sabtu';
            case '7':
                return 'Minggu';
            default:
        }
    }
    useEffect(() => {
        loadData && getWork().then(resp => {
            setWorks(resp.data.result);
            setLoadData(false)
        }).catch(err => RToast(err, 'error'));
    }, [loadData]);
    return (
        <React.Fragment>
            <Head title="Data Jam Kerja" />
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
                                <BlockTitle tag="h4">Data Jam Kerja</BlockTitle>
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
                        <ReactDataTable data={works} columns={Columns} expandableRows pagination/>
                    </PreviewCard>
                </Block>
            </Content>
            <Partials modal={modal} setModal={setModal} work={work} setWork={setWork} setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Work;