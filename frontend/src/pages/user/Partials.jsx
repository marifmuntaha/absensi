import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, RToast} from "../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeUser, update as updateUser} from "../../utils/api/user"

const Partials = ({...props}) => {
    const {register, handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [loading, setLoading] = useState(false);
    const optionRoles = [
        {value: '1', label: 'Administrator'},
        {value: '2', label: 'Kepala Madrasah'},
        {value: '3', label: 'Guru/Karyawan'},
    ]
    const onSubmit = () => {
        props.user === null
            ? storeSubmit().then(() => setLoading(false))
            : updateSubmit().then(() => setLoading(false));
    }
    const storeSubmit = async () => {
        setLoading(true);
        const params = {
            name: getValues('name'),
            username: getValues('username'),
            password: getValues('password'),
            password_confirmation: getValues('password_confirmation'),
            email: getValues('email'),
            role: getValues('role'),
        }
        await storeUser(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
        }).catch(err => {
            RToast(err, 'error');
            setLoading(false);
        });
    }
    const updateSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            name: getValues('name'),
            username: getValues('username'),
            password: getValues('password'),
            password_confirmation: getValues('password_confirmation'),
            email: getValues('email'),
            role: getValues('role'),
        }
        await updateUser(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
        }).catch(err => {
            RToast(err, 'error');
            setLoading(false);
        });
    }
    const toggle = () => {
        reset();
        setValue('role', null);
        props.setUser(null);
        props.setModal(false);
    }

    useEffect(() => {
        if (props.user !== null) {
            const user = props.user;
            setValue('id', user.id);
            setValue('name', user.name);
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('role', user.role);
        }
    }, [props.user]);

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.user !== null ? "UBAH" : "TAMBAH"}</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama Lengkap</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Muhammad Arif Muntaha"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="username" className="form-label">Nama Pengguna</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="username"
                                            placeholder="Ex. marifmuntaha"
                                            {...register('username', {required: true})}
                                        />
                                        {errors.username && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="password" className="form-label">Kata Sandi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="password"
                                            placeholder="Ex. *************"
                                            {...register('password', {required: props.user === null})}
                                        />
                                        {errors.password && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="password_confirmation" className="form-label">Ulangi Sandi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="password_confirmation"
                                            placeholder="Ex. *************"
                                            {...register('password_confirmation', {required: props.user === null})}
                                        />
                                        {errors.password_confirmation && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                <div className="form-group">
                                    <label className="form-label" htmlFor="role">
                                        Hak Akses
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="role" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="role"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionRoles}
                                                    value={optionRoles.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Hak Akses"
                                                />
                                            )}/>
                                        {errors.role && <span className="invalid">Kolom tidak boleh kosong.</span>}
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