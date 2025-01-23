import React, {useEffect, useState} from "react";
import {Button, Col, PreviewCard, Row, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {Spinner} from "reactstrap";
import {APICore} from "../../../utils/api/APICore";

const Form = ({...props}) => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const {handleSubmit, control} = useForm();
    const [optionTeachers, setOptionTeachers] = useState([]);
    const onSubmit = () => {
        alert('testing')
    }

    useEffect(() => {
        setOptionTeachers(props?.teachers.map((teacher) => {
            return {value: teacher.id, label: teacher.name};
        }))
        // noinspection JSUnresolvedReference
        if (user.role === '3') {
            const teacher = JSON.parse(localStorage.getItem('teacher'));
            props?.setTeacher(teacher);
            props?.setValue('teacher', teacher.id)
        }
        // eslint-disable-next-line
    }, [teachers]);

    return (
        <PreviewCard>
            <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-2">
                    <Col className="col-md-3">
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <input type="hidden" className="form-control"/>
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="teacher"
                                    rules={{required: true}}
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={optionTeachers}
                                            value={optionTeachers && optionTeachers.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Guru"
                                            isDisabled={user.role === '3'}
                                        />
                                    )}/>
                                {errors.teacher && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                    </Col>
                    <Col className="col-md-3">
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <input type="hidden" className="form-control"/>
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="year"
                                    rules={{required: true}}
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={optionYears}
                                            value={optionYears.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Status"
                                        />
                                    )}/>
                                {errors.year && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                    </Col>
                    <Col className="col-md-3">
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <input type="hidden" className="form-control"/>
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="month"
                                    rules={{required: true}}
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={optionMonths}
                                            value={optionMonths.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Status"
                                        />
                                    )}/>
                                {errors.month && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md={2} sm={12}>
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <Button size="md" className="btn-block" type="submit" color="light">
                                    {loading ? <Spinner size="sm" color="light"/> : "CARI DATA"}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </form>
        </PreviewCard>
    )
}

export default Form;