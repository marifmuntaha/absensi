import React, {Suspense, useState, useEffect} from "react"
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
import Content from "../../layout/content";
import ReactDataTable from "../../components/table";
import {Badge, Spinner} from "reactstrap";
import Partials from "./Partials";
import {get as getSignature, destroy as destroySignature} from "../../utils/api/signature";

const Signature = () => {
    const [sm, updateSm] = useState(false);
    const [signatures, setSignatures] = useState([]);
    const [signature, setSignature] = useState({});
    const [modal, setModal] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [loading, setLoading] = useState(false);
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.commonName,
            sortable: false,
        },
        {
            name: "Alamat Email",
            selector: (row) => row.email,
            sortable: false,
            hide: 370,
        },
        {
            name: "Negara",
            selector: (row) => row.countryName,
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
                <Button outline color="danger" onClick={() => {
                    setLoading(row.id);
                    destroySignature(row.id).then(resp => {
                        RToast(resp.data.message, 'success');
                        setLoadData(true);
                        setLoading(false);
                    }).catch(err => {
                        RToast(err, 'error')
                        setLoading(false)
                    });
                }}>{loading  === row.id ? <Spinner size="sm" /> : <Icon name="trash"/>}</Button>
            )
        },
    ];

    useEffect(() => {
        loadData && getSignature().then((resp) => {
            setSignatures(resp.data.result);
            setLoadData(false);
        }).catch(() => {
            setLoadData(false);
        })
    }, [loadData]);
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Head title="Tanda Tangan Digital" />
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
                                <BlockTitle tag="h4">Tanda Tangan Digital</BlockTitle>
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
                </Block>
                <PreviewCard>
                    <ReactDataTable data={signatures} columns={Columns} expandableRows pagination/>
                </PreviewCard>
            </Content>
            <Partials modal={modal} setModal={setModal} signature={signature} setSignature={setSignature} setLoadData={setLoadData}/>
        </Suspense>
    )
}

export default Signature;