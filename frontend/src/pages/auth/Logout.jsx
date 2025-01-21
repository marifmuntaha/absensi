import React, {Suspense} from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head";
import Footer from "./Footer";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle } from "../../components";
import { Link } from "react-router-dom";
import {Button} from "../../components";

const Success = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Success" />
            <Block className="nk-block-middle nk-auth-body">
                <div className="brand-logo pb-5">
                    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                    </Link>
                </div>
                <BlockHead>
                    <BlockContent>
                        <BlockTitle tag="h4">Berhasil Keluar</BlockTitle>
                        <BlockDes className="text-success">
                            <p>Anda bisa meninggalkan aplikasi sekarang</p>
                            <Link to={`${process.env.PUBLIC_URL}/auth/masuk`}>
                                <Button color="primary" size="md">
                                    Kembali Masuk
                                </Button>
                            </Link>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
            </Block>
            <Footer />
        </Suspense>
    );
};
export default Success;
