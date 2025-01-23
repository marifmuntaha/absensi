import React, {Suspense, useEffect, useState} from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head";
import Footer from "./Footer";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Icon,
    PreviewCard, RToast,
} from "../../components";
import {Form, Spinner} from "reactstrap";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {APICore, setAuthorization} from "../../utils/api/APICore";
import {login} from "../../utils/api/auth"
import {get as getTeacher} from "../../utils/api/teacher"

const Login = () => {
    const api = new APICore();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, getValues} = useForm();
    const [loading, setLoading] = useState(false);
    const [passState, setPassState] = useState(false);
    const [redirect, setRedirect] = useState(true);

    const onSubmit = async () => {
        setRedirect(false);
        setLoading(true);
        const params = {
            username: getValues('username'),
            password: getValues('password')
        }
        await login(params).then(resp => {
            const {user, token} = resp.data.result;
            user.token = token.token
            // noinspection JSUnresolvedReference
            user.expired = token.expiresAt;
            api.setLoggedInUser(user);
            setAuthorization(user.token);
            if (user.role === '3') {
                getTeacher({userId: user.id}).then(resp => {
                    localStorage.setItem('teacher', JSON.stringify(resp.data.result.pop()))
                }).catch(err => RToast(err, 'error'));
            }
            setLoading(false);
            setRedirect(true);

        }).catch(err => {
            RToast(err, 'error');
            setLoading(false);
        })
    };
    useEffect(() => {
        if (redirect && api.isUserAuthenticated()) {
            const user = api.getLoggedInUser();
            // noinspection JSUnresolvedReference
            switch (user.role) {
                case "1":
                    return navigate('/administrator');
                case "2":
                    return navigate('/kepala-madrasah');
                case "3":
                    return navigate('/guru');
                default:
                    return navigate('/');
            }
        }
        setRedirect(false);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [redirect]);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Masuk"/>
            <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark"/>
                    </Link>
                </div>
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h4">Masuk</BlockTitle>
                            <BlockDes>
                                <p>Silahkan masuk menggunakan Nama Pengguna & Kata Sandi.</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <Form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="username">Nama Pengguna</label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Masukan Nama Pengguna"
                                    className="form-control-lg form-control"
                                    {...register('username', {required: true})}
                                />
                                {errors.username && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="password">Kata Sandi</label>
                                <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                                    Lupa Sandi?
                                </Link>
                            </div>
                            <div className="form-control-wrap">
                                <a href="#password" onClick={(ev) => {
                                    ev.preventDefault();
                                    setPassState(!passState);
                                }} className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}>
                                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                </a>
                                <input
                                    type={passState ? "text" : "password"}
                                    id="password"
                                    {...register('password', {required: "Kolom tidak boleh kosong"})}
                                    placeholder="Masukkan kata sandi"
                                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}/>
                                {errors.password && <span className="invalid">{errors.password.message}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <Button size="lg" className="btn-block" type="submit" color="primary">
                                {loading ? <Spinner size="sm" color="light"/> : "MASUK"}
                            </Button>
                        </div>
                    </Form>
                </PreviewCard>
            </Block>
            <Footer/>
        </Suspense>
    );
};
export default Login;
