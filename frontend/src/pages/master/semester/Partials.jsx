import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, RToast} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeSemester, update as updateSemester} from "../../../utils/api/semester"
import DatePicker from "react-datepicker";
import moment from "moment";
import {useSemester} from "../../../layout/provider/Semester";

const Partials = ({...props}) => {
    const year = props.year;
    const {handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [semester, setSemester] = useSemester();
    const [loading, setLoading] = useState(false);
    const optionSemesters = [
        {value: '1', label: 'Semester Gasal'},
        {value: '2', label: 'Semester Genap'},
    ]
    const optionActives = [
        {value: '1', label: 'Aktif'},
        {value: '2', label: 'Tidak Aktif'},
    ]
    const onSubmit = () => {
        props.semester === null
            ? storeSubmit().then(() => setLoading(false))
            : updateSubmit().then(() => setLoading(false));
    }
    const storeSubmit = async () => {
        setLoading(true);
        const params = {
            year_id: year.id,
            name: getValues('name'),
            start: moment(getValues('start')).format('YYYY-MM-DD'),
            end: moment(getValues('end')).format('YYYY-MM-DD'),
            active: getValues('active'),
        }
        await storeSemester(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
            resp.data.result.active === '1' && setSemester(resp.data.result)
        }).catch(err => RToast(err, 'error'));
    }
    const updateSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            year_id: year.id,
            name: getValues('name'),
            start: moment(getValues('start')).format('YYYY-MM-DD'),
            end: moment(getValues('end')).format('YYYY-MM-DD'),
            active: getValues('active'),
        }
        await updateSemester(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
            resp.data.result.active === '1' && setSemester(resp.data.result)
        }).catch(err => RToast(err, 'error'));
    }
    const toggle = () => {
        reset();
        setValue('name', null);
        setValue('active', null);
        setValue('start', moment().toDate());
        setValue('end', moment().toDate());
        props.setSemester(null);
        props.setModal(false);
    }

    useEffect(() => {
        if (props.semester !== null) {
            const semester = props.semester;
            setValue('id', semester.id);
            setValue('year_id', semester.year_id);
            setValue('name', semester.name);
            setValue('start', moment(semester.start).toDate());
            setValue('end', moment(semester.end).toDate());
            setValue('active', semester.active);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.semester]);

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.semester !== null ? "UBAH" : "TAMBAH"}</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">
                                        Nama
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="name"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionSemesters}
                                                    value={optionSemesters.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Semester"
                                                />
                                            )}/>
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="start" className="form-label">Tanggal Mulai</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="start" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="start"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value ? value : new Date()}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            )}/>
                                        {errors.start && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="end" className="form-label">Tanggal Selesai</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="end" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="end"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value ? value : new Date()}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            )}/>
                                        {errors.end && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="active">
                                        Status
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="active" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="active"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionActives}
                                                    value={optionActives.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Status"
                                                />
                                            )}/>
                                        {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <div className="form-group">
                                <Button size="lg" className="btn-block" type="submit" color="primary">
                                    {loading ? <Spinner size="sm" color="light"/> : "SIMPAN"}
                                </Button>
                            </div>
                        </Row>
                    </form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
export default Partials;