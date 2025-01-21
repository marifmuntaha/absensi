import React, {Suspense, useEffect, useState} from 'react';
import Head from "../../layout/head";
import {
    BackTo,
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Col,
    PreviewCard,
    Row,
    RSelect,
    RToast
} from "../../components";
import Content from "../../layout/content";
import {Button, Input, Label, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {show as showTeacher, update as updateTeacher} from "../../utils/api/teacher";

const Edit = () => {
    const teacher = JSON.parse(localStorage.getItem('teacher'));
    const optionGenders = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]
    const [loading, setLoading] = useState(false);
    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues,
        setValue,
        control
    } = useForm()
    const onSubmit = () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            user_id: getValues('user_id'),
            name: getValues('name'),
            nip: getValues('nip'),
            nuptk: getValues('nuptk'),
            gender: getValues('gender'),
            phone: getValues('phone'),
            email: getValues('email'),
            address: getValues('address')
        }
        updateTeacher(params).then(resp => {
            setLoading(false);
            RToast(resp.data.message, 'success');
        }).catch(err => {
            setLoading(false);
            RToast(err, 'error');
        })
    }

    useEffect(() => {
        showTeacher(teacher.id).then(resp => {
            const data = resp.data.result;
            setValue('id', data?.id)
            setValue('user_id', data?.user?.id)
            setValue('name', data?.name)
            setValue('nip', data?.nip)
            setValue('nuptk', data?.nuptk)
            setValue('gender', data?.gender)
            setValue('phone', data?.phone)
            setValue('email', data?.user?.email)
            setValue('address', data?.address)
        }).catch(error => RToast(error, 'error'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Head title="Data Guru" />
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
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Data Guru</BlockTitle>
                            <p>
                                Perubahan data guru menyebankan perubahan pada QRCode.
                            </p>
                        </BlockHeadContent>
                    </BlockHead>
                </Block>
                <Block>
                    <PreviewCard>
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
                                                        disabled={true}
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
                                                        options={optionGenders}
                                                        value={optionGenders.find((c) => c.value === value)}
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
                                                    onChange={() => alert('image')}
                                                    {...register('image', {required: false})}
                                                />
                                                {errors.image && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                    </PreviewCard>
                </Block>
            </Content>
        </Suspense>
    )
}

export default Edit;