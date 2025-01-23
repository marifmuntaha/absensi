import React, {useState} from "react";
import {Tooltip} from "reactstrap";

const Tooltips = ({...props}) => {
    const [tooltipOpen, setOpen] = useState(false);
    const toggle = () => {setOpen(!tooltipOpen)};
    return (
        <Tooltip placement="right" isOpen={tooltipOpen} target={props.target} toggle={toggle}>
            Tooltip Content!
        </Tooltip>
    )
}

export default Tooltips;