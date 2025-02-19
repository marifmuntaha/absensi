import React, {useEffect, useState} from "react";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Button, Col, Icon, Row, RToast} from "../../../components";
import {get as getReport, store as storeReport} from "../../../utils/api/report"
import {print as printReport} from "../../../utils/api/print"

import moment from "moment";
import "moment/locale/id"
import {Spinner} from "reactstrap";

const ButtonAction = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [report, setReport] = useState({});
    const ButtonText = (params) => {
        if (!loading) {
            return <Spinner size="sm" />;
        } else {
            switch (params) {
                case "1":
                    return (<><Icon name="printer" /><span>Cetak</span></>)
                case "2":
                    return <><Icon name="clock" /><span>Di Ajukan</span></>
                default:
                    return <><Icon name="check-thick" /><span>Ajukan</span></>
            }
        }
    }
    const onSubmit = (state) => {
        setLoading(true);
        if (state === '3') {
            const params = {
                teacherId: props?.params?.teacherId,
                date: moment(props.params.month + '-' + props.params.year, 'M-YYYY').format('YYYY-MM-DD'),
                value: JSON.stringify({
                    presences: props?.presences,
                    present: props?.present,
                    permission: props?.permission,
                    sick: props?.sick,
                    absence: props?.absence,
                    active: props?.active,
                    holiday: props?.holiday,
                })
            }
            storeReport(params).then(() => {
                setLoading('2');
                setLoadData(true);
                RToast('Pengajuan tanda tangan berhasil, silahkan menunggu disetujui', 'success')
            }).catch(err => {
                RToast(err, 'error');
                setLoading('3');
            })
        }
        else if (state === '1') {
            printReport({id: report.id, teacherId: report.teacherId, value: report.value, month: props.params.month, year: props.params.year}).then(resp => {
                console.log(resp)
            }).catch(err => {
                console.log(err)
            })
        }

    }
    useEffect(() => {
        loadData && getReport(props.params).then(resp => {
            const result = resp.data.result;
            setReport(result?.pop());
            setLoadData(false);
        }).catch(err => {
            RToast(err, 'error');
            setLoadData(false);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadData])

    useEffect(() => {
        setLoading(true);
    }, [props.params])
    return (
        <Row>
            <Col className="col-md-12 mt-2">
                <Row>
                    <Col className="col-md-6 p-1">
                        <Button
                            size="md"
                            className="btn-block "
                            type="submit"
                            color={report?.accept === '1' ? 'success' : report?.accept === '2' ? 'warning' : 'info'}
                            disabled={report?.accept === '2'}
                            onClick={() => onSubmit(report?.accept ? report.accept : '3')}
                        >
                            {ButtonText(report?.accept)}
                        </Button>
                    </Col>
                    <Col className="col-md-6 p-1">
                        <DownloadTableExcel
                            filename={`${moment(props.params.month + '-' + props.params.year, 'M-YYYY').locale('id').format('MMMM YYYY').toString()}`}
                            currentTableRef={props.tableRef.current}
                        >
                            <Button size="md" className="btn-block" type="submit" color="danger">
                                <Icon name="download" />
                                <span>Unduh</span>
                            </Button>
                        </DownloadTableExcel>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ButtonAction;