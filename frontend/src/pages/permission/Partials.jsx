import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, RToast} from "../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storePermission, update as updatePermission} from "../../utils/api/permission"
import moment from "moment";
import {APICore} from "../../utils/api/APICore";
import {store as storePresence} from "../../utils/api/presence";


const Partials = ({...props}) => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const teacher = JSON.parse(localStorage.getItem('teacher'))
    const {register, handleSubmit, setValue, formState: {errors}, getValues, reset, control} = useForm();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const optionsStatus = [
        {value: "I", label: "Ijin"},
        {value: "S", label: "Sakit"},
    ]
    const onSubmit = () => {
        props.permission === null
            ? storeSubmit().then(() => setLoading(false))
            : updateSubmit().then(() => setLoading(false));
    }
    const storeSubmit = async () => {
        setLoading(true);
        const params = {
            teacherId: teacher.id,
            date: moment().format('YYYY-MM-DD'),
            status: getValues('status'),
            description: getValues('description'),
        }
        if (file !== null) {
            params.image = file
        }
        await storePermission(params).then(resp => {
            RToast(resp.data.message, 'success');
            toggle();
            props.setLoadData(true);
        }).catch(err => RToast(err, 'error'));
    }
    const updateSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            teacherId: getValues('teacherId'),
            date: moment().format('YYYY-MM-DD'),
            status: getValues('status'),
            description: getValues('description'),
            letter: getValues('letter'),
            accept: getValues('accept')
        }
        await updatePermission(params).then(async (resp) => {
            const result = resp.data.result;
            const params = {
                teacher_id: result.teacherId,
                date: result.date,
                in: moment().format('HH:mm:ss'),
                out: moment().format('HH:mm:ss'),
                status_in: result.status,
                status_out: result.status,
                description: result.description,
                letter: result.letter
            }
            await storePresence(params).then(resp => {
                RToast(resp.data.message, 'success');
                toggle();
                props.setLoadData(true);
                setLoading(false);
            }).catch(err => {
                RToast(err, 'error');
                setLoading(false);
            })

        }).catch(err => {
            RToast(err, 'error');
            setLoading(false);
        });
    }
    const toggle = () => {
        reset();
        setValue('status', null);
        setValue('image', null);
        props.setPermission(null);
        props.setModal(false);
    }

    useEffect(() => {
        if (props.permission !== null) {
            const permission = props.permission;
            setValue('id', permission?.id);
            setValue('teacherId', permission?.teacherId);
            setValue('date', permission?.date);
            setValue('status', permission?.status);
            setValue('description', permission.description);
            setValue('letter', permission.letter);
            setValue('accept', permission.accept);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.permission]);

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={toggle}>
                <ModalHeader>{props.permission !== null ? "UBAH" : "TAMBAH"}</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="date" className="form-label">Tanggal</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="date"
                                            value={moment(getValues('date')).format('DD-MM-YYYY').toString()}
                                            disabled={true}
                                            {...register('date', {required: false})}
                                        />
                                        {errors.date && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                            name="status"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionsStatus}
                                                    value={optionsStatus.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Status"
                                                />
                                            )}/>
                                        {errors.status && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="description" className="form-label">Diskripsi</Label>
                                    <div className="form-control-wrap">
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            placeholder="Ex. Ijin acara keluarga pak"
                                            {...register('description', {required: false})}
                                        />
                                        {errors.description && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="image" className="form-label">Surat Ijin</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="image"
                                            onChange={(e) => {
                                                setFile(e.target.files[0]);
                                            } }
                                        />
                                    </div>
                                </div>
                            </Col>
                            <div className="form-group">
                                {user.role === '2' ? (
                                    <Row className="between-center">
                                        <Col size={6}>
                                            <Button size="md" className="btn-block" type="submit" color="success" onClick={() => setValue('accept', '1')}>
                                                {loading ? <Spinner size="sm" color="light"/> : "SETUJU"}
                                            </Button>
                                        </Col>
                                        <Col size={6}>
                                            <Button size="md" className="btn-block" type="submit" color="danger" onClick={() => setValue('accept', '3')}>
                                                {loading ? <Spinner size="sm" color="light"/> : "TOLAK"}
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    <Button size="md" className="btn-block" type="submit" color="primary">
                                        {loading ? <Spinner size="sm" color="light"/> : "SIMPAN"}
                                    </Button>
                                    )}
                            </div>
                        </Row>
                    </form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
export default Partials;