import React, { Suspense, useEffect, useState } from 'react'
import Head from '../../../layout/head'
import Content from '../../../layout/content'
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle, Button,
  Col, Icon, PreviewCard,
  Row, RSelect, RToast,
} from '../../../components'
import { Card, Input, Spinner } from 'reactstrap'
import ImageContainer from '../../../components/partials/galery'
import Logo from '../../../images/default/logo-kemenag.png'
import { Controller, useForm } from 'react-hook-form'
import { show as showSchool, update as updateSchool } from '../../../utils/api/school'

const School = () => {
  const { register, control, formState: { errors }, getValues, setValue, handleSubmit } = useForm()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filePreview, setFilePreview] = useState('')
  const optionPresences = [
    { value: '1', label: 'Scan Operator' },
    { value: '2', label: 'Scan Guru' },
    { value: '3', label: 'Tombol Manual' },
  ]
  const onSubmit = async () => {
    setLoading(true)
    const params = {
      id: getValues('id'),
      name: getValues('name'),
      phone: getValues('phone'),
      address: getValues('address'),
      email: getValues('email'),
      type: getValues('type')
    }
    if (file !== null) {
      params.image = file
    }
    await updateSchool(params).then(resp => {
      RToast(resp?.data.message, 'success')
      setLoading(false)
    }).catch((err) => {
      RToast(err, 'error')
      setLoading(false)
    })
  }
  useEffect(() => {
    showSchool({ id: 1 }).then(resp => {
      const school = resp.data.result
      setValue('id', school.id)
      setValue('name', school.name)
      setValue('phone', school.phone)
      setValue('address', school.address)
      setValue('email', school.email)
      setValue('type', school.type)
      setFilePreview(school.logo)
    }).catch(err => {
      RToast(err, 'error')
    })
  }, [])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Head title="Data Sekolah" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">DATA SEKOLAH</BlockTitle>
              <p>
                To create custom control, wrapped with <code className="code-tag">&lt;div&gt;</code> each checkbox{' '}
                <code className="code-tag">&lt;input&gt;</code> &amp; <code
                className="code-tag">&lt;label&gt;</code>{' '}
                using <code>.custom-control</code>, <code>.custom-checkbox</code> classes.
              </p>
            </BlockHeadContent>
          </BlockHead>
          <Row>
            <Col className="col-md-7">
              <PreviewCard>
                <div className="card-head">
                  <h6 className="card-title">DATA SEKOLAH</h6>
                </div>
                <form className="gy-3 is-alter" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="g-3 align-center">
                    <Col lg="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">
                          Nama Sekolah
                        </label>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div className="form-group">
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Ex. MTs. Al Hikmah Tanjung"
                            {...register('name', { required: 'Kolom tidak boleh kosong.' })}
                          />
                          {errors.name && <span className="invalid">{errors.name.message}</span>}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="g-3 align-center">
                    <Col lg="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">
                          Telepon
                        </label>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div className="form-group">
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="phone"
                            className="form-control"
                            placeholder="082229366500"
                            {...register('phone', { required: 'Kolom tidak boleh kosong.' })}
                          />
                          {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="g-3 align-top">
                    <Col lg="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="address">
                          Alamat
                        </label>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div className="form-group">
                        <div className="form-control-wrap">
                            <textarea
                              className="form-control"
                              id="address"
                              placeholder="Jl. Darmayanti No 7 Kademangan"
                              {...register('address', { required: 'Kolom tidak boleh kosong.' })}
                            />
                          {errors.address && <span className="invalid">{errors.address.message}</span>}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="g-3 align-center">
                    <Col lg="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Alamat Email
                        </label>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div className="form-group">
                        <div className="form-control-wrap">
                          <input
                            id="email"
                            type="text"
                            className="form-control"
                            placeholder="info@mtsalhikmahtanjung.sch.id"
                            {...register('email', { required: 'Kolom tidak boleh kosong.' })}
                          />
                          {errors.email && <span className="invalid">{errors.email.message}</span>}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="g-3 align-center">
                    <Col lg="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="type">
                          Tipe Absensi
                        </label>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div className="form-group">
                        <div className="form-control-wrap">
                          <input type="hidden" className="form-control"/>
                          <Controller
                            control={control}
                            className="form-control"
                            name="type"
                            rules={{required: true}}
                            render={({field: {onChange, value, ref}}) => (
                              <RSelect
                                inputRef={ref}
                                options={optionPresences}
                                value={optionPresences.find((c) => c.value === value)}
                                onChange={(val) => onChange(val.value)}
                                placeholder="Pilih Tipe Absensi"
                              />
                            )}/>
                          {errors.type && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="g-3">
                    <Col lg="7" className="offset-lg-4">
                      <div className="form-group mt-2">
                        <Button color="success" size="md">
                          {loading ? <Spinner size="sm" /> : 'Perbarui'}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </PreviewCard>
            </Col>
            <Col className="col-md-5">
              <PreviewCard>
                <Card className="gallery p-3">
                  <img className="w-100 rounded-5" style={{ height: "100%" }} src={filePreview ? filePreview : Logo} alt="" />
                </Card>
                <Row className="g-4 mt-1">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Col sm="12">
                      <div className="form-group">
                        <div className="form-control-wrap">
                          <div className="input-group">
                            <div className="form-file">
                              <Input
                                type="file"
                                onChange={(e) => {
                                  setFile(e.target.files[0])
                                  setFilePreview(URL.createObjectURL(e.target.files[0]))
                                }}
                              />
                            </div>
                            <div className="input-group-append">
                              <Button outline color="success" className="btn-dim">
                                {loading ? <Spinner size="sm" /> : <Icon name="upload" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </form>
                </Row>
              </PreviewCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </Suspense>
  )
}

export default School