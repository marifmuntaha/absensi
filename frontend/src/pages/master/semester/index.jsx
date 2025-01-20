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
import {get as getSemesters, destroy as destroySemester} from "../../../utils/api/semester"
import {useYear} from "../../../layout/provider/Year";
import moment from "moment";
import "moment/locale/id"

const Semester = () => {
    const year = useYear();
    const [sm, updateSm] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [semester, setSemester] = useState(null);
    const [loadData, setLoadData] = useState(true);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const Columns = [
        {
            name: "Nama Tahun",
            selector: (row) => row.year && row.year.name,
            sortable: false,
        },
        {
            name: "Semester",
            selector: (row) => row.name === '1' ? 'Gasal' : 'Genap',
            sortable: false,
            hide: 370,
        },
        {
            name: "Mulai",
            selector: (row) => moment(row.start, 'YYYY-MM-DD').locale('id').format('DD MMMM YYYY'),
            sortable: false,
        },
        {
            name: "Selesai",
            selector: (row) => moment(row.end, 'YYYY-MM-DD').locale('id').format('DD MMMM YYYY'),
            sortable: false,
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
                        setSemester(row);
                        setModal(true);
                    }}><Icon name="edit-alt"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id);
                        destroySemester(row.id).then(resp => {
                            RToast(resp.data.message, 'success');
                            setLoadData(true);
                        }).catch(err => RToast(err, 'error'));
                    }}>{loading  === row.id ? <Spinner size="sm" /> : <Icon name="trash"/>}</Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        loadData && getSemesters({year_id: year.id, with: 'year'}).then(resp => {
            setSemesters(resp.data.result);
            setLoadData(false)
        }).catch(err => RToast(err, 'error'));
    }, [loadData]);
    return (
        <React.Fragment>
            <Head title="Data Semester" />
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
                                <BlockTitle tag="h4">Data Semester</BlockTitle>
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
                        <ReactDataTable data={semesters} columns={Columns} expandableRows pagination/>
                    </PreviewCard>
                </Block>
            </Content>
            <Partials modal={modal} setModal={setModal} semester={semester} setSemester={setSemester} setLoadData={setLoadData} year={year}/>
        </React.Fragment>
    )
}

export default Semester;