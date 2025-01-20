import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, RToast} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeWork, update as updateWork} from "../../../utils/api/work"
import moment from "moment";
import DatePicker from "react-datepicker";

const Partials = ({...props}) => {
    const {handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [loading, setLoading] = useState(false);
    const optionDays = [
        {value: '1', label: 'Senin'},
        {value: '2', label: 'Selasa'},
        {value: '3', label: 'Rabu'},
        {value: '4', label: 'Kamis'},
        {value: '5', label: "Jum'at"},
        {value: '6', label: 'Sabtu'},
        {value: '7', label: 'Minggu'},
    ]
    const onSubmit = () => {
        props.work === null
            ? storeSubmit().then(() => setLoading(false))
            : updateSubmit().then(() => setLoading(false));
    }
    const storeSubmit = async () => {
        setLoading(true);
        const params = {
            day: getValues('day'),
            in: moment(getValues('in')).format("HH:mm:ss"),
            out: moment(getValues('out')).format("HH:mm:ss"),
        }
        await storeWork(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
        }).catch(err => RToast(err, 'error'));
    }
    const updateSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            day: getValues('day'),
            in: moment(getValues('in')).format("HH:mm:ss"),
            out: moment(getValues('out')).format("HH:mm:ss"),
        }
        await updateWork(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
        }).catch(err => RToast(err, 'error'));
    }
    const toggle = () => {
        reset();
        setValue('day', null);
        props.setWork(null);
        props.setModal(false);
    }
    useEffect(() => {
        if (props.work !== null) {
            const work = props.work;
            setValue('id', work.id);
            setValue('day', work.day);
            setValue('in', moment(work.in, 'HH:mm:ss').toDate());
            setValue('out', moment(work.out, 'HH:mm:ss').toDate());
        }
    }, [props.work]);

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.work !== null ? "UBAH" : "TAMBAH"}</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="day">
                                        Hari
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="day" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="day"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionDays}
                                                    value={optionDays.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Hari"
                                                />
                                            )}/>
                                        {errors.day && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="in" className="form-label">Jam Masuk</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="in" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="in"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value ? value : moment().toDate()}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Waktu"
                                                    dateFormat="HH:mm aa"
                                                />
                                            )}/>
                                        {errors.in && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="out" className="form-label">Jam Pulang</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="out" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="out"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value ? value : moment().toDate()}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Waktu"
                                                    dateFormat="HH:mm aa"
                                                />
                                            )}/>
                                        {errors.out && <span className="invalid">Kolom tidak boleh kosong.</span>}
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