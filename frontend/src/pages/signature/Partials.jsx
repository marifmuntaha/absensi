import React, {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, RToast} from "../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeSignature} from "../../utils/api/signature"

const Partials = ({...props}) => {
    const {register, handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [loading, setLoading] = useState(false);
    const optionActive = [
        {value: '1', label: 'Aktif'},
        {value: '2', label: 'Tidak Aktif'},
    ]
    const onSubmit = () => {
        setLoading(true);
        const params = {
            commonName: getValues('commonName'),
            email: getValues('email'),
            countryName: getValues('countryName'),
            localityName: getValues('localityName'),
            organizationName: getValues('organizationName'),
            password: getValues('password'),
            active: getValues('active'),
        }
        storeSignature(params).then(resp => {
            RToast(resp?.data.message, 'success');
            toggle();
            props.setLoadData(true);
            setLoading(false)
        }).catch(err => {
            RToast(err, 'error');
            setLoading(false);
        });
    }
    const toggle = () => {
        reset();
        setValue('active', null);
        props.setSignature(null);
        props.setModal(false);
    }

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.signature !== undefined ? "UBAH" : "TAMBAH"}</ModalHeader>
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
                                            id="commonName"
                                            placeholder="Ex. Muhammad Arif Muntaha"
                                            {...register('commonName', {required: false})}
                                        />
                                        {errors.commonName && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="email" className="form-label">Alamat Email</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="email"
                                            placeholder="Ex. marifmuntaha@gmail.com"
                                            {...register('email', {required: false})}
                                        />
                                        {errors.email && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <Row>
                                    <Col className="col-md-6">
                                        <div className="form-group">
                                            <Label htmlFor="countryName" className="form-label">Negara</Label>
                                            <div className="form-control-wrap">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="countryName"
                                                    placeholder="Ex. ID"
                                                    {...register('countryName', {required: false})}
                                                />
                                                {errors.countryName && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-md-6">
                                        <div className="form-group">
                                            <Label htmlFor="localityName" className="form-label">Provinsi</Label>
                                            <div className="form-control-wrap">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="localityName"
                                                    placeholder="Ex. Jawa Tengah"
                                                    {...register('localityName', {required: false})}
                                                />
                                                {errors.localityName && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="organizationName" className="form-label">Organisasi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="organizationName"
                                            placeholder="Ex. MTs. Darul Ulum Jondang"
                                            {...register('organizationName', {required: false})}
                                        />
                                        {errors.organizationName && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="password" className="form-label">Kata Sandi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="password"
                                            placeholder="Ex. *********"
                                            {...register('password', {required: false})}
                                        />
                                        {errors.password && <span className="invalid">Kolom tidak boleh kosong.</span>}
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