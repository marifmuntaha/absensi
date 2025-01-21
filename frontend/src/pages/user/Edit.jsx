import React, {Suspense, useEffect, useState} from "react";
import Head from "../../layout/head";
import {BackTo, Block, BlockHead, BlockHeadContent, BlockTitle, Col, PreviewCard, Row, RToast} from "../../components";
import Content from "../../layout/content";
import {APICore} from "../../utils/api/APICore";
import {Button, Label, Spinner} from "reactstrap";
import {useForm} from "react-hook-form";
import {update as updateUser} from "../../utils/api/user"

const Edit = () => {
    const api = new APICore()
    const user = api.getLoggedInUser()
    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm()
    const [loading, setLoading] = useState(false)
    const onSubmit = () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            name: getValues('name'),
            username: getValues('username'),
            password: getValues('password'),
            password_confirmation: getValues('password_confirmation'),
            email: getValues('email'),
            role: getValues('role')
        }
        updateUser(params).then(resp => {
            const user = resp.data.result;
            user.token = getValues('token')
            api.setUserInSession(user)
            RToast(resp.data.message, 'success')
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            RToast(err, 'error')
        })
    }
    useEffect(() => {
        setValue('id', user.id)
        setValue('name', user.name)
        setValue('username', user.username)
        setValue('email', user.email)
        setValue('role', user.role)
        setValue('token', user.token)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Suspense fallback={<di>Loading...</di>}>
            <Head title="Pengaturan Pengguna" />
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
                            <BlockTitle tag="h4">Pengaturan Pengguna</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockHead>
                </Block>
                <Block size="sm">
                    <PreviewCard>
                        <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
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
                                                disabled={true}
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
                                                {...register('password', {required: true})}
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
                                                {...register('password_confirmation', {required: true})}
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
                                <div className="form-group mt-3">
                                    <Button size="lg" className="btn-block" type="submit" color="primary">
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