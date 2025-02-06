import React from "react";
import { Modal } from "reactstrap";

const ImageContainer = ({ img, setLetter, open, setOpen}) => {
    const toggle = () => {
        setOpen(!open);
        setLetter('');
    };
    return (
        <Modal isOpen={open} toggle={toggle} size="large" contentClassName="rounded-5">
            <button type="button" className="mfp-close" onClick={toggle}>
                ×
            </button>
            <img className="w-100 rounded-5" style={{ height: "100%" }} src={img} alt="" />
        </Modal>
    );
};

export default ImageContainer;
