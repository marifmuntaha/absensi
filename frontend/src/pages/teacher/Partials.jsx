import React, {useEffect, useState} from "react";
import {Button, Input, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, RToast} from "../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeUser, destroy as destroyUser} from "../../utils/api/user"
import {store as storeTeacher, update as updateTeacher} from "../../utils/api/teacher"

const Partials = ({...props}) => {
    const {register, handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState({});
    const optionGender = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]
    const onSubmit = () => {
        props.teacher === null
            ? storeSubmit().then(() => setLoading(false))
            : updateSubmit().then(() => setLoading(false));
    }
    const storeSubmit = async () => {
        setLoading(true);
        const paramsUser = {
            name: getValues('name'),
            username: getValues('nuptk'),
            password: getValues('nuptk'),
            password_confirmation: getValues('nuptk'),
            email: getValues('email'),
            role: '3',
        }
        await storeUser(paramsUser).then(resp => {
            const user = resp.data.result;
            const params = {
                user_id: user.id,
                name: getValues('name'),
                nip: getValues('nip'),
                nuptk: getValues('nuptk'),
                gender: getValues('gender'),
                phone: getValues('phone'),
                address: getValues('address'),
                image: image
            }
            storeTeacher(params).then(resp => {
                RToast(resp.data.message, 'success');
                setLoading(false);
                props.setLoadData(true);
                toggle();
            }).catch((err) => {
                destroyUser(user.id);
                setLoading(false);
                RToast(err, 'error');
            });
        }).catch(err => {
            RToast(err, 'error');
            setLoading(false);
        });
    }
    const updateSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            user_id: getValues('user_id'),
            name: getValues('name'),
            nip: getValues('nip'),
            nuptk: getValues('nuptk'),
            gender: getValues('gender'),
            phone: getValues('phone'),
            address: getValues('address'),
            image: image
        }
        updateTeacher(params).then(resp => {
            RToast(resp.data.message, 'success');
            setLoading(false);
            props.setLoadData(true);
            toggle();
        }).catch((err) => {
            RToast(err, 'error');
            setLoading(false);
        })
    }
    const toggle = () => {
        reset();
        setValue('gender', null);
        props.setTeacher(null);
        props.setModal(false);
    }

    useEffect(() => {
        if (props.teacher !== null) {
            const teacher = props.teacher;
            setValue('id', teacher.id);
            setValue('user_id', teacher?.user?.id);
            setValue('name', teacher.name);
            setValue('nip', teacher.nip);
            setValue('nuptk', teacher.nuptk);
            setValue('gender', teacher.gender);
            setValue('phone', teacher.phone);
            setValue('address', teacher.address);
            setValue('email', teacher?.user?.email);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.teacher]);

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.teacher !== null ? "UBAH" : "TAMBAH"}</ModalHeader>
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
                                <Row className="gy-2">
                                    <Col className="col-md-6">
                                        <div className="form-group">
                                            <Label htmlFor="nip" className="form-label">NIP</Label>
                                            <div className="form-control-wrap">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="nip"
                                                    placeholder="Ex. 1234512345123432"
                                                    {...register('nip', {required: true})}
                                                />
                                                {errors.nip && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-md-6">
                                        <div className="form-group">
                                            <Label htmlFor="nuptk" className="form-label">NUPTK</Label>
                                            <div className="form-control-wrap">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="nuptk"
                                                    placeholder="Ex. 1234512345123432"
                                                    disabled={props.teacher !== null}
                                                    {...register('nuptk', {required: true})}
                                                />
                                                {errors.nuptk && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="gender">
                                        Jenis Kelamin
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="gender" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="gender"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionGender}
                                                    value={optionGender.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Jenis Kelamin"
                                                />
                                            )}/>
                                        {errors.gender && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="phone" className="form-label">WA/Nomor Telepon</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="phone"
                                            placeholder="Ex. 082229366507"
                                            {...register('phone', {required: true})}
                                        />
                                        {errors.phone && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="email" className="form-label">Alamat Email</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="email"
                                            placeholder="Ex. limitlessid@gmail.com"
                                            {...register('email', {required: true})}
                                        />
                                        {errors.email && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="address" className="form-label">Alamat</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="address"
                                            placeholder="Ex. Perum Mutiara Hati 2 Blok C No 7 Ngabul Jepara"
                                            {...register('address', {required: true})}
                                        />
                                        {errors.address && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="image">Foto Guru</label>
                                    <div className="form-control-wrap">
                                        <div className="form-file">
                                            <Input
                                                type="file"
                                                id="image"
                                                onChange={(e) => {
                                                    setImage(e.target.files[0])
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <div className="form-group">
                                <Button size="md" className="btn-block" type="submit" color="primary">
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