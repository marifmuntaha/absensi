import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import {
    BackTo,
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Col,
    PreviewAltCard,
    Row, UserAvatar
} from "../../components";
import Content from "../../layout/content";
import {useParams} from "react-router-dom";
import {findUpper} from "../../utils/Utils";
import ImageContainer from "../../components/partials/galery";
import Logo from "../../images/default/logo-kemenag.png";
import {Card} from "reactstrap";
import {show as showTeacher} from "../../utils/api/teacher"

const View = () => {
    const [teacher, setTeacher] = useState({});
    const {id} = useParams();
    const role = (role) => {
        switch (role) {
            case "1":
                return "Administrator";
            case "2":
                return "Kepala Madrasah";
            case "3":
                return "Guru/Karyawan"
        }
    }
    useEffect(() => {
        showTeacher(id).then(resp => {
            setTeacher(resp.data.result)
        });
    }, [id]);
    return (
        <React.Fragment>
            <Head title="Data Pendidik & Tenaga Kependidikan" />
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/data-guru" icon="arrow-left">
                            Data Guru
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <Block size="sm">
                    <BlockHead size="sm">
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Data {teacher.name}</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockHead>
                    <Row className="g-gs">
                        <Col sm="6" lg="4" xxl="6" className="p-3">
                            <PreviewAltCard>
                                <div className="team">
                                    <div className="user-card user-card-s2">
                                        <UserAvatar theme="primary" className="lg" text={findUpper(teacher.name ? teacher.name : 'AB')} image={teacher.image} />
                                        <div className="user-info">
                                            <h6>{teacher.name}</h6>
                                            <span className="sub-text">{teacher.user && teacher.user.username}</span>
                                        </div>
                                    </div>
                                    <div className="team-details">
                                        <span className="fw-bold">{teacher.user && role(teacher.user.role)}</span>
                                    </div>
                                    <ul className="team-info">
                                        <li className="mb-2">
                                            <span>Alamat Email</span>
                                            <span>{teacher.user && teacher.user.email}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span>NIP</span>
                                            <span>{teacher.nip}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span>NUPTK</span>
                                            <span>{teacher.nuptk}</span>
                                        </li>
                                        <li  className="mb-2">
                                            <span>Jenis Kelamin</span>
                                            <span>{teacher.gender === 'L' ? 'Laki - laki' : 'Perempuan'}</span>
                                        </li>
                                        <li className="mb-2">
                                            <span>Nomor Telepon</span>
                                            <span>{teacher.phone}</span>
                                        </li>
                                    </ul>
                                </div>
                            </PreviewAltCard>
                        </Col>
                        <Col sm="6" lg="4" xxl="6" className="p-3">
                            <PreviewAltCard>
                                <Card className="gallery p-3">
                                    <ImageContainer img={teacher.qrcode ? teacher.qrcode : Logo} />
                                </Card>
                            </PreviewAltCard>
                        </Col>
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default View;