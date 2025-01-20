import React, {useEffect, useState} from "react";
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
import {get as getUsers, destroy as destroyUser} from "../../utils/api/user"

const User = () => {
    const [sm, updateSm] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loadData, setLoadData] = useState(true);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const Columns = [
        {
            name: "Nama Lengkap",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Nama Pengguna",
            selector: (row) => row.username,
            sortable: false,
            hide: 370,
        },
        {
            name: "Alamat Email",
            selector: (row) => row.email,
            sortable: false,
            hide: 370,
        },
        {
            name: "Hak Akses",
            selector: (row) => row.role,
            sortable: false,
            hide: "sm",
            cell: (row) => {
                switch (row.role) {
                    case "1":
                        return <Badge pill color="success">Administrator</Badge>;
                    case "2":
                        return <Badge pill color="warning">Kepala Madrasah</Badge>;
                    case "3":
                        return <Badge pill color="info">Guru/Karyawan</Badge>;
                }
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
                        setUser(row);
                        setModal(true);
                    }}><Icon name="edit-alt"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id);
                        destroyUser(row.id).then(resp => {
                            RToast(resp.data.message, 'success');
                            setLoadData(true);
                        }).catch(err => RToast(err, 'error'));
                    }}>{loading  === row.id ? <Spinner size="sm" /> : <Icon name="trash"/>}</Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        loadData && getUsers().then(resp => {
            setUsers(resp.data.result);
            setLoadData(false);
        }).catch(err => {
            RToast(err, 'error')
            setLoadData(false);
        });
    }, [loadData]);
    return (
        <React.Fragment>
            <Head title="Data Pengguna" />
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
                                <BlockTitle tag="h4">Data Pengguna</BlockTitle>
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
                        <ReactDataTable data={users} columns={Columns} expandableRows pagination/>
                    </PreviewCard>
                </Block>
            </Content>
            <Partials modal={modal} setModal={setModal} user={user} setUser={setUser} setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default User;