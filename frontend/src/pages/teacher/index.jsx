import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
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
import Content from "../../layout/content";
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import {useNavigate} from "react-router-dom";
import Partials from "./Partials";
import {destroy as destroyUser} from "../../utils/api/user"
import {get as getTeachers, destroy as destroyTeacher} from "../../utils/api/teacher"

const Teacher = () => {
    const navigate = useNavigate();
    const [loadData, setLoadData] = useState(true);
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [modal, setModal] = useState(false);
    const Columns = [
        {
            name: "Nama Lengkap",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "JK",
            selector: (row) => row.gender,
            sortable: false,
            hide: "sm",
            cell: (row) => {
                return row.gender === 'L' ? <Badge pill color="success">L</Badge> : <Badge pill color="danger">P</Badge>;
            },
        },
        {
            name: "NIP",
            selector: (row) => row.nip,
            sortable: false,
            hide: 370,
        },
        {
            name: "NUPTK",
            selector: (row) => row.nuptk,
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
                    <Button outline color="info" onClick={() => {
                        navigate(`/data-guru/${row.id}/detail`);
                    }}><Icon name="eye"/></Button>
                    <Button outline color="warning" onClick={() => {
                        setTeacher(row);
                        setModal(true);
                    }}><Icon name="edit-alt"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id);
                        destroyTeacher(row.id).then(() => {
                            destroyUser(row.user?.id).then(resp => {
                                RToast(resp.data.message, 'success');
                                setLoading(false);
                                setLoadData(true);
                            }).catch(err => {
                                RToast(err, 'error');
                                setLoading(false);
                            })
                        }).catch(err => {
                            RToast(err, 'error')
                            setLoading(false);
                        });
                    }}>{loading  === row.id ? <Spinner size="sm" /> : <Icon name="trash"/>}</Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        loadData && getTeachers({user: true}).then(resp => {
            setTeachers(resp.data.result);
            setLoadData(false);
        }).catch(err => {
            RToast(err, 'error');
            setLoadData(false);
        })
    }, [loadData]);
    return (
        <React.Fragment>
            <Head title="Data Pendidik & Tenaga Kependidikan" />
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
                                <BlockTitle tag="h4">Data Pendidik & Tenaga Kependidikan</BlockTitle>
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
                        <ReactDataTable data={teachers} columns={Columns} expandableRows pagination/>
                    </PreviewCard>
                </Block>
            </Content>
            <Partials modal={modal} setModal={setModal} teacher={teacher} setTeacher={setTeacher} setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Teacher;