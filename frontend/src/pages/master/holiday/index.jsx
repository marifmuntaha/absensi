import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
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
import Content from "../../../layout/content";
import {ButtonGroup, Spinner} from "reactstrap";
import moment from "moment";
import "moment/locale/id"
import Partials from "./Partials";
import {get as getHolidays, store as storeHoliday, destroy as destroyHoliday} from "../../../utils/api/holiday"
import {useSemester} from "../../../layout/provider/Semester";
import {toast} from "react-toastify";

const Holiday = () => {
    const [semester] = useSemester();
    const [sm, updateSm] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [holidays, setHolidays] = useState([]);
    const [holiday, setHoliday] = useState(null);
    const Columns = [
        {
            name: "Libur",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Tanggal",
            selector: (row) => moment(row.date).locale('id').format(" DD MMMM YYYY"),
            sortable: false,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
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
                        setHoliday(row);
                        setModal(true);
                    }}><Icon name="edit-alt"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id);
                        destroyHoliday(row.id).then((resp) => {
                            RToast(resp.data.message, 'success');
                            setLoadData(true);
                        }).catch(err => RToast(err, 'error'));
                    }}>{loading  === row.id ? <Spinner size="sm" /> : <Icon name="trash"/>}</Button>
                </ButtonGroup>
            )
        },
    ];
    const handleSync = () => {
        const notify = toast.loading('Mengambil Data',{
            type: "info",
            position: "top-right",
            hideProgressBar: true,
            progress: false,
            closeButton: false,
        })
        let start = moment(semester.start, 'YYYY-MM-DD');
        let end = moment(semester.end, 'YYYY-MM-DD');
        let year = moment(semester.end, 'YYYY-MM-DD').format('YYYY').toString();
        let months = []
        while (start <= end){
            months.push(start.format('M'));
            start.add(1, 'M')
        }
        months.map((month) => {
            fetch(`https://api-harilibur.vercel.app/api?month=${month}&year=${year}`)
                .then(res => res.json())
                .then(resp => {
                    const holidays = resp.filter((item) => {
                        return item.is_national_holiday === true
                    });
                    holidays.map((item) => {
                        const params = {
                            semester_id: semester.id,
                            name: item.holiday_name,
                            date: moment(item.holiday_date, 'YYYY-M-D').format('YYYY-MM-DD'),
                            description: ''
                        }
                        item++;
                        storeHoliday(params)
                            .then(() => toast.update(notify, {render: `Menyimpan data hari libur ${item}`, type: 'info', isLoading: true}))
                            .then(() => {
                                toast.update(notify, {render: 'Sinkronasi berhasil', type: "success", isLoading: false, autoClose: true})
                                setLoadData(true);
                            })
                            .catch(err => {
                                RToast(err, 'error')
                                toast.update(notify, {render: 'Gagal melakukan sinkronasi', type: "error", isLoading: false, autoClose: true})
                            });
                    })
                })
        })

    }
    useEffect(() => {
        loadData && getHolidays({semester_id: semester.id}).then((resp) => {
            setHolidays(resp.data.result);
            setLoadData(false);
        }).catch(err => RToast(err, 'error'));
    }, [loadData]);

    return (
        <React.Fragment>
            <Head title="Data Hari Libur" />
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
                                <BlockTitle tag="h4">Data Hari Libur</BlockTitle>
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
                                                    color="danger"
                                                    onClick={() => {
                                                        handleSync()
                                                    }}
                                                >
                                                    <Icon name="reload"></Icon>
                                                </Button>
                                                <Button
                                                    className="toggle d-none d-md-inline-flex"
                                                    color="danger"
                                                    onClick={() => {
                                                        handleSync()
                                                    }}
                                                >
                                                    <Icon name="reload"></Icon>
                                                    <span>SYNC</span>
                                                </Button>
                                            </li>
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
                        <ReactDataTable data={holidays} columns={Columns} expandableRows pagination/>
                    </PreviewCard>
                </Block>
                <Partials modal={modal} setModal={setModal} holiday={holiday} setHoliday={setHoliday}
                          semester={semester} setLoadData={setLoadData}/>
            </Content>
        </React.Fragment>
    )
}

export default Holiday;