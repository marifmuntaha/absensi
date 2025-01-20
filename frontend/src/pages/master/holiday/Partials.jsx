/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Icon, Row, RToast} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {store as storeHoliday, update as updateHoliday} from "../../../utils/api/holiday"
import moment from "moment";

const Partials = ({...props}) => {
    const {register, handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [loading, setLoading] = useState(false);
    const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
        <div onClick={onClick} ref={ref}>
            <div className="form-icon form-icon-left">
                <Icon name="calendar"></Icon>
            </div>
            <input className="form-control date-picker" type="text" value={value} onChange={onChange} />
        </div>
    ));
    const onSubmit = () => {
        setLoading(true);
        props.holiday === null
            ? storeSubmit().then(() => setLoading(false))
            : updateSubmit().then(() => setLoading(false));
    }
    const storeSubmit = async () => {
        const params = {
            semester_id: props.semester.id,
            name: getValues('name'),
            date: moment(getValues('date')).format('YYYY-MM-DD'),
            description: getValues('description'),
        }
        await storeHoliday(params).then(resp => {
            RToast(resp.data.message, 'success');
            props.setLoadData(true);
            toggle();
        }).catch(err => RToast(err, 'error'));
    }
    const updateSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            semester_id: getValues('semester_id'),
            name: getValues('name'),
            date: moment(getValues('date')).format('YYYY-MM-DD'),
            description: getValues('description'),
        }
        await updateHoliday(params).then(resp => {
            RToast(resp.data.message, 'success');
            props.setLoadData(true);
            toggle();
        }).catch(err => RToast(err, 'error'));
    }
    const toggle = () => {
        reset();
        setValue('date', new Date());
        props.setHoliday(null);
        props.setModal(false);
    }

    useEffect(() => {
        if (props.holiday !== null) {
            const holiday = props.holiday;
            setValue('id', holiday.id);
            setValue('semester_id', holiday.semester.id);
            setValue('name', holiday.name);
            setValue('date', holiday.date);
            setValue('description', holiday.description);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [props.holiday]);
    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.holiday !== undefined ? "UBAH" : "TAMBAH"}</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Libur Tahun Baru"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label>Tanggal</Label>
                                    <div className="form-control-wrap">
                                        <div className="form-icon form-icon-left">
                                            <Icon name="calendar"></Icon>
                                        </div>
                                        <Controller
                                            control={control}
                                            name="date"
                                            className="form-control"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value ? value : new Date()}
                                                    className="form-control date-picker"
                                                    onChange={val => onChange(val)}
                                                    dateFormat="dd/MM/yyyy"
                                                    customInput={<CustomDateInput/>}
                                                />
                                            )}>
                                        </Controller>
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="description" className="form-label">Diskripsi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="description"
                                            placeholder="Ex. Libur Tahun Baru"
                                            {...register('description', {required: true})}
                                        />
                                        {errors.description && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <div className="form-group">
                                <Button size="md" className="btn-block" color="primary" type="submit">
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