import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, RToast} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeYear, update as updateYear} from "../../../utils/api/year"

const Partials = ({...props}) => {
    const {register, handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [loading, setLoading] = useState(false);
    const optionActive = [
        {value: '1', label: 'Aktif'},
        {value: '2', label: 'Tidak Aktif'},
    ]
    const onSubmit = () => {
        props.year === null
            ? storeSubmit().then(() => setLoading(false))
            : updateSubmit().then(() => setLoading(false));
    }
    const storeSubmit = async () => {
        setLoading(true);
        const params = {
            name: getValues('name'),
            description: getValues('description'),
            active: getValues('active'),
        }
        await storeYear(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
        }).catch(err => RToast(err, 'error'));
    }
    const updateSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            name: getValues('name'),
            description: getValues('description'),
            active: getValues('active'),
        }
        await updateYear(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
        }).catch(err => RToast(err, 'error'));
    }
    const toggle = () => {
        reset();
        setValue('active', null);
        props.setYear(null);
        props.setModal(false);
    }

    useEffect(() => {
        if (props.year !== null) {
            const year = props.year;
            setValue('id', year.id);
            setValue('name', year.name);
            setValue('description', year.description);
            setValue('active', year.active);
        }
    }, [props.year]);

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.year !== undefined ? "UBAH" : "TAMBAH"}</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="fullname" className="form-label">Nama</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. 2023/2024"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                            placeholder="Ex. Tahun Pelajaran 2023/2024"
                                            {...register('description', {required: false})}
                                        />
                                        {errors.description && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="user">
                                        Status
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="active"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionActive}
                                                    value={optionActive.find((c) => c.value === value)}
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